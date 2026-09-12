// "use client";

// import { useActionState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { CheckCircle2, GraduationCap, School, ShieldCheck, FileText } from "lucide-react";
// import { pendidikanSebelumnyaAction } from "@/actions/pendaftaran/pendidikan-sebelumnya";
// import { PendidikanSebelumnyaForm } from "@/components/forms/PendidikanSebelumnyaForm";
// import type { PendidikanSebelumnyaInput } from "@/schemas/pendidikan-sebelumnya.schema"; // sesuaikan path import schema

// interface PendidikanSebelumnyaStepProps {
//   pendaftaran_id: string;
//   user_id: string;
//   status: "active" | "complete";
//   data: PendidikanSebelumnyaInput | null;
// }

// export default function PendidikanSebelumnyaStep({
//   pendaftaran_id,
//   status,
//   data,
// }: PendidikanSebelumnyaStepProps) {
//   const router = useRouter();

//   const [state, action, isPending] = useActionState(
//     (prevState: any, formData: FormData) =>
//       pendidikanSebelumnyaAction(prevState, formData, pendaftaran_id),
//     null
//   );

//   useEffect(() => {
//     if (state?.success) {
//       router.refresh();
//     }
//   }, [state, router]);

//   // Tampilan Read-Only (Status Complete)
//   if (status === "complete" && data) {
//     return (
//       <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
//         <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
//           <div className="flex items-center gap-3 mb-6 sm:mb-8">
//             <div className="bg-green-100 p-2 rounded-full shrink-0">
//               <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
//             </div>
//             <div>
//               <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
//                 Pendidikan Sebelumnya
//               </h2>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Data rincian sekolah asal telah berhasil tersimpan di sistem.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
//               <School size={18} className="text-blue-600 mt-0.5 shrink-0" />
//               <div>
//                 <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Institusi Asal</p>
//                 <p className="text-sm font-semibold text-gray-800 mt-0.5">{data.namaSekolah || "-"}</p>
//                 <p className="text-xs text-gray-600">NPSN: {data.npsn || "-"}</p>
//                 <p className="text-xs text-gray-600 mt-1">{data.alamatSekolah || "-"}</p>
//               </div>
//             </div>

//             <div className="p-3 sm:p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 flex items-start gap-3">
//               <FileText size={18} className="text-blue-600 mt-0.5 shrink-0" />
//               <div>
//                 <p className="text-[10px] uppercase tracking-[0.05em] text-gray-400 font-bold">Akademik & Kelulusan</p>
//                 <p className="text-sm font-semibold text-gray-800 mt-0.5">Tahun Lulus: {data.tahunLulus || "-"}</p>
//                 <p className="text-xs text-gray-600">Nilai Rata-rata: {data.nilaiRataRata ?? "-"}</p>
//                 {data.catatan && <p className="text-xs text-gray-500 mt-1">Catatan: {data.catatan}</p>}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
//             <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
//             <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
//               Data yang dikirimkan bersifat permanen. Jika ada perubahan data penting, silakan hubungi admin sekolah.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Tampilan Form Input (Status Active)
//   return (
//     <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
//       <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
//         <div className="flex items-center gap-3 mb-6 sm:mb-8">
//           <div className="bg-blue-100 p-2 rounded-full shrink-0">
//             <GraduationCap className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
//           </div>
//           <div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
//               Pendidikan Sebelumnya
//             </h2>
//             <p className="text-xs text-gray-500 mt-0.5">
//               Masukkan informasi sekolah asal dan data kelulusan Anda.
//             </p>
//           </div>
//         </div>

//         <PendidikanSebelumnyaForm
//           data={data}
//           action={action}
//           isPending={isPending}
//           state={state}
//         />

//         <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
//           <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
//           <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
//             Pastikan NPSN dan nama sekolah sudah sesuai dengan ijazah atau Surat Keterangan Lulus (SKL).
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }