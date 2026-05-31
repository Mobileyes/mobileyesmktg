import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import {
  createMeeting,
  createAllDayEvent,
  syncEventToCalendar,
  getUpcomingCalendarEvents,
} from '@/lib/google-calendar'
import { INDUSTRY_EVENTS_2026, getTaskDueDates } from '@/lib/event-planner'

// GET /api/admin/calendar — get upcoming calendar events
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const events = await getUpcomingCalendarEvents(30)
    return NextResponse.json({ events })
  } catch (err) {
    console.error('Calendar GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 })
  }
}

// POST /api/admin/calendar — create calendar events
export async function POST(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'sync_event': {
        // Sync an industry event + all its tasks to calendar
        const { eventId: industryEventId } = body
        const event = INDUSTRY_EVENTS_2026.find(e => e.id === industryEventId)
        if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

        const tasks = getTaskDueDates(event)
        const result = await syncEventToCalendar({
          name: event.name,
          location: event.location,
          startDate: event.dates.start,
          endDate: event.dates.end,
          description: `${event.description}\n\nMobileyes Angle: ${event.mobileyesAngle}`,
          tasks: tasks.map(t => ({
            title: t.title,
            dueDate: t.dueDate,
            phase: t.phase,
            priority: t.priority,
          })),
        })

        return NextResponse.json({ success: true, ...result })
      }

      case 'create_meeting': {
        // Book a meeting
        const { title, description, location, startTime, durationMinutes, attendeeEmail } = body
        const calendarEventId = await createMeeting({
          title,
          description,
          location,
          startTime,
          durationMinutes: durationMinutes ?? 30,
          attendeeEmail,
        })
        return NextResponse.json({ success: true, calendarEventId })
      }

      case 'create_deadline': {
        // Create a deadline/reminder
        const { title, description, date, colorId } = body
        const calendarEventId = await createAllDayEvent({ title, description, date, colorId })
        return NextResponse.json({ success: true, calendarEventId })
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  } catch (err) {
    console.error('Calendar POST error:', err)
    return NextResponse.json({ error: 'Calendar operation failed' }, { status: 500 })
  }
}
