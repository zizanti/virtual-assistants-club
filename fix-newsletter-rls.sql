-- Fix newsletter_subscribers RLS policies
-- La tabla ya existe, solo necesitamos las políticas correctas

-- Primero eliminamos políticas existentes si hay error
DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow admin view" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow select" ON newsletter_subscribers;

-- Enable RLS (por si no está habilitado)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Política 1: Cualquiera puede insertar (para suscribirse)
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Política 2: Cualquiera puede ver (o solo usuarios autenticados)
-- Opción A: Solo usuarios autenticados pueden ver
CREATE POLICY "Allow authenticated select" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);

-- Opción B: Si quieres que cualquiera pueda ver (incluyendo anónimos)
-- CREATE POLICY "Allow public select" ON newsletter_subscribers
--   FOR SELECT USING (true);
