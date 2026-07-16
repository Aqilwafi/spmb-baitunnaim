import PendaftaranDraft from "@/components/dashboards/pendaftaran/PendaftaranDraft";
import BackButton from "@/components/buttons/BackButton";
const dummyPendaftaran = {
  lembaga: "MI",
  kelas: "1A",
  nama_lengkap: "Ahmad Budi Santoso",
  gender: "Laki-laki",
  nik: "3201234567890001",
  nisn: "1234567890",
};

// todo :  dashboard props data kebutuhan awal, nama, gender, siswa id, dll, agar tidak hit ulang?
// todo : hit data masif di awal, props ke component, dan buat features/helpers/utils untuk urus logika toogle.

export default async function DetailPendaftaranPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <div>
      <div className="p-2">
        <BackButton />
      </div>
      <PendaftaranDraft pendaftaran={dummyPendaftaran} />
    </div>
  );
}