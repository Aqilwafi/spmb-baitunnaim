// @/types/step.types.ts

import type { ComponentType } from 'react';

export interface StepConfigItem {
  id: number;
  step_order: number;
  code: string;
  label: string;
  component: ComponentType<any>;
}

export type PendaftaranStepProps = {
  email?: string;
  pendaftaranId: string;
  stepNumber: number;
  userid?:string;
};