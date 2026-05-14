-- Actualizar tabla newsletter_subscribers para soportar datos de Beacons y segmentación

-- Agregar columnas nuevas
ALTER TABLE newsletter_subscribers 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
ADD COLUMN IF NOT EXISTS platform TEXT,
ADD COLUMN IF NOT EXISTS date_added DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS imported_from TEXT;

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_newsletter_source ON newsletter_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_newsletter_date ON newsletter_subscribers(date_added);
CREATE INDEX IF NOT EXISTS idx_newsletter_platform ON newsletter_subscribers(platform);

-- Actualizar registros existentes para marcarlos como 'website'
UPDATE newsletter_subscribers 
SET imported_from = 'website_vaclub',
    source = 'Guía Gratuita - VAC'
WHERE imported_from IS NULL;
