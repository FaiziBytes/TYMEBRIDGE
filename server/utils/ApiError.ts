export interface ApiFieldError {
  field?: string;
  message: string;
}

class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: ApiFieldError[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: ApiFieldError[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
