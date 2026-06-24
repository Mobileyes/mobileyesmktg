import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const DESKTOP = '/Users/joelkirk/Desktop'

// ─── BUSINESS CARD FRONT (1063×650 @ 300dpi for 90×55mm) ─────

function generateCardFront() {
  const w = 1063, h = 650
  const c = createCanvas(w, h)
  const ctx = c.getContext('2d')

  // Background
  ctx.fillStyle = '#1A0008'
  ctx.fillRect(0, 0, w, h)

  // MBIcon top-left
  ctx.beginPath(); ctx.arc(65, 65, 20, 0, Math.PI * 2)
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]); ctx.globalAlpha = 0.6; ctx.stroke()
  ctx.beginPath(); ctx.arc(65, 65, 13, 0, Math.PI * 2)
  ctx.strokeStyle = '#F97316'; ctx.lineWidth = 1; ctx.setLineDash([]); ctx.globalAlpha = 0.4; ctx.stroke()
  ctx.beginPath(); ctx.arc(65, 65, 7, 0, Math.PI * 2)
  ctx.fillStyle = '#EF4444'; ctx.globalAlpha = 1; ctx.fill()

  // MOBILEYES wordmark
  ctx.font = '800 18px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('MOBILEYES', 95, 71)

  // Name
  ctx.font = '800 34px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('Joel Kirk', 65, 270)

  // Title
  ctx.font = '400 14px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.fillText('Founder', 65, 298)

  // Contact
  ctx.font = '400 12px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fillText('joel@mobileyes.live', 65, 400)
  ctx.fillText('mobileyes.live', 65, 420)
  ctx.fillText('Sydney, Australia', 65, 440)

  // Tagline
  ctx.font = '700 11px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Represent.', 65, 540)
  ctx.fillStyle = '#EF4444'; ctx.fillText('Perform.', 148, 540)
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Get paid.', 222, 540)

  // Social
  ctx.font = '400 10px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.fillText('@mobileyes.live', 65, 568)

  // QR placeholder text (bottom right)
  ctx.font = '600 9px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#EF4444'
  ctx.fillText('Get paid to play', 870, 480)

  // QR white box placeholder
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(850, 490, 150, 150)
  ctx.font = '400 8px Arial'
  ctx.fillStyle = '#0a0a0a'
  ctx.fillText('SCAN ME', 895, 570)

  writeFileSync(resolve(DESKTOP, 'Mobileyes_Card_Front_PRINT.png'), c.toBuffer('image/png'))
  console.log('✅ Card Front: ~/Desktop/Mobileyes_Card_Front_PRINT.png (1063×650)')
}

// ─── BUSINESS CARD BACK (1063×650) ─────

function generateCardBack() {
  const w = 1063, h = 650
  const c = createCanvas(w, h)
  const ctx = c.getContext('2d')

  ctx.fillStyle = '#1A0008'
  ctx.fillRect(0, 0, w, h)

  // Large MBIcon centred
  const cx = w/2, cy = 230
  ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2)
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 2; ctx.setLineDash([5, 7]); ctx.globalAlpha = 0.5; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, 33, 0, Math.PI * 2)
  ctx.strokeStyle = '#F97316'; ctx.lineWidth = 1.2; ctx.setLineDash([]); ctx.globalAlpha = 0.35; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2)
  ctx.fillStyle = '#EF4444'; ctx.globalAlpha = 1; ctx.fill()

  // MOBILEYES
  ctx.font = '800 24px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center'
  ctx.fillText('MOBILEYES', cx, 320)

  // Stacked words
  ctx.font = '800 28px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Represent.', cx, 410)
  ctx.fillStyle = '#EF4444'; ctx.fillText('Perform.', cx, 448)
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Get paid.', cx, 486)

  // Subtitle
  ctx.font = '400 12px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.fillText('Live streaming talent — Sydney, AU', cx, 560)

  writeFileSync(resolve(DESKTOP, 'Mobileyes_Card_Back_PRINT.png'), c.toBuffer('image/png'))
  console.log('✅ Card Back: ~/Desktop/Mobileyes_Card_Back_PRINT.png (1063×650)')
}

// ─── T-SHIRT FRONT (1200×1200 for left chest) ─────

