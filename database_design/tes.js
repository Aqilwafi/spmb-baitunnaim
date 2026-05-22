if (!nik) {
    daftar_biasa();
}
if (nik) {
    if (!tahun_ajaran_sama) {
        if (akun_user == owner) {
            lanjut_daftar_biasa();
        }
        else if (akun_user != owner) {
            verifikasi_email();
            if (!verifikasi_email){
                verifikasi_manual();
            }   
        }
    }
    else {
        tolak_general();
    }
    
}


if (!nik_exists) {
    // Skenario: Siswa Baru benar-benar baru
    create_new_student_and_form();
} 
else {
    // Skenario: NIK sudah ada di database
    const current_owner = get_owner_of_nik(nik);
    const has_active_form = check_active_form(nik, current_tahun_ajaran);

    if (has_active_form) {
        // Anti-Spam: Mencegah satu NIK daftar berkali-kali di tahun yang sama
        return response_general("Pendaftaran untuk NIK ini sedang diproses.");
    }

    if (current_user.id == current_owner) {
        // Skenario: Orang tua yang sama mendaftarkan anaknya lagi (misal naik jenjang)
        copy_biodata_to_new_form(nik);
    } 
    else {
        // Skenario: KLAIM DATA (Orang tua meninggal / Wali baru)
        // 1. Cek tantangan data rahasia (Optional, untuk filter bot/attacker)
        if (challenge_data_valid(input.nama_ibu_kandung, input.tanggal_lahir_siswa)) {
            initiate_ownership_claim_process(); 
            // Masuk ke antrean verifikasi manual admin + upload dokumen
        } else {
            // Berikan pesan abu-abu untuk cegah NIK Enumeration
            return response_general("Terjadi kesalahan, silakan hubungi CS.");
        }
    }
}

if (step_khusus = approved) {
    if (step = reviewed) {
        if (finalized_form) {
            allow_keputusan();
        }
    }
}
else if (step_khusus = rejected) {
    if (step = reviewed) {
        if (finalized_form) {
            allow_keputusan();
        }
    }
}