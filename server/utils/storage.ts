import crypto from "crypto";
import path from "path";
import fs from "fs/promises";
import type { Request } from "express";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { appConfig } from "../config/app.config";
import { getS3Client, s3PublicUrl } from "../config/s3.config";
import { uploadDir } from "../config/multer.config";
import { ApiError } from "./ApiError";
import { logger } from "./logger";

function buildName(originalname: string): { id: string; ext: string } {
  const ext = path.extname(originalname).toLowerCase();
  const id = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
  return { id, ext };
}

/**
 * Options controlling how an upload is stored.
 *
 * - `public` (default): world-readable on the bucket; the returned URL is used
 *   directly (avatars, cover/gallery images, product & consultation photos).
 * - `private`: sensitive files (ID / verification documents, chat attachments).
 *   The object is NOT publicly readable; it is encrypted at rest, stored under a
 *   scoped key (`<folder>/<scopeId>/…`) and only ever served through a
 *   short-lived signed URL minted by the files module after an authorisation
 *   check.
 *
 * `scopeId` is required for private uploads — it is the path segment the files
 * module authorises against (the owner's user id for personal documents, the
 * conversation id for chat attachments), so access can be checked cheaply.
 */
export interface PersistOptions {
  visibility?: "public" | "private";
  scopeId?: string;
}

/**
 * Persist an uploaded (in-memory) file and return its URL.
 *
 * - When S3 is configured (AWS_S3_BUCKET), the object is uploaded and an S3 URL
 *   is returned. Private uploads are encrypted and owner-scoped (see above).
 * - Otherwise, in local dev, the buffer is written to `uploadDir` and served
 *   via the /uploads static route. On serverless without S3 this throws 501,
 *   since the static route is never mounted there.
 */
export async function persistUpload(
  file: Express.Multer.File,
  folder: string,
  req: Request,
  options: PersistOptions = {}
): Promise<string> {
  if (!file?.buffer?.length) {
    throw new ApiError(400, "Uploaded file is empty");
  }

  const isPrivate = options.visibility === "private";
  if (isPrivate && !options.scopeId) {
    throw new ApiError(500, "Private uploads require a scopeId");
  }

  const { id, ext } = buildName(file.originalname);

  if (appConfig.s3.enabled) {
    const key = isPrivate
      ? `${folder}/${options.scopeId}/${id}${ext}`
      : `${folder}/${id}${ext}`;
    await getS3Client().send(
      new PutObjectCommand({
        Bucket: appConfig.s3.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ...(isPrivate
          ? {
              // sensitive: encrypt at rest, never let a proxy/CDN cache it
              ServerSideEncryption: "AES256",
              CacheControl: "private, no-store",
            }
          : {
              // immutable (unique key per upload) → cache aggressively
              CacheControl: "public, max-age=31536000, immutable",
            }),
      })
    );
    return s3PublicUrl(key);
  }

  // --- local disk fallback (dev only) ---
  if (appConfig.isServerless) {
    throw new ApiError(
      501,
      "File uploads require S3 to be configured on this deployment"
    );
  }
  const filename = `${id}${ext}`;
  await fs.writeFile(path.join(uploadDir, filename), file.buffer);
  const base = `${req.protocol}://${req.get("host")}`;
  return `${base}/uploads/${filename}`;
}

/** Persist many files, preserving order. */
export async function persistUploads(
  files: Express.Multer.File[],
  folder: string,
  req: Request,
  options: PersistOptions = {}
): Promise<string[]> {
  return Promise.all(files.map((f) => persistUpload(f, folder, req, options)));
}

/**
 * Best-effort delete of a previously stored object. Accepts a full public URL
 * (S3 or local) and is a no-op when the URL doesn't belong to our store.
 * Failures are logged, not thrown — cleanup should never break the request.
 */
export async function deleteStoredFile(url: string): Promise<void> {
  if (!url) return;
  try {
    if (appConfig.s3.enabled) {
      const key = extractS3Key(url);
      if (!key) return;
      await getS3Client().send(
        new DeleteObjectCommand({ Bucket: appConfig.s3.bucket, Key: key })
      );
      return;
    }
    // local fallback: only delete files under /uploads
    const marker = "/uploads/";
    const idx = url.indexOf(marker);
    if (idx === -1) return;
    const filename = path.basename(url.slice(idx + marker.length));
    await fs.unlink(path.join(uploadDir, filename)).catch(() => {});
  } catch (err) {
    logger.warn(`Failed to delete stored file ${url}: ${String(err)}`);
  }
}

/**
 * Whether a URL points at a file we stored (S3 bucket or the local /uploads
 * route). Used to reject arbitrary/external URLs that a client might try to
 * pass off as an attachment.
 */
export function isStoredUrl(url: string, req: Request): boolean {
  if (!url) return false;
  if (appConfig.s3.enabled) return extractS3Key(url) !== null;
  const base = `${req.protocol}://${req.get("host")}/uploads/`;
  return url.startsWith(base);
}

/** Derive the object key from a public URL, or null if it isn't ours. */
export function extractS3Key(url: string): string | null {
  const base = (
    appConfig.s3.publicUrl ||
    `https://${appConfig.s3.bucket}.s3.${appConfig.s3.region}.amazonaws.com`
  ).replace(/\/+$/, "");
  if (url.startsWith(base + "/")) {
    return url.slice(base.length + 1);
  }
  return null;
}
