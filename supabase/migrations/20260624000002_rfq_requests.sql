-- ════════════════════════════════════════════════════════════════
-- AeroBroker — جدول طلبات عروض الأسعار (rfq_requests)
-- ════════════════════════════════════════════════════════════════

create table if not exists public.rfq_requests (
  id            uuid primary key default gen_random_uuid(),
  listing_id    uuid references public.listings (id) on delete set null,
  buyer_name    text not null,
  buyer_email   text not null,
  buyer_phone   text,
  buyer_country text,
  message       text,
  status        text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at    timestamptz not null default now()
);

create index if not exists rfq_requests_listing_id_idx on public.rfq_requests (listing_id);
create index if not exists rfq_requests_status_idx on public.rfq_requests (status);

-- ════════════════════════════════════════════════════════════════
-- أمن مستوى الصف (RLS):
-- - يُسمح للزوّار بإرسال الطلبات (insert)
-- - لا يُسمح بقراءة الطلبات للعامة (الخصوصية) — تُقرأ عبر دور الخدمة فقط
-- ════════════════════════════════════════════════════════════════
alter table public.rfq_requests enable row level security;

drop policy if exists "Anyone can submit an RFQ" on public.rfq_requests;
create policy "Anyone can submit an RFQ"
  on public.rfq_requests
  for insert
  to anon, authenticated
  with check (true);
