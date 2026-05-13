import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Mail, 
  Youtube, 
  Instagram, 
  Linkedin,
  BookOpen,
  Crown,
  Users,
  ExternalLink,
  TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Zizanti — Links | Virtual Assistants Club',
  description: 'Executive Assistant, Founder de VAC, y creador de contenido. Todo en un solo lugar.',
}

const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@zizanti',
    description: 'Finanzas, dinero, inversiones y algo de moto',
    icon: Youtube,
    color: 'hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/zizantii/?hl=es-la',
    description: '@zizantii',
    icon: Instagram,
    color: 'hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/30',
  },
  {
    name: 'TikTok VA',
    url: 'https://www.tiktok.com/@zizantiyt',
    description: '@zizantiyt — Virtual Assistants',
    icon: ExternalLink,
    color: 'hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500/30',
  },
  {
    name: 'TikTok Motos',
    url: 'https://www.tiktok.com/@zizantii',
    description: '@zizantii — Motos y lifestyle',
    icon: ExternalLink,
    color: 'hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500/30',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/david-moreno-ea',
    description: 'David Santiago Moreno Rodriguez',
    icon: Linkedin,
    color: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30',
  },
  {
    name: 'Email',
    url: 'mailto:zizanti.va@gmail.com',
    description: 'zizanti.va@gmail.com',
    icon: Mail,
    color: 'hover:bg-gold/10 hover:text-gold hover:border-gold/30',
  },
]

const VAC_LINKS = [
  {
    name: 'Guía Gratis',
    url: '/guia-gratis',
    description: 'Cómo conseguir trabajo remoto en USA desde LATAM',
    icon: BookOpen,
    badge: 'GRATIS',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
  },
  {
    name: 'Guía Premium',
    url: '/guia-premium',
    description: 'De Call Center a EA con clientes en USA — $39,000 COP',
    icon: Crown,
    badge: '$39K',
    color: 'bg-gold/10 text-gold border-gold/20 hover:bg-gold/20',
  },
  {
    name: 'Mentoría 1:1',
    url: '/coaching',
    description: 'Sesión personalizada 45 min — HOT DEAL $100K (antes $169K)',
    icon: TrendingUp,
    badge: 'HOT DEAL',
    color: 'bg-orange-500/10 text-orange border-orange-500/20 hover:bg-orange-500/20',
  },
  {
    name: 'Comunidad Skool',
    url: 'https://www.skool.com/virtual-assistants-latam-2741/about',
    description: 'Únete a +2,400 VAs construyendo carreras remotas',
    icon: Users,
    badge: '+2,400 miembros',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
  },
]

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gold/[0.02] via-transparent to-gold/[0.02] pointer-events-none" />
      
      <div className="relative max-w-lg mx-auto px-4 py-12 md:py-16">
        {/* Profile Header */}
        <div className="text-center mb-10">
          {/* Avatar placeholder */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/30 flex items-center justify-center">
            <span className="text-3xl font-bold text-gold">Z</span>
          </div>
          
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            David Santiago
          </h1>
          <p className="text-gold font-medium text-sm mb-1">@zizanti</p>
          
          <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
            Executive Assistant remoto • De call center a ganar en USD • Founder de VAC • 
            4+ años ayudando a VAs LATAM a conseguir trabajo remoto
          </p>
          
          {/* Quick stat */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
            <TrendingUp size={12} className="text-gold" />
            <span className="text-xs text-gold font-medium">2,400+ asistentes transformados</span>
          </div>
        </div>

        {/* VAC Links */}
        <div className="space-y-3 mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">
            Recursos VAC
          </p>
          {VAC_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${link.color}`}
            >
              <div className="flex-shrink-0">
                <link.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{link.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-foreground/10 text-foreground/70 font-medium">
                    {link.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{link.description}</p>
              </div>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs text-muted-foreground">Redes Sociales</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card/50 transition-all duration-300 ${link.color}`}
            >
              <link.icon size={24} />
              <span className="text-xs font-medium">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
          >
            <span className="font-bold text-gold">VAC</span>
            Virtual Assistants Club
          </Link>
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            © 2026 Zizanti. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  )
}
