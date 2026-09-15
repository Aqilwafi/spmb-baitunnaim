import InitFormContainer from "@/components/step/containers/InitFormContainer";
import PembayaranContainer from "@/components/step/containers/PembayaranContainer";
import BiodataSiswaContainer from "@/components/step/containers/BiodataSiswaContainer";
import PendidikanSebelumnyaContainer from "../containers/PendidikanSebelumnyaContainer";
import BiodataKeluargaContainer from "@/components/step/containers/BiodataKeluargaContainer";
import DokumenContainer from "@/components/step/containers/DokumenContainer";
import FinalisasiContainer from "../containers/FinalisasiContainer";
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

  PENDIDIKAN_SISWA: {
    container: PendidikanSebelumnyaContainer,
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
    container: DokumenContainer,
  },

  DOCUMENT_KTP: {
    container: DokumenContainer,
  },

  DOCUMENT_AKTE: {
    container: DokumenContainer,
  },

  FINALIZATION: {
    container: FinalisasiContainer,
  },
} as const;