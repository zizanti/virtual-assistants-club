-- Check if admins table exists and has users
SELECT
  'admins table exists' as status,
  COUNT(*) as admin_count
FROM information_schema.tables
WHERE table_name = 'admins' AND table_schema = 'public';

-- List all admin users
SELECT
  a.user_id,
  u.email,
  a.created_at
FROM admins a
JOIN auth.users u ON a.user_id = u.id;

-- If no admins exist, you need to add your user:
-- INSERT INTO admins (user_id) VALUES ('your-user-uuid-here');
-- Replace 'your-user-uuid-here' with your actual user ID from Supabase Auth > Users