# VAC — Planning Report & Roadmap

## Estado Actual del Proyecto

### Lo que SÍ funciona
- Landing page con diseño visual sólido
- Login con Supabase Auth (email/password)
- Dashboard con UI completa (sidebar, topbar, metric cards, charts)
- Jobs table con tabs, búsqueda, ordenamiento, view modal, delete modal
- Crear jobs desde el dashboard (POST a API)
- Newsletter endpoint funcional
- Páginas públicas: Jobs, For Companies, Community, About (con contenido estático)
- Sistema de diseño consistente (dark theme, dorado/naranja)

### Lo que NO funciona o está incompleto
- **CANDIDATES page** — vacía, solo título (8 líneas)
- **COMPANIES page** — vacía, solo título (8 líneas)
- **SETTINGS page** — vacía, solo título (8 líneas)
- **AUTOMATIONS page** — vacía, solo título (8 líneas)
- **DELETE job** — llama a `/api/dashboard/jobs/[id]` pero ese endpoint NO EXISTE
- **EDIT job** — botón existe en el modal pero no hace nada
- **Status change** — solo actualiza UI, no persiste en DB
- **For Companies form** — solo hace console.log, no envía a ningún lado
- **Community/Apply buttons** — no hacen nada
- **Dashboard metrics** — todo hardcodeado, no viene de DB
- **Analytics** — datos estáticos de `lib/data.ts`, no reales
- **Applications table** — datos de mock `CANDIDATES`, no de DB

---

## Fases de Trabajo (Orden de Prioridad)

### FASE 1: SEGURIDAD — CRÍTICO (Hacer PRIMERO)
> Sin esto, cualquiera puede borrar/crear datos en tu plataforma

| # | Tarea | Archivos afectados | Impacto |
|---|-------|-------------------|---------|
| 1.1 | Validar token de Supabase en el middleware (no solo verificar que existe la cookie) | `middleware.ts` | 🔴 Crítico |
| 1.2 | Crear helper `requireAuth()` para proteger API routes | `lib/auth.ts` | 🔴 Crítico |
| 1.3 | Proteger POST/DELETE de `/api/dashboard/jobs` con auth | `app/api/dashboard/jobs/route.ts` | 🔴 Crítico |
| 1.4 | Crear DELETE endpoint `/api/dashboard/jobs/[id]` con auth | `app/api/dashboard/jobs/[id]/route.ts` | 🔴 Crítico |
| 1.5 | Crear PATCH endpoint para actualizar status de jobs | `app/api/dashboard/jobs/[id]/route.ts` | 🔴 Crítico |
| 1.6 | Proteger endpoint de newsletter contra spam (rate limiting básico) | `app/api/newsletter/route.ts` | 🟡 Medio |
| 1.7 | Quitar `ignoreBuildErrors: true` del next.config | `next.config.mjs` | 🟡 Medio |
| 1.8 | Agregar validación de input y sanitización en POST jobs | `app/api/dashboard/jobs/route.ts` | 🟡 Medio |
| 1.9 | Verificar admin role antes de permitir acciones en dashboard | `lib/admin.ts`, middleware | 🟡 Medio |

### FASE 2: BASE DE DATOS — SCHEMA COMPLETO
> Estructura correcta para que todo el CRUD funcione

| # | Tarea | Descripción |
|---|-------|-------------|
| 2.1 | Verificar/crear tabla `jobs` con todas las columnas necesarias | `id`, `title`, `company`, `salary`, `type`, `description`, `status`, `skills`, `location`, `experience`, `featured`, `created_at`, `updated_at` |
| 2.2 | Crear tabla `candidates` | `id`, `name`, `email`, `skills`, `experience_years`, `status`, `avatar_url`, `created_at`, `updated_at` |
| 2.3 | Crear tabla `applications` | `id`, `candidate_id`, `job_id`, `status`, `applied_at`, `notes` |
| 2.4 | Crear tabla `companies` | `id`, `name`, `contact_name`, `contact_email`, `status`, `created_at` |
| 2.5 | Crear tabla `company_requests` (para el form de For Companies) | `id`, `name`, `company`, `email`, `requirements`, `status`, `created_at` |
| 2.6 | Habilitar RLS en todas las tablas | Políticas de seguridad |
| 2.7 | Crear índices para queries frecuentes | `jobs(status)`, `jobs(created_at)`, `applications(status)` |

