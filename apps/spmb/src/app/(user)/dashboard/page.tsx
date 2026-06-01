// app/dashboard/page.tsx
import { getMasterKelas, getMasterLembaga, getMasterTahunAjaran } from '@/services/masterService';
import { getCurrentUser, validateAccess } from '@bn/auth'; // 💡 Import mesin global dari shared
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  
  const user = await getCurrentUser();
  console.log("Current User in DashboardPage:", user);
  
  if (!user) redirect('/unauthorized');
  
  const dataKelas = await getMasterKelas(user.data.id);
  const dataLembaga = await getMasterLembaga(user.data.id);
  const dataTahunAjaran = await getMasterTahunAjaran(user.data.id);
  console.log("Data Kelas:", dataTahunAjaran);

  return (
    <main className="min-h-screen bg-[#f8f9fa] ">
      <h1 className="text-black">DASHBOARD</h1>
      <p>Data Kelas: {dataKelas.length}</p>
      <ul className="space-y-2 max-w-md bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        
        {/* 🛠️ Ini proses mapping simpelnya */}
        {dataKelas.map((kelas) => (
          <li 
            key={kelas.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded text-xs font-mono">
              {kelas.code}
            </span>
            <span className="text-gray-700 text-sm font-medium">
              {kelas.label}
            </span>
          </li>
        ))}

      </ul>
    </main>
  );
}