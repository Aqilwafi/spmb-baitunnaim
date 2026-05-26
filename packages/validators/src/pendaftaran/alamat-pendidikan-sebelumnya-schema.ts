import { z } from "zod";
import { alamatField } from "../core/personal-field"; 
import { npsnField, pendidikanSebelumnyaField } from "../core/academic-field";

export const alamatPendidikanSebelumnyaSchema = z
  .object({
    namaSekolah: pendidikanSebelumnyaField,
    npsn: npsnField,
    alamanPendidikanSebelumnya: alamatField
  });

export type AlamatPendikanSebelumnyaInput = z.infer<typeof alamatPendidikanSebelumnyaSchema>;