### FASE 3: CRUD DE JOBS COMPLETO
> Agregar, editar, eliminar, cambiar status — todo funcionando con DB real

| # | Tarea | Archivos afectados |
|---|-------|-------------------|
| 3.1 | Crear endpoint DELETE `/api/dashboard/jobs/[id]` | Nueva ruta |
| 3.2 | Crear endpoint PATCH `/api/dashboard/jobs/[id]` (status + edit) | Nueva ruta |
| 3.3 | Implementar EDIT job en el JobsTable (modal con formulario) | `components/dashboard/jobs-table.tsx` |
| 3.4 | Conectar status change al API (persistir en DB) | `components/dashboard/jobs-table.tsx` |
| 3.5 | Agregar campos faltantes al POST (skills, location, experience, featured) | `app/api/dashboard/jobs/route.ts`, form modal |
| 3.6 | Confirmar que el GET filtra por status si es necesario | `app/api/dashboard/jobs/route.ts` |

### FASE 4: DASHBOARD — DATOS REALES
> Reemplazar datos hardcodeados por datos de la base de datos

| # | Tarea | Archivos afectados |
|---|-------|-------------------|
| 4.1 | Métricas del dashboard desde DB (total VAs, jobs, applications, placements) | `app/dashboard/page.tsx`, nuevo API |
| 4.2 | Applications table desde DB (no desde mock CANDIDATES) | `components/dashboard/applications-table.tsx`, nuevo API |
| 4.3 | Pending jobs card desde DB | `components/dashboard/pending-jobs.tsx` |
| 4.4 | Charts con datos reales de la DB | `components/dashboard/applications-chart.tsx`, `traffic-chart.tsx` |
| 4.5 | Automation status desde configuración real | `components/dashboard/automation-status.tsx` |

### FASE 5: PÁGINAS DEL DASHBOARD — FUNCIONALIDAD
> Candidates, Companies, Settings, Automations

| # | Tarea | Descripción |
|---|-------|-------------|
| 5.1 | **Candidates page** — Tabla con candidatos reales, búsqueda, filtros, ver perfil | Nueva tabla + API |
| 5.2 | **Companies page** — Tabla con empresas, requests del form, pipeline de hiring | Nueva tabla + API |
| 5.3 | **Settings page** — Perfil del admin, cambiar password, configuración de plataforma | UI + API |
| 5.4 | **Automations page** — Toggle scrapers, ver logs de scraping, configurar email sequences | UI + API |
| 5.5 | **Analytics page** — Conectar charts a datos reales de la DB | Actualizar componentes existentes |

### FASE 6: PÁGINAS PÚBLICAS — FUNCIONALIDAD
> Forms que funcionan, links que llevan a algún lado

| # | Tarea | Descripción |
|---|-------|-------------|
| 6.1 | For Companies form — crear endpoint API para guardar company requests | Nueva API route |
| 6.2 | Footer links — crear páginas de Privacy, Terms, Contact, Blog o quitarlos | Nuevas páginas o actualizar links |
| 6.3 | Botón "Sign In" en PublicNav — conectar al login o dashboard | `components/public-nav.tsx` |
| 6.4 | Botón "Apply as VA" — crear flow de registro para VAs | Nueva página + API |
| 6.5 | Community "Join" button — conectar al link real de Skool/comunidad | `app/community/page.tsx` |
| 6.6 | Jobs page pública — mostrar solo jobs con status 'active' | `app/jobs/page.tsx` |

### FASE 7: PULIDO Y PRODUCCIÓN
> Detalles finales antes de lanzar

