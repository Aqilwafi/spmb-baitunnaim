export type BaseResponse<T = undefined, E = never> = 
  | { success: true; message: string; data?: T } 
  | { success: false; message: string; data?: E};
