import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import {
  INDUSTRY_EVENTS_2026,
  QUALIFICATION_QUESTIONS,
  getEventsByDate,
  getNextEvent,
  getTaskDueDates,
  getUpcomingTasks,
} from '@/lib/event-planner'

// GET /api/admin/planner — event pipeline planner data
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')

    if (eventId) {
      // Get specific event with task due dates
      const event = INDUSTRY_EVENTS_2026.find(e => e.id === eventId)
      if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

      const tasks = getTaskDueDates(event)
      return NextResponse.json({ event, tasks })
    }

    // Return overview
    const events = getEventsByDate()
    const nextEvent = getNextEvent()
    const upcomingTasks = getUpcomingTasks()

    return NextResponse.json({
      events,
      nextEvent,
      upcomingTasks,
      qualificationQuestions: QUALIFICATION_QUESTIONS,
    })
  } catch (err) {
    console.error('Planner API error:', err)
    return NextResponse.json({ error: 'Failed to fetch planner data' }, { status: 500 })
  }
}