| # | Tarea | Descripción |
|---|-------|-------------|
| 7.1 | Reemplazar assets placeholder por assets reales (logo, favicon, images) | `/public/` |
| 7.2 | Agregar `robots.txt` y `sitemap.xml` | Nuevos archivos |
| 7.3 | Agregar `error.tsx` y `loading.tsx` globales | `app/` |
| 7.4 | Open Graph completo (imágenes, url, siteName) | `app/layout.tsx` |
| 7.5 | Crear `.env.example` con todas las variables documentadas | Nuevo archivo |
| 7.6 | Actualizar `package.json` name a algo apropiado | `package.json` |
| 7.7 | Copyright dinámico (año actual) | `app/page.tsx` |
| 7.8 | Hacer dashboard greeting dinámico (basado en user) | `app/dashboard/page.tsx` |
| 7.9 | Content Security Policy headers | `next.config.mjs`, middleware |
| 7.10 | Rate limiting en endpoints sensibles | Middleware o API routes |
| 7.11 | Testing básico (al menos smoke tests) | Configurar Vitest/Jest |

---

## Orden Recomendado de Ejecución

```
SEMANA 1: FASE 1 + FASE 2 (Seguridad + DB)
├── Día 1-2: Middleware con validación real de tokens
├── Día 2-3: Proteger todas las API routes
├── Día 3-4: Crear endpoints DELETE y PATCH para jobs
├── Día 4-5: Verificar/crear schema completo en Supabase
└── Día 5: RLS policies + índices

SEMANA 2: FASE 3 + FASE 4 (CRUD Jobs + Dashboard real)
├── Día 1-2: Edit job modal funcional
├── Día 2-3: Status change persiste en DB
├── Día 3-4: Formulario de crear job con todos los campos
├── Día 4-5: Métricas del dashboard desde DB
└── Día 5: Applications table desde DB

SEMANA 3: FASE 5 + FASE 6 (Páginas + Forms públicos)
├── Día 1-2: Candidates page completa
├── Día 2-3: Companies page completa
├── Día 3-4: Settings + Automations pages
├── Día 4-5: For Companies form funcional
└── Día 5: Footer links + botones funcionales

SEMANA 4: FASE 7 (Pulido + Producción)
├── Día 1-2: Assets reales, favicon, logo
├── Día 2-3: SEO, robots.txt, sitemap, OG tags
├── Día 3-4: CSP headers, rate limiting
└── Día 4-5: Testing + deploy
```

---

## Schema de Base de Datos Recomendado (Supabase)

```sql
-- ─── JOBS ────────────────────────────────────────────────────────────────────
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT DEFAULT 'Confidential',
  salary TEXT NOT NULL,
  salary_min INTEGER DEFAULT 0,
  salary_max INTEGER DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'closed')),
  skills TEXT[] DEFAULT '{}',
  location TEXT DEFAULT 'Remote',
  experience TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CANDIDATES ──────────────────────────────────────────────────────────────
CREATE TABLE candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  skills TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  bio TEXT DEFAULT '',
  avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'placed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── APPLICATIONS ────────────────────────────────────────────────────────────
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewing', 'Placed', 'Rejected')),
  notes TEXT DEFAULT '',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COMPANIES ───────────────────────────────────────────────────────────────
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COMPANY REQUESTS (from For Companies page form) ─────────────────────────
CREATE TABLE company_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  requirements TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── NEWSLETTER_SUBSCRIBERS ──────────────────────────────────────────────────
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ADMINS ──────────────────────────────────────────────────────────────────
CREATE TABLE admins (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created ON jobs(created_at DESC);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_applications_job ON applications(job_id);

-- ─── RLS (Row Level Security) ───────────────────────────────────────────────
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Jobs: public can read active, admins can do everything
CREATE POLICY "Public can view active jobs" ON jobs
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage jobs" ON jobs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );

-- Similar policies for other tables...
```

---

## Variables de Entorno Requeridas (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Para admin operations
```

---

## Próximos Pasos Inmediatos

1. **Confirmar que tienes Supabase configurado** con las tablas necesarias
2. **Empezar por FASE 1** — sin seguridad, todo lo demás es vulnerable
3. **Ejecutar el SQL schema** en tu proyecto de Supabase
4. **Verificar el admin user** — que tu user esté en la tabla `admins`

¿Por cuál fase quieres empezar?
