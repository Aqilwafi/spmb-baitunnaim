export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      biodata_keluarga: {
        Row: {
          alamat: string | null
          biodata_siswa_id: string
          created_at: string
          deleted_at: string | null
          detail_relation_type: string | null
          id: string
          nama_lengkap: string
          nik: string | null
          no_hp: string | null
          pekerjaan: string | null
          pendidikan_terakhir: string | null
          penghasilan: string | null
          relation_type: Database["public"]["Enums"]["family_relation_enum"]
          status_hidup: Database["public"]["Enums"]["life_status_enum"]
          tanggal_lahir: string | null
          tempat_lahir: string | null
          updated_at: string
        }
        Insert: {
          alamat?: string | null
          biodata_siswa_id: string
          created_at?: string
          deleted_at?: string | null
          detail_relation_type?: string | null
          id?: string
          nama_lengkap: string
          nik?: string | null
          no_hp?: string | null
          pekerjaan?: string | null
          pendidikan_terakhir?: string | null
          penghasilan?: string | null
          relation_type: Database["public"]["Enums"]["family_relation_enum"]
          status_hidup?: Database["public"]["Enums"]["life_status_enum"]
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          updated_at?: string
        }
        Update: {
          alamat?: string | null
          biodata_siswa_id?: string
          created_at?: string
          deleted_at?: string | null
          detail_relation_type?: string | null
          id?: string
          nama_lengkap?: string
          nik?: string | null
          no_hp?: string | null
          pekerjaan?: string | null
          pendidikan_terakhir?: string | null
          penghasilan?: string | null
          relation_type?: Database["public"]["Enums"]["family_relation_enum"]
          status_hidup?: Database["public"]["Enums"]["life_status_enum"]
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "biodata_keluarga_biodata_siswa_id_fkey"
            columns: ["biodata_siswa_id"]
            isOneToOne: false
            referencedRelation: "biodata_siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      biodata_siswa: {
        Row: {
          catatan: string | null
          created_at: string
          deleted_at: string | null
          id: string
          jenis_kelamin: Database["public"]["Enums"]["gender_enum"]
          kelas_id: number | null
          lembaga_id: number
          nama_lengkap: string
          nik: string
          nisn: string | null
          owner_user_id: string
          tanggal_lahir: string
          tempat_lahir: string
          updated_at: string
        }
        Insert: {
          catatan?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          jenis_kelamin: Database["public"]["Enums"]["gender_enum"]
          kelas_id?: number | null
          lembaga_id: number
          nama_lengkap: string
          nik: string
          nisn?: string | null
          owner_user_id: string
          tanggal_lahir: string
          tempat_lahir: string
          updated_at?: string
        }
        Update: {
          catatan?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          jenis_kelamin?: Database["public"]["Enums"]["gender_enum"]
          kelas_id?: number | null
          lembaga_id?: number
          nama_lengkap?: string
          nik?: string
          nisn?: string | null
          owner_user_id?: string
          tanggal_lahir?: string
          tempat_lahir?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "biodata_siswa_kelas_id_fkey"
            columns: ["kelas_id"]
            isOneToOne: false
            referencedRelation: "master_kelas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "biodata_siswa_lembaga_id_fkey"
            columns: ["lembaga_id"]
            isOneToOne: false
            referencedRelation: "master_lembaga"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "biodata_siswa_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      biodata_siswa_detail: {
        Row: {
          agama: Database["public"]["Enums"]["agama_enum"]
          alamat: string
          anak_ke: number
          cita_cita: string
          created_at: string
          deleted_at: string | null
          hobi: string
          id: string
          jumlah_saudara: number
          no_kk: string
          penyakit: string | null
          status_rumah_id: number
          tinggal_bersama_id: number
          updated_at: string
        }
        Insert: {
          agama?: Database["public"]["Enums"]["agama_enum"]
          alamat: string
          anak_ke: number
          cita_cita: string
          created_at?: string
          deleted_at?: string | null
          hobi: string
          id: string
          jumlah_saudara: number
          no_kk: string
          penyakit?: string | null
          status_rumah_id: number
          tinggal_bersama_id: number
          updated_at?: string
        }
        Update: {
          agama?: Database["public"]["Enums"]["agama_enum"]
          alamat?: string
          anak_ke?: number
          cita_cita?: string
          created_at?: string
          deleted_at?: string | null
          hobi?: string
          id?: string
          jumlah_saudara?: number
          no_kk?: string
          penyakit?: string | null
          status_rumah_id?: number
          tinggal_bersama_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "biodata_siswa_detail_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "biodata_siswa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "biodata_siswa_detail_status_rumah_id_fkey"
            columns: ["status_rumah_id"]
            isOneToOne: false
            referencedRelation: "master_status_rumah"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "biodata_siswa_detail_tinggal_bersama_id_fkey"
            columns: ["tinggal_bersama_id"]
            isOneToOne: false
            referencedRelation: "master_tinggal_bersama"
            referencedColumns: ["id"]
          },
        ]
      }
      dokumen: {
        Row: {
          catatan_verifikasi: string | null
          created_at: string
          deleted_at: string | null
          document_status: Database["public"]["Enums"]["document_status_enum"]
          file_url: string
          form_pendaftaran_id: string
          id: string
          tipe_dokumen_id: number
          updated_at: string
          uploaded_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          catatan_verifikasi?: string | null
          created_at?: string
          deleted_at?: string | null
          document_status?: Database["public"]["Enums"]["document_status_enum"]
          file_url: string
          form_pendaftaran_id: string
          id?: string
          tipe_dokumen_id: number
          updated_at?: string
          uploaded_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          catatan_verifikasi?: string | null
          created_at?: string
          deleted_at?: string | null
          document_status?: Database["public"]["Enums"]["document_status_enum"]
          file_url?: string
          form_pendaftaran_id?: string
          id?: string
          tipe_dokumen_id?: number
          updated_at?: string
          uploaded_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dokumen_form_pendaftaran_id_fkey"
            columns: ["form_pendaftaran_id"]
            isOneToOne: false
            referencedRelation: "form_pendaftaran"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dokumen_tipe_dokumen_id_fkey"
            columns: ["tipe_dokumen_id"]
            isOneToOne: false
            referencedRelation: "master_tipe_dokumen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dokumen_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      form_pendaftaran: {
        Row: {
          admission_status: Database["public"]["Enums"]["admission_status_enum"]
          biodata_siswa_id: string
          created_at: string
          decided_at: string | null
          decided_by: string | null
          deleted_at: string | null
          finalized_at: string | null
          finalized_by: string | null
          id: string
          pendaftar_id: string | null
          registration_status: Database["public"]["Enums"]["registration_form_status_enum"]
          step_id: number | null
          tahun_ajaran_id: number
          updated_at: string
        }
        Insert: {
          admission_status?: Database["public"]["Enums"]["admission_status_enum"]
          biodata_siswa_id: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          deleted_at?: string | null
          finalized_at?: string | null
          finalized_by?: string | null
          id?: string
          pendaftar_id?: string | null
          registration_status?: Database["public"]["Enums"]["registration_form_status_enum"]
          step_id?: number | null
          tahun_ajaran_id: number
          updated_at?: string
        }
        Update: {
          admission_status?: Database["public"]["Enums"]["admission_status_enum"]
          biodata_siswa_id?: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          deleted_at?: string | null
          finalized_at?: string | null
          finalized_by?: string | null
          id?: string
          pendaftar_id?: string | null
          registration_status?: Database["public"]["Enums"]["registration_form_status_enum"]
          step_id?: number | null
          tahun_ajaran_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_pendaftaran_biodata_siswa_id_fkey"
            columns: ["biodata_siswa_id"]
            isOneToOne: false
            referencedRelation: "biodata_siswa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_pendaftaran_decided_by_fkey"
            columns: ["decided_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_pendaftaran_finalized_by_fkey"
            columns: ["finalized_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_pendaftaran_pendaftar_id_fkey"
            columns: ["pendaftar_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_pendaftaran_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "master_step"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_pendaftaran_tahun_ajaran_id_fkey"
            columns: ["tahun_ajaran_id"]
            isOneToOne: false
            referencedRelation: "master_tahun_ajaran"
            referencedColumns: ["id"]
          },
        ]
      }
      master_categories: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean
          label: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      master_kelas: {
        Row: {
          code: string
          created_at: string
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_lembaga: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_roles: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_status_rumah: {
        Row: {
          code: string
          created_at: string
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_step: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          label: string
          step_order: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label: string
          step_order: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          label?: string
          step_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      master_tahun_ajaran: {
        Row: {
          code: string
          created_at: string
          end_year: number
          id: number
          is_active: boolean
          label: string
          semester: Database["public"]["Enums"]["semester_enum"]
          start_year: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          end_year: number
          id?: never
          is_active?: boolean
          label: string
          semester: Database["public"]["Enums"]["semester_enum"]
          start_year: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          end_year?: number
          id?: never
          is_active?: boolean
          label?: string
          semester?: Database["public"]["Enums"]["semester_enum"]
          start_year?: number
          updated_at?: string
        }
        Relationships: []
      }
      master_tinggal_bersama: {
        Row: {
          code: string
          created_at: string
          id: number
          is_active: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: never
          is_active?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: never
          is_active?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      master_tipe_dokumen: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          is_required: boolean
          label: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          is_required?: boolean
          label: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          is_required?: boolean
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      pembayaran: {
        Row: {
          bank_tujuan: string | null
          bukti_pembayaran_url: string
          catatan_verifikasi: string | null
          created_at: string
          deleted_at: string | null
          id: string
          nama_pengirim: string | null
          nominal: number | null
          payment_status: Database["public"]["Enums"]["payment_status_enum"]
          payment_type: string
          tanggal_transfer: string | null
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          bank_tujuan?: string | null
          bukti_pembayaran_url: string
          catatan_verifikasi?: string | null
          created_at?: string
          deleted_at?: string | null
          id: string
          nama_pengirim?: string | null
          nominal?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status_enum"]
          payment_type?: string
          tanggal_transfer?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          bank_tujuan?: string | null
          bukti_pembayaran_url?: string
          catatan_verifikasi?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          nama_pengirim?: string | null
          nominal?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status_enum"]
          payment_type?: string
          tanggal_transfer?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pembayaran_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "form_pendaftaran"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pembayaran_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pendidikan_siswa_sebelumnya: {
        Row: {
          alamat_sekolah: string | null
          biodata_siswa_id: string
          catatan: string | null
          created_at: string
          deleted_at: string | null
          id: string
          nama_sekolah: string | null
          nilai_rata_rata: number | null
          npsn: string | null
          tahun_lulus: number | null
          updated_at: string
        }
        Insert: {
          alamat_sekolah?: string | null
          biodata_siswa_id: string
          catatan?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          nama_sekolah?: string | null
          nilai_rata_rata?: number | null
          npsn?: string | null
          tahun_lulus?: number | null
          updated_at?: string
        }
        Update: {
          alamat_sekolah?: string | null
          biodata_siswa_id?: string
          catatan?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          nama_sekolah?: string | null
          nilai_rata_rata?: number | null
          npsn?: string | null
          tahun_lulus?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pendidikan_siswa_sebelumnya_biodata_siswa_id_fkey"
            columns: ["biodata_siswa_id"]
            isOneToOne: true
            referencedRelation: "biodata_siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      post_images: {
        Row: {
          image_path: string
          is_hero: boolean
          post_id: number
        }
        Insert: {
          image_path: string
          is_hero?: boolean
          post_id: number
        }
        Update: {
          image_path?: string
          is_hero?: boolean
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tag: {
        Row: {
          post_id: number
          tag_id: number
        }
        Insert: {
          post_id: number
          tag_id: number
        }
        Update: {
          post_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_tag_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          category_id: number | null
          content: string
          created_at: string | null
          created_by: string | null
          id: number
          is_active: boolean | null
          judul: string
          lembaga_id: number | null
          penulis: string
          ringkasan: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"] | null
          updated_at: string | null
        }
        Insert: {
          category_id?: number | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: never
          is_active?: boolean | null
          judul: string
          lembaga_id?: number | null
          penulis: string
          ringkasan?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"] | null
          updated_at?: string | null
        }
        Update: {
          category_id?: number | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: never
          is_active?: boolean | null
          judul?: string
          lembaga_id?: number | null
          penulis?: string
          ringkasan?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "master_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_lembaga_id_fkey"
            columns: ["lembaga_id"]
            isOneToOne: false
            referencedRelation: "master_lembaga"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          phone: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: number
          is_active: boolean | null
          label: string
        }
        Insert: {
          id?: never
          is_active?: boolean | null
          label: string
        }
        Update: {
          id?: never
          is_active?: boolean | null
          label?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          role_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          role_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          role_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "master_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_can_manage_publikasi: { Args: never; Returns: boolean }
      fn_can_manage_spmb: { Args: never; Returns: boolean }
      fn_can_manage_user_role: {
        Args: { p_target_role_id: number }
        Returns: boolean
      }
      fn_can_read_master_data: {
        Args: { p_is_active: boolean }
        Returns: boolean
      }
      fn_is_admin_email: { Args: { check_email: string }; Returns: boolean }
      fn_is_administrator: { Args: never; Returns: boolean }
      fn_is_high_level_admin: { Args: never; Returns: boolean }
      fn_is_owner_form_data: {
        Args: { p_form_pendaftaran_id: string }
        Returns: boolean
      }
      fn_is_owner_siswa_data: {
        Args: { p_biodata_siswa_id: string }
        Returns: boolean
      }
      fn_is_superadmin: { Args: never; Returns: boolean }
      fn_rpc_get_form_cards: {
        Args: { p_tahun_ajaran_id: number }
        Returns: {
          admission_status: Database["public"]["Enums"]["admission_status_enum"]
          id: string
          kelas_label: string
          lembaga_label: string
          nama_lengkap: string
          registration_status: Database["public"]["Enums"]["registration_form_status_enum"]
          step_label: string
          updated_at: string
        }[]
      }
      fn_rpc_get_form_detail: {
        Args: { p_form_id: string; p_tahun_ajaran_id: number }
        Returns: {
          admission_status: Database["public"]["Enums"]["admission_status_enum"]
          biodata_siswa_id: string
          id: string
          nama_lengkap: string
          pendaftar_id: string
          step_id: number
        }[]
      }
      fn_rpc_get_init_form_step_data: {
        Args: { p_form_id: string; p_tahun_ajaran_id: number }
        Returns: {
          jenis_kelamin: Database["public"]["Enums"]["gender_enum"]
          kelas: string
          lembaga_tujuan: string
          nama_lengkap: string
          nik: string
          tanggal_lahir: string
          tempat_lahir: string
        }[]
      }
      fn_rpc_init_form: {
        Args: {
          p_gender: Database["public"]["Enums"]["gender_enum"]
          p_kelas_id?: number
          p_lembaga_id: number
          p_nama_lengkap: string
          p_nik: unknown
          p_step_id: number
          p_tahun_ajaran_id: number
          p_tanggal_lahir: string
          p_tempat_lahir: string
        }
        Returns: Json
      }
      fn_rpc_is_guardian_required: {
        Args: { p_biodata_siswa_id: string }
        Returns: boolean
      }
      fn_validate_guardian_requirement: {
        Args: { p_biodata_siswa_id: string }
        Returns: undefined
      }
    }
    Enums: {
      admission_status_enum: "PROCESS" | "AWAITING" | "ACCEPTED" | "REJECTED"
      agama_enum:
        | "ISLAM"
        | "KRISTEN"
        | "KATOLIK"
        | "BUDHA"
        | "HINDU"
        | "KONGHUCHU"
      audit_operation_enum: "INSERT" | "UPDATE" | "SOFT_DELETE" | "DELETE"
      document_status_enum: "PENDING" | "SUBMITTED" | "VERIFIED" | "REJECTED"
      family_relation_enum: "AYAH" | "IBU" | "WALI"
      gender_enum: "MALE" | "FEMALE" | "OTHER"
      life_status_enum: "HIDUP" | "MENINGGAL" | "LAINNYA"
      payment_status_enum: "PENDING" | "SUBMITTED" | "VERIFIED" | "REJECTED"
      post_status: "DRAFT" | "PUBLISHED"
      registration_form_status_enum: "DRAFT" | "FINALIZED"
      semester_enum: "GANJIL" | "GENAP"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      admission_status_enum: ["PROCESS", "AWAITING", "ACCEPTED", "REJECTED"],
      agama_enum: [
        "ISLAM",
        "KRISTEN",
        "KATOLIK",
        "BUDHA",
        "HINDU",
        "KONGHUCHU",
      ],
      audit_operation_enum: ["INSERT", "UPDATE", "SOFT_DELETE", "DELETE"],
      document_status_enum: ["PENDING", "SUBMITTED", "VERIFIED", "REJECTED"],
      family_relation_enum: ["AYAH", "IBU", "WALI"],
      gender_enum: ["MALE", "FEMALE", "OTHER"],
      life_status_enum: ["HIDUP", "MENINGGAL", "LAINNYA"],
      payment_status_enum: ["PENDING", "SUBMITTED", "VERIFIED", "REJECTED"],
      post_status: ["DRAFT", "PUBLISHED"],
      registration_form_status_enum: ["DRAFT", "FINALIZED"],
      semester_enum: ["GANJIL", "GENAP"],
    },
  },
} as const
