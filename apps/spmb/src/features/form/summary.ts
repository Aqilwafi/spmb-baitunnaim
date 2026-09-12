// features/dashboard/summary.ts

import { getTahunAjaranAktifData } from "@/features/master/tahun-ajaran";
import { getLembagaOptions, getKelasOptions } from "@/features/master/options";
import { getFormCard } from "@/services/form/cards";
import type { FormCardsData } from "@/types/form.types";
import type { MasterData } from "@bn/types";

export interface DashboardSummary {
  tahunAjaran: MasterData;
  lembagaOptions: MasterData[];
  kelasOptions: MasterData[];
  cards: FormCardsData[];
  hasPendaftaran: boolean;
}

export async function getDashboardSummaryData(): Promise<DashboardSummary | null> {

    // bisnis start
    const [tahunAjaran, lembagaOptions, kelasOptions] = await Promise.all([
        getTahunAjaranAktifData(),
        getLembagaOptions(),
        getKelasOptions(),
    ]);

    // Tanpa tahun ajaran aktif, tidak ada dasar untuk mengambil form pendaftaran —
    // ini keputusan business, bukan sekadar kondisi render, makanya tinggal di features.
    if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");

    // cards bergantung pada tahunAjaran.id, sehingga tidak bisa digabung ke Promise.all di atas
    const cards = await getFormCard(tahunAjaran.id);

    return {
        tahunAjaran,
        lembagaOptions,
        kelasOptions,
        cards,
        hasPendaftaran: cards.length > 0,
    };
}