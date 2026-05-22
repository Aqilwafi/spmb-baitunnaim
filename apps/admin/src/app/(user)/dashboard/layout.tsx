import { getCurrentUser } from '@/actions/authAction';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  // 1. Cek sesi user di server
  const user = await getCurrentUser();

  // 2. Jika tidak ada user atau error, tendang ke login
  if (!user) redirect('/login');

  // 3. (Opsional) Cek jika user ini ternyata admin, arahkan ke area yang benar
  if (user.role === 'admin') redirect('/admin');

  return (
    <section className="min-h-screen bg-[#f8f9fa]">
      {children}
    </section>
  );
}