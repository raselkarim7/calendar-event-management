export interface ErrorInterface {
  status: number | string;
  message: string;
  errors?: unknown;
}
