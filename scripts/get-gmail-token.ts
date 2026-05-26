/**
 * Gmail OAuth2 Token Generator
 * 
 * Run this script to get a refresh token for the campaigns@ inbox sync.
 * 
 * Prerequisites:
 * 1. Go to https://console.cloud.google.com/apis/credentials
 * 2. Create an OAuth 2.0 Client ID (type: Web application)
 * 3. Add redirect URI: http://localhost:3001/callback
 * 4. Enable Gmail API: https://console.cloud.google.com/apis/library/gmail.googleapis.com
 * 5. Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET in .env.local
 * 
 * Usage:
 *   npx tsx scripts/get-gmail-token.ts
 * 
 * Then open the URL it prints, authorize with campaigns@mobileyes.live,
 * and it will output the refresh token to add to .env.local
 */

import http from 'http'
import { URL } from 'url'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const envVars: Record<string, string> = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) envVars[match[1].trim()] = match[2].trim()
})

const CLIENT_ID = envVars.GMAIL_CLIENT_ID || process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = envVars.GMAIL_CLIENT_SECRET || process.env.GMAIL_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:3001/callback'
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

if (!CLIENT_ID || CLIENT_ID === 'PLACEHOLDER') {
  console.error('❌ Set GMAIL_CLIENT_ID in .env.local first')
  process.exit(1)
}
if (!CLIENT_SECRET || CLIENT_SECRET === 'PLACEHOLDER') {
  console.error('❌ Set GMAIL_CLIENT_SECRET in .env.local first')
  process.exit(1)
}

// Step 1: Generate auth URL
const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
authUrl.searchParams.set('client_id', CLIENT_ID)
authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('scope', SCOPES.join(' '))
authUrl.searchParams.set('access_type', 'offline')
authUrl.searchParams.set('prompt', 'consent')

console.log('\n🔐 Gmail OAuth2 Setup for Mobileyes\n')
console.log('Open this URL in your browser and sign in with campaigns@mobileyes.live:\n')
console.log(authUrl.toString())
console.log('\nWaiting for callback on http://localhost:3001...\n')

// Step 2: Start local server to receive callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url!, `http://localhost:3001`)

  if (url.pathname !== '/callback') {
    res.writeHead(404)
    res.end('Not found')
    return
  }

  const code = url.searchParams.get('code')
  if (!code) {
    res.writeHead(400)
    res.end('No code received')
    return
  }

  // Step 3: Exchange code for tokens
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      console.error('❌ Token exchange failed:', tokens.error_description || tokens.error)
      res.writeHead(500)
      res.end('Token exchange failed: ' + tokens.error)
      server.close()
      return
    }

    console.log('✅ Success! Add this to your .env.local:\n')
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`)
    console.log('\n(Access token expires, refresh token is permanent)')

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>✅ Done!</h1><p>Refresh token printed in terminal. You can close this tab.</p>')
    server.close()
  } catch (err) {
    console.error('❌ Error:', err)
    res.writeHead(500)
    res.end('Error exchanging code')
    server.close()
  }
})

server.listen(3001)