function generateShirtFront() {
  const w = 1200, h = 1200
  const c = createCanvas(w, h)
  const ctx = c.getContext('2d')

  // Transparent (no background for DTG)
  // Actually for Officeworks upload, use black so they can see placement
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, w, h)

  const cx = 600, cy = 560

  // Icon
  ctx.beginPath(); ctx.arc(cx - 120, cy, 28, 0, Math.PI * 2)
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 2; ctx.setLineDash([4, 6]); ctx.globalAlpha = 0.6; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx - 120, cy, 18, 0, Math.PI * 2)
  ctx.strokeStyle = '#F97316'; ctx.lineWidth = 1.2; ctx.setLineDash([]); ctx.globalAlpha = 0.4; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx - 120, cy, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#EF4444'; ctx.globalAlpha = 1; ctx.fill()

  // MOBILEYES
  ctx.font = '800 42px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'left'
  ctx.fillText('MOBILEYES', cx - 80, cy + 14)

  // Tagline underneath
  ctx.font = '600 18px Inter, Helvetica, Arial, sans-serif'
  const tagY = cy + 60
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Represent.', cx - 120, tagY)
  ctx.fillStyle = '#EF4444'; ctx.fillText('Perform.', cx - 10, tagY)
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Get paid.', cx + 90, tagY)

  writeFileSync(resolve(DESKTOP, 'Mobileyes_Shirt_Front_PRINT.png'), c.toBuffer('image/png'))
  console.log('✅ Shirt Front: ~/Desktop/Mobileyes_Shirt_Front_PRINT.png (1200×1200)')
}

// ─── T-SHIRT BACK (3600×4200 full back) ─────

function generateShirtBack() {
  const w = 3600, h = 4200
  const c = createCanvas(w, h)
  const ctx = c.getContext('2d')

  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, w, h)

  const cx = 1800

  // TOP: Icon + MOBILEYES horizontal
  ctx.beginPath(); ctx.arc(cx - 240, 420, 44, 0, Math.PI * 2)
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 3; ctx.setLineDash([6, 8]); ctx.globalAlpha = 0.5; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx - 240, 420, 28, 0, Math.PI * 2)
  ctx.strokeStyle = '#F97316'; ctx.lineWidth = 2; ctx.setLineDash([]); ctx.globalAlpha = 0.35; ctx.stroke()
  ctx.beginPath(); ctx.arc(cx - 240, 420, 16, 0, Math.PI * 2)
  ctx.fillStyle = '#EF4444'; ctx.globalAlpha = 1; ctx.fill()

  ctx.font = '800 64px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'left'
  ctx.fillText('MOBILEYES', cx - 180, 440)

  // Tagline underneath
  ctx.font = '600 42px Inter, Helvetica, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Represent.', cx - 180, 560)
  ctx.fillStyle = '#EF4444'; ctx.fillText('Perform.', cx + 60, 560)
  ctx.fillStyle = '#FFFFFF'; ctx.fillText('Get paid.', cx + 280, 560)

  // QR code (white box)
  const qrSize = 1000
  const qrX = cx - qrSize/2
  const qrY = 900
  ctx.fillStyle = '#FFFFFF'
  roundRect(ctx, qrX, qrY, qrSize, qrSize, 16)
  ctx.fill()

  // QR label inside
  ctx.font = '400 48px Arial'
  ctx.fillStyle = '#333333'; ctx.textAlign = 'center'
  ctx.fillText('[ QR CODE — SCAN TO APPLY ]', cx, qrY + qrSize/2 + 16)

  // "Get paid to play" below QR
  ctx.font = '700 60px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = '#EF4444'; ctx.textAlign = 'center'
  ctx.fillText('Get paid to play', cx, qrY + qrSize + 120)

  // URL
  ctx.font = '400 36px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.fillText('mobileyes.live/creators', cx, qrY + qrSize + 200)

  writeFileSync(resolve(DESKTOP, 'Mobileyes_Shirt_Back_PRINT.png'), c.toBuffer('image/png'))
  console.log('✅ Shirt Back: ~/Desktop/Mobileyes_Shirt_Back_PRINT.png (3600×4200)')
}

function roundRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

generateCardFront()
generateCardBack()
generateShirtFront()
generateShirtBack()
console.log('\n📁 All 4 files saved to your Desktop. Upload directly to Officeworks.')
