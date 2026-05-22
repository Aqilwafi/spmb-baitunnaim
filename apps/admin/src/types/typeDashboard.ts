export interface RegistrationCard {
  id: string;
  idShort: string;
  namaSiswa: string;
  lembaga: string;
  kelas: string;
  status: string;
  isRevision: boolean;
  lastUpdate: string; // ISO string
  isComplete: boolean;
}

export interface DashboardData {
  userEmail: string | null;
  registrations: RegistrationCard[];
}