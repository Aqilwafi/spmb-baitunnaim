// services/dashboardService.ts
import "server-only";
import { createSupabaseServer } from "@/lib/supabase/server";
import { DashboardData, RegistrationCard } from "@/types/typeDashboard";

export async function getDashboardData(): Promise<DashboardData>{
    const supabase = await createSupabaseServer();

    const { data: { user } } = await supabase.auth.getUser();   

    const { data: registrations, error } = await supabase
        .from('pendaftaran')
        .select(`
        id,
        lembaga_tujuan_id(name),
        kelas_mi_id(name),
        updated_at,
        current_step_id(name),
        is_revision,
        final_status_id(name),
        siswa:biodata_siswa(nama_lengkap)
        `) 
        .eq('user_id', user?.id) // <--- TETAP TAMBAHKAN INI
        .order('updated_at', { ascending: false });

    if (error) throw new Error("Gagal mengambil data pendaftaran");

    const transformed: RegistrationCard[] = (registrations || []).map((reg: any) => ({
        id: reg.id,
        idShort: reg.id.split("-")[0].toUpperCase(),
        // Gunakan optional chaining (?.) untuk jaga-jaga jika data join null
        namaSiswa: reg.siswa?.nama_lengkap || "Belum Isi Nama",
        lembaga: reg.lembaga_tujuan_id?.name || "Belum Pilih Lembaga",
        kelas: reg.kelas_mi_id?.name || "Belum Pilih Kelas",
        status: reg.final_status_id?.name || "draft",
        isRevision: reg.is_revision || false,
        lastUpdate: reg.updated_at || "",
        isComplete: !!reg.final_status_id?.name
    }));

    return {
        userEmail: user?.email || null,
        registrations: transformed
    };
}

