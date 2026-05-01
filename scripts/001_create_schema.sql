-- Alkohali Bus Company - Database Schema
-- Creates tables for managing the entire website content from an admin dashboard

-- =========================
-- Site Settings (singleton-ish)
-- =========================
create table if not exists public.site_settings (
  id int primary key default 1,
  company_name text not null default 'شركة الكاهلي للنقل البري',
  short_name text not null default 'الكاهلي',
  tagline text not null default 'مستقبل السفر البري بين اليمن والسعودية',
  phone text not null default '+967 777 192 477',
  phone_raw text not null default '+967777192477',
  whatsapp text not null default '967777192477',
  email text not null default 'info@alkohali-bus.com',
  address text not null default 'المقر الرئيسي: المملكة العربية السعودية - جدة',
  years_of_service int not null default 15,
  passengers_served text not null default '250,000+',
  daily_trips int not null default 24,
  fleet_size int not null default 40,
  facebook_url text,
  instagram_url text,
  twitter_url text,
  youtube_url text,
  tiktok_url text,
  updated_at timestamptz not null default now(),
  constraint only_one_row check (id = 1)
);

-- =========================
-- Cities
-- =========================
create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  country text not null check (country in ('yemen','saudi')),
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =========================
-- Trips (routes)
-- =========================
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  from_city text not null,
  to_city text not null,
  direction text not null check (direction in ('yemen-to-saudi','saudi-to-yemen')),
  duration text not null,
  departure_time text not null,
  price numeric(10,2) not null,
  currency text not null default 'SAR' check (currency in ('SAR','YER')),
  bus_type text not null default 'VIP',
  seats_available int not null default 20,
  featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_trips_direction on public.trips(direction);
create index if not exists idx_trips_from_to on public.trips(from_city, to_city);
create index if not exists idx_trips_featured on public.trips(featured) where featured = true;

-- =========================
-- Features
-- =========================
create table if not exists public.features (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null default 'Sparkles',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =========================
-- Testimonials
-- =========================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  rating int not null default 5 check (rating between 1 and 5),
  text text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =========================
-- FAQs
-- =========================
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =========================
-- Stats (hero counters)
-- =========================
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sort_order int not null default 0
);

-- =========================
-- Bookings (from public site, collected for admin)
-- =========================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  from_city text not null,
  to_city text not null,
  travel_date date,
  passengers int not null default 1,
  notes text,
  status text not null default 'new' check (status in ('new','contacted','confirmed','cancelled','completed')),
  created_at timestamptz not null default now()
);

-- =========================
-- Contact Messages
-- =========================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

-- =========================
-- Row Level Security
-- =========================
alter table public.site_settings enable row level security;
alter table public.cities enable row level security;
alter table public.trips enable row level security;
alter table public.features enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.stats enable row level security;
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;

-- Public read (only active rows) for content tables
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);

drop policy if exists "public read cities" on public.cities;
create policy "public read cities" on public.cities for select using (is_active = true);

drop policy if exists "public read trips" on public.trips;
create policy "public read trips" on public.trips for select using (is_active = true);

drop policy if exists "public read features" on public.features;
create policy "public read features" on public.features for select using (is_active = true);

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (is_active = true);

drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs for select using (is_active = true);

drop policy if exists "public read stats" on public.stats;
create policy "public read stats" on public.stats for select using (true);

-- Public insert for bookings and contact messages (public can submit)
drop policy if exists "public insert bookings" on public.bookings;
create policy "public insert bookings" on public.bookings for insert with check (true);

drop policy if exists "public insert contact" on public.contact_messages;
create policy "public insert contact" on public.contact_messages for insert with check (true);

-- Authenticated (admin) full access for all tables
do $$
declare tbl text;
begin
  for tbl in select unnest(array[
    'site_settings','cities','trips','features','testimonials','faqs','stats','bookings','contact_messages'
  ])
  loop
    execute format('drop policy if exists "admin all %I" on public.%I', tbl, tbl);
    execute format(
      'create policy "admin all %I" on public.%I for all to authenticated using (true) with check (true)',
      tbl, tbl
    );
  end loop;
end$$;
