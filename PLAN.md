# Suresh & Co — Mobile App Rebuild Plan

## Stack Decision: React Native + Expo + TypeScript

### Framework: React Native (Expo managed workflow)
- **Language:** TypeScript — universally understood by all AI (Claude, ChatGPT, Gemini, Copilot)
- **Platform:** iOS + Android from single codebase
- **Expo:** Managed workflow — zero native config, no Xcode/Android Studio needed to run
- **Min SDK:** Android 5.0 / iOS 13+
- **Package name:** `com.sureshandco.app`

### Why this stack for long-term AI maintainability
| | React Native + Expo + TypeScript | Flutter + Dart |
|---|---|---|
| AI training data coverage | Enormous (JS/TS most common) | Decent but much less |
| ChatGPT / Gemini accuracy | Very high | Medium — prone to Dart API hallucinations |
| No native config headaches | Expo handles it all | Requires Xcode/Android Studio |
| Community & Stack Overflow | Massive | Growing but smaller |
| Switch AI tools mid-project | Zero friction | Risk of inconsistency |
| Animations (Reanimated 3 + Moti) | Smooth, well-documented | Marginally smoother but not worth the trade-off |

**Bottom line:** Any AI (Claude, ChatGPT, Gemini, Copilot) can maintain this project confidently. TypeScript + Expo is the safest long-term choice.

---

## Design System

### Color Palette — White + Brand Blue (two-color)
Strict two-color system matching the Suresh & Co brand:

| Token | Value | Usage |
|---|---|---|
| `brandBlue` | `#1565C0` | App bar, drawer header, primary buttons, service tiles, section headings, icons |
| `brandBlueDark` | `#0D47A1` | Pressed/active states, deep shadows |
| `brandBlueLight` | `#1E88E5` | Focus rings, lighter icon tints |
| `blueSurface` | `#E8F0FE` | Subtle blue wash on alternate sections |
| `background` | `#FFFFFF` | All screen backgrounds |
| `surface` | `#FFFFFF` | Cards, modals, inputs |
| `surfaceGrey` | `#F5F7FA` | Input fills, alternate row backgrounds |
| `textPrimary` | `#1A1A2E` | Headings and body text |
| `textSecondary` | `#5C6B8A` | Subtitles, captions, helper text |
| `textOnBlue` | `#FFFFFF` | Text and icons on blue backgrounds |
| `divider` | `#E3E8F0` | Borders, separators |
| `error` | `#D32F2F` | Validation errors |

### Visual Tone
- **Two colors only: white and brand blue** — no gold, no purple, no other accents
- White is the canvas everywhere; blue does all the work
- Depth and hierarchy achieved through blue shades (`#1565C0` → `#0D47A1` → `#E8F0FE`)
- Clean, corporate, professional — lets the content breathe

### Typography — Poppins (via expo-google-fonts)
| Style | Weight | Size |
|---|---|---|
| Display | 600 SemiBold | 28 |
| Headline | 600 SemiBold | 22 |
| Title | 500 Medium | 18 |
| Body | 400 Regular | 15 |
| Caption | 400 Regular | 12 |
| Button | 600 SemiBold | 14 |

### Shape
- Cards: `borderRadius: 16`
- Buttons: `borderRadius: 12`
- Inputs: `borderRadius: 12`
- Service tiles: `borderRadius: 16`

---

## Micro Animations (Moti + Reanimated 3)

| Element | Animation |
|---|---|
| Stats row (750+, 120+, 50+) | Count-up on mount |
| Service grid cards | Staggered fade + slide-up (60ms delay each) |
| Screen transitions | Custom fade + slide via `react-navigation` options |
| Service tile → detail | Shared element-style scale transition |
| Ask Query banner | Subtle shimmer pulse (looping) |
| Drawer | Built-in slide + overlay fade |
| Buttons | Scale to 0.96 on press |
| Contact row icons | Bounce on tap |
| Team cards | Fade-in staggered |
| Hero header | Fade + slide-down on load |

---

## Project File Structure

