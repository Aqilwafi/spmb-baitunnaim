import 'server-only';
import type { Database } from "@bn/types";
export declare const supabaseAdmin: import("@supabase/supabase-js").SupabaseClient<Database, "public", "public", {
    Tables: {
        activity_logs: {
            Row: {
                created_at: string;
                event: string;
                id: string;
                metadata: import("@bn/types").Json | null;
                status: string | null;
                user_id: string | null;
            };
            Insert: {
                created_at?: string;
                event: string;
                id?: string;
                metadata?: import("@bn/types").Json | null;
                status?: string | null;
                user_id?: string | null;
            };
            Update: {
                created_at?: string;
                event?: string;
                id?: string;
                metadata?: import("@bn/types").Json | null;
                status?: string | null;
                user_id?: string | null;
            };
            Relationships: [];
        };
        audit_trail: {
            Row: {
                action: string;
                created_at: string;
                id: string;
                new_data: import("@bn/types").Json | null;
                old_data: import("@bn/types").Json | null;
                record_id: string | null;
                table_name: string;
                user_id: string | null;
            };
            Insert: {
                action: string;
                created_at?: string;
                id?: string;
                new_data?: import("@bn/types").Json | null;
                old_data?: import("@bn/types").Json | null;
                record_id?: string | null;
                table_name: string;
                user_id?: string | null;
            };
            Update: {
                action?: string;
                created_at?: string;
                id?: string;
                new_data?: import("@bn/types").Json | null;
                old_data?: import("@bn/types").Json | null;
                record_id?: string | null;
                table_name?: string;
                user_id?: string | null;
            };
            Relationships: [];
        };
        biodata_keluarga: {
            Row: {
                created_at: string | null;
                detail_hubungan: string | null;
                hubungan: Database["public"]["Enums"]["hubungan_enum"];
                id: string;
                nama: string;
                nik: string | null;
                no_handphone: string | null;
                pekerjaan: string | null;
                pendidikan_keluarga: Database["public"]["Enums"]["pendidikan_keluarga_enum"] | null;
                penghasilan: string | null;
                siswa_id: string;
                status_hidup: boolean;
                tanggal_lahir: string | null;
                tempat_lahir: string | null;
                updated_at: string | null;
            };
            Insert: {
                created_at?: string | null;
                detail_hubungan?: string | null;
                hubungan: Database["public"]["Enums"]["hubungan_enum"];
                id?: string;
                nama: string;
                nik?: string | null;
                no_handphone?: string | null;
                pekerjaan?: string | null;
                pendidikan_keluarga?: Database["public"]["Enums"]["pendidikan_keluarga_enum"] | null;
                penghasilan?: string | null;
                siswa_id: string;
                status_hidup: boolean;
                tanggal_lahir?: string | null;
                tempat_lahir?: string | null;
                updated_at?: string | null;
            };
            Update: {
                created_at?: string | null;
                detail_hubungan?: string | null;
                hubungan?: Database["public"]["Enums"]["hubungan_enum"];
                id?: string;
                nama?: string;
                nik?: string | null;
                no_handphone?: string | null;
                pekerjaan?: string | null;
                pendidikan_keluarga?: Database["public"]["Enums"]["pendidikan_keluarga_enum"] | null;
                penghasilan?: string | null;
                siswa_id?: string;
                status_hidup?: boolean;
                tanggal_lahir?: string | null;
                tempat_lahir?: string | null;
                updated_at?: string | null;
            };
            Relationships: [{
                foreignKeyName: "biodata_keluarga_siswa_id_fkey";
                columns: ["siswa_id"];
                isOneToOne: false;
                referencedRelation: "biodata_siswa";
                referencedColumns: ["id"];
            }];
        };
        biodata_siswa: {
            Row: {
                agama: string | null;
                akun_pendaftar_id: string;
                akun_siswa_id: string | null;
                alamat: string | null;
                anak_ke: number | null;
                cita_cita: string | null;
                created_at: string | null;
                gender: Database["public"]["Enums"]["gender_enum"];
                golongan_darah: string | null;
                hobi: string | null;
                id: string;
                is_verified_siswa: boolean | null;
                jumlah_saudara: number | null;
                nama_lengkap: string;
                nik: string | null;
                nisn: string | null;
                no_kk: string | null;
                penyakit: string | null;
                status_rumah_id: string | null;
                tanggal_lahir: string | null;
                tempat_lahir: string | null;
                tinggal_bersama_id: string | null;
                updated_at: string | null;
            };
            Insert: {
                agama?: string | null;
                akun_pendaftar_id: string;
                akun_siswa_id?: string | null;
                alamat?: string | null;
                anak_ke?: number | null;
                cita_cita?: string | null;
                created_at?: string | null;
                gender: Database["public"]["Enums"]["gender_enum"];
                golongan_darah?: string | null;
                hobi?: string | null;
                id?: string;
                is_verified_siswa?: boolean | null;
                jumlah_saudara?: number | null;
                nama_lengkap: string;
                nik?: string | null;
                nisn?: string | null;
                no_kk?: string | null;
                penyakit?: string | null;
                status_rumah_id?: string | null;
                tanggal_lahir?: string | null;
                tempat_lahir?: string | null;
                tinggal_bersama_id?: string | null;
                updated_at?: string | null;
            };
            Update: {
                agama?: string | null;
                akun_pendaftar_id?: string;
                akun_siswa_id?: string | null;
                alamat?: string | null;
                anak_ke?: number | null;
                cita_cita?: string | null;
                created_at?: string | null;
                gender?: Database["public"]["Enums"]["gender_enum"];
                golongan_darah?: string | null;
                hobi?: string | null;
                id?: string;
                is_verified_siswa?: boolean | null;
                jumlah_saudara?: number | null;
                nama_lengkap?: string;
                nik?: string | null;
                nisn?: string | null;
                no_kk?: string | null;
                penyakit?: string | null;
                status_rumah_id?: string | null;
                tanggal_lahir?: string | null;
                tempat_lahir?: string | null;
                tinggal_bersama_id?: string | null;
                updated_at?: string | null;
            };
            Relationships: [{
                foreignKeyName: "biodata_siswa_status_rumah_id_fkey";
                columns: ["status_rumah_id"];
                isOneToOne: false;
                referencedRelation: "master_status_rumah";
                referencedColumns: ["code"];
            }, {
                foreignKeyName: "biodata_siswa_tinggal_bersama_id_fkey";
                columns: ["tinggal_bersama_id"];
                isOneToOne: false;
                referencedRelation: "master_tinggal_bersama";
                referencedColumns: ["code"];
            }];
        };
        dokumen: {
            Row: {
                created_at: string | null;
                file_path: string;
                form_pendaftaran_id: string;
                id: string;
                status_validasi: Database["public"]["Enums"]["status_validasi_enum"];
                tipe_dokumen_id: number;
                updated_at: string | null;
                validated_by: string | null;
            };
            Insert: {
                created_at?: string | null;
                file_path: string;
                form_pendaftaran_id: string;
                id?: string;
                status_validasi?: Database["public"]["Enums"]["status_validasi_enum"];
                tipe_dokumen_id: number;
                updated_at?: string | null;
                validated_by?: string | null;
            };
            Update: {
                created_at?: string | null;
                file_path?: string;
                form_pendaftaran_id?: string;
                id?: string;
                status_validasi?: Database["public"]["Enums"]["status_validasi_enum"];
                tipe_dokumen_id?: number;
                updated_at?: string | null;
                validated_by?: string | null;
            };
            Relationships: [{
                foreignKeyName: "dokumen_form_pendaftaran_id_fkey";
                columns: ["form_pendaftaran_id"];
                isOneToOne: false;
                referencedRelation: "form_pendaftaran";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "dokumen_tipe_dokumen_id_fkey";
                columns: ["tipe_dokumen_id"];
                isOneToOne: false;
                referencedRelation: "master_tipe_dokumen";
                referencedColumns: ["id"];
            }];
        };
        form_pendaftaran: {
            Row: {
                created_at: string | null;
                created_by: string;
                finalized_at: string | null;
                finalized_by: string | null;
                id: string;
                master_kelas_code: string | null;
                master_lembaga_code: string;
                master_step_id: number;
                siswa_id: string;
                status_keputusan_final_pendaftaran: string | null;
                tahun_ajaran_code: string;
                updated_at: string | null;
            };
            Insert: {
                created_at?: string | null;
                created_by: string;
                finalized_at?: string | null;
                finalized_by?: string | null;
                id?: string;
                master_kelas_code?: string | null;
                master_lembaga_code: string;
                master_step_id?: number;
                siswa_id: string;
                status_keputusan_final_pendaftaran?: string | null;
                tahun_ajaran_code: string;
                updated_at?: string | null;
            };
            Update: {
                created_at?: string | null;
                created_by?: string;
                finalized_at?: string | null;
                finalized_by?: string | null;
                id?: string;
                master_kelas_code?: string | null;
                master_lembaga_code?: string;
                master_step_id?: number;
                siswa_id?: string;
                status_keputusan_final_pendaftaran?: string | null;
                tahun_ajaran_code?: string;
                updated_at?: string | null;
            };
            Relationships: [{
                foreignKeyName: "form_pendaftaran_master_kelas_code_fkey";
                columns: ["master_kelas_code"];
                isOneToOne: false;
                referencedRelation: "master_kelas";
                referencedColumns: ["code"];
            }, {
                foreignKeyName: "form_pendaftaran_master_lembaga_code_fkey";
                columns: ["master_lembaga_code"];
                isOneToOne: false;
                referencedRelation: "master_lembaga";
                referencedColumns: ["code"];
            }, {
                foreignKeyName: "form_pendaftaran_master_step_id_fkey";
                columns: ["master_step_id"];
                isOneToOne: false;
                referencedRelation: "master_step";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "form_pendaftaran_siswa_id_fkey";
                columns: ["siswa_id"];
                isOneToOne: false;
                referencedRelation: "biodata_siswa";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "form_pendaftaran_tahun_ajaran_code_fkey";
                columns: ["tahun_ajaran_code"];
                isOneToOne: false;
                referencedRelation: "master_tahun_ajaran";
                referencedColumns: ["code"];
            }];
        };
        master_domains: {
            Row: {
                code: string;
                domain_description: string | null;
                domain_name: string;
                id: number;
            };
            Insert: {
                code: string;
                domain_description?: string | null;
                domain_name: string;
                id: number;
            };
            Update: {
                code?: string;
                domain_description?: string | null;
                domain_name?: string;
                id?: number;
            };
            Relationships: [];
        };
        master_kelas: {
            Row: {
                code: string;
                id: number;
                label: string;
            };
            Insert: {
                code: string;
                id: number;
                label: string;
            };
            Update: {
                code?: string;
                id?: number;
                label?: string;
            };
            Relationships: [];
        };
        master_lembaga: {
            Row: {
                code: string;
                id: number;
                label: string;
            };
            Insert: {
                code: string;
                id: number;
                label: string;
            };
            Update: {
                code?: string;
                id?: number;
                label?: string;
            };
            Relationships: [];
        };
        master_roles: {
            Row: {
                code: string;
                id: number;
                role_description: string | null;
                role_name: string;
            };
            Insert: {
                code: string;
                id: number;
                role_description?: string | null;
                role_name: string;
            };
            Update: {
                code?: string;
                id?: number;
                role_description?: string | null;
                role_name?: string;
            };
            Relationships: [];
        };
        master_status_rumah: {
            Row: {
                code: string;
                id: number;
                label: string;
            };
            Insert: {
                code: string;
                id: number;
                label: string;
            };
            Update: {
                code?: string;
                id?: number;
                label?: string;
            };
            Relationships: [];
        };
        master_step: {
            Row: {
                code: string;
                id: number;
                is_active: boolean;
                is_revisable: boolean;
                label: string;
                sort_order: number;
            };
            Insert: {
                code: string;
                id: number;
                is_active?: boolean;
                is_revisable?: boolean;
                label: string;
                sort_order: number;
            };
            Update: {
                code?: string;
                id?: number;
                is_active?: boolean;
                is_revisable?: boolean;
                label?: string;
                sort_order?: number;
            };
            Relationships: [];
        };
        master_tahun_ajaran: {
            Row: {
                code: string;
                created_at: string | null;
                created_by: string | null;
                id: number;
                is_active: boolean | null;
                semester: Database["public"]["Enums"]["semester_enum"];
                tahun_mulai: number;
                tahun_selesai: number;
            };
            Insert: {
                code: string;
                created_at?: string | null;
                created_by?: string | null;
                id?: never;
                is_active?: boolean | null;
                semester: Database["public"]["Enums"]["semester_enum"];
                tahun_mulai: number;
                tahun_selesai: number;
            };
            Update: {
                code?: string;
                created_at?: string | null;
                created_by?: string | null;
                id?: never;
                is_active?: boolean | null;
                semester?: Database["public"]["Enums"]["semester_enum"];
                tahun_mulai?: number;
                tahun_selesai?: number;
            };
            Relationships: [];
        };
        master_tinggal_bersama: {
            Row: {
                code: string;
                id: number;
                label: string;
            };
            Insert: {
                code: string;
                id: number;
                label: string;
            };
            Update: {
                code?: string;
                id?: number;
                label?: string;
            };
            Relationships: [];
        };
        master_tipe_dokumen: {
            Row: {
                code: string;
                id: number;
                label: string;
            };
            Insert: {
                code: string;
                id: number;
                label: string;
            };
            Update: {
                code?: string;
                id?: number;
                label?: string;
            };
            Relationships: [];
        };
        pembayaran: {
            Row: {
                amount: number;
                created_at: string | null;
                file_path: string;
                form_pendaftaran_id: string;
                id: string;
                paid_at: string | null;
                status_validasi: Database["public"]["Enums"]["status_validasi_enum"];
                updated_at: string | null;
                validated_by: string | null;
            };
            Insert: {
                amount: number;
                created_at?: string | null;
                file_path: string;
                form_pendaftaran_id: string;
                id?: string;
                paid_at?: string | null;
                status_validasi?: Database["public"]["Enums"]["status_validasi_enum"];
                updated_at?: string | null;
                validated_by?: string | null;
            };
            Update: {
                amount?: number;
                created_at?: string | null;
                file_path?: string;
                form_pendaftaran_id?: string;
                id?: string;
                paid_at?: string | null;
                status_validasi?: Database["public"]["Enums"]["status_validasi_enum"];
                updated_at?: string | null;
                validated_by?: string | null;
            };
            Relationships: [{
                foreignKeyName: "pembayaran_form_pendaftaran_id_fkey";
                columns: ["form_pendaftaran_id"];
                isOneToOne: true;
                referencedRelation: "form_pendaftaran";
                referencedColumns: ["id"];
            }];
        };
        pendidikan_siswa_sebelumnya: {
            Row: {
                alamat_sekolah_sebelumnya: string | null;
                created_at: string | null;
                has_previous_school: boolean | null;
                id: string;
                nama_sekolah_sebelumnya: string | null;
                npsn_sekolah_sebelumnya: string | null;
                siswa_id: string;
                updated_at: string | null;
            };
            Insert: {
                alamat_sekolah_sebelumnya?: string | null;
                created_at?: string | null;
                has_previous_school?: boolean | null;
                id?: string;
                nama_sekolah_sebelumnya?: string | null;
                npsn_sekolah_sebelumnya?: string | null;
                siswa_id: string;
                updated_at?: string | null;
            };
            Update: {
                alamat_sekolah_sebelumnya?: string | null;
                created_at?: string | null;
                has_previous_school?: boolean | null;
                id?: string;
                nama_sekolah_sebelumnya?: string | null;
                npsn_sekolah_sebelumnya?: string | null;
                siswa_id?: string;
                updated_at?: string | null;
            };
            Relationships: [{
                foreignKeyName: "pendidikan_siswa_sebelumnya_siswa_id_fkey";
                columns: ["siswa_id"];
                isOneToOne: true;
                referencedRelation: "biodata_siswa";
                referencedColumns: ["id"];
            }];
        };
        posts: {
            Row: {
                author: string;
                category: string;
                content: string | null;
                created_at: string | null;
                excerpt: string | null;
                featured_image: string | null;
                id: string;
                is_featured: boolean | null;
                post_status: string;
                published_at: string | null;
                published_by: string | null;
                slug: string;
                title: string;
                updated_at: string | null;
            };
            Insert: {
                author?: string;
                category?: string;
                content?: string | null;
                created_at?: string | null;
                excerpt?: string | null;
                featured_image?: string | null;
                id?: string;
                is_featured?: boolean | null;
                post_status?: string;
                published_at?: string | null;
                published_by?: string | null;
                slug: string;
                title: string;
                updated_at?: string | null;
            };
            Update: {
                author?: string;
                category?: string;
                content?: string | null;
                created_at?: string | null;
                excerpt?: string | null;
                featured_image?: string | null;
                id?: string;
                is_featured?: boolean | null;
                post_status?: string;
                published_at?: string | null;
                published_by?: string | null;
                slug?: string;
                title?: string;
                updated_at?: string | null;
            };
            Relationships: [];
        };
        profiles: {
            Row: {
                avatar_url: string | null;
                created_at: string | null;
                id: string;
                legacy_user_id: string | null;
                updated_at: string | null;
                username: string | null;
            };
            Insert: {
                avatar_url?: string | null;
                created_at?: string | null;
                id: string;
                legacy_user_id?: string | null;
                updated_at?: string | null;
                username?: string | null;
            };
            Update: {
                avatar_url?: string | null;
                created_at?: string | null;
                id?: string;
                legacy_user_id?: string | null;
                updated_at?: string | null;
                username?: string | null;
            };
            Relationships: [];
        };
        user_roles: {
            Row: {
                assigned_at: string | null;
                assigned_by: string | null;
                domain_id: number;
                role_id: number;
                suspended_at: string | null;
                suspended_by: string | null;
                user_id: string;
            };
            Insert: {
                assigned_at?: string | null;
                assigned_by?: string | null;
                domain_id: number;
                role_id: number;
                suspended_at?: string | null;
                suspended_by?: string | null;
                user_id: string;
            };
            Update: {
                assigned_at?: string | null;
                assigned_by?: string | null;
                domain_id?: number;
                role_id?: number;
                suspended_at?: string | null;
                suspended_by?: string | null;
                user_id?: string;
            };
            Relationships: [{
                foreignKeyName: "user_roles_domain_id_fkey";
                columns: ["domain_id"];
                isOneToOne: false;
                referencedRelation: "master_domains";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "user_roles_role_id_fkey";
                columns: ["role_id"];
                isOneToOne: false;
                referencedRelation: "master_roles";
                referencedColumns: ["id"];
            }];
        };
    };
    Views: { [_ in never]: never; };
    Functions: {
        activity_logger: {
            Args: {
                p_event: string;
                p_metadata?: import("@bn/types").Json;
                p_status?: string;
                p_user_id?: string;
            };
            Returns: undefined;
        };
        has_any_role: {
            Args: {
                p_roles: string[];
            };
            Returns: boolean;
        };
        has_role: {
            Args: {
                p_role: string;
            };
            Returns: boolean;
        };
        has_role_in_domain: {
            Args: {
                p_domain: string;
                p_role: string;
            };
            Returns: boolean;
        };
        is_admin_level: {
            Args: never;
            Returns: boolean;
        };
        is_owner_form: {
            Args: {
                p_form_id: string;
            };
            Returns: boolean;
        };
        is_owner_siswa: {
            Args: {
                p_siswa_id: string;
            };
            Returns: boolean;
        };
        is_superadmin: {
            Args: never;
            Returns: boolean;
        };
    };
    Enums: {
        gender_enum: "L" | "P";
        hubungan_enum: "AYAH" | "IBU" | "WALI";
        pendidikan_keluarga_enum: "SD" | "SMP" | "SMA" | "D3" | "S1" | "S2" | "S3" | "LAINNYA";
        semester_enum: "GANJIL" | "GENAP";
        status_validasi_enum: "PENDING" | "APPROVED" | "REVISION_REQUIRED";
    };
    CompositeTypes: { [_ in never]: never; };
}, {
    PostgrestVersion: "14.5";
}>;
//# sourceMappingURL=admin.d.ts.map