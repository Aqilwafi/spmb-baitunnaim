import { z } from "zod";

export const masterIdField = (label: string) =>
  z.coerce
    .number({ error: `${label} wajib dipilih` })
    .int()
    .positive();