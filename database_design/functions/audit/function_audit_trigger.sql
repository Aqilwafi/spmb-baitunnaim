create or replace function public.audit_trigger()
returns trigger 
language plpgsql
security definer
set search_path = public, pg_catalog, auth
as $$
declare
    v_user_id uuid;
begin
    -- 1. 🚫 skip self-audit (hindari infinite loop)
    if tg_table_name in ('audit_trail', 'activity_logs') then
        if tg_op = 'DELETE' then return old; else return new; end if;
    end if;

    -- 2. 🚫 skip update tanpa perubahan data sama sekali
    if tg_op = 'UPDATE' and new is not distinct from old then
        return new;
    end if;

    -- 3. ambil id user yang sedang login (bisa null jika lewat migration/backend script)
    v_user_id := auth.uid();

    -- 4. 🛡️ proses pencatatan ke tabel audit
    begin
        insert into public.audit_trail (
            user_id,
            table_name,
            record_id,
            action,
            old_data,
            new_data
        )
        values (
            v_user_id,
            tg_table_name,
            coalesce(new.id, old.id),
            tg_op::public.audit_operation_enum,
            case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) else null end,
            case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else null end
        );
    exception
        when others then
            null;
    end;

    -- 5. return akhir sebagai penutup fungsi trigger after
    if tg_op = 'DELETE' then 
        return old; 
    else 
        return new; 
    end if;
end;
$$;

-- 🔒 langkah wajib: amankan fungsi dari celah api luar
revoke execute on function public.audit_trigger() from public;
revoke execute on function public.audit_trigger() from authenticated;
revoke execute on function public.audit_trigger() from anon;

-- izin eksekusi hanya diberikan ke internal database (postgres) agar trigger tetap bekerja
grant execute on function public.audit_trigger() to postgres;

create trigger tr_audit_biodata_siswa
after insert or update or delete
on biodata_siswa
for each row
execute function public.audit_trigger();

create trigger tr_audit_biodata_siswa_detail
after insert or update or delete
on biodata_siswa_detail
for each row
execute function public.audit_trigger();

create trigger tr_audit_biodata_keluarga
after insert or update or delete
on biodata_keluarga
for each row
execute function public.audit_trigger();

create trigger tr_audit_form_pendaftaran
after insert or update or delete
on form_pendaftaran
for each row
execute function public.audit_trigger();

create trigger tr_audit_dokumen
after insert or update or delete
on dokumen
for each row
execute function public.audit_trigger();

create trigger tr_audit_pembayaran
after insert or update or delete
on pembayaran
for each row
execute function public.audit_trigger();

create trigger tr_audit_pendidikan_siswa_sebelumnya
after insert or update or delete
on pendidikan_siswa_sebelumnya
for each row
execute function public.audit_trigger();

-- publikasi
create trigger tr_audit_posts
after insert or update or delete
on posts
for each row
execute function public.audit_trigger();

-- authority
create trigger tr_audit_profiles
after insert or update or delete
on profiles
for each row
execute function public.audit_trigger();

create trigger tr_audit_user_roles
after insert or update or delete
on user_roles
for each row
execute function public.audit_trigger();