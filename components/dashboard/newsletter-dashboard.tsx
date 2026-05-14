'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Download, Users, Search, TrendingUp, Instagram, Smartphone } from 'lucide-react'

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

export function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    fromBeacons: 0,
    fromVac: 0,
    fromInstagram: 0,
    fromTikTok: 0,
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
      .limit(100)

    if (error) {
      console.error('Error fetching subscribers:', error)
      return
    }

    setSubscribers(data || [])
    setLoading(false)
  }

  const fetchStats = async () => {
    const { data: total } = await supabase
      .from('newsletter_subscribers')
      .select('id', { count: 'exact' })

    const { data: beacons } = await supabase
      .from('newsletter_subscribers')
      .select('id', { count: 'exact' })
      .eq('imported_from', 'beacons')

    const { data: vac } = await supabase
      .from('newsletter_subscribers')
      .select('id', { count: 'exact' })
      .eq('imported_from', 'website_vaclub')

    const { data: instagram } = await supabase
      .from('newsletter_subscribers')
      .select('id', { count: 'exact' })
      .eq('platform', 'Instagram')

    const { data: tiktok } = await supabase
      .from('newsletter_subscribers')
      .select('id', { count: 'exact' })
      .eq('platform', 'TikTok')

    setStats({
      total: total?.length || 0,
      fromBeacons: beacons?.length || 0,
      fromVac: vac?.length || 0,
      fromInstagram: instagram?.length || 0,
      fromTikTok: tiktok?.length || 0,
    })
  }

  const exportToCSV = () => {
    const headers = ['email', 'first_name', 'last_name', 'source', 'platform', 'date_added']
    const csvContent = [
      headers.join(','),
      ...subscribers.map(s => 
        [s.email, s.first_name || '', s.last_name || '', s.source, s.platform || '', s.date_added].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Cargando suscriptores...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suscriptores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">De Beacons</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fromBeacons}</div>
            <p className="text-xs text-muted-foreground">Históricos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instagram</CardTitle>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fromInstagram}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TikTok</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fromTikTok}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por email o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Suscriptores</CardTitle>
          <CardDescription>
            Mostrando {filteredSubscribers.length} de {stats.total} suscriptores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Origen</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plataforma</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{subscriber.email}</td>
                    <td className="py-3 px-4 text-sm">
                      {subscriber.first_name} {subscriber.last_name}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={subscriber.imported_from === 'beacons' ? 'secondary' : 'default'}>
                        {subscriber.imported_from === 'beacons' ? 'Beacons' : 'VAC'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{subscriber.platform || 'Website'}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(subscriber.date_added).toLocaleDateString('es-CO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
