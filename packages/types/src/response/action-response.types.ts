export type ActionResponse<T = undefined> =
  | {
      success: true;
      message: string;
      data?: T;
    }
  | {
      success: false;
      message: string;
      data?: T;
      error: {
        code: string;
        details?: unknown;
      };
    };