```
suresh-and-co/
├── app.json                        ← Expo config
├── package.json
├── tsconfig.json
├── app/                            ← expo-router file-based routing
│   ├── _layout.tsx                 ← Root layout (drawer navigator)
│   ├── index.tsx                   ← Home screen
│   ├── services.tsx                ← All services
│   ├── ask-query.tsx               ← Ask Query form
│   ├── vision-mission.tsx
│   ├── the-team.tsx
│   ├── recognition.tsx
│   ├── insights.tsx
│   └── careers.tsx
├── src/
│   ├── theme/
│   │   ├── colors.ts               ← Color constants
│   │   ├── typography.ts           ← Text style presets
│   │   └── spacing.ts              ← Spacing scale
│   ├── data/
│   │   ├── services.ts             ← 8 services (name, icon, description)
│   │   ├── team.ts                 ← 6 team members
│   │   └── constants.ts            ← Contact info, social links
│   ├── types/
│   │   ├── service.ts
│   │   └── team-member.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppDrawer.tsx       ← Side navigation drawer
│   │   │   └── ScreenWrapper.tsx   ← Common screen wrapper
│   │   ├── home/
│   │   │   ├── HeroHeader.tsx      ← Logo, tagline
│   │   │   ├── StatsRow.tsx        ← Animated count-up stats
│   │   │   ├── AskExpertBanner.tsx ← Shimmer CTA banner
│   │   │   ├── AboutSection.tsx    ← About Us card
│   │   │   ├── ServicesGrid.tsx    ← 2-col animated grid
│   │   │   └── ContactSection.tsx  ← Tappable contact rows
│   │   ├── shared/
│   │   │   ├── SectionHeader.tsx   ← Blue-accented heading
│   │   │   ├── ServiceTile.tsx     ← Animated service card
│   │   │   ├── TeamMemberCard.tsx  ← Partner profile card
│   │   │   ├── PressableScale.tsx  ← Scale-on-press wrapper
│   │   │   └── BlueDivider.tsx     ← Decorative blue divider
│   └── utils/
│       └── launcher.ts             ← Phone/email/URL openers
├── assets/
│   ├── images/
│   │   └── logo.png
│   └── adaptive-icon.png
```

---

## Screens Detail

### Home Screen (`app/index.tsx`)
Scrollable `ScrollView` with sections:
1. **Hero Header** — White background, logo centred, tagline "Ever lasting relationship" in bold dark text, fade-in + slight slide-down on load
2. **Stats Row** — `750+ Clients` | `120+ Team` | `50+ Years` — brand blue numbers on white, animated count-up on mount
3. **Ask Expert Banner** — Brand blue card with white text and chat icon, subtle shimmer pulse → navigates to Ask Query
4. **About Us** — White card, "About Us" heading in brand blue, body text in dark, "Vision & Mission" + "The Team" outline buttons (blue border + blue text)
5. **Services** — Section heading in brand blue, 2-column grid of 8 tiles (blue fill, white text/icon), staggered animation, "View All Services →" in blue
6. **Contact Us** — White card, section heading in brand blue, each row has blue icon + dark text, tappable with ripple

### Services Screen (`app/services.tsx`)
- Styled dropdown picker for 8 services
- Animated expand/collapse for selected service description
- Brand blue left-border accent on active service

### Ask Query Screen (`app/ask-query.tsx`)
- Category picker (General / Tax / Audit / Company Law / GST / FEMA / Others)
- Title input
- Details multiline input
- "SUBMIT QUERY" button → opens mailto: with pre-filled to/subject/body

### Vision & Mission (`app/vision-mission.tsx`)
- Vision section (navy heading + body)
- Blue divider
- Mission section

### The Team (`app/the-team.tsx`)
- Staggered-animated cards: name in brand blue, qualification label, bio text

### Recognition (`app/recognition.tsx`)
- Award cards with icon + text

### Insights (`app/insights.tsx`)
- `WebView` → https://sureshandco.com/resources/

### Careers (`app/careers.tsx`)
- `WebView` → https://sureshandco.com/careers/

---

