-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.master_roles (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE CHECK (code::text = upper(code::text)),
  label character varying NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  username character varying,
  phone text UNIQUE,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role_id smallint NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.master_roles(id)
);
CREATE TABLE public.master_lembaga (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE CHECK (code::text = upper(code::text)),
  label character varying NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_lembaga_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_kelas (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE CHECK (code::text = upper(code::text)),
  label character varying NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_kelas_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_tahun_ajaran (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  semester USER-DEFINED NOT NULL,
  start_year integer NOT NULL,
  end_year integer NOT NULL,
  code character varying NOT NULL UNIQUE,
  label character varying NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_tahun_ajaran_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_step (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  step_order smallint NOT NULL,
  code character varying NOT NULL UNIQUE CHECK (code::text = upper(code::text)),
  label character varying NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_step_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_tipe_dokumen (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE CHECK (code::text = upper(code::text)),
  label character varying NOT NULL,
  description text,
  is_required boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_tipe_dokumen_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_status_rumah (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE CHECK (code::text = upper(code::text)),
  label character varying NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_status_rumah_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_tinggal_bersama (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE,
  label character varying NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT master_tinggal_bersama_pkey PRIMARY KEY (id)
);
CREATE TABLE public.master_categories (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  label character varying NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT master_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.biodata_siswa (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL,
  nik text NOT NULL UNIQUE,
  nisn text UNIQUE,
  nama_lengkap character varying NOT NULL,
  tempat_lahir character varying NOT NULL,
  tanggal_lahir date NOT NULL,
  jenis_kelamin USER-DEFINED NOT NULL,
  lembaga_id smallint NOT NULL,
  kelas_id smallint,
  catatan text,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT biodata_siswa_pkey PRIMARY KEY (id),
  CONSTRAINT biodata_siswa_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.profiles(id),
  CONSTRAINT biodata_siswa_lembaga_id_fkey FOREIGN KEY (lembaga_id) REFERENCES public.master_lembaga(id),
  CONSTRAINT biodata_siswa_kelas_id_fkey FOREIGN KEY (kelas_id) REFERENCES public.master_kelas(id)
);
CREATE TABLE public.biodata_siswa_detail (
  id uuid NOT NULL,
  no_kk text NOT NULL,
  agama USER-DEFINED NOT NULL DEFAULT 'ISLAM'::agama_enum,
  anak_ke integer NOT NULL CHECK (anak_ke >= 1),
  jumlah_saudara integer NOT NULL CHECK (jumlah_saudara >= 0),
  alamat text NOT NULL,
  tinggal_bersama_id smallint NOT NULL,
  status_rumah_id smallint NOT NULL,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT biodata_siswa_detail_pkey PRIMARY KEY (id),
  CONSTRAINT biodata_siswa_detail_id_fkey FOREIGN KEY (id) REFERENCES public.biodata_siswa(id),
  CONSTRAINT biodata_siswa_detail_tinggal_bersama_id_fkey FOREIGN KEY (tinggal_bersama_id) REFERENCES public.master_tinggal_bersama(id),
  CONSTRAINT biodata_siswa_detail_status_rumah_id_fkey FOREIGN KEY (status_rumah_id) REFERENCES public.master_status_rumah(id)
);
CREATE TABLE public.biodata_keluarga (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  biodata_siswa_id uuid NOT NULL,
  relation_type USER-DEFINED NOT NULL,
  detail_relation_type character varying,
  nama_lengkap character varying NOT NULL,
  nik text UNIQUE,
  status_hidup USER-DEFINED NOT NULL DEFAULT 'HIDUP'::life_status_enum,
  tempat_lahir character varying,
  tanggal_lahir date,
  pekerjaan character varying,
  pendidikan_terakhir character varying,
  no_hp text,
  alamat text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT biodata_keluarga_pkey PRIMARY KEY (id),
  CONSTRAINT biodata_keluarga_biodata_siswa_id_fkey FOREIGN KEY (biodata_siswa_id) REFERENCES public.biodata_siswa(id)
);
CREATE TABLE public.pendidikan_siswa_sebelumnya (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  biodata_siswa_id uuid NOT NULL UNIQUE,
  nama_sekolah character varying,
  npsn text,
  alamat_sekolah text,
  tahun_lulus smallint CHECK (tahun_lulus >= 1900 AND tahun_lulus <= 2100),
  nilai_rata_rata numeric CHECK (nilai_rata_rata >= 0::numeric AND nilai_rata_rata <= 100::numeric),
  catatan text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT pendidikan_siswa_sebelumnya_pkey PRIMARY KEY (id),
  CONSTRAINT pendidikan_siswa_sebelumnya_biodata_siswa_id_fkey FOREIGN KEY (biodata_siswa_id) REFERENCES public.biodata_siswa(id)
);
CREATE TABLE public.form_pendaftaran (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  biodata_siswa_id uuid NOT NULL,
  pendaftar_id uuid,
  tahun_ajaran_id smallint NOT NULL,
  step_id smallint,
  registration_status USER-DEFINED NOT NULL DEFAULT 'DRAFT'::registration_form_status_enum,
  admission_status USER-DEFINED NOT NULL DEFAULT 'PROCESS'::admission_status_enum,
  finalized_by uuid,
  finalized_at timestamp with time zone,
  decided_by uuid,
  decided_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT form_pendaftaran_pkey PRIMARY KEY (id),
  CONSTRAINT form_pendaftaran_biodata_siswa_id_fkey FOREIGN KEY (biodata_siswa_id) REFERENCES public.biodata_siswa(id),
  CONSTRAINT form_pendaftaran_pendaftar_id_fkey FOREIGN KEY (pendaftar_id) REFERENCES public.profiles(id),
  CONSTRAINT form_pendaftaran_tahun_ajaran_id_fkey FOREIGN KEY (tahun_ajaran_id) REFERENCES public.master_tahun_ajaran(id),
  CONSTRAINT form_pendaftaran_step_id_fkey FOREIGN KEY (step_id) REFERENCES public.master_step(id),
  CONSTRAINT form_pendaftaran_finalized_by_fkey FOREIGN KEY (finalized_by) REFERENCES public.profiles(id),
  CONSTRAINT form_pendaftaran_decided_by_fkey FOREIGN KEY (decided_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.pembayaran (
  id uuid NOT NULL,
  payment_type character varying NOT NULL DEFAULT 'FORMULIR'::character varying,
  nominal numeric CHECK (nominal >= 0::numeric),
  tanggal_transfer timestamp with time zone,
  bank_tujuan character varying,
  nama_pengirim character varying,
  bukti_pembayaran_url text NOT NULL,
  payment_status USER-DEFINED NOT NULL DEFAULT 'SUBMITTED'::payment_status_enum,
  catatan_verifikasi text,
  verified_by uuid,
  verified_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT pembayaran_pkey PRIMARY KEY (id),
  CONSTRAINT pembayaran_id_fkey FOREIGN KEY (id) REFERENCES public.form_pendaftaran(id),
  CONSTRAINT pembayaran_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.dokumen (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  form_pendaftaran_id uuid NOT NULL,
  tipe_dokumen_id smallint NOT NULL,
  file_url text NOT NULL,
  document_status USER-DEFINED NOT NULL DEFAULT 'SUBMITTED'::document_status_enum,
  catatan_verifikasi text,
  verified_by uuid,
  verified_at timestamp with time zone,
  uploaded_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT dokumen_pkey PRIMARY KEY (id),
  CONSTRAINT dokumen_form_pendaftaran_id_fkey FOREIGN KEY (form_pendaftaran_id) REFERENCES public.form_pendaftaran(id),
  CONSTRAINT dokumen_tipe_dokumen_id_fkey FOREIGN KEY (tipe_dokumen_id) REFERENCES public.master_tipe_dokumen(id),
  CONSTRAINT dokumen_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.profiles(id)
);  