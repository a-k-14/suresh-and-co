# Suresh & Co Android App — Rebuild Plan

## Overview
Recreate the Android app (Java + XML) for **Suresh & Co**, a Chartered Accountants firm in Bengaluru with 50+ years of experience.

- **Package:** `com.sureshandco.app`
- **Language:** Java
- **UI:** XML layouts
- **Min SDK:** 21 (Android 5.0 Lollipop)
- **Target SDK:** 34
- **Navigation:** DrawerLayout + NavigationView
- **Website:** https://sureshandco.com

---

## App Color Scheme
| Token | Hex |
|---|---|
| Primary (blue) | `#1565C0` |
| Primary Dark | `#003c8f` |
| Accent | `#5E92F3` |
| Background | `#FFFFFF` |
| Card Surface | `#F5F5F5` |
| Text Primary | `#212121` |
| Text Secondary | `#757575` |

---

## Project File Structure

```
app/
├── src/main/
│   ├── java/com/sureshandco/app/
│   │   ├── MainActivity.java
│   │   ├── ServicesActivity.java
│   │   ├── AskQueryActivity.java
│   │   ├── VisionMissionActivity.java
│   │   ├── TheTeamActivity.java
│   │   ├── RecognitionActivity.java
│   │   ├── InsightsActivity.java
│   │   ├── CareersActivity.java
│   │   └── model/
│   │       └── Service.java
│   └── res/
│       ├── layout/
│       │   ├── activity_main.xml
│       │   ├── activity_services.xml
│       │   ├── activity_ask_query.xml
│       │   ├── activity_vision_mission.xml
│       │   ├── activity_the_team.xml
│       │   ├── activity_recognition.xml
│       │   ├── activity_insights.xml
│       │   ├── activity_careers.xml
│       │   ├── nav_header.xml
│       │   └── item_service_grid.xml
│       ├── menu/
│       │   └── nav_drawer_menu.xml
│       ├── values/
│       │   ├── colors.xml
│       │   ├── strings.xml
│       │   ├── themes.xml
│       │   └── arrays.xml
│       └── AndroidManifest.xml
└── build.gradle
```

---

## Screens & Layouts

### 1. MainActivity (Home + DrawerLayout)
- Toolbar: "Suresh & Co" + hamburger icon
- `NestedScrollView` with:
  1. **Header:** Logo + "Suresh & Co – 50 Years" + tagline *"Ever lasting relationship"*
  2. **Ask Expert banner:** Blue strip → "Ask the expert team your queries ›" → opens `AskQueryActivity`
  3. **About Us card:** Company description text (see content below)
  4. **Buttons row:** "Vision & Mission" | "The Team"
  5. **Services section:** 2-column grid of 8 tiles + "All Services →" link
  6. **Contact Us card:** Address, phone (dial intent), email (mailto intent), website (browser intent)
- Navigation Drawer (see below)

### 2. ServicesActivity
- Toolbar: back arrow + "Services"
- Subtitle: "Select the Service to know more"
- `Spinner` populated with 8 service names
- `ScrollView` → `TextView` showing selected service description

### 3. AskQueryActivity
- Toolbar: back arrow + "Ask Query"
- Intro description text
- Label: "Select the category for Expert advice:"
- `Spinner`: General, Tax, Audit, Company Law, GST, FEMA, Others
- `TextInputLayout` → `EditText`: "Please type your query title"
- `TextInputLayout` → `EditText` (multiline, 4 lines): "Please type your query details"
- `Button`: "SUBMIT QUERY" (full width, blue) → sends email intent to info@sureshandco.com

### 4. VisionMissionActivity
- Toolbar: back arrow + "Vision & Mission"
- ScrollView with Vision heading + text, Mission heading + text

### 5. TheTeamActivity
- Toolbar: back arrow + "The Team"
- ScrollView listing each partner's name, qualification, and bio

### 6. RecognitionActivity
- Toolbar: back arrow + "Recognition"
- ScrollView with recognition/awards content

### 7. InsightsActivity
- Toolbar: back arrow + "Insights"
- WebView loading https://sureshandco.com/resources/ (or static card list)

### 8. CareersActivity
- Toolbar: back arrow + "Careers"
- WebView loading https://sureshandco.com/careers/ (or static content)

---

## Navigation Drawer

**Header (`nav_header.xml`):** Logo + "Suresh & Co" + "Chartered Accountants"

**Menu (`nav_drawer_menu.xml`):**
```
Group 1:
  - Ask Query       (ic_chat_bubble_outline)
  - Recognition     (ic_emoji_events)
  - Insights        (ic_article)
  - Careers         (ic_person_add_alt)

Group 2 — Follow Us:
  - Facebook        → browser intent
  - LinkedIn        → https://in.linkedin.com/company/suresh-&-co.
  - YouTube         → browser intent

Group 3:
  - Share           → share intent (app/firm info text)
```

---

## Real Content

### About Us
SURESH & CO. has been nurtured and grown over 50 years to deliver high quality, high value, timely, unique solutions for overcoming Business and Regulatory challenges.

