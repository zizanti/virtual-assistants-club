'use client'

import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ROLE_TYPES = ['All Roles', 'Executive Assistant', 'Operations EA', 'Personal EA', 'Marketing VA', 'Chief of Staff']
const SALARY_RANGES = ['Any Salary', '$1k–$2k/mo', '$2k–$4k/mo', '$4k–$6k/mo', '$6k+/mo']
const SKILLS = ['All Skills', 'Notion', 'Asana', 'G-Suite', 'Zapier', 'Calendar Mgmt', 'Travel Coord']
const LOCATIONS = ['All Locations', 'Remote USA', 'Remote Canada', 'Remote UK', 'Hybrid']

interface FilterBarProps {
  onSearch: (q: string) => void
  onRoleType: (v: string) => void
  onSalary: (v: string) => void
  onSkill: (v: string) => void
  onLocation: (v: string) => void
}

function FilterDropdown({
  label,
  options,
  onChange,
}: {
  label: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [value, setValue] = useState(options[0])
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-11 rounded-xl border border-border bg-card px-4 text-sm text-muted-foreground hover:border-gold/40 hover:text-foreground transition-colors whitespace-nowrap"
      >
        {value}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 min-w-[180px] rounded-xl border border-border bg-card shadow-xl py-1.5">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setValue(opt)
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:text-foreground ${
                value === opt ? 'text-gold' : 'text-muted-foreground'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function FilterBar({ onSearch, onRoleType, onSalary, onSkill, onLocation }: FilterBarProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 rounded-2xl border border-border bg-card p-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search roles, companies, skills..."
            className="pl-10 h-11 bg-secondary border-0 rounded-xl text-sm focus-visible:ring-gold/40"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown label="Role Type" options={ROLE_TYPES} onChange={onRoleType} />
          <FilterDropdown label="Salary Range" options={SALARY_RANGES} onChange={onSalary} />
          <FilterDropdown label="Skills" options={SKILLS} onChange={onSkill} />
          <FilterDropdown label="Location" options={LOCATIONS} onChange={onLocation} />

          <button className="h-11 px-5 bg-gold text-[#0A0A0A] hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] font-semibold rounded-xl transition-all duration-200">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
