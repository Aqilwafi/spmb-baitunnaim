export const LogStatus = {
    SUCCESS: 'success',
    FAILED: 'failed',
} as const;

export const LogAuthEvent = {
    ADMIN_LOGIN:'admin_login',
    ADMIN_LOGOUT: 'admin_logout',
    ADMIN_SET_NEW_PASSWORD: 'admin_set_new_password',
    ADMIN_ASSIGN_ROLE: 'admin_assign_role',
    ADMIN_REVOKE_ROLE: 'admin_revoke_role',
    ADMIN_INVITE_ACCOUNT: 'admin_invite_account',
    ADMIN_REMOVE_ACCOUNT: 'admin_remove_account',
    ADMIN_SUSPEND_ACCOUNT: 'admin_suspend_account',
    ADMIN_SUSPEND_ROLE: 'admin_suspend_role',
    
    SPMB_LOGIN: 'spmb_login',
    SPMB_REGISTER: 'spmb_register',
    SPMB_FORGOT_PASSWORD: 'spmb_forgot_password',
    SPMB_RESET_PASSWORD: 'spmb_reset_password',
    SPMB_LOGOUT: 'spmb_logout'
} as const;

export const LogSpmbEvent = {
    SPMB_INIT_FORM: 'spmb_init_form',
    SPMB_SUBMIT_PAYMENT: 'spmb_submit_payment',
    SPMB_SUBMIT_BIODATA_SISWA: 'spmb_submit_biodata_siswa',
    SPMB_SUBMIT_PENDIDIKAN_SEBELUMNYA: 'spmb_submit_pendidikan_sebelumnya',
    SPMB_SUBMIT_BIODATA_AYAH: 'spmb_submit_biodata_ayah',
    SPMB_SUBMIT_BIODATA_IBU: 'spmb_submit_biodata_ibu',
    SPMB_SUBMIT_BIODATA_WALI: 'spmb_submit_biodata_wali',
    SPMB_SUBMIT_DOKUMEN_KTP_AYAH: 'spmb_submit_dokumen_ktp_ayah',
    SPMB_SUBMIT_DOKUMEN_KTP_IBU: 'spmb_submit_dokumen_ktp_ibu',
    SPMB_SUBMIT_DOKUMEN_KK: 'spmb_submit_dokumen_kk',
    SPMB_SUBMIT_DOKUMEN_AKTE: 'spmb_submit_dokumen_akte',
    SPMB_FINALISASI_FORM: 'spmb_finalisasi_form',

    ADMIN_VERIFY_PAYMENT: 'admin_verify_payment',
    ADMIN_VERIFY_DOKUMEN_KTP_AYAH: 'admin_verify_dokumen_ktp_ayah',
    ADMIN_VERIFY_DOKUMEN_KTP_IBU: 'admin_verify_dokumen_ktp_ibu',
    ADMIN_VERIFY_DOKUMEN_KK: 'admin_verify_dokumen_kk',
    ADMIN_VERIFY_DOKUMEN_AKTE: 'admin_verify_dokumen_akte',

    // Keputusan Akhir Penerimaan
    ADMIN_ACCEPT_ADMISSION: 'admin_accept_admission',
    ADMIN_REJECT_ADMISSION: 'admin_reject_admission',

    ADMIN_UPDATE_FORM: 'admin_update_form',
    ADMIN_UPDATE_BIODATA_SISWA: 'admin_update_biodata_siswa',
    ADMIN_UPDATE_PENDIDIKAN_SEBELUMNYA: 'admin_update_pendidikan_sebelumnya',
    ADMIN_UPDATE_BIODATA_AYAH: 'admin_update_biodata_ayah',
    ADMIN_UPDATE_BIODATA_IBU: 'admin_update_biodata_ibu',
    ADMIN_UPDATE_BIODATA_WALI: 'admin_update_biodata_wali',
    ADMIN_UPDATE_PAYMENT: 'admin_update_payment',
    ADMIN_UPDATE_DOKUMEN: 'admin_update_dokumen',

    ADMIN_DELETE_APPLICANT: 'admin_delete_applicant',       
    ADMIN_DELETE_PAYMENT: 'admin_delete_payment',
    ADMIN_DELETE_DOKUMEN: 'admin_delete_dokumen',          
    ADMIN_DELETE_BIODATA: 'admin_delete_biodata',

} as const;

export const LogAdminEvent = {

    ADMIN_ADD_MASTER_DATA: 'admin_add_master_data',
    ADMIN_UPDATE_MASTER_DATA: 'admin_update_master_data',
    ADMIN_DELETE_MASTER_DATA: 'admin_delete_master_data'

} as const;

