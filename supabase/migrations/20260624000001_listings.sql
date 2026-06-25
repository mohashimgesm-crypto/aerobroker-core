-- ════════════════════════════════════════════════════════════════
-- AeroBroker — جدول الإعلانات (listings)
-- ════════════════════════════════════════════════════════════════

-- مطلوب لتوليد المعرّفات UUID
create extension if not exists pgcrypto;

create table if not exists public.listings (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique,
  category             text not null check (category in ('ultralight', 'helicopter', 'machinery')),
  make                 text not null,
  model                text not null,
  year                 integer check (year between 1950 and 2100),
  price_usd            numeric(12, 2),
  price_visible        boolean not null default true,
  negotiable           boolean not null default false,
  flying_hours         integer,
  engine_model         text,
  max_speed_kmh        integer,
  range_km             integer,
  mtow_kg              integer,
  seats                integer,
  condition            text check (condition in ('Excellent', 'Good', 'Fair')),
  country              text not null,
  city                 text,
  shipping_weight_kg   numeric(10, 2),
  description_ar       text,
  description_en       text,
  images               text[] not null default '{}',
  status               text not null default 'active' check (status in ('active', 'sold', 'draft')),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- فهارس لتسريع التصفية الشائعة
create index if not exists listings_category_idx on public.listings (category);
create index if not exists listings_status_idx   on public.listings (status);
create index if not exists listings_country_idx  on public.listings (country);
create index if not exists listings_price_idx    on public.listings (price_usd);

-- تحديث updated_at تلقائياً عند أي تعديل
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists listings_set_updated_at on public.listings;
create trigger listings_set_updated_at
  before update on public.listings
  for each row
  execute function public.set_updated_at();

-- ════════════════════════════════════════════════════════════════
-- أمن مستوى الصف (RLS): القراءة العامة للإعلانات النشطة فقط
-- ════════════════════════════════════════════════════════════════
alter table public.listings enable row level security;

drop policy if exists "Public can read active listings" on public.listings;
create policy "Public can read active listings"
  on public.listings
  for select
  using (status = 'active');
