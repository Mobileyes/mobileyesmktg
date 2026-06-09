# MOBILEYES BRAND IDENT VIDEO BRIEF — V3

**June 2026 · CapCut Production Build · Multi-Platform Asset**

---

## THE VIDEO IN 1 SENTENCE

6 close-up shots of hands preparing to go live (gear clicks, cable snaps, record button) → killer end card with pulsing red dot + wordmark. 12 seconds total. Used everywhere.

---

## CAPCUT PROJECT SETUP

| Setting | Value |
|---------|-------|
| Resolution | 1080 × 1920 (vertical FIRST — easier to crop to 16:9 than vice versa) |
| Frame rate | 30fps |
| Background | #0B0F2E (navy) |
| Duration | 12 seconds total |

**Why vertical first:** Your primary platforms are TikTok, Reels, Shorts. Build vertical, then export a 16:9 version for YouTube/web by cropping/repositioning. CapCut makes this easy with the "Ratio" button.

---

## TIMELINE STRUCTURE (12 seconds)

```
[0.0s]──SHOT 1──[1.5s]──SHOT 2──[3.0s]──SHOT 3──[4.5s]──SHOT 4──[6.0s]──SHOT 5──[7.5s]──SHOT 6──[9.5s]──END CARD──[12.0s]
         1.5s           1.5s           1.5s           1.5s           1.5s            2.0s            2.5s
```

---

## SHOTS (what to film with your phone)

Film each shot separately. 4K, manual focus locked. 3-4 takes each.

| # | What | Angle | Sound You Hear | Duration |
|---|------|-------|----------------|----------|
| 1 | XLR cable plugging into audio interface | Bird's eye (above) | Click/snap | 1.5s |
| 2 | Tripod legs snapping open | Low side (floor level) | Metal locks | 1.5s |
| 3 | Phone slotting into mount | Bird's eye | Clamp click | 1.5s |
| 4 | Ring light switching on | Side 45° | Switch flick + light bloom | 1.5s |
| 5 | Shotgun mic sliding into hot shoe | Bird's eye | Metal slide + lock | 1.5s |
| 6 | **RECORD BUTTON PRESS** | Close side 45° | Button click + BEEP | 2.0s |

**Shot 6 is the hero.** Everything builds to it. Give it the extra 0.5s hold on the red LED.

---

## CAPCUT EDIT — STEP BY STEP

### Step 1: Import & Organise
1. Open CapCut Desktop → New Project → 1080×1920 (9:16)
2. Import all your shot clips into the Media panel
3. Label them: Shot1_XLR, Shot2_Tripod, Shot3_Phone, Shot4_Light, Shot5_Mic, Shot6_Record

### Step 2: Rough Cut
1. Drag clips onto the timeline in order (1→6)
2. Trim each to the "action moment" — start just before the action, cut right after
3. Shots 1-5: trim to exactly 1.5 seconds
4. Shot 6: trim to exactly 2.0 seconds (extra hold on red light)
5. **Cuts between shots: HARD. No transitions. Drag clips to butt against each other.**

### Step 3: Colour Grade
1. Select all clips → Adjustment → Colour
2. Temperature: pull slightly COOL (−10 to −15)
3. Saturation: pull DOWN (−20 to −30) 
4. Highlights: warm slightly (+5 warmth)
5. **KEY: The ONLY saturated colour should be the red record light/LED**
6. If needed, add a colour mask on Shot 6 to boost ONLY the red channel

### Step 4: Audio
1. Keep the original audio from your shots (cable clicks, mechanism sounds)
2. Normalise audio levels across all clips
3. On Shot 6: add "record beep" sound effect (CapCut has this in Audio → Sound Effects → search "beep" or "notification")
4. After the beep on Shot 6: SILENCE. Dead silence going into end card.
5. **No background music. Ever. The diegetic sounds ARE the soundtrack.**

---

## END CARD — THE KILLER BIT (2.5 seconds)

