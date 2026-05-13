-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public signup)
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Allow admins to view all
CREATE POLICY "Allow admin view" ON newsletter_subscribers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );
