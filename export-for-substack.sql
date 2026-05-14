-- Exportar todos los suscriptores a formato CSV para Substack
-- Ejecutar en Supabase SQL Editor y descargar resultados

SELECT 
  email,
  COALESCE(first_name, '') as first_name,
  COALESCE(last_name, '') as last_name,
  source as notes,
  platform as referrer,
  date_added as created_at
FROM newsletter_subscribers 
ORDER BY date_added DESC;

-- O si quieres solo los de Beacons (los más antiguos y enganchados):
-- SELECT * FROM newsletter_subscribers WHERE imported_from = 'beacons' ORDER BY date_added ASC;

-- Estadísticas útiles:
SELECT 
  'Total suscriptores' as metric,
  COUNT(*)::text as value
FROM newsletter_subscribers
UNION ALL
SELECT 
  'De Beacons (históricos)',
  COUNT(*)::text
FROM newsletter_subscribers WHERE imported_from = 'beacons'
UNION ALL
SELECT 
  'De VAC (nuevos)',
  COUNT(*)::text
FROM newsletter_subscribers WHERE imported_from = 'website_vaclub'
UNION ALL
SELECT 
  'Desde Instagram',
  COUNT(*)::text
FROM newsletter_subscribers WHERE platform = 'Instagram'
UNION ALL
SELECT 
  'Desde TikTok',
  COUNT(*)::text
FROM newsletter_subscribers WHERE platform = 'TikTok';
