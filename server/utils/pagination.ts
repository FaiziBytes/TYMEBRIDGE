import { Request } from "express";
import { ApiError } from "./ApiError";

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function parsePaginationParams(
  req: Request,
  defaultLimit: number = 10,
  maxLimit: number = 100
): PaginationParams | null {
  const pageParam = req.query.page as string;
  const limitParam = req.query.limit as string;

  if (!pageParam && !limitParam) {
    return null;
  }

  const page = parseInt(pageParam) || 1;
  const limit = parseInt(limitParam) || defaultLimit;

  if (page < 1) {
    throw new ApiError(400, "Page must be greater than 0");
  }
  if (limit < 1) {
    throw new ApiError(400, "Limit must be greater than 0");
  }
  if (limit > maxLimit) {
    throw new ApiError(400, `Limit must not exceed ${maxLimit}`);
  }

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
}

export function createPaginationResult(
  page: number,
  limit: number,
  totalCount: number
): PaginationResult {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    page,
    limit,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export const DEFAULT_CURSOR_LIMIT = 25;
export const MAX_CURSOR_LIMIT = 100;

export interface CursorQuery {
  cursor?: string | null;
  limit?: number | null;
}

export interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export function cursorLimit(limit?: number | null): number {
  if (limit == null || !Number.isFinite(limit)) return DEFAULT_CURSOR_LIMIT;
  return Math.min(MAX_CURSOR_LIMIT, Math.max(1, Math.trunc(limit)));
}

export function cursorArgs(query: CursorQuery): {
  take: number;
  skip?: number;
  cursor?: { id: string };
} {
  return {
    take: cursorLimit(query.limit) + 1,
    ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
  };
}

export function toCursorPage<T extends { id: string }, R = T>(
  rows: T[],
  query: CursorQuery,
  map?: (row: T) => R
): CursorPage<R> {
  const size = cursorLimit(query.limit);
  const hasMore = rows.length > size;
  const page = hasMore ? rows.slice(0, size) : rows;
  return {
    items: (map ? page.map(map) : (page as unknown as R[])) as R[],
    hasMore,
    nextCursor: hasMore ? (page[page.length - 1]?.id ?? null) : null,
  };
}

export function parseCursorQuery(query: unknown): CursorQuery {
  const q = (query ?? {}) as Record<string, unknown>;
  const raw = Number(q.limit);
  return {
    cursor: typeof q.cursor === "string" && q.cursor ? q.cursor : null,
    limit: Number.isFinite(raw) ? raw : null,
  };
}
