import { getFormPendaftaranBySiswaId, getSiswaIdByUserId } from "@/services/pendaftaran/servicePendaftaran";
import { AppSupabaseClient } from "@bn/supabase";
import { MasterStepListItem, MasterTahunAjaranListItem, SelectOption } from "@bn/types";
import { mapFormPendaftaran } from "@bn/utils";

export async function getFormPendaftaranMapList(
  supabase: AppSupabaseClient,
  userid: string,
  tahunAjaranAktif: MasterTahunAjaranListItem,
  kelasOptions: SelectOption[],
  lembagaOptions: SelectOption[],
  stepList: MasterStepListItem[],
) {
  const siswaReference = await getSiswaIdByUserId(supabase, userid);
  const formList = (await Promise.all(
    siswaReference.map((siswa) =>
      getFormPendaftaranBySiswaId(supabase, siswa.id, tahunAjaranAktif)
    )
  )).flat();

  return mapFormPendaftaran(formList, kelasOptions, lembagaOptions, stepList);
}