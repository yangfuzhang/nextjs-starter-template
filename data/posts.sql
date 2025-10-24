create table public.posts (
  id uuid not null default gen_random_uuid (),
  document_id text not null,
  title text not null,
  slug text not null,
  cover text not null,
  abstract text not null default ''::text,
  content text null default ''::text,
  published boolean not null default false,
  seo_title text null default ''::text,
  seo_description text null default ''::text,
  locale text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint posts_pkey primary key (id)
) TABLESPACE pg_default;

-- Enable row level security
create policy "Enable insert for admin users only"
on "public"."posts"
as PERMISSIVE
for INSERT
to authenticated
with check (
  (( SELECT auth.jwt() ->> 'email'::text)) 
  IN (
    'yangfuzhang0720@126.com'::text
  )
);

create policy "Enable delete for admin users only"
on "public"."posts"
as PERMISSIVE
for DELETE
to authenticated
using (
  (( SELECT auth.jwt() ->> 'email'::text)) 
  IN (
    'yangfuzhang0720@126.com'::text
  )
);

create policy "Enable update for admin users only"
on "public"."posts"
as PERMISSIVE
for UPDATE
to authenticated
using (
  (( SELECT auth.jwt() ->> 'email'::text)) 
  IN (
    'yangfuzhang0720@126.com'::text
  )
);

create policy "Enable read access for all users"
on "public"."posts"
as PERMISSIVE
for SELECT
to public
using (
  true
);

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();