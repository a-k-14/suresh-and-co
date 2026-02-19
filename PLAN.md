# Suresh & Co Android App — Rebuild Plan

## Overview
Recreate the Android app (Java + XML) for **Suresh & Co**, a Chartered Accountants firm in Bengaluru with 50+ years of experience.

- **Package:** `com.sureshandco.app`
- **Language:** Java
- **UI:** XML layouts
- **Min SDK:** 21 (Android 5.0 Lollipop)
- **Target SDK:** 34
- **Navigation:** DrawerLayout + NavigationView

---

## App Color Scheme
| Token | Hex |
|---|---|
| Primary (blue) | `#1565C0` |
| Primary Dark | `#003c8f` |
| Accent (lighter blue) | `#5E92F3` |
| Background | `#FFFFFF` |
| Surface/Card | `#F5F5F5` |
| Text Primary | `#212121` |
| Text Secondary | `#757575` |

---

## Project File Structure

```
app/
├── src/main/
│   ├── java/com/sureshandco/app/
│   │   ├── MainActivity.java               ← Home + DrawerLayout host
│   │   ├── ServicesActivity.java           ← All services with spinner
│   │   ├── AskQueryActivity.java           ← Query submission form
│   │   ├── VisionMissionActivity.java      ← Vision & Mission
│   │   ├── TheTeamActivity.java            ← Team members
│   │   ├── RecognitionActivity.java        ← Awards & Recognition
│   │   ├── InsightsActivity.java           ← Insights / Articles
│   │   ├── CareersActivity.java            ← Careers
│   │   └── model/
│   │       └── Service.java                ← Service data model
│   └── res/
│       ├── layout/
│       │   ├── activity_main.xml           ← DrawerLayout + home content
│       │   ├── activity_services.xml       ← Spinner + description
│       │   ├── activity_ask_query.xml      ← Query form
│       │   ├── activity_vision_mission.xml
│       │   ├── activity_the_team.xml
│       │   ├── activity_recognition.xml
│       │   ├── activity_insights.xml
│       │   ├── activity_careers.xml
│       │   ├── nav_header.xml              ← Drawer header view
│       │   └── item_service_grid.xml       ← Single service tile (GridView)
│       ├── menu/
│       │   └── nav_drawer_menu.xml         ← Drawer navigation items
│       ├── drawable/
│       │   └── ic_logo.xml (or PNG)        ← 50-year logo placeholder
│       ├── values/
│       │   ├── colors.xml
│       │   ├── strings.xml
│       │   ├── styles.xml (or themes.xml)
│       │   └── arrays.xml                  ← Service names, query categories
│       └── AndroidManifest.xml
└── build.gradle
```

---

## Screens & Layouts

### 1. MainActivity (Home)
**Layout:** `activity_main.xml`
- Root: `DrawerLayout`
  - Content view: `CoordinatorLayout` > `AppBarLayout` (Toolbar) + `NestedScrollView`
    - `NestedScrollView` contains a vertical `LinearLayout` with:
      1. **Header card:** Logo image + "Suresh & Co 50 Years" + tagline "Ever lasting relationship"
      2. **Ask Expert row:** Blue banner/button — "Ask the expert team your queries →"
      3. **About Us section:** Heading + body text (2–3 paragraphs about the firm)
      4. **Vision & Mission / The Team buttons:** Two side-by-side `MaterialButton`s
      5. **Services section:** Heading + 2-column `GridView` (or `GridLayout`) of 8 service tiles + "All Services →" button
      6. **Contact Us section:** Card with address, phone, email, website (all clickable with intents)
  - `NavigationView` (drawer) with `nav_header.xml` + `nav_drawer_menu.xml`

**Java:** Handle drawer toggle, service grid click → `ServicesActivity`, contact intents (dial, email, browser)

### 2. ServicesActivity
**Layout:** `activity_services.xml`
- `AppBarLayout` with Toolbar (back arrow + "Services" title)
- `Spinner` — populated from `Service` objects list
- `ScrollView` > `TextView` (service description body)

**Java:** Populate spinner with 8 services; on selection changed → update description text

