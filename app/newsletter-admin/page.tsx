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
        setError('Error cargando contactos')
      }
    } catch (err) {
      setError('Error de conexión')
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Newsletter Subscribers</h1>
      <p style={{ color: '#666', marginBottom: 30 }}>
        Total: {stats.total} suscriptores • {stats.beacons} de Beacons • {stats.vac} de VAC
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15, marginBottom: 30 }}>
        <div style={{ padding: 15, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#D4AF37' }}>{stats.total}</div>
          <div style={{ fontSize: 12, color: '#666' }}>Total</div>
        </div>
        <div style={{ padding: 15, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#3b82f6' }}>{stats.beacons}</div>
          <div style={{ fontSize: 12, color: '#666' }}>Beacons</div>
        </div>
        <div style={{ padding: 15, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#10b981' }}>{stats.vac}</div>
          <div style={{ fontSize: 12, color: '#666' }}>VAC Web</div>
        </div>
        <div style={{ padding: 15, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#ec4899' }}>{stats.instagram}</div>
          <div style={{ fontSize: 12, color: '#666' }}>Instagram</div>
        </div>
        <div style={{ padding: 15, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#06b6d4' }}>{stats.tiktok}</div>
          <div style={{ fontSize: 12, color: '#666' }}>TikTok</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', flex: 1, minWidth: 200 }}
        />
        <button
          onClick={exportCSV}
          style={{ padding: '8px 16px', background: '#D4AF37', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Exportar CSV para Substack
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Nombre</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Plataforma</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Origen</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontSize: 14 }}>{s.email}</td>
                <td style={{ padding: '12px', fontSize: 14 }}>{s.first_name} {s.last_name}</td>
                <td style={{ padding: '12px', fontSize: 14 }}>
                  <span style={{ 
                    color: s.platform === 'Instagram' ? '#ec4899' : s.platform === 'TikTok' ? '#06b6d4' : '#666'
                  }}>
                    {s.platform || 'Website'}
                  </span>
                </td>
                <td style={{ padding: '12px', fontSize: 14 }}>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: 4, 
                    fontSize: 11,
                    background: s.imported_from === 'beacons' ? '#dbeafe' : '#d1fae5',
                    color: s.imported_from === 'beacons' ? '#1e40af' : '#065f46'
                  }}>
                    {s.imported_from === 'beacons' ? 'Beacons' : 'VAC'}
                  </span>
                </td>
                <td style={{ padding: '12px', fontSize: 14, color: '#666' }}>
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
