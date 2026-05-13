'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote, TrendingUp, MapPin, Clock } from 'lucide-react'

const TESTIMONIALS = [
  // GUIA GRATUITA
  {
    quote: "Descargué la guía esperando lo mismo: tips genéricos que encuentras en cualquier blog. Me sorprendió que tuviera rangos de salario reales y ejemplos de cómo aplicar. La leí en una tarde y ya tenía un plan.",
    name: 'Andrea M.',
    role: 'VA en formación',
    city: 'Bogotá',
    category: 'Guía Gratuita',
    badge: null,
    salaryChange: null,
  },
  {
    quote: "Llevaba meses buscando por donde empezar. Esta guía me ordenó la cabeza. No vende, no exagera, solo te dice la realidad del mercado y qué necesitas para entrar.",
    name: 'Camila R.',
    role: 'Saliendo de BPO',
    city: 'Medellín',
    category: 'Guía Gratuita',
    badge: null,
    salaryChange: null,
  },
  {
    quote: "Pensé que era otro recurso motivacional. No lo es. Te habla de plataformas, de rangos de pago, de errores comunes. Es la guía que hubiera querido tener hace dos años.",
    name: 'Jorge L.',
    role: 'Customer Support VA',
    city: 'Cali',
    category: 'Guía Gratuita',
    badge: null,
    salaryChange: null,
  },
  // GUIA PREMIUM
  {
    quote: "Pagar por una guía me daba duda. Pero 39 mil pesos por algo que te ahorra meses de prueba y error no es caro, es una inversión ridículamente barata. El ejemplo del CV solo ya valió.",
    name: 'Daniela T.',
    role: 'EA Junior',
    city: 'Bogotá',
    category: 'Guía Premium',
    badge: 'Primera entrevista en 2 semanas',
    salaryChange: null,
  },
  {
    quote: "Lo que más me sirvió fue la tabla que muestra cómo traducir experiencia de call center a lenguaje de EA. Yo llevaba años diciendo que 'atendí llamadas' y nunca me llamaban.",
    name: 'Sebastián V.',
    role: 'Ex-BPO, ahora VA',
    city: 'Barranquilla',
    category: 'Guía Premium',
    badge: 'Cambió su CV',
    salaryChange: null,
  },
  {
    quote: "Las 25 plataformas organizadas con instrucciones por cada una. Eso solo me ahorró semanas de buscar en Google. Apliqué a 5 en la misma semana y tuve mi primera entrevista en 10 días.",
    name: 'Luisa F.',
    role: 'Operations VA',
    city: 'Pereira',
    category: 'Guía Premium',
    badge: 'Entrevista en 10 días',
    salaryChange: null,
  },
  {
    quote: "Compré la guía cuando ya tenía algo de experiencia remota. Igual encontré cosas que no sabía, especialmente en la parte de posicionamiento y cómo estructurar el perfil.",
    name: 'Ricardo A.',
    role: 'VA Especializado',
    city: 'Ciudad de México',
    category: 'Guía Premium',
    badge: 'No solo para principiantes',
    salaryChange: null,
  },
  // MENTORIA 1:1
  {
    quote: "La verdad es que la primera vez que pago por una mentoría y siento que en verdad obtuve valor. El Notion que envía al final es lo que sigo usando para aplicar. Recomendado.",
    name: 'Valentina G.',
    role: 'Executive Assistant',
    city: 'Medellín',
    category: 'Mentoría 1:1',
    badge: 'Sigue usando el Notion',
    salaryChange: null,
  },
  {
    quote: "En 45 minutos revisamos mi CV, mi LinkedIn, y me dio una estrategia concreta de a qué aplicar primero y por qué. No fue una charla motivacional. Fue una sesión de trabajo.",
    name: 'Felipe O.',
    role: 'EA',
    city: 'Bogotá',
    category: 'Mentoría 1:1',
    badge: 'De $600 → $2,100/mes',
    salaryChange: { from: 600, to: 2100 },
  },
  {
    quote: "Tres semanas después de la sesión conseguí mi primer contrato fijo en USD. No digo que fue solo por la mentoría, pero sí me ayudó a enfocarme en lo correcto.",
    name: 'Natalia C.',
    role: 'Operations Assistant',
    city: 'Cali',
    category: 'Mentoría 1:1',
    badge: 'Contrato fijo en USD',
    salaryChange: null,
  },
  // COMUNIDAD / SKOOL
  {
    quote: "Entré porque había un tablón de empleos y me quedé por la comunidad. Hay gente seria construyendo su carrera remota, no es un grupo de WhatsApp con memes.",
    name: 'Andrés M.',
    role: 'VA',
    city: 'Bogotá',
    category: 'Comunidad Skool',
    badge: 'Se quedó por la comunidad',
    salaryChange: null,
  },
  {
    quote: "Lo que más me aporta es ver el progreso de otros. Alguien publica que consigió su primer cliente, alguien pregunta sobre una plataforma. Es un ambiente que te mantiene activo.",
    name: 'Paola S.',
    role: 'Senior VA',
    city: 'Cali',
    category: 'Comunidad Skool',
    badge: 'Ambiente de progreso',
    salaryChange: null,
  },
  {
    quote: "Los recursos y templates valen el precio de la membresía solos. Pero encima tienes personas que ya están trabajando remotamente y comparten lo que funciona de verdad.",
    name: 'Manuela R.',
    role: 'Executive Assistant',
    city: 'Medellín',
    category: 'Comunidad Skool',
    badge: 'Recursos + comunidad',
    salaryChange: null,
  },
  // Testimonios originales con salarios destacados
  {
    quote: "Parce, antes de VAC ganaba $400 al mes en un call center. Seguí la guía, apliqué los guiones y en 2 meses conseguí un rol de EA por $1,800/mes. Esto es real.",
    name: 'Valentina G.',
    role: 'Executive Assistant',
    city: 'Barranquilla',
    category: 'Resultado',
    badge: 'De $400 → $1,800/mes',
    salaryChange: { from: 400, to: 1800 },
  },
  {
    quote: "Yo pensé que eso de trabajar remoto era mentira. Apliqué a 3 ofertas del tablón, tuve entrevista en 2 y quedé en una. Chimba de comunidad.",
    name: 'Brayan C.',
    role: 'Senior VA',
    city: 'Medellín',
    category: 'Resultado',
    badge: 'Contratado en 2 semanas',
    salaryChange: null,
  },
  {
    quote: "El newsletter y la guía de negociación me sirvieron resto. Pedí aumento con el guion que mandan y me lo dieron. $400 más al mes por un correo bien escrito.",
    name: 'Daniela R.',
    role: 'Operations VA',
    city: 'Cali',
    category: 'Resultado',
    badge: 'Consiguió aumento de $400',
    salaryChange: { increase: 400 },
  },
  {
    quote: "Lo que más me gusta es que David sí sabe de lo que habla. Trabajó en call center, fue EA, construyó esto él mismo. No es un gurú random vendiendo humo.",
    name: 'Felipe M.',
    role: 'EA',
    city: 'Bogotá',
    category: 'Resultado',
    badge: 'Duplicó su salario',
    salaryChange: { multiplier: 2 },
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Guía Gratuita': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Guía Premium': 'bg-gold/10 text-gold border-gold/20',
  'Mentoría 1:1': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Comunidad Skool': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Resultado': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export function SocialProof() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollSpeed = 0.5 // pixels per frame
    
    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPositionRef.current += scrollSpeed
        
        // Reset when scrolled past half (duplicate content)
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0
        }
        
        scrollContainer.scrollLeft = scrollPositionRef.current
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3 font-medium">Testimonios</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Resultados reales de talento LATAM
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Personas como tú que siguieron el sistema y hoy ganan en USD.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Scrolling container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden px-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedTestimonials.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="group relative flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-gold/30 hover:bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/5"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[t.category] || 'bg-muted text-muted-foreground'}`}>
                  {t.category}
                </span>
                <Quote size={16} className="text-gold/20" />
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground/90 leading-relaxed mb-4 line-clamp-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Salary change indicator */}
              {t.salaryChange && (
                <div className="mb-4 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-gold/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">
                      {t.salaryChange.from && t.salaryChange.to 
                        ? `De $${t.salaryChange.from} → $${t.salaryChange.to}/mes`
                        : t.salaryChange.increase 
                          ? `+$${t.salaryChange.increase}/mes`
                          : t.salaryChange.multiplier
                            ? `${t.salaryChange.multiplier}x salario`
                            : 'Mejoró ingresos'}
                    </span>
                  </div>
                </div>
              )}

              {/* Badge if no salary */}
              {t.badge && !t.salaryChange && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                    <Clock size={10} />
                    {t.badge}
                  </span>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gold/70">
                  <MapPin size={10} />
                  <span className="font-medium">{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '2,400+', label: 'VAs en el ecosistema', color: 'text-gold' },
            { value: '$400→$2,100', label: 'Incremento salarial promedio', color: 'text-emerald-400' },
            { value: '94%', label: 'Tasa de recomendación', color: 'text-blue-400' },
            { value: '12', label: 'Países LATAM', color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl border border-border bg-card/30">
              <p className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