### 3. AskQueryActivity
**Layout:** `activity_ask_query.xml`
- `AppBarLayout` with Toolbar (back arrow + "Ask Query" title)
- `ScrollView` > `LinearLayout`:
  - Introductory description `TextView`
  - "Select the category for Expert advice:" label + `Spinner` (General, Tax, Audit, Company Law, Others)
  - `TextInputLayout` > `EditText` — "Please type your query title"
  - `TextInputLayout` > `EditText` (multiline) — "Please type your query details"
  - `Button` — "SUBMIT QUERY" (full width, blue)

**Java:** Validate fields; on submit show success dialog/Toast (or send via email Intent)

### 4. VisionMissionActivity
**Layout:** Simple toolbar + `ScrollView` > `TextView`s for Vision & Mission content

### 5. TheTeamActivity
**Layout:** Toolbar + `RecyclerView` or `LinearLayout` listing team members (name + designation)

### 6. RecognitionActivity
**Layout:** Toolbar + `ScrollView` with awards/recognition text or list

### 7. InsightsActivity
**Layout:** Toolbar + `RecyclerView` with article cards (title + summary)

### 8. CareersActivity
**Layout:** Toolbar + `ScrollView` with current openings or "No openings" message

---

## Navigation Drawer
**`nav_header.xml`:** Logo + "Suresh & Co" + "Chartered Accountants"

**`nav_drawer_menu.xml`** (menu resource):
```
Group 1:
  - Ask Query      (ic_chat icon)
  - Recognition    (ic_emoji_events icon)
  - Insights       (ic_article icon)
  - Careers        (ic_person_add icon)

Group 2 - Follow Us:
  - Facebook       (ic_facebook icon)
  - LinkedIn       (ic_linkedin icon)
  - YouTube        (ic_youtube icon)

Group 3:
  - Share          (ic_share icon)
```

---

## Services Data (8 Services)

| # | Name | Short Description |
|---|---|---|
| 1 | Management Support Services | Business management advisory & operational support for family businesses |
| 2 | Audit & Assurance | Statutory, internal, and concurrent audit services |
| 3 | M&A Transaction Services | Merger & acquisition advisory, due diligence, and valuation |
| 4 | Investment Banking for Family Business | Capital raising, structuring, and financial advisory |
| 5 | Policy Framework – Tax, Accounting and Regulatory | Compliance, policy design, tax planning |
| 6 | Family Business Reorganization & Succession Planning | Structuring ownership and leadership transitions |
| 7 | MyFAME© HNI Services | Exclusive high-net-worth individual financial management |
| 8 | Traditional CA Services | Accounting, taxation, GST, and related compliance |

---

## Key Dependencies (`app/build.gradle`)
```groovy
implementation 'com.google.android.material:material:1.11.0'
implementation 'androidx.appcompat:appcompat:1.6.1'
implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
implementation 'androidx.recyclerview:recyclerview:1.3.2'
implementation 'androidx.cardview:cardview:1.0.0'
```

---

## AndroidManifest.xml
- `INTERNET` permission (for future API use)
- `CALL_PHONE` permission (for phone dial intent)
- All 8 Activities declared

---

## Implementation Order

1. **Project setup** — `build.gradle`, `colors.xml`, `strings.xml`, `themes.xml`, `arrays.xml`
2. **Model** — `Service.java`
3. **Layouts** — all XML layouts
4. **MainActivity** — home screen + drawer setup
5. **ServicesActivity** — spinner + content
6. **AskQueryActivity** — form + submission
7. **Remaining activities** — Vision/Mission, Team, Recognition, Insights, Careers
8. **Contact intents** — phone, email, map, browser
9. **Social media links** — Facebook, LinkedIn, YouTube via browser intent
10. **Share intent** — share app/firm details

---

## Contact Info (hardcoded)
- **Address:** #43/61, 'Srinidhi', Ist Floor, Surveyor's Street, Basavanagudi, Bengaluru, Karnataka 560004
- **Phone:** 080 26609560
- **Email:** info@sureshandco.com
- **Website:** www.sureshandco.com

---

## Social Media
- Facebook: facebook.com/sureshandco (to confirm)
- LinkedIn: linkedin.com/company/sureshandco (to confirm)
- YouTube: youtube.com/@sureshandco (to confirm)
