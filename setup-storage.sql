-- Run this in Supabase SQL Editor to create the storage bucket for guides

-- Create public bucket for guides
INSERT INTO storage.buckets (id, name, public)
VALUES ('guides', 'guides', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to guides bucket
CREATE POLICY IF NOT EXISTS "Public can read guides"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'guides');

-- Allow authenticated uploads (for admin)
CREATE POLICY IF NOT EXISTS "Authenticated can upload guides"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'guides');
