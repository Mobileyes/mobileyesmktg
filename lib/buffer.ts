/**
 * Buffer Social Publishing Integration
 * 
 * Connects to Buffer's GraphQL API to:
 * 1. List connected channels (TikTok, Instagram, etc.)
 * 2. Create and schedule posts
 * 3. Queue video content with captions
 * 
 * Setup:
 * 1. Login to Buffer → Settings → API & Apps → Create Personal Access Token
 * 2. Set BUFFER_ACCESS_TOKEN in .env.local and Vercel env vars
 * 
 * API Docs: https://developers.buffer.com
 */

const BUFFER_API_URL = 'https://api.buffer.com/graphql'

function getToken(): string | null {
  return process.env.BUFFER_ACCESS_TOKEN ?? null
}

async function bufferQuery(query: string, variables?: Record<string, unknown>) {
  const token = getToken()
  if (!token) throw new Error('BUFFER_ACCESS_TOKEN not configured')

  const response = await fetch(BUFFER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Buffer API error: ${response.status} — ${text}`)
  }

  const data = await response.json()
  if (data.errors) {
    throw new Error(`Buffer GraphQL error: ${JSON.stringify(data.errors)}`)
  }

  return data.data
}

// ─── TYPES ────────────────────────────────────────────

export interface BufferChannel {
  id: string
  name: string
  service: string // 'tiktok', 'instagram', 'facebook', etc.
  avatar: string | null
}

export interface BufferPost {
  id: string
  text: string
  status: string
  scheduledAt: string | null
  channelId: string
}

// ─── CHANNEL MANAGEMENT ───────────────────────────────

/**
 * List all connected Buffer channels (social accounts).
 */
export async function getChannels(): Promise<BufferChannel[]> {
  const data = await bufferQuery(`
    query {
      channels {
        id
        name
        service
        avatar
      }
    }
  `)
  return data.channels ?? []
}

// ─── POST CREATION ────────────────────────────────────

/**
 * Create a text post scheduled for a specific time.
 */
export async function createScheduledPost(params: {
  channelIds: string[]
  text: string
  scheduledAt: string // ISO timestamp
}): Promise<BufferPost | null> {
  const data = await bufferQuery(`
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess {
          post {
            id
            text
            status
            scheduledAt
          }
        }
        ... on MutationError {
          message
        }
      }
    }
  `, {
    input: {
      channelIds: params.channelIds,
      text: params.text,
      mode: 'customScheduled',
      dueAt: params.scheduledAt,
    },
  })

  return data.createPost?.post ?? null
}

/**
 * Create a post with video (for TikTok/Reels).
 */
export async function createVideoPost(params: {
  channelIds: string[]
  text: string
  videoUrl: string
  scheduledAt?: string
}): Promise<BufferPost | null> {
  const input: Record<string, unknown> = {
    channelIds: params.channelIds,
    text: params.text,
    assets: [{ video: { url: params.videoUrl } }],
  }

  if (params.scheduledAt) {
    input.mode = 'customScheduled'
    input.dueAt = params.scheduledAt
  } else {
    input.mode = 'queue'
  }

  const data = await bufferQuery(`
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess {
          post {
            id
            text
            status
            scheduledAt
          }
        }
        ... on MutationError {
          message
        }
      }
    }
  `, { input })

  return data.createPost?.post ?? null
}

/**
 * Add a post to the queue (Buffer picks the optimal time).
 */
export async function queuePost(params: {
  channelIds: string[]
  text: string
  videoUrl?: string
}): Promise<BufferPost | null> {
  const input: Record<string, unknown> = {
    channelIds: params.channelIds,
    text: params.text,
    mode: 'queue',
  }

  if (params.videoUrl) {
    input.assets = [{ video: { url: params.videoUrl } }]
  }

  const data = await bufferQuery(`
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess {
          post {
            id
            text
            status
            scheduledAt
          }
        }
        ... on MutationError {
          message
        }
      }
    }
  `, { input })

  return data.createPost?.post ?? null
}