## Navigation Drawer (`AppDrawer.tsx`)
- **Header:** Brand blue bg (`#1565C0`), logo centred, "Chartered Accountants" subtitle in white
- **Body bg:** White
- **Items (blue icons + dark text, blue active highlight):**
  - Home
  - Ask Query
  - Recognition
  - Insights
  - Careers
  - — *Follow Us* — (blue divider label)
  - Facebook (mock → https://www.facebook.com/sureshandco)
  - LinkedIn (→ https://in.linkedin.com/company/suresh-&-co.)
  - YouTube (mock → https://www.youtube.com/@sureshandco)
  - Share

---

## Real Content

### About Us
SURESH & CO. has been nurtured and grown over 50 years to deliver high quality, high value, timely, unique solutions for overcoming Business and Regulatory challenges.

Business and wealth will grow after having the right and in-depth awareness of Tax, Accounting and Regulatory policies. Having in place the right policies — which evolve as business grows — produces highest possible turnover, maximum profits, faster cash flows and a stronger balance sheet.

Serving 750+ active clients globally. Offices in Bengaluru (IT capital of India) and Chennai, with associates in Hyderabad, Mumbai, Delhi, and the USA. Represented by 120+ professionals including 30+ Chartered Accountants, Company Secretaries and technically qualified persons.

### Vision & Mission
**Vision:** To turn knowledge into immense value for the benefit and betterment of the clients, the team, capital markets and the society.

**Mission:** Good isn't good enough — there is always scope for something better. Deploying the best of our knowledge, skills and talents so clients get the best professional services.

### 8 Services
1. **Management Support Services** — Management insight on business performance: revenue, profits, EBITDA, cash flows. Reviews organisational structure, policies, systems and controls. Concentrates on improving efficiencies and overcoming weaknesses.
2. **Audit & Assurance** — Instils trust in financial statements. Deters fraud, imposes financial discipline. Provides comfort that internal accounting processes generate reliable information for governance and statutory duties.
3. **M&A Transaction Services** — Advisory on mergers & acquisitions: due diligence, valuation, deal structuring, and negotiation support for family and corporate businesses.
4. **Investment Banking for Family Business** — Careful advisory at the intersection of family, personal, and strategic considerations. Capital raising, structuring, and financial advisory tailored to family-owned businesses.
5. **Policy Framework – Tax, Accounting and Regulatory** — Designing and implementing right policies covering tax planning, accounting standards, and regulatory compliance that evolve as business grows.
6. **Family Business Reorganization & Succession Planning** — Advises on structure, timing, run-out models when transitioning ownership. Identifies the right acquirers, assesses business value, and unlocks its full potential.
7. **MyFAME© HNI Services** — Serving 400+ high-net-worth individuals: educated, talented, tech-savvy, self-made. Deep expertise in tax implications and financial document requirements for HNIs.
8. **Traditional CA Services** — Comprehensive accounting, direct & indirect taxation, GST, company law compliance — honouring 50 years of trusted practice.

### Team (6 Members)
1. **D L Suresh Babu** | FCA | Founder & Managing Partner, 50+ yrs experience, Central Council Member ICAI (1982–85)
2. **D S Vivek** | FCA | Business Catalyst, Coach; formerly PricewaterhouseCoopers; 21+ yrs advising globally
3. **Vikram** | FCA, Licentiate ICSI | 9+ yrs Audit & Assurance; IT, financial services, manufacturing, retail, education
4. **Santhanam Narayanan** | FCA, ACS, Diploma IFRS (ACCA UK) | 32+ yrs manufacturing: Finance, Treasury, Audit
5. **Manisha Khanna** | FCA | Direct Tax Litigation & Advisory; heads New Delhi operations
6. **Ramachandran** | FCA | Taxation, Management Consultancy, Company Law, Business Advisory

### Contact
- Address: #43/61, 'Srinidhi', Ist Floor, Surveyor's Street, Basavanagudi, Bengaluru 560004
- Phone: 080 26609560
- Email: info@sureshandco.com
- Website: www.sureshandco.com

### Social Media (mock — update later)
- Facebook: https://www.facebook.com/sureshandco
- LinkedIn: https://in.linkedin.com/company/suresh-&-co.
- YouTube: https://www.youtube.com/@sureshandco

---

## Dependencies (`package.json`)
```json
{
  "expo": "~52.0.0",
  "react": "18.3.2",
  "react-native": "0.76.5",
  "expo-router": "~4.0.0",
  "react-native-reanimated": "~3.16.0",
  "moti": "^0.29.0",
  "expo-google-fonts/poppins": "latest",
  "expo-font": "~13.0.0",
  "react-native-webview": "13.12.2",
  "expo-linking": "~7.0.0",
  "expo-mail-composer": "~13.0.0",
  "expo-sharing": "~13.0.0",
  "@expo/vector-icons": "^14.0.0",
  "react-native-safe-area-context": "4.12.0",
  "react-native-screens": "~4.1.0",
  "@react-navigation/drawer": "^7.0.0",
  "react-native-gesture-handler": "~2.20.0"
}
```

---

## Implementation Order
1. Expo project scaffold + `app.json` + `package.json`
2. `src/theme/` — colors, typography, spacing
3. `src/data/` + `src/types/` — all static data and types
4. Shared components — `SectionHeader`, `PressableScale`, `BlueDivider`, `ServiceTile`, `TeamMemberCard`
5. `AppDrawer.tsx` + root `_layout.tsx`
6. Home screen + all sub-components (Hero, Stats, Banner, About, Grid, Contact)
7. `services.tsx`
8. `ask-query.tsx`
9. `vision-mission.tsx` + `the-team.tsx`
10. `recognition.tsx`, `insights.tsx`, `careers.tsx`
11. `launcher.ts` + wire all intents
12. `app.json` config (name, icon, splash, package ID)
