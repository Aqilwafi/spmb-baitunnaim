import { z } from "zod";
import { alamatField } from "../core/personal-field"; 
import { npsnField, pendidikanSebelumnyaField } from "../core/academic-field";
import { statusRumahField, tinggalBersamaField } from "../core/background-field";

export const statusTinggalDanAlamatSchema = z
  .object({
    statusRumah: statusRumahField,
    tinggalBersama: tinggalBersamaField,
    alamat: alamatField
  });

export type AtatusTinggalDanAlamatImput = z.infer<typeof statusTinggalDanAlamatSchema>;