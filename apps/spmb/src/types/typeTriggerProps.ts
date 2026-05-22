// types/registration.ts
export interface MasterData {
  id: number;
  name: string;
}

export interface RegistrationMasterProps {
  masterLembaga: MasterData[];
  masterKelas: MasterData[];
}  