create table if not exists public.student_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  role text not null default 'student' check (role in ('student', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.schedule_slots (
  id uuid primary key default gen_random_uuid(),
  weekday smallint not null check (weekday between 1 and 5),
  starts_at time without time zone not null,
  occupant_name text,
  student_id uuid references public.student_profiles (id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (weekday, starts_at),
  check (
    (student_id is null and occupant_name is null)
    or occupant_name is not null
  )
);

create table if not exists public.student_portal_settings (
  id boolean primary key default true check (id),
  telegram_invite_url text not null
    check (telegram_invite_url like 'https://t.me/%'),
  updated_at timestamptz not null default now()
);

create index if not exists schedule_slots_weekday_time_idx
  on public.schedule_slots (weekday, starts_at);

alter table public.student_profiles enable row level security;
alter table public.schedule_slots enable row level security;
alter table public.student_portal_settings enable row level security;

create or replace function public.is_schedule_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.student_profiles
    where id = (select auth.uid())
      and role = 'admin'
      and is_active
  );
$$;

create or replace function public.is_active_student()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.student_profiles
    where id = (select auth.uid())
      and role = 'student'
      and is_active
  );
$$;

drop policy if exists "Students can read their profile" on public.student_profiles;
create policy "Students can read their profile"
  on public.student_profiles
  for select
  to authenticated
  using (id = (select auth.uid()) or (select public.is_schedule_admin()));

drop policy if exists "Students can update their display name" on public.student_profiles;
create policy "Students can update their display name"
  on public.student_profiles
  for update
  to authenticated
  using (
    id = (select auth.uid())
    and role = 'student'
    and is_active
  )
  with check (
    id = (select auth.uid())
    and role = 'student'
    and is_active
  );

drop policy if exists "Active students can read the schedule" on public.schedule_slots;
create policy "Active students can read the schedule"
  on public.schedule_slots
  for select
  to authenticated
  using (
    (select public.is_active_student())
    or (select public.is_schedule_admin())
  );

drop policy if exists "Admins can manage the schedule" on public.schedule_slots;
create policy "Admins can manage the schedule"
  on public.schedule_slots
  for all
  to authenticated
  using ((select public.is_schedule_admin()))
  with check ((select public.is_schedule_admin()));

drop policy if exists "Active students can read portal settings" on public.student_portal_settings;
create policy "Active students can read portal settings"
  on public.student_portal_settings
  for select
  to authenticated
  using (
    (select public.is_active_student())
    or (select public.is_schedule_admin())
  );

drop policy if exists "Admins can manage portal settings" on public.student_portal_settings;
create policy "Admins can manage portal settings"
  on public.student_portal_settings
  for all
  to authenticated
  using ((select public.is_schedule_admin()))
  with check ((select public.is_schedule_admin()));

grant select on public.student_profiles to authenticated;
grant update (display_name) on public.student_profiles to authenticated;
grant select on public.schedule_slots to authenticated;
grant select on public.student_portal_settings to authenticated;
grant insert, update, delete on public.schedule_slots to authenticated;
grant insert, update, delete on public.student_portal_settings to authenticated;

create or replace function public.create_student_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_name text;
begin
  profile_name := coalesce(
    nullif(btrim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'Élève'
  );

  insert into public.student_profiles (id, display_name)
  values (new.id, profile_name)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_student_profile_after_signup on auth.users;
create trigger create_student_profile_after_signup
  after insert on auth.users
  for each row execute procedure public.create_student_profile();

create or replace function public.sync_student_name_to_schedule()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.display_name is distinct from old.display_name then
    update public.schedule_slots
      set occupant_name = new.display_name,
          updated_at = now()
      where student_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists sync_student_name_to_schedule on public.student_profiles;
create trigger sync_student_name_to_schedule
  after update of display_name on public.student_profiles
  for each row execute procedure public.sync_student_name_to_schedule();

create or replace function public.book_schedule_slot(p_slot_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  current_display_name text;
  changed_count integer;
begin
  if current_user_id is null or not public.is_active_student() then
    raise exception 'An active student account is required to book a slot.'
      using errcode = '42501';
  end if;

  select display_name
    into current_display_name
    from public.student_profiles
    where id = current_user_id;

  update public.schedule_slots
    set student_id = current_user_id,
        occupant_name = current_display_name,
        updated_at = now()
    where id = p_slot_id
      and occupant_name is null
      and student_id is null;

  get diagnostics changed_count = row_count;
  return changed_count = 1;
end;
$$;

create or replace function public.cancel_schedule_slot(p_slot_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  changed_count integer;
begin
  if current_user_id is null or not public.is_active_student() then
    raise exception 'An active student account is required to cancel a slot.'
      using errcode = '42501';
  end if;

  update public.schedule_slots
    set student_id = null,
        occupant_name = null,
        updated_at = now()
    where id = p_slot_id
      and student_id = current_user_id;

  get diagnostics changed_count = row_count;
  return changed_count = 1;
end;
$$;

revoke all on function public.is_schedule_admin() from public, anon;
revoke all on function public.is_active_student() from public, anon;
revoke all on function public.book_schedule_slot(uuid) from public, anon;
revoke all on function public.cancel_schedule_slot(uuid) from public, anon;
grant execute on function public.is_schedule_admin() to authenticated;
grant execute on function public.is_active_student() to authenticated;
grant execute on function public.book_schedule_slot(uuid) to authenticated;
grant execute on function public.cancel_schedule_slot(uuid) to authenticated;

with day_names as (
  select *
  from (values
    (1::smallint, array['Anas', 'Soma', 'Soukaina', 'Abdelrani', 'Ibrahim', '', '', '', '', '', '', '']::text[]),
    (2::smallint, array['Saïda', 'Soma', 'Ismaïl', 'Anis', '', '', '', '', '', '', '', '']::text[]),
    (3::smallint, array['Soma', 'Saïda', 'Abdelrani', 'Ibrahim', 'Soukaina', '', '', '', '', '', '', '']::text[]),
    (4::smallint, array['Soma', 'Saïda', 'Ismaïl', 'Anas', 'Anis', '', '', '', '', '', '', '']::text[]),
    (5::smallint, array['Saïda', 'Soma', 'Soukaina', 'Abdelrani', 'Ibrahim', '', '', '', '', '', '', '']::text[])
  ) as days(weekday, names)
),
weekly_slots as (
  select
    day_names.weekday,
    time '21:00' + (time_slots.slot_index * interval '15 minutes') as starts_at,
    nullif(day_names.names[time_slots.slot_index + 1], '') as occupant_name
  from day_names
  cross join generate_series(0, 11) as time_slots(slot_index)
)
insert into public.schedule_slots (weekday, starts_at, occupant_name)
select weekday, starts_at, occupant_name
from weekly_slots
on conflict (weekday, starts_at) do nothing;

insert into public.student_portal_settings (id, telegram_invite_url)
values (true, 'https://t.me/+qlHw45Sgmaq4MjI5')
on conflict (id) do nothing;
