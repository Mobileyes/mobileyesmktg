/**
 * Generate Mobileyes business card as SVG → convert to PDF-ready PNG
 * Officeworks standard: 90mm × 55mm (3.5" × 2"), CMYK, 300dpi
 * At 300dpi: 1050px × 650px
 */

import { writeFileSync } from 'fs'

const WIDTH = 1050
const HEIGHT = 650

// Front of card
const frontSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#1A0008"/>
  
  <!-- Subtle ring pattern (very low opacity) -->
  <circle cx="750" cy="325" r="200" fill="none" stroke="#EF4444" stroke-width="1" stroke-dasharray="4 8" opacity="0.08"/>
  <circle cx="750" cy="325" r="140" fill="none" stroke="#F97316" stroke-width="0.5" opacity="0.05"/>
  <circle cx="750" cy="325" r="280" fill="none" stroke="#EF4444" stroke-width="0.5" stroke-dasharray="3 10" opacity="0.04"/>
  
  <!-- Red dot (MBIcon core) -->
  <circle cx="80" cy="80" r="12" fill="#EF4444"/>
  <circle cx="80" cy="80" r="18" fill="none" stroke="#EF4444" stroke-width="1" stroke-dasharray="3 4" opacity="0.5"/>
  
  <!-- MOBILEYES wordmark -->
  <text x="108" y="87" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF" letter-spacing="0.7">MOBILEYES</text>
  
  <!-- Name -->
  <text x="80" y="280" font-family="Inter, -apple-system, sans-serif" font-size="36" font-weight="700" fill="#FFFFFF">Joel Kirk</text>
  
  <!-- Title -->
  <text x="80" y="320" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.6)">Founder</text>
  
  <!-- Contact details -->
  <text x="80" y="420" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.7)">admin@mobileyes.live</text>
  <text x="80" y="448" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.7)">mobileyes.live</text>
  <text x="80" y="476" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.7)">Sydney, Australia</text>
  
  <!-- Tagline bottom -->
  <text x="80" y="580" font-family="Inter, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#EF4444">Represent. Perform. Get paid.</text>
  
  <!-- TikTok handle -->
  <text x="80" y="608" font-family="Inter, -apple-system, sans-serif" font-size="12" font-weight="400" fill="rgba(255,255,255,0.4)">@mobileyes.live</text>
</svg>`

// Back of card
const backSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#1A0008"/>
  
  <!-- Centred red dot (large, pulsing feel) -->
  <circle cx="${WIDTH/2}" cy="${HEIGHT/2 - 30}" r="36" fill="#EF4444"/>
  <circle cx="${WIDTH/2}" cy="${HEIGHT/2 - 30}" r="36" fill="none" stroke="#EF4444" stroke-width="0" opacity="0">
    <animate attributeName="r" from="36" to="50" dur="1.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Outer rings -->
  <circle cx="${WIDTH/2}" cy="${HEIGHT/2 - 30}" r="80" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.3"/>
  <circle cx="${WIDTH/2}" cy="${HEIGHT/2 - 30}" r="55" fill="none" stroke="#F97316" stroke-width="1" opacity="0.2"/>
  
  <!-- MOBILEYES wordmark centred below -->
  <text x="${WIDTH/2}" y="${HEIGHT/2 + 60}" font-family="Inter, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="1" text-anchor="middle">MOBILEYES</text>
  
  <!-- Tagline -->
  <text x="${WIDTH/2}" y="${HEIGHT/2 + 95}" font-family="Inter, -apple-system, sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.5)" text-anchor="middle">Live streaming talent — Sydney &amp; APAC</text>
</svg>`

// Write SVG files
writeFileSync('/Users/joelkirk/Desktop/Mobileyes_BusinessCard_Front.svg', frontSvg)
writeFileSync('/Users/joelkirk/Desktop/Mobileyes_BusinessCard_Back.svg', backSvg)

console.log('✅ Business cards generated on your Desktop:')
console.log('   📄 Mobileyes_BusinessCard_Front.svg')
console.log('   📄 Mobileyes_BusinessCard_Back.svg')
console.log('')
console.log('📋 For Officeworks:')
console.log('   1. Open both SVGs in Preview')
console.log('   2. File → Export as PDF (or PNG at 300dpi)')
console.log('   3. Upload to Officeworks')
console.log('   4. Standard size: 90mm × 55mm')
console.log('')
console.log('   Or open in browser and screenshot at high res.')
