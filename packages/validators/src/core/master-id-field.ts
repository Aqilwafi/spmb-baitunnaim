import { z } from "zod";

export const masterIdField = (label: string) =>
  z.preprocess(
    // Ubah string kosong (""), null, atau undefined menjadi undefined terlebih dahulu
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce
      .number({ error: `${label} wajib dipilih` })
      .int()
      .positive(`${label} wajib dipilih`)
  );