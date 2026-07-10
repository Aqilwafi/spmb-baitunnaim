
drop trigger if exists tr_generate_tahun_ajaran_metadata
on public.master_tahun_ajaran;

create trigger tr_generate_tahun_ajaran_metadata
before insert or update of start_year, end_year, semester
on public.master_tahun_ajaran
for each row
execute function public.fn_generate_tahun_ajaran_metadata();