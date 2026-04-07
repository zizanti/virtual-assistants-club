export type JobStatus = 'active' | 'pending' | 'closed'
export type ApplicationStatus = 'Pending' | 'Reviewing' | 'Placed' | 'Rejected'

export interface Job {
  id: string
  title: string
  company: string
  companyInitials: string
  companyColor: string
  salary: string
  salaryMin: number
  salaryMax: number
  skills: string[]
  location: string
  postedDate: string
  daysAgo: number
  type: string
  featured: boolean
  status: JobStatus
  description: string
  experience: string
}

export interface Candidate {
  id: string
  name: string
  initials: string
  avatarColor: string
  appliedRole: string
  experience: string
  status: ApplicationStatus
  appliedDate: string
  company: string
}

export interface PendingJob {
  id: string
  title: string
  company: string
  salary: string
  source: string
  scrapedAt: string
}

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Executive Assistant to CEO',
    company: 'Accenture',
    companyInitials: 'AC',
    companyColor: '#A100FF',
    salary: '$4,000 – $6,000/mo',
    salaryMin: 4000,
    salaryMax: 6000,
    skills: ['Calendar Mgmt', 'Notion', 'Slack', 'Travel Coord'],
    location: 'Remote USA',
    postedDate: 'Jan 28, 2025',
    daysAgo: 2,
    type: 'Full-time',
    featured: true,
    status: 'active',
    description: 'Support the CEO with daily operations, calendar management, and strategic communications.',
    experience: '3+ years',
  },
  {
    id: '2',
    title: 'Senior Virtual Assistant',
    company: 'Stripe',
    companyInitials: 'ST',
    companyColor: '#635BFF',
    salary: '$3,500 – $5,000/mo',
    salaryMin: 3500,
    salaryMax: 5000,
    skills: ['Project Mgmt', 'Asana', 'G-Suite', 'Research'],
    location: 'Remote USA',
    postedDate: 'Jan 27, 2025',
    daysAgo: 3,
    type: 'Full-time',
    featured: false,
    status: 'active',
    description: 'Manage complex projects and provide high-level executive support to senior leadership.',
    experience: '2+ years',
  },
  {
    id: '3',
    title: 'Operations EA',
    company: 'Notion',
    companyInitials: 'NO',
    companyColor: '#000000',
    salary: '$3,000 – $4,500/mo',
    salaryMin: 3000,
    salaryMax: 4500,
    skills: ['Notion', 'Zapier', 'Loom', 'SOPs'],
    location: 'Remote USA',
    postedDate: 'Jan 26, 2025',
    daysAgo: 4,
    type: 'Part-time',
    featured: false,
    status: 'active',
    description: 'Build and maintain SOPs and operational workflows using Notion and automation tools.',
    experience: '2+ years',
  },
  {
    id: '4',
    title: 'Chief of Staff Assistant',
    company: 'OpenAI',
    companyInitials: 'OA',
    companyColor: '#10A37F',
    salary: '$5,000 – $7,500/mo',
    salaryMin: 5000,
    salaryMax: 7500,
    skills: ['Strategic Ops', 'ChatGPT', 'Data Viz', 'Meeting Mgmt'],
    location: 'Remote USA',
    postedDate: 'Jan 25, 2025',
    daysAgo: 5,
    type: 'Full-time',
    featured: true,
    status: 'active',
    description: 'Act as a strategic partner to the Chief of Staff, coordinating cross-functional initiatives.',
    experience: '4+ years',
  },
  {
    id: '5',
    title: 'Personal EA & Lifestyle Manager',
    company: 'Sequoia Capital',
    companyInitials: 'SQ',
    companyColor: '#D4A843',
    salary: '$4,500 – $6,500/mo',
    salaryMin: 4500,
    salaryMax: 6500,
    skills: ['Personal Assistance', 'Travel', 'Events', 'Confidentiality'],
    location: 'Remote USA',
    postedDate: 'Jan 24, 2025',
    daysAgo: 6,
    type: 'Full-time',
    featured: false,
    status: 'active',
    description: 'Manage personal and professional life of a senior partner, including travel, events, and logistics.',
    experience: '3+ years',
  },
  {
    id: '6',
    title: 'Marketing VA & Content Coordinator',
    company: 'HubSpot',
    companyInitials: 'HS',
    companyColor: '#FF7A59',
    salary: '$2,500 – $4,000/mo',
    salaryMin: 2500,
    salaryMax: 4000,
    skills: ['Social Media', 'Canva', 'HubSpot', 'Content'],
    location: 'Remote USA',
    postedDate: 'Jan 23, 2025',
    daysAgo: 7,
    type: 'Contract',
    featured: false,
    status: 'active',
    description: 'Support marketing team with content creation, scheduling, and campaign coordination.',
    experience: '1+ years',
  },
  {
    id: '7',
    title: 'Bilingual EA (EN/ES)',
    company: 'Ramp',
    companyInitials: 'RA',
    companyColor: '#00C805',
    salary: '$3,500 – $5,000/mo',
    salaryMin: 3500,
    salaryMax: 5000,
    skills: ['Spanish', 'English', 'CRM', 'Scheduling'],
    location: 'Remote LATAM',
    postedDate: 'Jan 20, 2025',
    daysAgo: 10,
    type: 'Full-time',
    featured: false,
    status: 'pending',
    description: 'Bilingual executive assistant to support a fast-growing fintech team across US and LATAM markets.',
    experience: '2+ years',
  },
  {
    id: '8',
    title: 'Remote EA – Real Estate Team',
    company: 'Compass',
    companyInitials: 'CO',
    companyColor: '#2D2D2D',
    salary: '$3,000 – $4,000/mo',
    salaryMin: 3000,
    salaryMax: 4000,
    skills: ['CRM', 'DocuSign', 'Scheduling', 'Client Mgmt'],
    location: 'Remote USA',
    postedDate: 'Jan 19, 2025',
    daysAgo: 11,
    type: 'Part-time',
    featured: false,
    status: 'pending',
    description: 'Support a top-producing real estate team with client coordination, document management, and scheduling.',
    experience: '1+ years',
  },
  {
    id: '9',
    title: 'Executive VA – Fintech Startup',
    company: 'Brex',
    companyInitials: 'BR',
    companyColor: '#7C3AED',
    salary: '$4,000 – $5,500/mo',
    salaryMin: 4000,
    salaryMax: 5500,
    skills: ['Brex', 'Expense Mgmt', 'Board Prep', 'Notion'],
    location: 'Remote USA',
    postedDate: 'Jan 15, 2025',
    daysAgo: 15,
    type: 'Full-time',
    featured: false,
    status: 'pending',
    description: 'Join a high-growth fintech startup and support executive leadership with operations and communications.',
    experience: '3+ years',
  },
  {
    id: '10',
    title: 'EA to VP of Product',
    company: 'Figma',
    companyInitials: 'FG',
    companyColor: '#F24E1E',
    salary: '$4,200 – $5,800/mo',
    salaryMin: 4200,
    salaryMax: 5800,
    skills: ['Figma', 'Product Ops', 'Roadmap', 'Slack'],
    location: 'Remote USA',
    postedDate: 'Dec 15, 2024',
    daysAgo: 45,
    type: 'Full-time',
    featured: false,
    status: 'closed',
    description: 'Provide executive support to the VP of Product including roadmap coordination and stakeholder communication.',
    experience: '3+ years',
  },
  {
    id: '11',
    title: 'Administrative VA',
    company: 'Intercom',
    companyInitials: 'IC',
    companyColor: '#1F8DED',
    salary: '$2,000 – $3,000/mo',
    salaryMin: 2000,
    salaryMax: 3000,
    skills: ['Admin', 'Email Mgmt', 'Data Entry', 'Zendesk'],
    location: 'Remote Global',
    postedDate: 'Dec 10, 2024',
    daysAgo: 50,
    type: 'Part-time',
    featured: false,
    status: 'closed',
    description: 'Handle administrative tasks including inbox management, data entry, and customer communications.',
    experience: '1+ years',
  },
  {
    id: '12',
    title: 'Chief of Staff EA',
    company: 'Loom',
    companyInitials: 'LO',
    companyColor: '#625DF5',
    salary: '$5,500 – $7,000/mo',
    salaryMin: 5500,
    salaryMax: 7000,
    skills: ['Loom', 'Strategic Ops', 'OKRs', 'All-hands'],
    location: 'Remote USA',
    postedDate: 'Nov 28, 2024',
    daysAgo: 62,
    type: 'Full-time',
    featured: true,
    status: 'closed',
    description: 'Partner with the Chief of Staff to drive company-wide operations and executive communications.',
    experience: '5+ years',
  },
]

