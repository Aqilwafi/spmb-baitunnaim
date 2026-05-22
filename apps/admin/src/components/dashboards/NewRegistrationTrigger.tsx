// components/dashboard/NewRegistrationTrigger.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import RegistrationModal from "./RegistrationModal";
import { RegistrationMasterProps } from "@/types/typeTriggerProps";

export default function NewRegistrationTrigger({ masterLembaga, masterKelas }: RegistrationMasterProps) {    
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
      >
        <Plus size={18} />
        Buat Pendaftaran Baru
      </button>

      {isOpen && <RegistrationModal 
          onClose={() => setIsOpen(false)} 
          masterLembaga={masterLembaga}
          masterKelas={masterKelas}
        />}
    </>
  );
}