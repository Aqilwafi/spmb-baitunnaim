-- ============================================================
-- File   : other/extension.sql
-- Purpose: PostgreSQL extensions yang dibutuhkan skema PPDB
-- Order  : Jalankan paling pertama, sebelum table & enum
-- ============================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()