import multer from "multer";
import type { Request } from "express";
import path from "path";
import fs from "fs";
import { ApiError } from "../utils/ApiError";

const isServerless = process.env.VERCEL === "1";
const uploadDir = isServerless
  ? path.join("/tmp", "uploads")
  : path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const ID_DOC_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const docFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/") || ID_DOC_MIME.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only document or image files are allowed"));
  }
};

const uploadDocs = multer({
  storage,
  fileFilter: docFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const CHAT_DOC_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/x-zip-compressed",
  "application/json",
]);

const chatFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/") || CHAT_DOC_MIME.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Unsupported file type"));
  }
};

const uploadChatFiles = multer({
  storage,
  fileFilter: chatFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export { upload, uploadDocs, uploadChatFiles, uploadDir };
