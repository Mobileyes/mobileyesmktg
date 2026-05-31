'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, CheckCircle, Circle, AlertTriangle, ChevronRight, Users, Target, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

type View = 'timeline' | 'event' | 'questions'

export default function EventPlannerPage() {
  const [view, setView] = useState<View>('timeline')
  const [data, setData] = useState<any>(null)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventTasks, setEventTasks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPlanner()
  }, [])

  const fetchPlanner = async () => {
    try {
      const response = await fetch('/api/admin/planner')
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (err) {
      console.error('Failed to fetch planner:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const selectEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/admin/planner?eventId=${eventId}`)
      if (response.ok) {
        const result = await response.json()
        setSelectedEvent(result.event)
        setEventTasks(result.tasks)
        setView('event')
      }
    } catch (err) {
      console.error('Failed to fetch event:', err)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Pipeline Planner</h1>
          <p className="text-gray-500 mt-1">Plan your approach to every industry event. Work backwards from dates.</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setView('timeline')} className={cn('px-3 py-1.5 rounded-md text-sm font-medium', view === 'timeline' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600')}>Timeline</button>
          <button onClick={() => setView('questions')} className={cn('px-3 py-1.5 rounded-md text-sm font-medium', view === 'questions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600')}>Qualification</button>
        </div>
      </div>

      {/* Upcoming Tasks Alert */}
      {data?.upcomingTasks?.length > 0 && view === 'timeline' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-semibold text-orange-900">Tasks Due This Fortnight</h3>
          </div>
          <div className="space-y-1">
            {data.upcomingTasks.slice(0, 5).map((task: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-orange-800">{task.title}</span>
                <span className="text-xs text-orange-600">{task.eventName} · {task.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {view === 'timeline' && data?.events && (
        <div className="space-y-4">
          {data.events.map((event: any) => {
            const eventDate = new Date(event.dates.start)
            const now = new Date()
            const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            const isPast = daysUntil < 0
            const isNext = data.nextEvent?.id === event.id

            return (
              <div
                key={event.id}
                onClick={() => selectEvent(event.id)}
                className={cn(
                  'bg-white rounded-xl border p-6 cursor-pointer transition-all hover:shadow-md',
                  isNext ? 'border-blue-300 ring-1 ring-blue-100' : isPast ? 'border-gray-200 opacity-60' : 'border-gray-200'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isNext ? 'bg-blue-100' : isPast ? 'bg-gray-100' : 'bg-slate-100')}>
                      <Calendar className={cn('w-5 h-5', isNext ? 'text-blue-600' : 'text-slate-500')} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                        {isNext && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium">NEXT UP</span>}
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium',
                          event.relevance === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                          event.relevance === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                        )}>{event.relevance}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDateRange(event.dates.start, event.dates.end)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 max-w-2xl">{event.mobileyesAngle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-2xl font-bold', isPast ? 'text-gray-400' : daysUntil < 30 ? 'text-red-600' : daysUntil < 60 ? 'text-orange-600' : 'text-gray-700')}>
                      {isPast ? 'Past' : `${daysUntil}d`}
                    </p>
                    <p className="text-xs text-gray-400">{isPast ? '' : 'until event'}</p>
                    <ChevronRight className="w-4 h-4 text-gray-300 mt-2 ml-auto" />
                  </div>
                </div>

                {/* Expected attendees preview */}
                <div className="mt-4 flex items-center gap-2">
                  <Users className="w-3 h-3 text-gray-400" />
                  <div className="flex gap-1 flex-wrap">
                    {event.expectedAttendees.slice(0, 5).map((a: string) => (
                      <span key={a} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">{a}</span>
                    ))}
                    {event.expectedAttendees.length > 5 && (
                      <span className="text-[10px] text-gray-400">+{event.expectedAttendees.length - 5} more</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Event Detail View */}
      {view === 'event' && selectedEvent && (
        <div>
          <button onClick={() => setView('timeline')} className="text-sm text-gray-500 hover:text-gray-700 mb-4">← Back to timeline</button>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedEvent.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedEvent.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDateRange(selectedEvent.dates.start, selectedEvent.dates.end)}</span>
                </div>
              </div>
              <a href={selectedEvent.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Website →</a>
            </div>
            <p className="text-sm text-gray-600 mt-3">{selectedEvent.description}</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800"><strong>Our angle:</strong> {selectedEvent.mobileyesAngle}</p>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Expected Attendees / Targets</p>
              <div className="flex gap-2 flex-wrap">
                {selectedEvent.expectedAttendees.map((a: string) => (
                  <span key={a} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs text-gray-700">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Task Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Planning Tasks (work backwards from event)</h3>
            <div className="space-y-2">
              {eventTasks.map((task: any, i: number) => {
                const taskDate = new Date(task.dueDate)
                const now = new Date()
                const isOverdue = taskDate < now && task.status !== 'COMPLETE'
                const isDueSoon = !isOverdue && taskDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000

                return (
                  <div key={i} className={cn('flex items-center gap-4 p-3 rounded-lg border', isOverdue ? 'border-red-200 bg-red-50' : isDueSoon ? 'border-orange-200 bg-orange-50' : 'border-gray-100')}>
                    <div className="flex-shrink-0">
                      {task.status === 'COMPLETE' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className={cn('w-5 h-5', isOverdue ? 'text-red-400' : 'text-gray-300')} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium', task.status === 'COMPLETE' ? 'text-gray-400 line-through' : 'text-gray-900')}>{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={cn('text-xs font-medium', isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-gray-500')}>{task.dueDate}</p>
                      <p className="text-[10px] text-gray-400">{task.phase}</p>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded text-[10px] font-medium',
                      task.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                      task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                    )}>{task.priority}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Qualification Questions View */}
      {view === 'questions' && data?.qualificationQuestions && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Qualification Framework</h3>
            <p className="text-sm text-gray-500">Use these questions at events and in outreach to qualify leads, generate follow-ups, and learn about the market.</p>
          </div>
          {data.qualificationQuestions.map((q: any) => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{q.question}</p>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Why we ask this</p>
                      <p className="text-xs text-gray-600">{q.purpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">What to do with the answer</p>
                      <p className="text-xs text-gray-600">{q.followUp}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500 uppercase">{q.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (s.getMonth() === e.getMonth()) {
    return `${s.getDate()}-${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`
  }
  return `${s.getDate()} ${months[s.getMonth()]} - ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`
}
