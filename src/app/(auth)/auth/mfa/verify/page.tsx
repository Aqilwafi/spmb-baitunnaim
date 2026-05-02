"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";

export default function MFAVerifyPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: factors, error: listError } = await supabase.auth.mfa.listFactors();
      if (listError) throw listError;

      const verifiedFactor = factors.all.find(f => f.status === 'verified');
      if (!verifiedFactor) {
        setError("Tidak ada metode MFA aktif.");
        setLoading(false);
        return;
      }

      const { data: challenge, error: cError } = await supabase.auth.mfa.challenge({ 
        factorId: verifiedFactor.id 
      });
      if (cError) throw cError;

      const { error: vError } = await supabase.auth.mfa.verify({
        factorId: verifiedFactor.id,
        challengeId: challenge.id,
        code: otp
      });

      if (vError) {
        setError("Kode salah atau kadaluarsa.");
        setLoading(false);
        return;
      }

      router.refresh();
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <Image 
          src="/logo_lpi.jpg" 
          alt="Logo LPI" 
          width={80} 
          height={80} 
          className="rounded-full mx-auto shadow-sm border-2 border-white" 
        />

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-center">
            <div className="bg-blue-50 p-4 rounded-full">
              <ShieldCheck className="w-12 h-12 text-[#0066FF]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">Verifikasi Admin</h1>
            <p className="text-sm text-gray-500 leading-relaxed px-4">
              Masukkan kode 6-digit dari aplikasi autentikator Anda untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6 text-left">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">OTP Code</label>
              <input
                type="text"
                maxLength={6}
                placeholder="000 000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-3xl font-black tracking-[0.4em] py-5 bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white rounded-2xl outline-none transition-all text-gray-800 shadow-inner"
                disabled={loading}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-600 text-[11px] font-bold bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                {error}
              </p>
            )}

            <button
              disabled={loading || otp.length < 6}
              className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#0052CC] active:scale-[0.98] transition-all shadow-[0_10px_20px_-5px_rgba(0,102,255,0.4)] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Verifikasi Masuk <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <button 
            type="button"
            className="text-[10px] font-bold text-gray-400 hover:text-[#0066FF] transition-colors uppercase tracking-[0.2em]"
            onClick={() => router.push("/login")}
          >
            Kembali ke Login
          </button>
        </div>

        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">
          Internal Security System LPI
        </p>
      </div>
    </main>
  );
}