The firm believes business and wealth will grow after having the right and in-depth awareness of Tax, Accounting and Regulatory policies. Having in place the right policies, which evolve as business grows, produces highest possible turnover, maximum profits, faster cash flows and a stronger balance sheet.

Suresh & Co. provides services to 750+ active clients globally. Located at Bengaluru – the IT capital of India, and Chennai – the Detroit of India, with associates in Hyderabad, Mumbai, Delhi, other major cities and the USA. Represented by a strong 120+ team including 30+ Chartered Accountants, Company Secretaries and other technically qualified persons.

### Vision & Mission
**Vision:** To turn knowledge into immense value for the benefit and betterment of the clients, the team, capital markets and the society.

**Mission:** To believe good isn't good enough and there is always scope for something better — ensuring the best of our knowledge, skills and talents are deployed so clients get the best professional services.

### Services (8)

| # | Name | Description |
|---|---|---|
| 1 | Management Support Services | Provides management insight on business performance effectiveness — growth in revenue, profits, cash flows, and EBITDA. Critically reviews organisational structure, policies, plans, systems, procedures, and methods of control. Suggests improvements and helps make decisions on make-or-buy, acquisitions, and rehabilitation of sick units. |
| 2 | Audit & Assurance | Instils trust and confidence in financial statements. Engenders wider 'intangible' benefits including imposing discipline on companies and deterring fraud. Provides comfort that internal accounting processes are generating reliable information to assist management in governance and statutory duties. |
| 3 | M&A Transaction Services | Advisory on mergers and acquisitions including due diligence, valuation, deal structuring, and negotiation support. |
| 4 | Investment Banking for Family Business | Careful advisory at the intersection of family and personal considerations of ownership, coupled with strategic considerations for the future. Capital raising, structuring, and financial advisory tailored to family-owned businesses. |
| 5 | Policy Framework – Tax, Accounting and Regulatory | Designing and implementing the right policies covering tax planning, accounting standards, and regulatory compliance, which evolve as business grows. |
| 6 | Family Business Reorganization & Succession Planning | Advises family-run businesses on structure, timing, run-out models and support years when transitioning ownership. Helps identify the right acquirers, assesses business value, and unlocks full potential to get the right price. |
| 7 | MyFAME© HNI Services | Serves 400+ HNIs — highly educated, talented, tech-savvy individuals who have largely created their own wealth. Deep understanding of tax implications and financial document requirements for high-net-worth individuals. |
| 8 | Traditional CA Services | Comprehensive accounting, direct/indirect taxation, GST, company law compliance, and related services — respecting the firm's 50-year lineage in traditional practice areas. |

### The Team

| Name | Qualification | Role |
|---|---|---|
| D L Suresh Babu | FCA | Founder & Managing Partner – 50+ yrs experience; Central Council Member, ICAI (1982–85) |
| D S Vivek | FCA | Business Catalyst, Entrepreneur, Coach; formerly PricewaterhouseCoopers; 21+ yrs advising businesses globally |
| Vikram | FCA, Licentiate ICSI | 9+ yrs Audit & Assurance; large clients in IT, financial services, manufacturing, retail, education, real estate |
| Santhanam Narayanan | FCA, ACS, Diploma IFRS (ACCA UK) | 32+ yrs manufacturing sector; Finance, Treasury, Costing, Secretarial, Accounts, Audit |
| Manisha Khanna | FCA | Direct Tax Litigation & Advisory; heads New Delhi operations |
| Ramachandran | FCA | Taxation, Management Consultancy, Company Law, Business Advisory, Auditing |

### Contact Info
- **Address:** #43/61, 'Srinidhi', Ist Floor, Surveyor's Street, Basavanagudi, Bengaluru, Karnataka 560004
- **Phone:** 080 26609560
- **Email:** info@sureshandco.com
- **Website:** www.sureshandco.com

### Social Media
- **LinkedIn:** https://in.linkedin.com/company/suresh-&-co.
- **Facebook:** Search "Suresh & Co Chartered Accountants" (link to be confirmed)
- **YouTube:** Search "Suresh & Co" (link to be confirmed)

---

## Dependencies (`app/build.gradle`)
```groovy
implementation 'com.google.android.material:material:1.11.0'
implementation 'androidx.appcompat:appcompat:1.6.1'
implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
implementation 'androidx.recyclerview:recyclerview:1.3.2'
implementation 'androidx.cardview:cardview:1.0.0'
```

## Permissions (`AndroidManifest.xml`)
- `INTERNET` (WebView, social links)
- `CALL_PHONE` (dial intent)

---

## Implementation Order

1. Project setup — Gradle, `colors.xml`, `strings.xml`, `themes.xml`, `arrays.xml`
2. `Service.java` model
3. All XML layouts
4. `MainActivity` — home scroll + drawer
5. `ServicesActivity`
6. `AskQueryActivity`
7. `VisionMissionActivity`, `TheTeamActivity`
8. `RecognitionActivity`, `InsightsActivity`, `CareersActivity`
9. Contact intents (phone, email, map, browser)
10. Social media + share intents
