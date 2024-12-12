-- Enable RLS
alter table motor_assembly enable row level security;

-- Create a policy that allows public inserts
create policy "Enable public insert access"
on motor_assembly
for insert
to anon
with check (true);

-- Create a policy that allows public select access
create policy "Enable public select access"
on motor_assembly
for select
to anon
using (true);
