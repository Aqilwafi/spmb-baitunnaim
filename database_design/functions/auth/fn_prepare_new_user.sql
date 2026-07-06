create or replace function public.fn_prepare_new_user()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    -- pastikan username selalu tersedia
    new.raw_user_meta_data :=
        coalesce(new.raw_user_meta_data, '{}'::jsonb)
        || jsonb_build_object(
            'username',
            coalesce(
                nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
                split_part(new.email, '@', 1)
            )
        );

    return new;
end;
$$;