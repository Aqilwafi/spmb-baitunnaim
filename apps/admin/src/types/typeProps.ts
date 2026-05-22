export type DashboardStepProps = {
  email?: string;
  pendaftaranId: string;
  stepNumber: number;
  isComplete: boolean;
  onComplete: () => void;
  isLoading?: boolean; // 🔹 tambahkan
};

export type PendaftaranStepProps = {
  email?: string;
  pendaftaranId: string;
  stepNumber: number;
  userid?:string;
};


export type DashboardHeaderProps = {
  name: string;
  loadingLogout: boolean;
};

export interface PembayaranStepProps {
  user: any;
  pendaftaranId: string;
  isComplete?: boolean;
  onComplete?: () => void;
}