import { Wrench } from "lucide-react";
import Link from "next/link";

export function Maintenance() {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col items-center gap-5 p-8 bg-white shadow-md rounded-2xl w-full max-w-md text-center">

        <Wrench className="w-16 h-16 text-yellow-500 animate-pulse mt-2" />

        <h1 className="text-2xl font-semibold">
          Website Sedang Dalam Perbaikan
        </h1>

        <p className="text-gray-600 mb-4">
          Maaf, fitur ini sedang dalam proses maintenance.
          <br />
          Silakan coba lagi nanti.
        </p>

        <Link
          href="/"
          className="mt-2 inline-block px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition"
        >
          Kembali
        </Link>

      </div>
    </div>
  );
}