import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { appConfig } from "./app.config";

/**
 * Shared S3 client, created lazily so the SDK is only initialised when S3 is
 * actually configured (AWS_S3_BUCKET set). Credentials are taken from the
 * explicit env vars when provided, otherwise the SDK's default provider chain
 * (instance role / shared config) is used — handy on AWS infra.
 */
let client: S3Client | null = null;

export function getS3Client(): S3Client {
  if (!appConfig.s3.enabled) {
    throw new Error("S3 is not configured (AWS_S3_BUCKET is empty)");
  }
  if (!client) {
    client = new S3Client({
      region: appConfig.s3.region,
      ...(appConfig.s3.accessKeyId && appConfig.s3.secretAccessKey
        ? {
            credentials: {
              accessKeyId: appConfig.s3.accessKeyId,
              secretAccessKey: appConfig.s3.secretAccessKey,
            },
          }
        : {}),
    });
  }
  return client;
}

/** Public URL for an object key, honouring a custom CDN/endpoint when set. */
export function s3PublicUrl(key: string): string {
  const base =
    appConfig.s3.publicUrl ||
    `https://${appConfig.s3.bucket}.s3.${appConfig.s3.region}.amazonaws.com`;
  return `${base.replace(/\/+$/, "")}/${key}`;
}

/**
 * Time-limited GET URL for a *private* object. Used to serve sensitive uploads
 * (ID / verification documents) that are NOT publicly readable on the bucket —
 * the link is signed with our credentials and expires, so it can be handed to
 * an authorised browser without making the object public.
 */
export function s3SignedDownloadUrl(
  key: string,
  expiresInSeconds = 300
): Promise<string> {
  return getSignedUrl(
    getS3Client(),
    new GetObjectCommand({ Bucket: appConfig.s3.bucket, Key: key }),
    { expiresIn: expiresInSeconds }
  );
}
