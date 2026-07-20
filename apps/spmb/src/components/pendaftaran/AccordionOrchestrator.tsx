// // AccordionOrchestrator.tsx (Client Component) — TIDAK BERUBAH walau step nambah
// "use client";

// export default function AccordionOrchestrator({ pendaftaran, stepElements }) {
//   const [openStep, setOpenStep] = useState<number | null>(pendaftaran.current_step_id);
//   const currentStep = pendaftaran.current_step_id; // selalu derive dari props, bukan state

//   return (
//     <>
//       {STEP_CONFIG.map((step) => {
//         const { status, node } = stepElements.find((s) => s.id === step.id)!;
//         const isOpen = openStep === step.id;

//         return (
//           <Card key={step.id} active={status === 'active'} locked={status === 'locked'}>
//             <button onClick={() => setOpenStep(isOpen ? null : step.id)}>
//               {step.label} {status === 'complete' && '✓'} {status === 'locked' && '🔒'}
//             </button>
//             <AnimatePresence>
//               {isOpen && status !== 'locked' && (
//                 <motion.div>{node}</motion.div>
//               )}
//             </AnimatePresence>
//           </Card>
//         );
//       })}
//     </>
//   );
// }