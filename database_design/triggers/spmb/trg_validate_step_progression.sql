
-- Pasang Trigger
create trigger trg_validate_step_progression
  before update of step_id
  on public.form_pendaftaran
  for each row
  execute function public.fn_validate_step_progression();