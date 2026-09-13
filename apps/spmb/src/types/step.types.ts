// @/types/step.types.ts
import type { BiodataSiswaDetailItemData } from "./biodata.types";
import type { MasterData, FormPendaftaran, MasterStep} from "@bn/types";

export type StepStatus = 'locked' | 'active' | 'complete';

export interface StepContainerProps {
  formId: FormPendaftaran['id'];
  status: StepStatus;
  code: MasterStep['code'];
}

export interface StepElement {
  id: number | null | undefined;
  stepOrder: number | null | undefined;
  label: string;
  status: StepStatus;
  node: React.ReactNode;
}

export interface BiodataSiswaDetailStepProps extends StepContainerProps {
  data: BiodataSiswaDetailItemData | null;
  statusRumahOptions: MasterData[];
  tinggalBersamaOptions: MasterData[];
}

