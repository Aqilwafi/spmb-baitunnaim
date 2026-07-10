create or replace function public.can_read_master_data(
    p_is_active boolean
)
returns boolean
language sql
stable
set search_path = public
as $$
    select
        public.is_high_level_admin()
        or (
            auth.uid() is not null 
            and p_is_active
        );
$$;