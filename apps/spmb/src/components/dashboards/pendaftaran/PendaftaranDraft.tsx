// components/dashboards/pendaftaran/FormDetailPendaftaran.tsx
"use client";

import { useState } from "react";

// nanti diganti dengan tipe asli dari DB
type Pendaftaran = {
  lembaga: string;
  kelas: string | null;
  nama_lengkap: string;
  gender: string;
  nik: string;
  nisn: string;
};

export default function PendaftaranDraft({ pendaftaran }: { pendaftaran: Pendaftaran }) {

  // Bagian 2
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [golDarah, setGolDarah] = useState("");
  const [agama, setAgama] = useState("");
  const [hobi, setHobi] = useState("");
  const [citaCita, setCitaCita] = useState("");
  const [penyakit, setPenyakit] = useState("");

  // Bagian 3
  const [belumPernahSekolah, setBelumPernahSekolah] = useState(false);
  const [namaSekolah, setNamaSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [npsn, setNpsn] = useState("");

  // Bagian 4 - Ayah
  const [namaAyah, setNamaAyah] = useState("");
  const [hpAyah, setHpAyah] = useState("");
  const [nikAyah, setNikAyah] = useState("");
  const [statusAyah, setStatusAyah] = useState("");
  const [pekerjaanAyah, setPekerjaanAyah] = useState("");
  const [penghasilanAyah, setPenghasilanAyah] = useState("");
  const [pendidikanAyah, setPendidikanAyah] = useState("");
  const [tempatLahirAyah, setTempatLahirAyah] = useState("");
  const [tanggalLahirAyah, setTanggalLahirAyah] = useState("");

  // Bagian 4 - Ibu
  const [namaIbu, setNamaIbu] = useState("");
  const [hpIbu, setHpIbu] = useState("");
  const [nikIbu, setNikIbu] = useState("");
  const [statusIbu, setStatusIbu] = useState("");
  const [pekerjaanIbu, setPekerjaanIbu] = useState("");
  const [penghasilanIbu, setPenghasilanIbu] = useState("");
  const [pendidikanIbu, setPendidikanIbu] = useState("");
  const [tempatLahirIbu, setTempatLahirIbu] = useState("");
  const [tanggalLahirIbu, setTanggalLahirIbu] = useState("");

  // Bagian 5 - Wali
  const [adaWali, setAdaWali] = useState(false);
  const [namaWali, setNamaWali] = useState("");
  const [hpWali, setHpWali] = useState("");
  const [nikWali, setNikWali] = useState("");
  const [statusWali, setStatusWali] = useState("");
  const [pekerjaanWali, setPekerjaanWali] = useState("");
  const [penghasilanWali, setPenghasilanWali] = useState("");
  const [pendidikanWali, setPendidikanWali] = useState("");

  // Bagian 6
  const [alamat, setAlamat] = useState("");
  const [tinggalBersama, setTinggalBersama] = useState("");
  const [statusTinggal, setStatusTinggal] = useState("");

  const ayahMeninggal = statusAyah === "meninggal";
  const ibuMeninggal = statusIbu === "meninggal";
  const waliWajib = ayahMeninggal && ibuMeninggal;

  return (
    <div className="p-4 space-y-8">

      {/* Bagian 1 - Read Only */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 1: Data Pendaftaran</h2>
        <p>Lembaga: {pendaftaran.lembaga}</p>
        <p>Kelas: {pendaftaran.kelas ?? "-"}</p>
        <p>Nama Lengkap: {pendaftaran.nama_lengkap}</p>
        <p>Gender: {pendaftaran.gender}</p>
        <p>NIK: {pendaftaran.nik}</p>
        <p>NISN: {pendaftaran.nisn}</p>
      </section>

      {/* Bagian 2 - Biodata */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 2: Biodata Siswa</h2>
        <div>Tempat Lahir: <input value={tempatLahir} onChange={e => setTempatLahir(e.target.value)} className="border px-2" /></div>
        <div>Tanggal Lahir: <input type="date" value={tanggalLahir} onChange={e => setTanggalLahir(e.target.value)} className="border px-2" /></div>
        <div>Golongan Darah: <input value={golDarah} onChange={e => setGolDarah(e.target.value)} className="border px-2" /></div>
        <div>Agama: <input value={agama} onChange={e => setAgama(e.target.value)} className="border px-2" /></div>
        <div>Hobi: <input value={hobi} onChange={e => setHobi(e.target.value)} className="border px-2" /></div>
        <div>Cita-cita: <input value={citaCita} onChange={e => setCitaCita(e.target.value)} className="border px-2" /></div>
        <div>Penyakit: <input value={penyakit} onChange={e => setPenyakit(e.target.value)} className="border px-2" /></div>
      </section>

      {/* Bagian 3 - Sekolah Sebelumnya */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 3: Pendidikan Sebelumnya</h2>
        <div>
          <label>
            <input type="checkbox" checked={belumPernahSekolah} onChange={e => setBelumPernahSekolah(e.target.checked)} />
            {" "}Belum pernah sekolah
          </label>
        </div>
        {!belumPernahSekolah && (
          <>
            <div>Nama Sekolah: <input value={namaSekolah} onChange={e => setNamaSekolah(e.target.value)} className="border px-2" /></div>
            <div>Alamat Sekolah: <input value={alamatSekolah} onChange={e => setAlamatSekolah(e.target.value)} className="border px-2" /></div>
            <div>NPSN: <input value={npsn} onChange={e => setNpsn(e.target.value)} className="border px-2" /></div>
          </>
        )}
      </section>

      {/* Bagian 4 - Ayah */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 4: Data Ayah</h2>
        <div>Nama: <input value={namaAyah} onChange={e => setNamaAyah(e.target.value)} className="border px-2" /></div>
        <div>No HP: <input value={hpAyah} onChange={e => setHpAyah(e.target.value)} className="border px-2" /></div>
        <div>NIK: <input value={nikAyah} onChange={e => setNikAyah(e.target.value)} className="border px-2" /></div>
        <div>Status Hidup: <input value={statusAyah} onChange={e => setStatusAyah(e.target.value)} className="border px-2" /></div>
        <div>Pekerjaan: <input value={pekerjaanAyah} onChange={e => setPekerjaanAyah(e.target.value)} className="border px-2" /></div>
        <div>Penghasilan: <input value={penghasilanAyah} onChange={e => setPenghasilanAyah(e.target.value)} className="border px-2" /></div>
        <div>Pendidikan: <input value={pendidikanAyah} onChange={e => setPendidikanAyah(e.target.value)} className="border px-2" /></div>
        <div>Tempat Lahir: <input value={tempatLahirAyah} onChange={e => setTempatLahirAyah(e.target.value)} className="border px-2" /></div>
        <div>Tanggal Lahir: <input type="date" value={tanggalLahirAyah} onChange={e => setTanggalLahirAyah(e.target.value)} className="border px-2" /></div>
      </section>

      {/* Bagian 4 - Ibu */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 4: Data Ibu</h2>
        <div>Nama: <input value={namaIbu} onChange={e => setNamaIbu(e.target.value)} className="border px-2" /></div>
        <div>No HP: <input value={hpIbu} onChange={e => setHpIbu(e.target.value)} className="border px-2" /></div>
        <div>NIK: <input value={nikIbu} onChange={e => setNikIbu(e.target.value)} className="border px-2" /></div>
        <div>Status Hidup: <input value={statusIbu} onChange={e => setStatusIbu(e.target.value)} className="border px-2" /></div>
        <div>Pekerjaan: <input value={pekerjaanIbu} onChange={e => setPekerjaanIbu(e.target.value)} className="border px-2" /></div>
        <div>Penghasilan: <input value={penghasilanIbu} onChange={e => setPenghasilanIbu(e.target.value)} className="border px-2" /></div>
        <div>Pendidikan: <input value={pendidikanIbu} onChange={e => setPendidikanIbu(e.target.value)} className="border px-2" /></div>
        <div>Tempat Lahir: <input value={tempatLahirIbu} onChange={e => setTempatLahirIbu(e.target.value)} className="border px-2" /></div>
        <div>Tanggal Lahir: <input type="date" value={tanggalLahirIbu} onChange={e => setTanggalLahirIbu(e.target.value)} className="border px-2" /></div>
      </section>

      {/* Bagian 5 - Wali */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 5: Data Wali</h2>
        {!waliWajib && (
          <div>
            <label>
              <input type="checkbox" checked={adaWali} onChange={e => setAdaWali(e.target.checked)} />
              {" "}Tambah data wali
            </label>
          </div>
        )}
        {(adaWali || waliWajib) && (
          <>
            {waliWajib && <p className="text-sm text-red-500">Wali wajib diisi karena ayah dan ibu telah meninggal.</p>}
            <div>Nama: <input value={namaWali} onChange={e => setNamaWali(e.target.value)} className="border px-2" /></div>
            <div>No HP: <input value={hpWali} onChange={e => setHpWali(e.target.value)} className="border px-2" /></div>
            <div>NIK: <input value={nikWali} onChange={e => setNikWali(e.target.value)} className="border px-2" /></div>
            <div>Status Hidup: <input value={statusWali} onChange={e => setStatusWali(e.target.value)} className="border px-2" /></div>
            <div>Pekerjaan: <input value={pekerjaanWali} onChange={e => setPekerjaanWali(e.target.value)} className="border px-2" /></div>
            <div>Penghasilan: <input value={penghasilanWali} onChange={e => setPenghasilanWali(e.target.value)} className="border px-2" /></div>
            <div>Pendidikan: <input value={pendidikanWali} onChange={e => setPendidikanWali(e.target.value)} className="border px-2" /></div>
          </>
        )}
      </section>

      {/* Bagian 6 - Alamat */}
      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Bagian 6: Alamat Siswa</h2>
        <div>Alamat: <input value={alamat} onChange={e => setAlamat(e.target.value)} className="border px-2" /></div>
        <div>Tinggal Bersama: <input value={tinggalBersama} onChange={e => setTinggalBersama(e.target.value)} className="border px-2" /></div>
        <div>Status Tempat Tinggal: <input value={statusTinggal} onChange={e => setStatusTinggal(e.target.value)} className="border px-2" /></div>
      </section>

      <button className="border px-4 py-2">Submit</button>

    </div>
  );
}