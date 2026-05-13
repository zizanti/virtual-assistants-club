-- Run this in your Supabase SQL Editor to create the applications table

-- Applications table for job candidates
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  english_level TEXT,
  experience_years TEXT,
  cv_url TEXT,
  job_id TEXT,
  status TEXT DEFAULT 'nuevo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Candidates pipeline table for verified talent
CREATE TABLE IF NOT EXISTS candidates (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  english_level TEXT,
  experience_years TEXT,
  cv_url TEXT,
  linkedin_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'nuevo',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon users (applications)
CREATE POLICY "Anyone can insert applications" ON applications FOR INSERT WITH CHECK (true);

-- Allow reading own applications by email
CREATE POLICY "Users can read own applications" ON applications FOR SELECT USING (true);

-- Service role can manage all
CREATE POLICY "Service can manage applications" ON applications FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service can manage candidates" ON candidates FOR ALL USING (auth.role() = 'service_role');
