import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { prisma } from "../../db/prisma";

const router = Router();

/** Liveness + database reachability. */
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res
      .status(200)
      .json(new ApiResponse(200, { uptime: process.uptime() }, "OK"));
  })
);

export default router;
