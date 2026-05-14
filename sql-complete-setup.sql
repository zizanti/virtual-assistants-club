-- ============================================
-- SQL COMPLETO: Actualizar Schema + Importar TODOS los contactos
-- Ejecutar esto UNA SOLA VEZ en Supabase SQL Editor
-- ============================================

-- Paso 1: Crear tabla si no existe (con todas las columnas necesarias)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  source TEXT DEFAULT 'website',
  platform TEXT,
  date_added DATE DEFAULT CURRENT_DATE,
  imported_from TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Paso 2: Habilitar RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Paso 3: Eliminar políticas existentes para evitar conflictos
DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow select" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated select" ON newsletter_subscribers;

-- Paso 4: Crear políticas correctas
CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON newsletter_subscribers
  FOR SELECT USING (true);

-- Paso 5: Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_source ON newsletter_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_newsletter_platform ON newsletter_subscribers(platform);
CREATE INDEX IF NOT EXISTS idx_newsletter_imported ON newsletter_subscribers(imported_from);

-- Paso 6: Verificar cuántos hay antes
SELECT 'ANTES' as estado, COUNT(*) as total FROM newsletter_subscribers;

-- Paso 7: Insertar TODOS los contactos de Beacons (95 personas)
-- Usamos ON CONFLICT para evitar duplicados
INSERT INTO newsletter_subscribers (email, first_name, last_name, source, platform, date_added, imported_from) 
VALUES
('linetday001@gmail.com', 'Daysi', NULL, 'Guía Gratis', 'Instagram', '2026-05-13', 'beacons'),
('wilmar.wiooo@gmail.com', 'Wilmar', NULL, 'Guía Gratis', 'Beacons', '2026-05-13', 'beacons'),
('ldanielaco@gmail.com', 'Laura', NULL, 'Guía Gratis', 'Instagram', '2026-05-12', 'beacons'),
('tetileh627@imashr.com', 'Teli', 'Haye', 'Guía Gratis', 'Beacons', '2026-05-12', 'beacons'),
('tatiramz10@gmail.com', 'Tatiana', 'Ramrez', 'Guía Gratis', 'Beacons', '2026-05-11', 'beacons'),
('ovejanegra763@gmail.com', 'Nelson', 'Fernando', 'Guía Gratis', 'Instagram', '2026-05-11', 'beacons'),
('capirucho11benitez@gmail.com', 'Edwin', 'Ortiz', 'Guía Gratis', 'Instagram', '2026-05-11', 'beacons'),
('angelyquebella77@gmail.com', 'Benny', 'Yohana', 'Guía Gratis', 'Instagram', '2026-05-09', 'beacons'),
('brauliopenamendez@me.com', 'Braulio', 'Pea', 'Guía Gratis', 'Beacons', '2026-05-09', 'beacons'),
('key_kurono@hotmail.com', 'Alexander', 'Vargas', 'Guía Gratis', 'Instagram', '2026-05-09', 'beacons'),
('stvenmendez2006@gmail.com', 'Xavier', 'Mndez', 'Guía Gratis', 'Instagram', '2026-05-09', 'beacons'),
('mebv03@gmail.com', 'Madeleine', NULL, 'Guía Gratis', 'Instagram', '2026-05-08', 'beacons'),
('juanchoo.hidalgo@gmail.com', 'Juancho', 'Hidalgo', 'Guía Gratis', 'Beacons', '2026-05-08', 'beacons'),
('bpatino@uc.edu.co', 'Brayan', 'Patio', 'Guía Gratis', 'Beacons', '2026-05-08', 'beacons'),
('hidalgobarriosyulieth@gmail.com', 'Brithney', NULL, 'Guía Gratis', 'Instagram', '2026-05-07', 'beacons'),
('mairamartin07@gmail.com', 'Maira', 'Alejandra', 'Guía Gratis', 'Instagram', '2026-05-06', 'beacons'),
('leidyjoanarojas@gmail.com', 'Leidy', 'Rojas', 'Guía Gratis', 'Beacons', '2026-05-05', 'beacons'),
('magdcomercial@gmail.com', 'Mateo', 'Gutirrez', 'Guía Gratis', 'Instagram', '2026-05-02', 'beacons'),
('castillobeltranjhony@gmail.com', 'Jonh', NULL, 'Guía Gratis', 'Beacons', '2026-05-02', 'beacons'),
('sofilagosb11@gmail.com', 'Sofa', 'Lagos', 'Guía Gratis', 'Beacons', '2026-04-30', 'beacons'),
('juandiorjuela12@gmail.com', 'Juan', NULL, 'Guía Gratis', 'Beacons', '2026-04-28', 'beacons'),
('kennethquinterorivera@gmail.com', 'Kenneth', 'Quintero', 'Guía Gratis', 'Beacons', '2026-04-27', 'beacons'),
('danielasuarez0402@gmail.com', 'daniela', NULL, 'Guía Gratis', 'Beacons', '2026-04-24', 'beacons'),
('valenz_95@hotmail.com', 'Valentina', NULL, 'Guía Gratis', 'Beacons', '2026-04-22', 'beacons'),
('margievanegaslopez@gmail.com', 'Margie', NULL, 'Guía Gratis', 'Beacons', '2026-04-20', 'beacons'),
('nathasqvarela@gmail.com', 'Nathalia', NULL, 'Guía Gratis', 'Beacons', '2026-04-19', 'beacons'),
('gustavo.restrepo29@gmail.com', 'Gustavo', NULL, 'Guía Gratis', 'Beacons', '2026-04-18', 'beacons'),
('haguilar1981@gmail.com', 'Hilda', NULL, 'Guía Gratis', 'Beacons', '2026-04-18', 'beacons'),
('dmirandacardenas@gmail.com', 'Dylan', 'Miranda', 'Guía Gratis', 'Beacons', '2026-04-14', 'beacons'),
('santiagogonzalezc2000@gmail.com', 'Santiago', 'Gonzlez', 'Guía Gratis', 'Beacons', '2026-04-13', 'beacons'),
('nicod7parra@gmail.com', 'Nicolas', NULL, 'Guía Gratis', 'Beacons', '2026-04-12', 'beacons'),
('zunigajh100@gmail.com', 'Jhon', NULL, 'Guía Gratis', 'TikTok', '2026-04-09', 'beacons'),
('jahirferrer54@gmail.com', 'Jahir', 'Ferrer', 'Guía Gratis', 'Beacons', '2026-04-09', 'beacons'),
('luisorojas2020.l@gmail.com', 'Luis', 'rojas', 'Guía Gratis', 'Beacons', '2026-04-08', 'beacons'),
('sandymora717@gmail.com', 'Sandy', 'Mora', 'Guía Gratis', 'TikTok', '2026-04-07', 'beacons'),
('saeromero04@gmail.com', 'Samuel', NULL, 'Guía Gratis', 'TikTok', '2026-04-06', 'beacons'),
('ciges90851@flownue.com', 'Alex', NULL, 'Guía Gratis', 'Beacons', '2026-04-05', 'beacons'),
('canontejadajoel@gmail.com', 'Joel', NULL, 'Guía Gratis', 'Beacons', '2026-03-31', 'beacons'),
('mateoparra1904@gmail.com', 'David', NULL, 'Guía Gratis', 'TikTok', '2026-03-27', 'beacons'),
('luciengauttier8@gmail.com', 'Lucien', NULL, 'Guía Gratis', 'Beacons', '2026-03-24', 'beacons'),
('michellhoyos@gmail.com', 'Michelle', 'Hoyos', 'Guía Gratis', 'Beacons', '2026-03-24', 'beacons'),
('reimon.morillo@icloud.com', 'Reimon', 'Morillo', 'Guía Gratis', 'Beacons', '2026-03-23', 'beacons'),
('nandohersheys@gmail.com', 'Fernando', NULL, 'Guía Gratis', 'Beacons', '2026-03-22', 'beacons'),
('karolinebarrera73@gmail.com', 'Karoline', NULL, 'Guía Gratis', 'Beacons', '2026-03-20', 'beacons'),
('fabio_cuadros@hotmail.com', 'Fabio', NULL, 'Guía Gratis', 'Beacons', '2026-03-19', 'beacons'),
('auricel.ugc@gmail.com', 'Auricel', NULL, 'Guía Gratis', 'Beacons', '2026-03-19', 'beacons'),
('auricelugo@gmail.com', 'Auricel', NULL, 'Guía Gratis', 'Beacons', '2026-03-19', 'beacons'),
('miguelangelcabreragaray@gmail.com', 'Miguel', NULL, 'Guía Gratis', 'Beacons', '2026-03-19', 'beacons'),
('herediacorrea0@gmail.com', 'Santiago', 'Heredia', 'Guía Gratis', 'Beacons', '2026-03-18', 'beacons'),
('lesstertalis@gmail.com', 'Gustavo', NULL, 'Guía Gratis', 'Beacons', '2026-03-17', 'beacons'),
('rodriguezdilan35@gmail.com', 'Dylan', 'Rodriguez', 'Guía Gratis', 'TikTok', '2026-03-17', 'beacons'),
('danielgarciatablaza@gmail.com', 'Daniel', 'Garca', 'Guía Gratis', 'Beacons', '2026-03-17', 'beacons'),
('erikapcb23@gmail.com', 'Erika', NULL, 'Guía Gratis', 'Beacons', '2026-03-16', 'beacons'),
('afvalerianomartinez23@gmail.com', 'Andrs', 'Felipe', 'Guía Gratis', 'Beacons', '2026-03-14', 'beacons'),
('allanojp@gmail.com', 'Allan', 'Olivares', 'Guía Gratis', 'TikTok', '2026-02-25', 'beacons'),
('eltatangarcia@gmail.com', 'Jhonatan', 'garcia', 'Email & SMS', 'TikTok', '2026-02-10', 'beacons'),
('diego98madero@gmail.com', 'diego', 'madero', 'Guía Gratis', 'Beacons', '2025-04-16', 'beacons'),
('launaranjo59@gmail.com', 'Laura', NULL, 'Guía Gratis', 'TikTok', '2025-04-07', 'beacons'),
('kenigar2@gmail.com', 'Kenigar', NULL, 'Guía Gratis', 'TikTok', '2025-03-16', 'beacons'),
('cidnusiness07@gmail.com', 'Albert', 'cid', 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('jhesuafelipe@hotmail.com', 'Jesus', 'sepulveda', 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('cesarandresps3@gmail.com', 'Cesar', 'Acevedo', 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('davidvivas22@hotmail.com', 'David', NULL, 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('miguelangellara@hotmail.com', 'Miguel', NULL, 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('gissel.nm0205@gmail.com', 'Gisse', NULL, 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('tropo.ayunos-1j@icloud.com', 'Johnatan', NULL, 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('wm141996@gmail.com', 'William', NULL, 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('sebata10@hotmail.com', 'Sebastin', 'Tapias', 'Guía Gratis', 'TikTok', '2025-03-13', 'beacons'),
('antoniobohorquez462@gmail.com', 'Antonio', 'B', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('fer-1470@hotmail.com', 'Mara', 'Fernanda', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('romaomar@icloud.com', 'Omar', 'Acua', 'Guía Gratis', 'Beacons', '2025-03-12', 'beacons'),
('riverside041000@gmail.com', 'Alexis', 'Rojas', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('mariaceballos734@gmail.com', 'Maria', 'jose', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('xdcamilo01@gmail.com', 'Camiloxi19', NULL, 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('mateocastillo64@gmail.com', 'Mateo', 'Castillo', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('sebastian.velezm96@gmail.com', 'Sebastian', 'Velez', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('fa.gallegos22@gmail.com', 'Andres', 'gallegos', 'Guía Gratis', 'TikTok', '2025-03-12', 'beacons'),
('cranial-organic8l@icloud.com', 'Ed', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('sofievillaj@gmail.com', 'Sofia', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('p3210801@gmail.com', 'John', 'doe', 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('sortizm23@gmail.com', 'Esteban', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('pinerosmorakaren@gmail.com', 'Karen', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('escotabgroup@gmail.com', 'Jenifer', 'Gonzlez', 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('flotantivo@gmail.com', 'Flotantivo', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('barbarannicolas@gmail.com', 'Nicolas', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('jhon96.26@hotmail.com', 'Jhon', 'guerrero', 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('deivyluna14@gmail.com', 'David', 'Luna', 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('jesuspk1997@gmail.com', 'Jess', 'g', 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('maferendon2010@hotmail.com', 'Mara', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('torrescano.je@gmail.com', 'Juanes', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('enriqueportillo2019@gmail.com', 'Leonardo', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('sanjuan_96@hotmail.es', 'Daniel', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('valentincontreras209@gmail.com', 'Valentin', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('origomezcordoba2003@gmail.com', 'Oriana', NULL, 'Guía Gratis', 'TikTok', '2025-03-11', 'beacons'),
('cristiangiron84@gmail.com', 'Christian', 'Giron', 'Guía Gratis', 'Beacons', '2025-03-11', 'beacons'),
('soymelisavargas5@gmail.com', 'Silvia', 'Vargas', 'Guía Gratis', 'Beacons', '2025-03-10', 'beacons'),
('dannifelserrapas@gmail.com', 'Daniel', 'Serrano', 'Guía Gratis', 'TikTok', '2025-03-10', 'beacons'),
('isaac.corredor1002@gmail.com', 'Isaac', NULL, 'Guía Gratis', 'TikTok', '2025-03-10', 'beacons'),
('eltatosilva02@gmail.com', 'David', 'Silva', 'Guía Gratis', 'TikTok', '2025-03-10', 'beacons')
ON CONFLICT (email) DO NOTHING;

-- Paso 8: Verificar cuántos hay después
SELECT 'DESPUES' as estado, COUNT(*) as total FROM newsletter_subscribers;

-- Paso 9: Estadísticas detalladas
SELECT 
  'TOTAL' as categoria,
  COUNT(*) as cantidad
FROM newsletter_subscribers
UNION ALL
SELECT 
  'De Beacons',
  COUNT(*)
FROM newsletter_subscribers 
WHERE imported_from = 'beacons'
UNION ALL
SELECT 
  'De VAC (website)',
  COUNT(*)
FROM newsletter_subscribers 
WHERE imported_from = 'website' OR imported_from IS NULL
UNION ALL
SELECT 
  'Instagram',
  COUNT(*)
FROM newsletter_subscribers 
WHERE platform = 'Instagram'
UNION ALL
SELECT 
  'TikTok',
  COUNT(*)
FROM newsletter_subscribers 
WHERE platform = 'TikTok'
UNION ALL
SELECT 
  'Beacons Directo',
  COUNT(*)
FROM newsletter_subscribers 
WHERE platform = 'Beacons';

-- Paso 10: Exportar formato Substack (resultado en tabla)
SELECT 
  email,
  COALESCE(first_name, '') as first_name,
  COALESCE(last_name, '') as last_name
FROM newsletter_subscribers 
ORDER BY date_added DESC;
