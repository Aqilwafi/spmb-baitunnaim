// components/TermsPolicy.tsx
export default function TermsPolicy() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Syarat & Ketentuan dan Kebijakan Privasi
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Halaman ini menjelaskan ketentuan penggunaan layanan serta kebijakan privasi
          yang berlaku di lingkungan <strong>Yayasan LPI Baitunnaim</strong>. Dengan
          mengakses situs atau layanan kami, pengguna dianggap telah membaca, memahami,
          dan menyetujui seluruh isi kebijakan berikut.
        </p>

        {/* SYARAT & KETENTUAN */}
        <section className="space-y-4 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Syarat & Ketentuan</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Pengguna wajib menggunakan layanan secara bertanggung jawab dan sesuai dengan hukum.</li>
            <li>Dilarang menyalahgunakan konten atau informasi yang tersedia di situs yayasan.</li>
            <li>Seluruh konten bersifat informatif dan dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
            <li>Yayasan tidak bertanggung jawab atas penyalahgunaan informasi oleh pihak ketiga.</li>
            <li>Setiap bentuk pelanggaran akan ditindak sesuai peraturan yang berlaku.</li>
          </ul>
        </section>

        {/* KEBIJAKAN PRIVASI */}
        <section className="space-y-4 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Kebijakan Privasi</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami menjaga privasi seluruh pengguna dengan sungguh-sungguh. Informasi yang
            dikumpulkan hanya digunakan untuk keperluan administrasi, komunikasi, serta
            peningkatan kualitas layanan pendidikan.
          </p>
        </section>

        {/* DATA YANG DIKUMPULKAN */}
        <section className="space-y-4 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Data yang Kami Kumpulkan</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Nama lengkap</li>
            <li>Alamat email dan nomor telepon</li>
            <li>Data pendaftaran peserta didik</li>
            <li>Informasi komunikasi melalui formulir kontak</li>
          </ul>
        </section>

        {/* PENGGUNAAN DATA */}
        <section className="space-y-4 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Penggunaan Data</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Administrasi pendaftaran siswa</li>
            <li>Keperluan komunikasi resmi</li>
            <li>Pengelolaan kegiatan pendidikan</li>
            <li>Peningkatan mutu pelayanan yayasan</li>
          </ul>
        </section>

        {/* KEAMANAN DATA */}
        <section className="space-y-4 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Keamanan Data</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami menerapkan langkah-langkah pengamanan yang wajar untuk melindungi data
            pengguna dari akses yang tidak sah, perubahan, pengungkapan, atau penghapusan
            yang tidak diinginkan.
          </p>
        </section>

        {/* PERUBAHAN KEBIJAKAN */}
        <section className="space-y-4 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Perubahan Kebijakan</h2>
          <p className="text-gray-700 leading-relaxed">
            Yayasan berhak mengubah isi kebijakan ini kapan saja sesuai kebutuhan.
            Perubahan akan ditampilkan pada halaman ini dan berlaku sejak dipublikasikan.
          </p>
        </section>

        {/* KONTAK */}
        <section className="space-y-4 pb-10 text-justify">
          <h2 className="text-2xl font-semibold text-gray-800">Kontak Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda memiliki pertanyaan terkait kebijakan ini, silakan hubungi kami
            melalui menu kontak resmi Yayasan LPI Baitunnaim.
          </p>
        </section>

      </div>
    </section>
  );
}