This is your brand signature. It needs to hit hard and be reusable across everything.
Must match the MBIcon exactly — radial gradient red core, warm dark background, pulsing glow.

### BRAND KIT — Exact Values

| Element | Value | Notes |
|---------|-------|-------|
| Background | `#1A0008` | Dark red-tinted warm black (NOT cold navy. The icon container is warm.) |
| Red core (dot) | Radial gradient: `#EF4444` centre → `#DC2626` 70% → `#B91C1C` edge | Same as MBIcon |
| Red glow | `rgba(239, 68, 68, 0.8)` inner, `rgba(239, 68, 68, 0.4)` outer | The soft halo |
| Outer ring | `#EF4444` at 50% opacity, dashed stroke | Rotates slowly (12s/revolution) |
| Inner ring | `#F97316` (orange) at 40% opacity | Subtle, only visible on larger renders |
| Wordmark text | `#FFFFFF` white | Font: Space Grotesk Extra Bold |
| Wordmark tracking | `+0.03em` (3% letter spacing) | Tracked wide but not extreme |
| Tagline text | `rgba(255, 255, 255, 0.6)` | 60% white opacity |
| Pulse timing | 1.5 second cycle | Matches CSS `animate-pulse` at 1.5s duration |

### Font Specification

| Element | Font | Weight | Size (at 1080px wide) |
|---------|------|--------|----------------------|
| MOBILEYES wordmark | Space Grotesk | ExtraBold (800) | 56px |
| Tagline | Space Grotesk | Regular (400) | 24px |
| Letter spacing (wordmark) | — | — | +3% (tracking-[0.03em]) |

**If Space Grotesk isn't in CapCut:** Use Inter Bold or Montserrat Bold. Match the tracked-wide feel.

### End Card Timeline Breakdown:

```
[9.5s] HARD CUT to solid #1A0008 ─────────────────────────── [12.0s]
       |                                                        |
       9.5s    10.0s    10.5s    11.0s    11.5s    12.0s
       |       |        |        |        |        |
       DARK    DOT IN   PULSE    WORD IN  TAG IN   HOLD
```

### CapCut Build — End Card:

**Layer 1: Background**
1. At 9.5s on timeline, add a solid colour clip (2.5 seconds)
2. Colour: `#1A0008` (warm dark — NOT cold navy. This is dark-red tinted black.)
3. No fade-in. HARD CUT from Shot 6.

**Layer 2: Red Dot Core (the brand pulse)**
1. Add a Shape element → Circle
2. Size: 48px × 48px (scaled to 36% of icon container — matches MBIcon proportions)
3. Colour: Use the closest to a radial gradient CapCut allows. If no gradient option: solid `#EF4444`
4. Position: centre of frame, 38% from top
5. Start time: 10.0s (0.5s of pure dark before dot appears)
6. **Glow:** Add Drop Shadow → Colour `#EF4444`, Blur 24px, Spread 12px, Opacity 80%
7. **Second glow layer:** Duplicate, Blur 48px, Opacity 40% (creates the outer halo)
8. **Animation — The Pulse (MUST be 1.5s cycle):**
   - Keyframe 1 (10.0s): Scale 0%, Opacity 0%
   - Keyframe 2 (10.25s): Scale 115%, Opacity 100% (overshoots — snap in)
   - Keyframe 3 (10.4s): Scale 100%, Opacity 100% (settles to final size)
   - Then PULSE LOOP (1.5s cycle):
   - Keyframe 4 (10.4s): Scale 100%, Opacity 100%
   - Keyframe 5 (11.15s): Scale 108%, Opacity 70% (half cycle — exhale)
   - Keyframe 6 (11.9s): Scale 100%, Opacity 100% (inhale back)
9. **The pulse should feel like breathing. Not a blink — a BREATH. 1.5 seconds per cycle.**

