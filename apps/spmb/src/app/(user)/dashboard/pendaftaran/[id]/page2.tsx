// // page.tsx (Server Component)
// export default async function DetailPendaftaranPage({ params }) {
//   const { id } = await params;
//   const { allowed } = await isAccessAllowed(id);
//   if (!allowed) return <Forbidden />;

//   const pendaftaran = await getDetailPendaftaranService(id);

//   // Render SEMUA step sekaligus di server — locked return null cepat
//   const stepElements = STEP_CONFIG.map((step) => {
//     const status = computeStepStatus(step.id, pendaftaran.current_step_id);
//     return {
//       id: step.id,
//       status,
//       node: <step.container pendaftaranId={id} userid={pendaftaran.user_id} status={status} />,
//     };
//   });

//   return <AccordionOrchestrator pendaftaran={pendaftaran} stepElements={stepElements} />;
// }