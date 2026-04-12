-- Mogadishu Rental Platform - Supabase Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/xlreyjzkembxqgyhhvbv/sql)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Properties
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  rent_amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL, -- 'Available', 'Occupied', 'Maintenance'
  units INTEGER DEFAULT 1,
  beds INTEGER,
  toilets INTEGER,
  kitchens INTEGER,
  floors INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tenants
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  lease_start DATE NOT NULL,
  lease_end DATE NOT NULL,
  status TEXT NOT NULL, -- 'Active', 'Notice', 'Past'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  month TEXT NOT NULL,
  status TEXT NOT NULL, -- 'Paid', 'Pending', 'Overdue'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Maintenance Tickets
CREATE TABLE IF NOT EXISTS public.maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  priority TEXT NOT NULL, -- 'Low', 'Medium', 'High'
  status TEXT NOT NULL, -- 'Open', 'In Progress', 'Resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'info', 'warning', 'error', 'success'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Initial Dummy Data Migration (Optional)
-- Uncomment these if you want to prepopulate the DB

/*
INSERT INTO properties (id, name, type, district, address, rent_amount, status, units, beds, toilets, kitchens, floors)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Hodan Villa Complex', 'Villa', 'Hodan', 'KM4 Area, near Digfer Hospital', 1200, 'Occupied', 1, 4, 3, 1, 2),
  ('22222222-2222-2222-2222-222222222222', 'Liido View Apartments', 'Apartment', 'Abdiaziz', 'Liido Beach Road', 800, 'Occupied', 1, 2, 2, 1, 0);

INSERT INTO tenants (id, name, phone, email, property_id, lease_start, lease_end, status)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mohamed Hussein', '+252 61 123 4567', 'mohamed.h@example.com', '11111111-1111-1111-1111-111111111111', '2025-01-01', '2026-01-01', 'Active'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Amina Abdi', '+252 61 765 4321', NULL, '22222222-2222-2222-2222-222222222222', '2025-03-01', '2026-03-01', 'Active');
*/
