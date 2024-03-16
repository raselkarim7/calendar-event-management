export interface ApiErrorResponseInterface {
  status: number;
  errors?: Record<string, unknown>;
  _message?: string;
  name?: 'ValidationError' | string;
  message?: string;
}
