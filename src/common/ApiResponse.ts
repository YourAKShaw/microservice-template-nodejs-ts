export default class ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  errors: [];

  constructor({
    statusCode,
    success,
    message,
    data,
    errors,
  }: {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
    errors: [];
  }) {
    this.statusCode = statusCode || 500;
    this.success = success || false;
    this.message = message || "";
    this.data = data || null;
    this.errors = errors || [];
  }
}
