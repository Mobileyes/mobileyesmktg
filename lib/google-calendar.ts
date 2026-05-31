/**
 * Google Calendar Integration
 * 
 * Syncs event planner tasks and meetings to admin@mobileyes.live calendar.
 * Uses the same OAuth2 client as Gmail (with calendar scope added).
 */

import { google } from 'googleapis'

function getCalendarClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })
  return google.calendar({ version: 'v3', auth: oauth2Client })
}

export interface CalendarEvent {
  id?: string
  summary: string
  description?: string
  location?: string
  start: { dateTime?: string; date?: string; timeZone?: string }
  end: { dateTime?: string; date?: string; timeZone?: string }
  colorId?: string // 1-11 for different colors
  reminders?: { useDefault: boolean; overrides?: Array<{ method: string; minutes: number }> }
}

/**
 * Create a calendar event
 */
export async function createCalendarEvent(event: CalendarEvent): Promise<string | null> {
  try {
    const calendar = getCalendarClient()
    const result = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.summary,
        description: event.description,
        location: event.location,
        start: event.start,
        end: event.end,
        colorId: event.colorId,
        reminders: event.reminders ?? {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },
            { method: 'email', minutes: 1440 }, // 1 day before
          ],
        },
      },
    })
    return result.data.id ?? null
  } catch (error) {
    console.error('Failed to create calendar event:', error)
    return null
  }
}

/**
 * Create a meeting event (with time)
 */
export async function createMeeting(params: {
  title: string
  description?: string
  location?: string
  startTime: string // ISO datetime
  durationMinutes: number
  attendeeEmail?: string
}): Promise<string | null> {
  const start = new Date(params.startTime)
  const end = new Date(start.getTime() + params.durationMinutes * 60 * 1000)

  return createCalendarEvent({
    summary: params.title,
    description: params.description,
    location: params.location,
    start: { dateTime: start.toISOString(), timeZone: 'Australia/Sydney' },
    end: { dateTime: end.toISOString(), timeZone: 'Australia/Sydney' },
    colorId: '9', // Blue for meetings
  })
}

/**
 * Create an all-day event (for event dates, deadlines)
 */
export async function createAllDayEvent(params: {
  title: string
  description?: string
  date: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD (for multi-day events)
  colorId?: string
}): Promise<string | null> {
  const endDate = params.endDate ?? params.date
  // Google Calendar all-day events need end date to be day AFTER
  const end = new Date(endDate)
  end.setDate(end.getDate() + 1)

  return createCalendarEvent({
    summary: params.title,
    description: params.description,
    start: { date: params.date },
    end: { date: end.toISOString().split('T')[0] },
    colorId: params.colorId ?? '5', // Yellow for events
  })
}

/**
 * Sync an industry event and its planning tasks to calendar
 */
export async function syncEventToCalendar(event: {
  name: string
  location: string
  startDate: string
  endDate: string
  description: string
  tasks: Array<{ title: string; dueDate: string; phase: string; priority: string }>
}): Promise<{ eventId: string | null; taskIds: string[] }> {
  // Create the main event
  const eventId = await createAllDayEvent({
    title: `🎮 ${event.name}`,
    description: event.description,
    date: event.startDate,
    endDate: event.endDate,
    colorId: '11', // Red for industry events
  })

  // Create task reminders
  const taskIds: string[] = []
  for (const task of event.tasks) {
    const colorId = task.priority === 'CRITICAL' ? '11' : task.priority === 'HIGH' ? '6' : '8'
    const id = await createAllDayEvent({
      title: `📋 [${event.name}] ${task.title}`,
      description: `Phase: ${task.phase}\nPriority: ${task.priority}`,
      date: task.dueDate,
      colorId,
    })
    if (id) taskIds.push(id)
  }

  return { eventId, taskIds }
}

/**
 * Get upcoming events from calendar
 */
export async function getUpcomingCalendarEvents(maxResults = 20): Promise<any[]> {
  try {
    const calendar = getCalendarClient()
    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    })
    return result.data.items ?? []
  } catch (error) {
    console.error('Failed to fetch calendar events:', error)
    return []
  }
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarClient()
    await calendar.events.delete({ calendarId: 'primary', eventId })
    return true
  } catch (error) {
    console.error('Failed to delete calendar event:', error)
    return false
  }
}
