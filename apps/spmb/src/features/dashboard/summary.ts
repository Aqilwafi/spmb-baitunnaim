// features/dashboard/summary.ts

import { getTahunAjaranAktif } from "@/features/master/tahun-ajaran";
import { getLembagaOptions, getKelasOptions } from "@/features/master/options";
import { formCardsServices } from "@/services/cards";
import type { FormCardsData } from "@/types/form.types";
import type { MasterData, MasterTahunAjaran } from "@bn/types";

export interface DashboardSummary {
  tahunAjaran: MasterTahunAjaran;
  lembagaOptions: MasterData[];
  kelasOptions: MasterData[];
  cards: FormCardsData[];
  hasPendaftaran: boolean;
}

export async function getDashboardSummary(): Promise<DashboardSummary | null> {

    // bisnis start
    const [tahunAjaran, lembagaOptions, kelasOptions] = await Promise.all([
        getTahunAjaranAktif(),
        getLembagaOptions(),
        getKelasOptions(),
    ]);

    // Tanpa tahun ajaran aktif, tidak ada dasar untuk mengambil form pendaftaran —
    // ini keputusan business, bukan sekadar kondisi render, makanya tinggal di features.
    if (!tahunAjaran) return null;

    // cards bergantung pada tahunAjaran.id, sehingga tidak bisa digabung ke Promise.all di atas
    const cards = await formCardsServices(tahunAjaran.id);

    return {
        tahunAjaran,
        lembagaOptions,
        kelasOptions,
        cards,
        hasPendaftaran: cards.length > 0,
    };
}