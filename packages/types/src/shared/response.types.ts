export type BaseResponse<T = undefined> =
  | {
      success: true;
      message: string;
      data?: T;
      errors?: never; 
    }
  | {
      success: false;
      message: string;
      data?: T;
      errors?: Record<string, string[]>; 
      error?: {
        code: string;
        cause?: string;
        name?: string;
        details?: unknown;
      };
    };
