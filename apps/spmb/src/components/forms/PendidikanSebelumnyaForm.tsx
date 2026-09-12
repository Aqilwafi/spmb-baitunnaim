// "use client";

// import { useState } from "react";
// import { AlertCircle } from "lucide-react";
// import { Button } from "@bn/ui";
// import type { PendidikanSebelumnyaInput } from "@/schemas/pendidikan-sebelumnya.schema"; // sesuaikan path schema Anda

// interface PendidikanSebelumnyaFormProps {
//   data: PendidikanSebelumnyaInput | null;
//   action: (formData: FormData) => void;
//   isPending: boolean;
//   state: any;
// }

// export function PendidikanSebelumnyaForm({
//   data,
//   action,
//   isPending,
//   state,
// }: PendidikanSebelumnyaFormProps) {
//   const [npsn, setNpsn] = useState(data?.npsn || "");

//   const handleNumericInput = (value: string, maxLength: number) => {
//     return value.replace(/\D/g, "").slice(0, maxLength);
//   };

//   const preventInvalidNumberKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (["e", "E", "+", "-", "."].includes(e.key)) {
//       e.preventDefault();
//     }
//   };

//   const isNpsnValid = !npsn || npsn.length === 8; // NPSN umumnya 8 digit jika diisi

//   const renderFieldError = (fieldError?: string | string[]) => {
//     if (!fieldError) return null;
//     const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
//     return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
//   };

//   return (
//     <form action={action} className="space-y-4">
//       {/* Pesan Error Global */}
//       {state?.success === false && state?.message && (
//         <div className="flex items-start gap-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-xl">
//           <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
//           <p className="text-xs text-red-600 font-medium leading-relaxed">
//             {state.message}
//           </p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Nama Sekolah */}
//         <div className="sm:col-span-2">
//           <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Sekolah Asal</label>
//           <input
//             type="text"
//             name="namaSekolah"
//             defaultValue={data?.namaSekolah || ""}
//             className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
//             placeholder="Contoh: SMP Negeri 1 Jakarta"
//           />
//           {renderFieldError(state?.errors?.namaSekolah)}
//         </div>

//         {/* NPSN */}
//         <div>
//           <div className="flex justify-between items-center mb-1">
//             <label className="text-xs font-semibold text-gray-700">NPSN Sekolah (Opsional)</label>
//             <span className={`text-[10px] ${npsn.length === 8 ? "text-green-600 font-medium" : "text-gray-400"}`}>
//               {npsn.length}/8 digit
//             </span>
//           </div>
//           <input
//             type="text"
//             name="npsn"
//             inputMode="numeric"
//             maxLength={8}
//             value={npsn}
//             onChange={(e) => setNpsn(handleNumericInput(e.target.value, 8))}
//             className={`w-full text-sm p-3 rounded-xl border focus:outline-none transition-colors ${
//               (npsn && !isNpsnValid) || state?.errors?.npsn
//                 ? "border-red-300 focus:border-red-500 bg-red-50/20"
//                 : "border-gray-200 focus:border-blue-500"
//             }`}
//             placeholder="20123456"
//           />
//           {renderFieldError(state?.errors?.npsn)}
//         </div>

//         {/* Tahun Lulus */}
//         <div>
//           <label className="block text-xs font-semibold text-gray-700 mb-1">Tahun Lulus</label>
//           <input
//             type="number"
//             name="tahunLulus"
//             min={1900}
//             max={2100}
//             onKeyDown={preventInvalidNumberKeys}
//             defaultValue={data?.tahunLulus || new Date().getFullYear()}
//             className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
//             placeholder="2024"
//           />
//           {renderFieldError(state?.errors?.tahunLulus)}
//         </div>

//         {/* Nilai Rata-Rata */}
//         <div>
//           <label className="block text-xs font-semibold text-gray-700 mb-1">Nilai Rata-Rata (Opsional)</label>
//           <input
//             type="number"
//             step="0.01"
//             name="nilaiRataRata"
//             min={0}
//             max={100}
//             onKeyDown={preventInvalidNumberKeys}
//             defaultValue={data?.nilaiRataRata ?? ""}
//             className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
//             placeholder="85.50"
//           />
//           {renderFieldError(state?.errors?.nilaiRataRata)}
//         </div>

//         {/* Catatan */}
//         <div>
//           <label className="block text-xs font-semibold text-gray-700 mb-1">Catatan (Opsional)</label>
//           <input
//             type="text"
//             name="catatan"
//             defaultValue={data?.catatan || ""}
//             className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
//             placeholder="Keterangan tambahan jika ada"
//           />
//           {renderFieldError(state?.errors?.catatan)}
//         </div>
//       </div>

//       {/* Alamat Sekolah */}
//       <div>
//         <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Sekolah Asal (Opsional)</label>
//         <textarea
//           name="alamatSekolah"
//           rows={3}
//           defaultValue={data?.alamatSekolah || ""}
//           className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
//           placeholder="Jl. Pendidikan No. 45..."
//         />
//         {renderFieldError(state?.errors?.alamatSekolah)}
//       </div>

//       <Button
//         type="submit"
//         disabled={isPending}
//         className="rounded-xl w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isPending ? "Menyimpan..." : "Simpan Pendidikan Sebelumnya"}
//       </Button>
//     </form>
//   );
// }