export type ActionResponse<T = undefined> =
  | {
      success: true;
      message: string;
      data?: T;
      errors?: never; // Tidak ada error saat sukses
    }
  | {
      success: false;
      message: string;
      data?: T;
      // Tambahkan `errors` untuk mengakomodasi error per-field dari UI
      errors?: Record<string, string[]>; 
      error?: {
        code: string;
        details?: unknown;
      };
    };

export type RpcSubmitResponse = {
  form_id: string;
  next_step_id?: number;
};