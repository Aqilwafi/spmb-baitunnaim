export interface RegistrationPayload {
  userId: string;
  lembagaId: number;
  kelasId: number;
  namaLengkap: string;
  jenisKelamin: string;
}

export interface MasterData {
  id: number;
  name: string;
}

export interface RegistrationMasterProps {
  masterLembaga: MasterData[];
  masterKelas: MasterData[];
}