export const CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Valentina García',
    initials: 'VG',
    avatarColor: '#D4A843',
    appliedRole: 'Executive Assistant to CEO',
    experience: '5 years',
    status: 'Reviewing',
    appliedDate: '2 hours ago',
    company: 'Accenture',
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    initials: 'CM',
    avatarColor: '#E8650A',
    appliedRole: 'Senior Virtual Assistant',
    experience: '3 years',
    status: 'Pending',
    appliedDate: '5 hours ago',
    company: 'Stripe',
  },
  {
    id: '3',
    name: 'Lucia Fernández',
    initials: 'LF',
    avatarColor: '#635BFF',
    appliedRole: 'Chief of Staff Assistant',
    experience: '6 years',
    status: 'Placed',
    appliedDate: '1 day ago',
    company: 'OpenAI',
  },
  {
    id: '4',
    name: 'Andrés Restrepo',
    initials: 'AR',
    avatarColor: '#10A37F',
    appliedRole: 'Operations EA',
    experience: '2 years',
    status: 'Pending',
    appliedDate: '1 day ago',
    company: 'Notion',
  },
  {
    id: '5',
    name: 'Isabella Torres',
    initials: 'IT',
    avatarColor: '#FF7A59',
    appliedRole: 'Personal EA & Lifestyle Manager',
    experience: '4 years',
    status: 'Reviewing',
    appliedDate: '2 days ago',
    company: 'Sequoia Capital',
  },
  {
    id: '6',
    name: 'Miguel Ríos',
    initials: 'MR',
    avatarColor: '#A100FF',
    appliedRole: 'Marketing VA & Content Coordinator',
    experience: '2 years',
    status: 'Placed',
    appliedDate: '3 days ago',
    company: 'HubSpot',
  },
]

