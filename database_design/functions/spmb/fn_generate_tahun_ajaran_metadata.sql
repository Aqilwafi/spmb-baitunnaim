create or replace function public.fn_generate_tahun_ajaran_metadata()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    new.code :=
        new.start_year::text
        || '-'
        || new.end_year::text
        || '_'
        || new.semester::text;

    new.label :=
        new.start_year::text
        || '/'
        || new.end_year::text
        || ' - '
        || initcap(lower(new.semester::text));

    return new;
end;
$$;