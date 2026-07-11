'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal } from '@bn/ui';
import { X, Save, Loader2, Plus } from 'lucide-react';
import { initFormPendaftaranAction } from '@/actions/init-form.actions';
import { InitFormPendaftaran } from './InitFormPendaftaran';
import { InitFormPendaftaranModalProps } from '@/features/pendaftaran/types';


export function InitFormPendaftaranModal({ lembaga, kelas }: InitFormPendaftaranModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLembagaCode, setSelectedLembagaCode] = useState('');
  
  // Menggunakan useActionState (menggantikan useState untuk loading & logic form)
  const [state, action, isPending] = useActionState(initFormPendaftaranAction, null);

  function handleClose() {
    setIsOpen(false);
    setSelectedLembagaCode('');
  }

  // Navigasi otomatis jika sukses
  useEffect(() => {
    if (state?.success && state.data) {
      router.push(`/dashboard/pendaftaran/${state.data.id}`);
    }
  }, [state, router]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}> <Plus size={22} className="text-white" /> Pendaftaran Baru </Button>
      
      <Modal open={isOpen} onClose={handleClose}>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Pendaftaran Baru</h2>
            <p className="text-sm text-gray-500 font-medium">Lengkapi data awal calon siswa</p>
          </div>
          <Button onClick={handleClose} variant="ghost" className="rounded-full p-2.5">
            <X size={22} className="text-gray-400" />
          </Button>
        </div>

        {/* Error message jika gagal */}
        {state?.success === false && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">
            {state.message}
          </div>
        )}

        <form action={action} className="space-y-6">
          <InitFormPendaftaran
            lembaga={lembaga}
            kelas={kelas}
            selectedLembagaCode={selectedLembagaCode}
            onLembagaChange={setSelectedLembagaCode}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97]"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Sedang Memproses...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Simpan & Lanjutkan</span>
              </>
            )}
          </Button>
        </form>
      </Modal>
    </>
  );
}