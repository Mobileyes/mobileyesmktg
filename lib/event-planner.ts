/**
 * EVENT PIPELINE PLANNER
 * 
 * Plans Mobileyes' approach to industry events as a one-man army.
 * Works backwards from event dates to ensure:
 * - Attendee research is done early
 * - Messaging is tailored per target
 * - Decks/content are prepared
 * - Outreach lands at the right time
 * - Follow-ups are automated post-event
 * - Qualification questions generate pipeline
 * 
 * Events: Supernova, GCAP, MIGW, GDC, Gamescom, Gamescom Asia, TGS, PAX Aus
 */

export interface IndustryEvent {
  id: string
  name: string
  shortName: string
  location: string
  dates: { start: string; end: string } // ISO dates
  website: string
  type: 'CONFERENCE' | 'EXPO' | 'AWARDS' | 'NETWORKING'
  relevance: 'CRITICAL' | 'HIGH' | 'MEDIUM' // for Mobileyes
  description: string
  targetAudience: string[] // who attends
  mobileyesAngle: string // why we're there, what we're selling
  expectedAttendees: string[] // brands/studios we expect
  planningPhases: PlanningPhase[]
}

export interface PlanningPhase {
  phase: 'RESEARCH' | 'PREP' | 'OUTREACH' | 'EVENT' | 'FOLLOW_UP'
  name: string
  startOffset: number // days before event start (negative = before)
  endOffset: number // days before event start
  tasks: PlanningTask[]
}

export interface PlanningTask {
  id: string
  title: string
  description: string
  category: 'RESEARCH' | 'CONTENT' | 'OUTREACH' | 'LOGISTICS' | 'FOLLOW_UP'
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  dueOffset: number // days before event (negative = before, positive = after)
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'SKIPPED'
  calendarEventId?: string // synced to Google Calendar
  dependencies?: string[] // task IDs that must complete first
  output?: string // what this task produces (deck, email, list)
}

export interface EventLead {
  id: string
  eventId: string
  companyName: string
  contactName: string | null
  contactTitle: string | null
  contactEmail: string | null
  contactLinkedIn: string | null
  companyType: 'BRAND' | 'STUDIO' | 'AGENCY' | 'PLATFORM' | 'OTHER'
  relevance: string // why they matter to us
  qualificationStatus: 'UNQUALIFIED' | 'RESEARCHING' | 'QUALIFIED' | 'MEETING_BOOKED' | 'MET' | 'FOLLOW_UP' | 'CONVERTED' | 'DEAD'
  qualificationNotes: string[]
  outreachSent: boolean
  outreachDate: string | null
  meetingBooked: boolean
  meetingDate: string | null
  followUpDate: string | null
  estimatedValue: string | null // potential campaign value
  notes: string
}

export interface QualificationQuestion {
  id: string
  question: string
  purpose: string // what we learn from the answer
  followUp: string // what to do based on answer
  category: 'BUDGET' | 'TIMING' | 'AUDIENCE' | 'HISTORY' | 'DECISION'
}

// ─── INDUSTRY EVENTS CALENDAR 2026 ───────────────────

