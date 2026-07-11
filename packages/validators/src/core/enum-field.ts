import { z } from "zod";
import { Constants } from "@bn/types"; // sesuaikan path import

export const admissionStatusField = z.enum(
  Constants.public.Enums.admission_status_enum,
);
export const agamaField = z.enum(Constants.public.Enums.agama_enum);
export const auditOperationField = z.enum(
  Constants.public.Enums.audit_operation_enum,
);
export const documentStatusField = z.enum(
  Constants.public.Enums.document_status_enum,
);
export const familyRelationField = z.enum(
  Constants.public.Enums.family_relation_enum,
);
export const genderField = z.enum(Constants.public.Enums.gender_enum);
export const lifeStatusField = z.enum(
  Constants.public.Enums.life_status_enum,
);
export const paymentStatusField = z.enum(
  Constants.public.Enums.payment_status_enum,
);
export const postStatusField = z.enum(Constants.public.Enums.post_status);
export const registrationFormStatusField = z.enum(
  Constants.public.Enums.registration_form_status_enum,
);
export const semesterField = z.enum(Constants.public.Enums.semester_enum);