export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  pagination?: PaginationMeta;

  constructor(
    statusCode: number,
    data: T,
    message: string = "Success",
    pagination?: PaginationMeta
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.pagination = pagination || undefined;
  }
}

export { ApiResponse };
