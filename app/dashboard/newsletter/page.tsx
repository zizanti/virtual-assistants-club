'use client'

import { useEffect, useState } from 'react'

interface Subscriber {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  platform: string | null
  date_added: string
  imported_from: string
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter/list')
      const data = await response.json()
      
      if (data.success) {
        setSubscribers(data.subscribers)
      } else {
        setError('Error cargando contactos: ' + (data.error || 'Unknown'))
      }
    } catch (err) {
      setError('Error de conexión: ' + (err instanceof Error ? err.message : 'Unknown'))
    } finally {
      setLoading(false)
    }
  }

  const exportCSV = () => {
    const headers = ['email', 'first_name', 'last_name']
    const csvContent = [
      headers.join(','),
      ...subscribers.map(s => 
        [s.email, s.first_name || '', s.last_name || ''].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vaclub-newsletter-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filtered = subscribers.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: subscribers.length,
    beacons: subscribers.filter(s => s.imported_from === 'beacons').length,
    vac: subscribers.filter(s => s.imported_from === 'website' || !s.imported_from).length,
    instagram: subscribers.filter(s => s.platform === 'Instagram').length,
    tiktok: subscribers.filter(s => s.platform === 'TikTok').length,
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>
  if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>📧 Newsletter Subscribers</h1>
      <p style={{ color: '#666', marginBottom: 30 }}>
        Total: <strong>{stats.total}</strong> suscriptores • {stats.beacons} de Beacons • {stats.vac} de VAC
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15, marginBottom: 30 }}>
        <div style={{ padding: 20, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#D4AF37' }}>{stats.total}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 5 }}>TOTAL</div>
        </div>
        <div style={{ padding: 20, background: '#dbeafe', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#1e40af' }}>{stats.beacons}</div>
          <div style={{ fontSize: 12, color: '#1e40af', marginTop: 5 }}>BEACONS</div>
        </div>
        <div style={{ padding: 20, background: '#d1fae5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#065f46' }}>{stats.vac}</div>
          <div style={{ fontSize: 12, color: '#065f46', marginTop: 5 }}>VAC WEB</div>
        </div>
        <div style={{ padding: 20, background: '#fce7f3', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#be185d' }}>{stats.instagram}</div>
          <div style={{ fontSize: 12, color: '#be185d', marginTop: 5 }}>INSTAGRAM</div>
        </div>
        <div style={{ padding: 20, background: '#cffafe', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#0e7490' }}>{stats.tiktok}</div>
          <div style={{ fontSize: 12, color: '#0e7490', marginTop: 5 }}>TIKTOK</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: 6, border: '1px solid #ddd', flex: 1, minWidth: 200, fontSize: 14 }}
        />
        <button
          onClick={exportCSV}
          style={{ 
            padding: '10px 20px', 
            background: '#D4AF37', 
            color: 'white', 
            border: 'none', 
            borderRadius: 6, 
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 'bold'
          }}
        >
          📥 Exportar CSV para Substack
        </button>
      </div>

      {/* Instructions */}
      <div style={{ background: '#fef3c7', padding: 15, borderRadius: 8, marginBottom: 20, border: '1px solid #fbbf24' }}>
        <strong>📋 Pasos para Substack:</strong>
        <ol style={{ margin: '10px 0', paddingLeft: 20 }}>
          <li>Click en "Exportar CSV" arriba</li>
          <li>Ve a Substack → Dashboard → Subscribers → Import</li>
          <li>Sube el archivo CSV</li>
          <li>Listo! Todos tus contactos estarán en Substack</li>
        </ol>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Nombre</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Plataforma</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Origen</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{s.email}</td>
                <td style={{ padding: '12px' }}>{s.first_name} {s.last_name}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    color: s.platform === 'Instagram' ? '#be185d' : s.platform === 'TikTok' ? '#0e7490' : '#666'
                  }}>
                    {s.platform || 'Website'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: 20, 
                    fontSize: 11,
                    fontWeight: 'bold',
                    background: s.imported_from === 'beacons' ? '#dbeafe' : '#d1fae5',
                    color: s.imported_from === 'beacons' ? '#1e40af' : '#065f46'
                  }}>
                    {s.imported_from === 'beacons' ? 'Beacons' : 'VAC'}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#666' }}>
                  {new Date(s.date_added).toLocaleDateString('es-CO')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
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
