# Integración Newsletter: Supabase + Substack

## Resumen
Actualmente tienes **~110 suscriptores** en total:
- **95 de Beacons** (históricos desde febrero 2025)
- **15 de VAC** (nuevos desde el sitio web)

## Paso 1: Preparar Supabase (5 min)

### 1.1 Actualizar schema
Ejecuta en SQL Editor:
```sql
-- Archivo: update-newsletter-schema.sql
```

Esto agrega columnas para:
- `first_name`, `last_name`
- `source` (de dónde viene)
- `platform` (Instagram, TikTok, Beacons)
- `imported_from` (beacons o website)

### 1.2 Importar contactos de Beacons
Ejecuta en SQL Editor:
```sql
-- Archivo: import-beacons-contacts.sql
```

## Paso 2: Conectar a Substack (10 min)

### Opción A: Importación manual (recomendado para empezar)

1. Ve a Substack → Dashboard → Settings → Import
2. Descarga el CSV desde Supabase:
   ```sql
   -- Archivo: export-for-substack.sql
   -- Ejecuta y exporta resultados a CSV
   ```
3. Sube el CSV a Substack
4. Los suscriptores recibirán confirmación automática

### Opción B: Webhook automático (avanzado)

Para que cada nuevo suscriptor en VAC vaya automáticamente a Substack:

1. **En Substack**: No tienen API pública para añadir suscriptores 😕
2. **Alternativa**: Usar Zapier o Make (Integromat)
   - Trigger: New row en Supabase
   - Action: Añadir a Substack (vía email manual)

**Recomendación**: Por ahora, exporta manualmente cada semana.

## Paso 3: Ver en Dashboard

El componente `NewsletterDashboard` está listo. Para añadirlo al panel de admin:

```tsx
// En app/dashboard/page.tsx o crear nueva ruta
import { NewsletterDashboard } from '@/components/dashboard/newsletter-dashboard'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <NewsletterDashboard />
    </div>
  )
}
```

## Estadísticas actuales (Beacons)

- **Total**: 95 suscriptores históricos
- **Instagram**: ~20 personas
- **TikTok**: ~70 personas
- **Beacons directo**: ~5 personas
- **Rango de fechas**: Febrero 2025 - Mayo 2026
- **Fuentes principales**: Store - Guía BASICA

## Flujo recomendado

```
Nuevo visitante → VAC website → Captura email → Supabase
                                        ↓
                                Dashboard de control
                                        ↓
                            Export semanal a CSV
                                        ↓
                            Import a Substack
                                        ↓
                            Newsletter semanal
```

## Scripts SQL disponibles

1. `update-newsletter-schema.sql` - Actualiza la tabla
2. `import-beacons-contacts.sql` - Importa los 95 contactos
3. `export-for-substack.sql` - Exporta para Substack
4. `fix-newsletter-rls.sql` - Arregla permisos (si hay error)

## Próximos pasos

1. ✅ Ejecutar SQL de schema update
2. ✅ Ejecutar SQL de import
3. ✅ Exportar CSV
4. ✅ Importar a Substack
5. ✅ Programar export semanal (cada domingo)

## Nota importante

Substack no permite importación masiva sin confirmación por email. 
Los suscriptores recibirán un email de confirmación antes de estar activos.

Para evitar esto, puedes:
- Usar el método "Invite subscribers" en Substack (más manual)
- O dejar que confirmen (mejor calidad de lista)

## Soporte

¿Problemas con el SQL? Revisa:
- Que la tabla `newsletter_subscribers` existe
- Que no hay emails duplicados (el SQL maneja esto automáticamente)
- Que las fechas están en formato correcto