export const INDUSTRY_EVENTS_2026: IndustryEvent[] = [
  {
    id: 'gdc-2026',
    name: 'Game Developers Conference',
    shortName: 'GDC',
    location: 'San Francisco, USA',
    dates: { start: '2026-03-16', end: '2026-03-20' },
    website: 'https://gdconf.com',
    type: 'CONFERENCE',
    relevance: 'HIGH',
    description: 'The largest professional game dev event. Studios announce titles, agencies scout talent, UA teams plan campaigns.',
    targetAudience: ['Game Studios', 'Publishers', 'UA Teams', 'Ad Networks', 'Agencies'],
    mobileyesAngle: 'Position as APAC gaming influencer experts. Target studios launching in AU/SEA markets. Pitch performance campaigns.',
    expectedAttendees: ['Riot Games', 'Epic Games', 'miHoYo', 'Supercell', 'NetEase', 'Krafton', 'Level Infinite'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'supernova-2026',
    name: 'Supernova',
    shortName: 'Supernova',
    location: 'Melbourne, Australia',
    dates: { start: '2026-06-13', end: '2026-06-15' },
    website: 'https://supanova.com.au',
    type: 'EXPO',
    relevance: 'CRITICAL',
    description: 'Major Australian pop culture/gaming expo. Brands activate, creators attend, networking opportunities.',
    targetAudience: ['Gaming Brands', 'Publishers (ANZ)', 'Content Creators', 'Agencies', 'Sponsors'],
    mobileyesAngle: 'Home turf advantage. Meet brands face-to-face. Showcase creator roster. Book meetings with ANZ marketing teams. Host Neil if possible.',
    expectedAttendees: ['Bandai Namco ANZ', 'PlayStation ANZ', 'Xbox ANZ', 'Nintendo ANZ', 'Ubisoft ANZ', 'Local indie studios'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'gcap-2026',
    name: 'Games Connect Asia Pacific',
    shortName: 'GCAP',
    location: 'Melbourne, Australia',
    dates: { start: '2026-10-06', end: '2026-10-08' },
    website: 'https://gcap.com.au',
    type: 'CONFERENCE',
    relevance: 'CRITICAL',
    description: 'Australia\'s premier game dev conference. Industry networking, talks, business meetings. Part of Melbourne International Games Week.',
    targetAudience: ['Game Developers', 'Publishers', 'Agencies', 'Platform Holders', 'Investors'],
    mobileyesAngle: 'B2B focus. Pitch to studios and publishers directly. Position as the go-to gaming influencer agency in APAC. Speak on creator marketing ROI.',
    expectedAttendees: ['All major ANZ studios', 'IGEA members', 'Platform holders', 'Regional publishers'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'migw-2026',
    name: 'Melbourne International Games Week',
    shortName: 'MIGW',
    location: 'Melbourne, Australia',
    dates: { start: '2026-10-04', end: '2026-10-12' },
    website: 'https://gamesweek.melbourne',
    type: 'EXPO',
    relevance: 'CRITICAL',
    description: 'Week-long celebration of games in Melbourne. Includes GCAP, PAX Aus, and industry events. Maximum networking density.',
    targetAudience: ['Everyone in ANZ gaming', 'International visitors for GCAP/PAX'],
    mobileyesAngle: 'Full week of meetings. Host dinners/drinks. Be everywhere. This is our biggest annual opportunity for ANZ pipeline.',
    expectedAttendees: ['Every ANZ gaming company', 'International publishers visiting for GCAP'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'gamescom-2026',
    name: 'Gamescom',
    shortName: 'Gamescom',
    location: 'Cologne, Germany',
    dates: { start: '2026-08-19', end: '2026-08-23' },
    website: 'https://gamescom.global',
    type: 'EXPO',
    relevance: 'HIGH',
    description: 'World\'s largest gaming event by attendance. Major announcements, brand activations, business area for meetings.',
    targetAudience: ['Global Publishers', 'Studios', 'Agencies', 'Platform Holders', 'Media'],
    mobileyesAngle: 'Access global brands. Business area meetings with EU/global UA teams. Position for international campaigns.',
    expectedAttendees: ['All major publishers', 'Global agencies', 'Platform holders'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'gamescom-asia-2026',
    name: 'Gamescom Asia',
    shortName: 'Gamescom Asia',
    location: 'Singapore',
    dates: { start: '2026-10-16', end: '2026-10-19' },
    website: 'https://asia.gamescom.global',
    type: 'EXPO',
    relevance: 'HIGH',
    description: 'Asian edition of Gamescom. Key for APAC publishers and SEA market. Business matching program.',
    targetAudience: ['APAC Publishers', 'SEA Studios', 'Regional Agencies', 'Platform Holders'],
    mobileyesAngle: 'APAC is our backyard. Meet SEA publishers (Garena, Krafton SEA, VNG). Pitch APAC creator campaigns. Close proximity to AU.',
    expectedAttendees: ['Garena', 'VNG', 'Krafton SEA', 'Tencent SEA', 'Bandai Namco Asia', 'Sony Interactive Asia'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'pax-aus-2026',
    name: 'PAX Australia',
    shortName: 'PAX Aus',
    location: 'Melbourne, Australia',
    dates: { start: '2026-10-10', end: '2026-10-12' },
    website: 'https://aus.paxsite.com',
    type: 'EXPO',
    relevance: 'HIGH',
    description: 'Australia\'s biggest gaming expo (consumer-facing). Part of MIGW. Brands activate, creators attend panels.',
    targetAudience: ['Gamers', 'Creators', 'Brands activating', 'Indie devs'],
    mobileyesAngle: 'Creator showcase. Bring our roster to brand booths. Facilitate creator-brand meetings. Content creation opportunities.',
    expectedAttendees: ['All brands with ANZ presence', 'Indie studios', 'Hardware brands'],
    planningPhases: generateStandardPhases(),
  },
  {
    id: 'tgs-2026',
    name: 'Tokyo Game Show',
    shortName: 'TGS',
    location: 'Tokyo, Japan',
    dates: { start: '2026-09-24', end: '2026-09-27' },
    website: 'https://tgs.nikkeibp.co.jp/tgs/2026/en/',
    type: 'EXPO',
    relevance: 'MEDIUM',
    description: 'Japan\'s premier gaming expo. Japanese publishers announce titles. Business days for meetings.',
    targetAudience: ['Japanese Publishers', 'APAC Studios', 'Global Media'],
    mobileyesAngle: 'Access Japanese publishers (Bandai Namco, Square Enix, Capcom, SEGA). Pitch APAC creator campaigns for JP titles.',
    expectedAttendees: ['Bandai Namco', 'Square Enix', 'Capcom', 'SEGA', 'Konami', 'Sony', 'Nintendo'],
    planningPhases: generateStandardPhases(),
  },
]

// ─── QUALIFICATION QUESTIONS ──────────────────────────

export const QUALIFICATION_QUESTIONS: QualificationQuestion[] = [
  {
    id: 'q-budget',
    question: 'What\'s your typical influencer marketing budget per campaign?',
    purpose: 'Understand if they\'re a viable client. Sub-$5K = probably not worth it.',
    followUp: 'If >$10K: fast-track. If $5-10K: qualify further. If <$5K: nurture for later.',
    category: 'BUDGET',
  },
  {
    id: 'q-timing',
    question: 'When are you planning your next campaign? Any upcoming launches?',
    purpose: 'Identify urgency and timing. Upcoming launch = hot lead.',
    followUp: 'If <30 days: urgent outreach. If 1-3 months: nurture. If >3 months: calendar reminder.',
    category: 'TIMING',
  },
  {
    id: 'q-audience',
    question: 'What markets/regions are you targeting? What age demographic?',
    purpose: 'Match to our creator roster. APAC/ANZ = perfect fit.',
    followUp: 'If APAC/ANZ: pitch immediately. If global: pitch APAC component. If US-only: lower priority.',
    category: 'AUDIENCE',
  },
  {
    id: 'q-history',
    question: 'Have you worked with gaming creators before? What worked/didn\'t?',
    purpose: 'Understand sophistication level and pain points we can solve.',
    followUp: 'If experienced: pitch performance/attribution. If new: pitch managed service. If burned: pitch our vetting process.',
    category: 'HISTORY',
  },
  {
    id: 'q-decision',
    question: 'Who makes the final decision on influencer partnerships? Is that you or someone else?',
    purpose: 'Identify if we\'re talking to the decision maker or need to go higher.',
    followUp: 'If decision maker: close. If not: ask for intro. If agency: understand client relationship.',
    category: 'DECISION',
  },
  {
    id: 'q-kpi',
    question: 'What does success look like for you? Installs, awareness, engagement?',
    purpose: 'Understand their KPIs so we can pitch the right campaign type.',
    followUp: 'If installs: pitch performance + AppsFlyer. If awareness: pitch reach campaigns. If engagement: pitch live streams.',
    category: 'BUDGET',
  },
  {
    id: 'q-agency',
    question: 'Are you working with an agency currently, or handling influencer in-house?',
    purpose: 'Understand competitive landscape and positioning.',
    followUp: 'If in-house: pitch full service. If agency: pitch as specialist gaming partner. If switching: understand why.',
    category: 'DECISION',
  },
  {
    id: 'q-platform',
    question: 'Which platforms are most important for your audience? YouTube, Twitch, TikTok?',
    purpose: 'Match to our strongest creator verticals.',
    followUp: 'Match to roster strength. YouTube/Twitch = our sweet spot. TikTok = growing. Kick = differentiation.',
    category: 'AUDIENCE',
  },
]

// ─── PLANNING PHASE GENERATOR ─────────────────────────

function generateStandardPhases(): PlanningPhase[] {
  return [
    {
      phase: 'RESEARCH',
      name: 'Research & Intelligence',
      startOffset: -60, // 60 days before event
      endOffset: -30,
      tasks: [
        { id: 'r1', title: 'Identify confirmed attendees/exhibitors', description: 'Check event website, social media, press releases for confirmed brands', category: 'RESEARCH', priority: 'CRITICAL', dueOffset: -55, status: 'NOT_STARTED', output: 'Attendee list with company + contact' },
        { id: 'r2', title: 'Research target companies', description: 'Use brand intelligence to understand each target\'s marketing needs, recent campaigns, budget signals', category: 'RESEARCH', priority: 'HIGH', dueOffset: -50, status: 'NOT_STARTED', output: 'Company briefs with talking points' },
        { id: 'r3', title: 'Find decision makers on LinkedIn', description: 'Identify marketing/UA leads at each target company. Note mutual connections.', category: 'RESEARCH', priority: 'HIGH', dueOffset: -45, status: 'NOT_STARTED', output: 'Contact list with LinkedIn profiles' },
        { id: 'r4', title: 'Analyse market trends for talking points', description: 'Pull latest data on their games/apps (downloads, revenue, competitor activity)', category: 'RESEARCH', priority: 'MEDIUM', dueOffset: -40, status: 'NOT_STARTED', output: 'Data-driven talking points per target' },
      ],
    },
    {
      phase: 'PREP',
      name: 'Content & Collateral Prep',
      startOffset: -30,
      endOffset: -14,
      tasks: [
        { id: 'p1', title: 'Create tailored pitch deck', description: 'Build deck with relevant case studies, creator roster highlights, and market data for this event\'s audience', category: 'CONTENT', priority: 'CRITICAL', dueOffset: -28, status: 'NOT_STARTED', output: 'PDF pitch deck' },
        { id: 'p2', title: 'Prepare one-pager / leave-behind', description: 'Single page summary: who we are, what we do, key stats, QR to portfolio', category: 'CONTENT', priority: 'HIGH', dueOffset: -25, status: 'NOT_STARTED', output: 'Printed one-pager PDF' },
        { id: 'p3', title: 'Build creator showcase reel', description: 'Short video/deck showing our best creator content and results', category: 'CONTENT', priority: 'MEDIUM', dueOffset: -21, status: 'NOT_STARTED', output: 'Video reel or visual deck' },
        { id: 'p4', title: 'Prepare qualification questions', description: 'Customise qualification questions for this event\'s audience', category: 'CONTENT', priority: 'HIGH', dueOffset: -20, status: 'NOT_STARTED', output: 'Question framework' },
        { id: 'p5', title: 'Set up meeting scheduling', description: 'Create Calendly/booking link for event meetings. Block calendar.', category: 'LOGISTICS', priority: 'HIGH', dueOffset: -18, status: 'NOT_STARTED', output: 'Booking link + calendar blocks' },
      ],
    },
    {
      phase: 'OUTREACH',
      name: 'Pre-Event Outreach',
      startOffset: -14,
      endOffset: -1,
      tasks: [
        { id: 'o1', title: 'Send personalised outreach emails', description: 'Email each target with event-specific message. Reference their recent campaigns/launches.', category: 'OUTREACH', priority: 'CRITICAL', dueOffset: -12, status: 'NOT_STARTED', output: 'Emails sent, responses tracked' },
        { id: 'o2', title: 'LinkedIn connection requests', description: 'Connect with decision makers. Personalised note mentioning the event.', category: 'OUTREACH', priority: 'HIGH', dueOffset: -10, status: 'NOT_STARTED', output: 'Connection requests sent' },
        { id: 'o3', title: 'Book confirmed meetings', description: 'Lock in meeting times with anyone who responds. Confirm location/booth.', category: 'OUTREACH', priority: 'CRITICAL', dueOffset: -7, status: 'NOT_STARTED', output: 'Meeting schedule' },
        { id: 'o4', title: 'Follow-up non-responders', description: 'Second touch for anyone who didn\'t reply. Different angle/value prop.', category: 'OUTREACH', priority: 'HIGH', dueOffset: -5, status: 'NOT_STARTED', output: 'Follow-up emails sent' },
        { id: 'o5', title: 'Confirm logistics', description: 'Travel, accommodation, badge, business cards, printed materials', category: 'LOGISTICS', priority: 'HIGH', dueOffset: -3, status: 'NOT_STARTED', output: 'All logistics confirmed' },
      ],
    },
    {
      phase: 'EVENT',
      name: 'During Event',
      startOffset: 0,
      endOffset: 0,
      tasks: [
        { id: 'e1', title: 'Attend scheduled meetings', description: 'Hit all booked meetings. Take notes. Qualify leads.', category: 'OUTREACH', priority: 'CRITICAL', dueOffset: 0, status: 'NOT_STARTED', output: 'Meeting notes + lead status' },
        { id: 'e2', title: 'Walk the floor / network', description: 'Visit booths, introduce yourself, collect contacts. Be visible.', category: 'OUTREACH', priority: 'HIGH', dueOffset: 0, status: 'NOT_STARTED', output: 'New contacts collected' },
        { id: 'e3', title: 'Post event content (LinkedIn/socials)', description: 'Share photos, insights, tag people met. Build visibility.', category: 'CONTENT', priority: 'MEDIUM', dueOffset: 0, status: 'NOT_STARTED', output: 'Social posts published' },
        { id: 'e4', title: 'Evening networking / dinners', description: 'Attend after-parties, host drinks if possible. Deeper relationship building.', category: 'OUTREACH', priority: 'HIGH', dueOffset: 0, status: 'NOT_STARTED', output: 'Relationships deepened' },
      ],
    },
    {
      phase: 'FOLLOW_UP',
      name: 'Post-Event Follow-Up',
      startOffset: 1, // day after event
      endOffset: 14,
      tasks: [
        { id: 'f1', title: 'Send same-day follow-ups', description: 'Email everyone met within 24 hours. Reference conversation. Attach deck.', category: 'FOLLOW_UP', priority: 'CRITICAL', dueOffset: 1, status: 'NOT_STARTED', output: 'Follow-up emails sent' },
        { id: 'f2', title: 'Update CRM with new leads', description: 'Add all new contacts to the system. Set qualification status. Add notes.', category: 'FOLLOW_UP', priority: 'HIGH', dueOffset: 2, status: 'NOT_STARTED', output: 'CRM updated' },
        { id: 'f3', title: 'Send tailored proposals', description: 'For qualified leads, send specific campaign proposals based on their needs.', category: 'FOLLOW_UP', priority: 'HIGH', dueOffset: 5, status: 'NOT_STARTED', output: 'Proposals sent' },
        { id: 'f4', title: 'Second follow-up for non-responders', description: 'Touch base again with anyone who hasn\'t replied to first follow-up.', category: 'FOLLOW_UP', priority: 'MEDIUM', dueOffset: 10, status: 'NOT_STARTED', output: 'Second follow-ups sent' },
        { id: 'f5', title: 'Event retrospective', description: 'What worked, what didn\'t, leads generated, pipeline value, lessons for next event.', category: 'RESEARCH', priority: 'MEDIUM', dueOffset: 14, status: 'NOT_STARTED', output: 'Retro document' },
      ],
    },
  ]
}

// ─── HELPER FUNCTIONS ─────────────────────────────────

/**
 * Get the next upcoming event
 */
export function getNextEvent(): IndustryEvent | null {
  const now = new Date()
  const upcoming = INDUSTRY_EVENTS_2026
    .filter(e => new Date(e.dates.start) > now)
    .sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime())
  return upcoming[0] ?? null
}

/**
 * Get all events sorted by date
 */
export function getEventsByDate(): IndustryEvent[] {
  return [...INDUSTRY_EVENTS_2026].sort(
    (a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime()
  )
}

/**
 * Calculate task due dates for an event
 */
export function getTaskDueDates(event: IndustryEvent): Array<PlanningTask & { dueDate: string; phase: string }> {
  const eventStart = new Date(event.dates.start)
  const tasks: Array<PlanningTask & { dueDate: string; phase: string }> = []

  for (const phase of event.planningPhases) {
    for (const task of phase.tasks) {
      const dueDate = new Date(eventStart)
      dueDate.setDate(dueDate.getDate() + task.dueOffset)
      tasks.push({ ...task, dueDate: dueDate.toISOString().split('T')[0], phase: phase.name })
    }
  }

  return tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}

/**
 * Get tasks that are due soon (within next 14 days)
 */
export function getUpcomingTasks(): Array<PlanningTask & { dueDate: string; phase: string; eventName: string }> {
  const now = new Date()
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
  const allTasks: Array<PlanningTask & { dueDate: string; phase: string; eventName: string }> = []

  for (const event of INDUSTRY_EVENTS_2026) {
    const tasks = getTaskDueDates(event)
    for (const task of tasks) {
      const taskDate = new Date(task.dueDate)
      if (taskDate >= now && taskDate <= twoWeeks) {
        allTasks.push({ ...task, eventName: event.shortName })
      }
    }
  }

  return allTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}