export const PENDING_JOBS: PendingJob[] = [
  {
    id: 'p1',
    title: 'Executive VA – Fintech Startup',
    company: 'Brex',
    salary: '$4,000 – $5,500/mo',
    source: 'LinkedIn',
    scrapedAt: '30 min ago',
  },
  {
    id: 'p2',
    title: 'Remote EA – Real Estate Team',
    company: 'Compass',
    salary: '$3,000 – $4,000/mo',
    source: 'Indeed',
    scrapedAt: '1 hr ago',
  },
  {
    id: 'p3',
    title: 'Bilingual EA (EN/ES)',
    company: 'Ramp',
    salary: '$3,500 – $5,000/mo',
    source: 'Google',
    scrapedAt: '2 hrs ago',
  },
]

export const CHART_DATA = {
  '7D': [
    { date: 'Jan 23', applications: 12, placements: 3 },
    { date: 'Jan 24', applications: 19, placements: 5 },
    { date: 'Jan 25', applications: 15, placements: 4 },
    { date: 'Jan 26', applications: 28, placements: 7 },
    { date: 'Jan 27', applications: 22, placements: 6 },
    { date: 'Jan 28', applications: 35, placements: 9 },
    { date: 'Jan 29', applications: 30, placements: 8 },
  ],
  '30D': [
    { date: 'Jan 1', applications: 45, placements: 8 },
    { date: 'Jan 5', applications: 62, placements: 12 },
    { date: 'Jan 10', applications: 58, placements: 11 },
    { date: 'Jan 15', applications: 79, placements: 16 },
    { date: 'Jan 20', applications: 95, placements: 20 },
    { date: 'Jan 25', applications: 110, placements: 24 },
    { date: 'Jan 29', applications: 128, placements: 28 },
  ],
  '90D': [
    { date: 'Nov 1', applications: 120, placements: 22 },
    { date: 'Nov 20', applications: 185, placements: 35 },
    { date: 'Dec 10', applications: 210, placements: 42 },
    { date: 'Dec 25', applications: 160, placements: 30 },
    { date: 'Jan 10', applications: 240, placements: 50 },
    { date: 'Jan 20', applications: 295, placements: 62 },
    { date: 'Jan 29', applications: 320, placements: 70 },
  ],
}

export const TRAFFIC_SOURCES = [
  { name: 'LinkedIn', value: 42, color: '#0A66C2' },
  { name: 'Direct', value: 28, color: '#D4A843' },
  { name: 'TikTok', value: 18, color: '#E8650A' },
  { name: 'Google', value: 12, color: '#4285F4' },
]
