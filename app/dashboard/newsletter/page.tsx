'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Users, 
  Search, 
  TrendingUp, 
  Instagram, 
  Smartphone,
  Globe,
  Mail,
  ArrowRight
} from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  source: string
  platform: string | null
  date_added: string
  imported_from: string
}

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    fromBeacons: 0,
    fromVac: 0,
    fromInstagram: 0,
    fromTikTok: 0,
    fromBeaconsDirect: 0,
  })

  useEffect(() => {
    fetchSubscribers()
    fetchStats()
  }, [])

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('date_added', { ascending: false })

    if (error) {
      console.error('Error fetching subscribers:', error)
      return
    }

    setSubscribers(data || [])
    setLoading(false)
  }

  const fetchStats = async () => {
    const { count: total } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })

    const { count: beacons } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('imported_from', 'beacons')

    const { count: vac } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('imported_from', 'website_vaclub')

    const { count: instagram } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('platform', 'Instagram')

    const { count: tiktok } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('platform', 'TikTok')

    const { count: beaconsDirect } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('platform', 'Beacons')

    setStats({
      total: total || 0,
      fromBeacons: beacons || 0,
      fromVac: vac || 0,
      fromInstagram: instagram || 0,
      fromTikTok: tiktok || 0,
      fromBeaconsDirect: beaconsDirect || 0,
    })
  }

  const exportToCSV = () => {
    const headers = ['email', 'first_name', 'last_name', 'source', 'platform', 'date_added', 'imported_from']
    const csvContent = [
      headers.join(','),
      ...subscribers.map(s => 
        [
          s.email, 
          s.first_name || '', 
          s.last_name || '', 
          s.source, 
          s.platform || '', 
          s.date_added,
          s.imported_from
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vaclub-newsletter-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const exportForSubstack = () => {
    // Substack format: email, first_name, last_name
    const headers = ['email', 'first_name', 'last_name']
    const csvContent = [
      headers.join(','),
      ...subscribers.map(s => 
        [
          s.email, 
          s.first_name || '', 
          s.last_name || ''
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `substack-import-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
          Cargando suscriptores...
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Newsletter</h1>
            <p className="text-muted-foreground">
              {stats.total} suscriptores totales • Último import: {new Date().toLocaleDateString('es-CO')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportForSubstack} variant="outline" className="border-gold text-gold hover:bg-gold/10">
              <Mail className="mr-2 h-4 w-4" />
              Exportar para Substack
            </Button>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Total</CardTitle>
              <Users className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Beacons</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.fromBeacons}</div>
              <p className="text-[10px] text-muted-foreground">Históricos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">VAC Web</CardTitle>
              <Globe className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.fromVac}</div>
              <p className="text-[10px] text-muted-foreground">Nuevos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Instagram</CardTitle>
              <Instagram className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.fromInstagram}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">TikTok</CardTitle>
              <Smartphone className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.fromTikTok}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Directo</CardTitle>
              <ArrowRight className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.fromBeaconsDirect}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Status */}
        <Card className="bg-gradient-to-r from-gold/10 to-orange/10 border-gold/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">Pipeline: VAC → Supabase → Substack</h3>
                  <p className="text-sm text-muted-foreground">
                    vaclub.co captura → Supabase consolida → Substack envía newsletter
                  </p>
                </div>
              </div>
              <Button 
                onClick={exportForSubstack}
                className="bg-gold text-black hover:bg-gold/90"
              >
                Preparar para Substack
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por email, nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Todos los suscriptores ({filteredSubscribers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Nombre</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Origen</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Plataforma</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-medium">{subscriber.email}</td>
                      <td className="py-3 px-4 text-sm">
                        {subscriber.first_name || subscriber.last_name ? (
                          <span>{subscriber.first_name} {subscriber.last_name}</span>
                        ) : (
                          <span className="text-muted-foreground italic">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={subscriber.imported_from === 'beacons' ? 'secondary' : 'default'}
                          className={subscriber.imported_from === 'beacons' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}
                        >
                          {subscriber.imported_from === 'beacons' ? 'Beacons' : 'VAC'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`
                          ${subscriber.platform === 'Instagram' ? 'text-pink-500' : ''}
                          ${subscriber.platform === 'TikTok' ? 'text-cyan-500' : ''}
                          ${subscriber.platform === 'Beacons' ? 'text-orange-500' : ''}
                          ${!subscriber.platform ? 'text-muted-foreground' : ''}
                        `}>
                          {subscriber.platform || 'Website'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(subscriber.date_added).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
