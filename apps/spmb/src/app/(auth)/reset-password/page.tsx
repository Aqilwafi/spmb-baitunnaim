import { Card, CompanyLogo, BackButton } from "@bn/ui";
import SetPasswordForm from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 relative">
      
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <BackButton />
      </div>

      <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto">
        
        <div className="flex flex-col items-center gap-2 text-center mt-4">
          <div className="relative w-[100px] h-[100px] shadow-sm rounded-full">
            <CompanyLogo />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {"BAITUN NA'IM"}
          </h1>
        </div>

        <Card className="w-full p-6 shadow-md bg-white rounded-2xl flex flex-col gap-5">
          <div className="text-center border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-800 tracking-wider">RESET PASSWORD AKUN</h2>
            <p className="text-xs text-gray-400 mt-1">Silakan reset password akun Anda</p>
          </div>

          <SetPasswordForm />
        </Card>

      </div>
    </main>
  );
}