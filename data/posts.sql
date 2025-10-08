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
  updated_at timestamp without time zone not null default now(),
  constraint posts_pkey primary key (id)
) TABLESPACE pg_default;

-- Enable row level security
create policy "Enable delete for users based on user_email"
on "public"."posts"
as PERMISSIVE
for DELETE
to authenticated
using (
  ((( SELECT auth.jwt() AS jwt) ->> 'email'::text) = 'yangfuzhang0720@126.com'::text)
);

create policy "Enable insert for authenticated users only"
on "public"."posts"
as PERMISSIVE
for INSERT
to authenticated
with check (
  true
);

create policy "Enable read access for all users"
on "public"."posts"
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "Enable update for users based on email"
on "public"."posts"
as PERMISSIVE
for UPDATE
to authenticated
using (
  ((( SELECT auth.jwt() AS jwt) ->> 'email'::text) = 'yangfuzhang0720@126.com'::text)
);