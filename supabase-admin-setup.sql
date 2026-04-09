-- Create admins table
CREATE TABLE admins (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admins to read their own record
CREATE POLICY "Admins can view their own record" ON admins
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow service role to manage admins
CREATE POLICY "Service role can manage admins" ON admins
  FOR ALL USING (auth.role() = 'service_role');

-- Insert the existing user as admin (replace 'user-uuid-here' with actual user ID)
-- You can find the user ID in Supabase Auth > Users
INSERT INTO admins (user_id) VALUES ('user-uuid-here');