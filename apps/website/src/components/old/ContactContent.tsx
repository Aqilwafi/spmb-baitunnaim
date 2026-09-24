export default function ContactContent() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Hubungi Kami
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Punya pertanyaan atau membutuhkan bantuan? Silakan hubungi kami, kami akan merespon secepat mungkin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Informasi Kontak</h2>

            <div>
              <p className="font-medium text-gray-700">📍 Alamat:</p>
              <p className="text-gray-600">Jl. Raya Lumba Lumba, Ngadri, Kec. Binangun, Kabupaten Blitar, Jawa Timur 66193
</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">📞 Telepon:</p>
              <p className="text-gray-600">+62 813-6496-6677</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">📧 Email:</p>
              <p className="text-gray-600">baitunnaimislamic@gmail.com</p>
            </div>

            <div>
              <p className="font-medium text-gray-700">⏰ Jam Operasional:</p>
              <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00</p>
              <p className="text-gray-600">Sabtu & Minggu: Tutup</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Kirim Pesan</h2>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Alamat Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Pesan</label>
                <textarea
                  className="w-full border rounded px-3 py-2 h-28 focus:outline-blue-500"
                  placeholder="Tuliskan pesan Anda di sini..."
                />
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