**Layer 3: Outer Ring (optional — adds depth)**
1. Add a Shape element → Circle (ring/stroke only, no fill)
2. Size: 130px × 130px
3. Stroke: `#EF4444`, width 1.5px, opacity 50%
4. Make it dashed if CapCut supports (stroke dash: 4px gap 6px)
5. Position: same centre as dot
6. Start time: 10.3s (appears just after dot)
7. **Animation:** Very slow rotation — if CapCut supports, rotate 30° over the full 2.5s duration
8. Fade in: Opacity 0% at 10.3s → 50% at 10.6s

**Layer 4: MOBILEYES Wordmark**
1. Add Text element: `MOBILEYES`
2. Font: **Space Grotesk ExtraBold** (or Inter Bold / Montserrat Bold as fallback)
3. Size: **56px**
4. Colour: `#FFFFFF` (pure white)
5. Letter spacing: **+3%** (in CapCut: look for "Character Spacing" or "Tracking" → set to ~1.7px at 56pt)
6. Position: centred horizontally, 54% from top (just below the dot/ring)
7. Start time: 10.8s
8. **Animation:**
   - Keyframe 1 (10.8s): Opacity 0%, Y-position: +8px below final
   - Keyframe 2 (11.1s): Opacity 100%, Y-position: final
   - Curve: ease out (decelerate)

**Layer 5: Tagline**
1. Add Text element: `Get paid in 4 days, not 45.`
2. Font: **Space Grotesk Regular** (or Inter Regular)
3. Size: **24px**
4. Colour: **White at 60% opacity** (in CapCut: set text colour white, then reduce layer opacity to 60%)
5. Position: centred horizontally, 61% from top (below wordmark, with ~20px gap)
6. Start time: 11.2s
7. **Animation:**
   - Keyframe 1 (11.2s): Opacity 0%
   - Keyframe 2 (11.5s): Opacity 60% (NOT 100% — stays at 60% as final state)
   - Curve: ease out

**Layer 6: Subtle vignette (polish)**
1. If CapCut has a vignette effect, add it to Layer 1 (background)
2. Intensity: 20-30% — just darkens the corners slightly
3. This draws the eye to the centre where the dot + text lives

### End Card Result (exact proportions):
```
        ┌─────────────────────────────────┐
        │          #1A0008                 │
        │                                  │
        │     ╭╌╌╌╌ outer ring ╌╌╌╌╮      │
        │     ╎                      ╎     │
        │     ╎       ● (glow)       ╎     │  ← #EF4444 radial, 48px, pulsing 1.5s
        │     ╎                      ╎     │
        │     ╰╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╯      │
        │                                  │
        │         MOBILEYES                │  ← Space Grotesk ExtraBold 56px, #FFF, tracking +3%
        │                                  │
        │   Get paid in 4 days, not 45.    │  ← Space Grotesk Regular 24px, #FFF @ 60%
        │                                  │
        └─────────────────────────────────┘
```

---

## TAGLINE VARIANTS (swap per platform)

| Platform | Tagline |
|----------|---------|
| Default | "Get paid in 4 days, not 45." |
| TikTok profile pin | "Get paid in 4 days, not 45." |
| Brand outreach | "Creator campaigns. Verified delivery. Real data." |
| Creator outreach | "Better briefs. Faster payment. Full analytics." |
| Event/Supanova | "APAC creator campaigns — from brief to payment in 4 days." |

Just swap the Layer 4 text and re-export. Same end card, different message per use.

---

## MULTI-PLATFORM EXPORT

### From one CapCut project, export these:

| Version | Ratio | Duration | Audio | Use |
|---------|-------|----------|-------|-----|
| TikTok/Reels/Shorts | 9:16 (1080×1920) | 12s | Yes | Profile pin, Reels, Shorts |
| YouTube/Web | 16:9 (1920×1080) | 12s | Yes | YouTube intro, website hero |
| Website loop | 16:9 (1920×1080) | 9.5s | No | Muted autoplay (NO end card) |
| Email GIF | 480px wide | 2.5s | No | Just Shot 6 (record button) |
| End card only | 9:16 (1080×1920) | 2.5s | No | Reusable outro for all future content |

