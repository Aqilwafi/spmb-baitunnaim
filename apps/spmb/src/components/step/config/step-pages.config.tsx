import InitFormContainer from "@/components/step/containers/InitFormContainer";
import PembayaranContainer from "@/components/step/containers/PembayaranContainer";
import BiodataSiswaContainer from "@/components/step/containers/BiodataSiswaContainer";
import BiodataKeluargaContainer from "@/components/step/containers/BiodataKeluargaContainer";
import ComingSoonContainer from "@/components/step/containers/ComingSoonContainer";

export const STEP_CONFIG = {
  FORM: {
    container: InitFormContainer,
  },

  PAYMENT: {
    container: PembayaranContainer,
  },

  BIODATA_STUDENT: {
    container: BiodataSiswaContainer,
  },

  BIODATA_FATHER: {
    container: BiodataKeluargaContainer,
  },

  BIODATA_MOTHER: {
    container: BiodataKeluargaContainer,
  },

  BIODATA_WALI: {
    container: BiodataKeluargaContainer,
  },

  DOCUMENT_KK: {
    container: ComingSoonContainer,
  },

  DOCUMENT_KTP: {
    container: ComingSoonContainer,
  },

  DOCUMENT_AKTE: {
    container: ComingSoonContainer,
  },

  FINALIZATION: {
    container: ComingSoonContainer,
  },
} as const;