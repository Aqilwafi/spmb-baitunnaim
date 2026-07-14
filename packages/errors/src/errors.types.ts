export type AppErrorCode =
  | "AUTH_INVALID_CREDENTIAL"
  | "AUTH_EMAIL_NOT_CONFIRMED"
  | "AUTH_USER_ALREADY_REGISTERED"
  | "AUTH_RATE_LIMIT"
  | "AUTH_UNKNOWN";


export type AppError = {
  code: AppErrorCode;
  message: string;
};