### Export settings in CapCut:
- Resolution: 1080p
- Format: MP4
- Quality: High
- Frame rate: 30fps
- Codec: H.265 (smaller file)

### To get 16:9 version:
1. Duplicate your project (CapCut → Project → Duplicate)
2. Change ratio: click "Ratio" button at top → select 16:9
3. Reposition clips so the action stays centred (most close-ups will crop fine)
4. Export again

---

## WHAT TO FILM TODAY (minimum viable)

If you're tight on time, film JUST these and you can cut a v1.0:

1. ☐ Shot 6: Record button press (the HERO — get this right, 5+ takes)
2. ☐ Shot 1: XLR cable plug (easy, satisfying)
3. ☐ Shot 4: Ring light on (visual contrast from dark→light)

These 3 shots + end card = a 7-second v1.0 you can post TODAY while you film the rest later.

---

## PROPS CHECKLIST

| Prop | What For | Alternative |
|------|----------|-------------|
| XLR cable + audio interface | Shot 1 | Any cable with a satisfying plug-in click |
| Tripod | Shot 2 | Any tripod with leg locks |
| Phone mount/clamp | Shot 3 | Any mount with a spring mechanism |
| Ring light | Shot 4 | Any light with a physical switch |
| Shotgun mic + camera | Shot 5 | Any mic that slots into a mount |
| Camera/device with REC button + red LED | Shot 6 | ANY device where pressing a button lights up a red indicator |

---

## COLOUR & BRAND REFERENCE

| Element | Hex | Usage |
|---------|-----|-------|
| Background (end card) | `#1A0008` | Warm dark (red-tinted black, NOT cold navy) |
| Red core | `#EF4444` → `#DC2626` → `#B91C1C` | Radial gradient, centre to edge |
| Red glow inner | `rgba(239, 68, 68, 0.8)` | Drop shadow / inner glow |
| Red glow outer | `rgba(239, 68, 68, 0.4)` | Soft halo spread |
| Orange ring | `#F97316` at 40% | Subtle inner ring (larger renders only) |
| White | `#FFFFFF` | Wordmark |
| White subdued | `rgba(255, 255, 255, 0.6)` | Tagline |
| Shot grade shadows | Cool (−10 temp) | Shots 1-5 stay cool/desaturated |
| Shot grade red channel | Boost +40 saturation | Shot 6 ONLY — make LED pop |

## QUICK COLOUR GRADE RECIPE (CapCut)

```
Brightness: -5
Contrast: +10
Saturation: -25
Temperature: -10 (cool)
Highlights: +5 (warm the bright areas slightly)
Shadows: -10 (crush the blacks)
Sharpen: +15

Then on Shot 6 specifically:
HSL → Red channel → Saturation: +40 (make that LED POP against the desaturated everything else)
```

---

## DO NOT

- ❌ Background music
- ❌ Transitions (cross-dissolves, wipes, anything)
- ❌ Face reveals
- ❌ Text overlays on action shots
- ❌ AI-generated anything
- ❌ Stock footage
- ❌ Green colour anywhere
- ❌ "Level up" / "Join our community" / "Exciting opportunities"
- ❌ CapCut templates or pre-made intros

---

## AFTER EXPORT — WHERE TO POST

1. **TikTok** — pin to profile as first video. Caption: "This is Mobileyes." No hashtags needed on a pinned brand video.
2. **Instagram Reels** — same video. Pin to grid. Bio link → mobileyes.live
3. **YouTube Shorts** — same vertical version.
4. **YouTube channel** — landscape version as channel trailer + first 3 sec of future videos.
5. **Website** — muted autoplay loop (no end card version) as hero background.
6. **LinkedIn** — landscape version, posted as native video on your profile.

---

*Mobileyes Brand Video Brief v3.0 · June 2026*
*Built for CapCut Desktop · Multi-platform delivery*
