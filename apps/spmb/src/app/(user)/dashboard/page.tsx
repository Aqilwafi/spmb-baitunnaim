// app/dashboard/page.tsx
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { createSupabaseServer } from '@bn/supabase';
import { getCurrentClaims } from '@bn/auth';
import { Button, Card, CardContent, CardHeader, CardTitle,  } from '@bn/ui';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';
import { getPendaftaran } from '@/services/serviceDashboard';

export default async function DashboardPage() {

  const supabase = await createSupabaseServer();

  
  const kelasOptions = await getKelasOptions(supabase);
  const lembagaOptions = await getLembagaOptions(supabase);

  return (
    <main className="min-h-screen bg-[#f8f9fa] ">
      <div className="flex justify-end items-center">
      <InitFormPendaftaranModal
        lembaga={lembagaOptions}
        kelas={kelasOptions}
      />
      </div>
      {/* 💡 Card Pembungkus Data Lembaga */}

      {/* <Card className="mt-6 max-w-lg bg-white border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-100 pb-3">
          <CardTitle className="text-gray-800">FORM</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-4">
          {dataLembaga.length > 0 ? (
            <ul className="space-y-3">
              {dataLembaga.map((lembaga) => (
                <li key={lembaga.id}>
                  <Link 
                    href={`/dashboard/lembaga/${lembaga.code}`} 
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 transition-all hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {lembaga.code}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-800">
                        {lembaga.label}
                      </p>
                      <p className="text-[10px] text-gray-400">Klik untuk detail</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">Data lembaga tidak tersedia.</p>
          )}
        </CardContent>
      </Card> */}
      
    </main>
  );
}