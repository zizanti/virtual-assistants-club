import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const JOBS = [
  { title: 'Executive Assistant to CEO', company: '', salary: '$1,800 – $2,200/mo', type: 'Full-time', description: 'Provide high-level executive support to the CEO including calendar management, travel coordination, and meeting preparation. Must be highly organized and proactive.' },
  { title: 'Virtual Assistant – Administrative Support', company: '', salary: '$1,200 – $1,500/mo', type: 'Part-time', description: 'Handle daily administrative tasks: email inbox management, data entry, scheduling, and document preparation.' },
  { title: 'Chief of Staff – Early Stage Startup', company: '', salary: '$2,000 – $2,500/mo', type: 'Full-time', description: 'Act as a strategic right-hand to the founder. Manage cross-functional projects, prepare board materials, coordinate all-hands meetings, and drive operational initiatives. This role requires someone who can think strategically while also executing with precision.' },
  { title: 'Executive Assistant – Bilingual (EN/ES)', company: 'Stealth Fintech', salary: '$1,600 – $2,000/mo', type: 'Full-time', description: 'Support a fast-growing fintech leadership team across US and LATAM markets. Bilingual communication is essential.' },
  { title: 'Virtual Assistant – Social Media & Content', company: '', salary: '$1,300 – $1,600/mo', type: 'Contract', description: 'Support marketing team with content scheduling, social media management, and basic graphic design using Canva.' },
  { title: 'Personal EA to High-Net-Worth Individual', company: '', salary: '$2,200 – $2,500/mo', type: 'Full-time', description: 'Manage both professional and personal life of a senior executive. Responsibilities include travel planning, event coordination, household management, and confidential communications. Discretion and trustworthiness are critical.' },
  { title: 'Operations Virtual Assistant', company: '', salary: '$1,400 – $1,700/mo', type: 'Full-time', description: 'Build and maintain SOPs, manage operational workflows in Notion, and support the operations team with process improvements.' },
  { title: 'Executive Assistant – Real Estate Team', company: '', salary: '$1,500 – $1,800/mo', type: 'Part-time', description: 'Support a top-producing real estate team with client coordination, contract management via DocuSign, and scheduling property showings.' },
  { title: 'Chief of Staff Assistant – SaaS Company', company: '', salary: '$1,900 – $2,300/mo', type: 'Full-time', description: 'Work closely with the Chief of Staff to drive company-wide operations. Prepare executive reports, coordinate leadership meetings, track KPIs, and manage special projects from start to finish.' },
  { title: 'Virtual Assistant – Customer Support', company: '', salary: '$1,200 – $1,400/mo', type: 'Full-time', description: 'Handle customer inquiries via email and chat. Process refunds, update customer records, and escalate complex issues. Zendesk experience preferred.' },
  { title: 'Executive Assistant – E-commerce Brand', company: '', salary: '$1,700 – $2,000/mo', type: 'Full-time', description: 'Support the founder of a growing DTC e-commerce brand. Manage inbox, coordinate with suppliers, handle order issues, and assist with product launch logistics.' },
  { title: 'Virtual Assistant – Podcast & Media Production', company: '', salary: '$1,300 – $1,600/mo', type: 'Contract', description: 'Coordinate podcast guests, manage booking calendars, prepare show notes, and handle post-production admin tasks.' },
  { title: 'Senior Executive Assistant – Tech Company', company: '', salary: '$2,000 – $2,500/mo', type: 'Full-time', description: 'Support C-suite executives at a mid-size tech company. Manage complex calendars across multiple time zones, prepare board and investor materials, and coordinate quarterly planning sessions. This is a senior-level role requiring exceptional communication skills and the ability to handle sensitive information with complete discretion.' },
  { title: 'Virtual Assistant – Data Entry & Research', company: '', salary: '$1,200 – $1,400/mo', type: 'Part-time', description: 'Conduct market research, compile data into spreadsheets, and maintain CRM records. Attention to detail is key.' },
  { title: 'Executive Assistant – Health & Wellness Startup', company: '', salary: '$1,500 – $1,800/mo', type: 'Full-time', description: 'Support the CEO of a health tech startup. Manage calendar, coordinate with product and marketing teams, handle travel arrangements, and assist with investor meeting prep.' },
  { title: 'Virtual Assistant – Bookkeeping & Finance Support', company: '', salary: '$1,400 – $1,700/mo', type: 'Full-time', description: 'Assist with expense tracking, invoice processing, and monthly reconciliation. QuickBooks experience required.' },
  { title: 'Chief of Staff – Nonprofit Organization', company: '', salary: '$1,800 – $2,200/mo', type: 'Full-time', description: 'Support the Executive Director of an international nonprofit. Coordinate board meetings, manage grant reporting timelines, oversee operational projects, and serve as liaison between leadership and program teams.' },
  { title: 'Executive Assistant – Creative Agency', company: 'Confidential Agency', salary: '$1,600 – $2,000/mo', type: 'Full-time', description: 'Support agency leadership with project coordination, client communications, and internal operations. Must thrive in a fast-paced, creative environment.' },
  { title: 'Virtual Assistant – Email & Inbox Management Specialist', company: '', salary: '$1,200 – $1,500/mo', type: 'Part-time', description: 'Dedicated inbox management for busy executives. Sort, prioritize, draft responses, and flag urgent items. Zero Inbox methodology preferred.' },
  { title: 'Executive Assistant & Office Manager (Remote)', company: '', salary: '$1,700 – $2,100/mo', type: 'Full-time', description: 'Dual role supporting the leadership team while managing remote office operations. Responsibilities include team onboarding coordination, vendor management, expense reports, event planning for company retreats, and maintaining internal documentation in Notion.' },
]

export async function GET() {
  try {
    const cleanJobs = JOBS.map(j => ({
      title: j.title,
      company: j.company || 'Confidential',
      salary: j.salary,
      type: j.type,
      description: j.description,
    }))

    const { data, error } = await supabase.from('jobs').insert(cleanJobs).select()

    if (error) {
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }

    return NextResponse.json({ success: true, count: data?.length ?? 0 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to seed jobs' }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
