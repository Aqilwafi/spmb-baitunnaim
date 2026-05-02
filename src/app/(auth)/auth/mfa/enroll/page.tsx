"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr"; // Gunakan SSR package terbaru
import { ShieldPlus, CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MFAEnrollPage() {
  const [qrCode, setQrCode] = useState<string>("");
  const [factorId, setFactorId] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Inisialisasi client sesuai standar @supabase/ssr
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function startEnroll() {
      // Membersihkan faktor yang belum terverifikasi sebelumnya jika ada
      const { data: list } = await supabase.auth.mfa.listFactors();
      const unverified = list?.all.filter(f => f.status === 'unverified') || [];
      for (const f of unverified) {
        await supabase.auth.mfa.unenroll({ factorId: f.id });
      }

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        issuer: "LPI Baitun Naim",
        friendlyName: "Admin Device"
      });

      if (error) {
        setError(error.message);
        return;
      }

      setQrCode(data.totp.qr_code);
      setFactorId(data.id);
    }
    startEnroll();
  }, [supabase]);

  const handleFinalize = async () => {
    setError(null);
    
    // 1. Create Challenge
    const { data: challenge, error: cError } = await supabase.auth.mfa.challenge({ factorId });
    if (cError) {
      setError(cError.message);
      return;
    }

    // 2. Verify Challenge
    const { error: vError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: otp
    });

    if (vError) {
      setError("Kode salah atau kadaluarsa.");
      return;
    }

    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
        <div className="bg-green-50 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase">MFA Berhasil Aktif</h1>
        <p className="text-gray-500 max-w-sm mb-8 text-sm">
          Sekarang akun Anda jauh lebih aman. Jangan hapus akun LPI di aplikasi autentikator Anda.
        </p>
        <button 
          onClick={() => router.push("/admin")}
          className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95"
        >
          Lanjut ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center space-y-6">
        <div className="bg-blue-50 w-fit p-4 rounded-2xl mx-auto">
          <ShieldPlus className="w-10 h-10 text-blue-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase">Aktivasi Keamanan Admin</h1>
          <p className="text-xs text-gray-400 font-medium">
            Scan QR Code di bawah dengan aplikasi autentikator Anda.
          </p>
        </div>

        <div className="relative inline-block p-4 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
          <div 
            className="[&>svg]:w-48 [&>svg]:h-48"
            dangerouslySetInnerHTML={{ __html: qrCode }}
          />
        </div>

        <div className="space-y-4 text-left">
          <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-2">
            Verifikasi Kode
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="000 000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full text-center text-3xl text-black font-black tracking-[0.3em] py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {error && (
          <p className="text-red-500 text-[10px] font-bold bg-red-50 py-2 rounded-lg border border-red-100">
            {error}
          </p>
        )}

        <button
          onClick={handleFinalize}
          disabled={otp.length < 6}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-blue-100 active:scale-95"
        >
          Verifikasi & Aktifkan <ArrowRight size={18} />
        </button>
      </div>
    </main>
  );
}