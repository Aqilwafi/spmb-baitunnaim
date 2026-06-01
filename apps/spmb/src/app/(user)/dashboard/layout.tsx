import { getCurrentSession } from '@bn/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  // 1. Cek sesi user di server
  const session = await getCurrentSession();

  // 2. Jika tidak ada session atau error, tendang ke login
  if (!session) redirect('/login');


  return (
    <section className="min-h-screen bg-[#f8f9fa]">
      {children}
    </section>
  );
}