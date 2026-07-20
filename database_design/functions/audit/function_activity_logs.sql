create or replace function public.activity_logger(
    p_event text,
    p_status text default 'success',
    p_metadata JSONB default '{}'::jsonb,
    p_user_id UUID default null
)
language plpgsql
security definer
set search_path = public, pg_catalog, auth
return void as $$
begin
    insert into public.activity_logs (
        user_id,
        event,
        status,
        metadata
    )
    values (
        coalesce(p_user_id, auth.uid()),
        p_event,
        p_status,
        p_metadata
    );
end;
$$

-- LANGKAH PENGAMANAN TAMBAHAN (Wajib):
-- 1. Cabut hak akses dari semua orang di internet (anon & authenticated)
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) FROM anon;

-- 2. Berikan izin eksekusi HANYA kepada postgres (internal system) dan service_role (backend)
GRANT EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) TO postgres;
GRANT EXECUTE ON FUNCTION public.activity_logger(TEXT, TEXT, JSONB, UUID) TO service_role;

create or replace function public.on_auth_user_action()
returns trigger 
language plpgsql
set search_path = public, pg_catalog, auth
AS $$
begin
    if tg_op = 'INSERT' then
        perform public.activity_logger(
            'USER_SIGNUP', 
            'success', 
            jsonb_build_object('email', NEW.email), 
            NEW.id
        );
    elsif tg_op = 'UPDATE' then
        if OLD.last_sign_in_at is distinct from NEW.last_sign_in_at then
            perform public.activity_logger(
                'USER_LOGIN', 
                'success', 
                jsonb_build_object(
                    'email', NEW.email, 
                    'ip_address', auth.auth_metadata() ->> 'ip'
                ), 
                NEW.id
            );
        end if;
    end if;
    return NEW;
end;
$$;

create trigger on_auth_user_action_trigger
after insert or update on auth.users
for each row execute public.on_auth_user_action();

  -- 1. Cabut izin eksekusi dari publik dan role bawaan API Supabase
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.on_auth_user_action() FROM anon;

-- 2. Berikan izin eksekusi HANYA kepada sistem internal (postgres)
GRANT EXECUTE ON FUNCTION public.on_auth_user_action() TO postgres;