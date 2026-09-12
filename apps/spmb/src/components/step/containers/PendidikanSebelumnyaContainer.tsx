// import type { StepContainerProps } from "@/types/step.types";
// import PendidikanSebelumnyaStep from "@/components/step/clients/PendidikanSebelumnyaStep";

// // TODO: Ganti dengan service sesungguhnya nanti
// import { getPendidikanSebelumnyaDetail } from "@/services/pendidikan/sebelumnya";

// export default async function PendidikanSebelumnyaContainer({
//   pendaftaran_id,
//   user_id,
//   status,
// }: StepContainerProps) {
//   if (status === "locked") {
//     return null;
//   }

//   // Jika ada master data yang diperlukan (misal: jenis sekolah, dll), ambil di sini via Promise.all
//   const data = status === "complete" 
//     ? await getPendidikanSebelumnyaDetail({ formId: pendaftaran_id })
//     : null;

//   return (
//     <PendidikanSebelumnyaStep
//       pendaftaran_id={pendaftaran_id}
//       user_id={user_id}
//       status={status}
//       data={data?.data ?? null}
//     />
//   );
// }