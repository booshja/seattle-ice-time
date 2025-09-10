# Seattle Ice Time — AI Context

### Overview

- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: styled-components 6 with SSR via `StyledComponentsRegistry`
- **State**: Zustand vanilla stores with custom Providers
- **Data**: Server Actions + axios fetching from rink endpoints; transformed to unified event objects
- **Analytics**: `next-plausible` with proxy

### Project Structure (src/)

- `app/`
    - `layout.tsx`: Global layout, `PlausibleProvider`, `Providers`, base styles
    - `page.tsx`: Server component; fetches weekly events via helpers and renders `EventGrid`
    - `globals.css`: CSS reset and global tweaks
    - `feedback/page.tsx`, `issue/page.tsx`: Render forms
- `components/`
    - `EventGrid/`: Weekly grid, client component; parses and displays events per day
    - `EventColumn/`, `EventCell/`: Column and cell presentation
    - `Navbar/`, `LeftRail/`, `RinkList/`, `RinkToggle/`, `Links/`: Shell and controls
    - `Providers/`: Wraps app with Styled Components + Zustand store providers
    - `Form/`: Issue and Feedback forms; shared `FormStyled` styles
    - `Email/`: React email templates for feedback/issue (feedback used with SES)
- `actions/`
    - Server actions for external APIs: `fetchKciEvents`, `fetchLicOvaEvents`, `fetchSnoKingEvents`, `createGithubIssue`
- `utils/`
    - `helpers/`: date math, rink-specific fetch/transform, `parseEvents`
    - `constants/`: colors, spacing, rink metadata, endpoint URLs, etc.
- `store/`
    - `events/`, `rinkDisplay/`, `currentWeek/`: Vanilla Zustand stores + providers
- `lib/`
    - `StyledComponentsRegistry`: SSR support for styled-components
    - `aws/`: `sendEmail` via AWS SES and nodemailer
- `types/`: Event contracts, day typings, rink types

### Data Flow

1. `app/page.tsx` calls helpers:
    - `getKciEvents`, `getLicEvents`, `getOvaEvents` (optionally Sno-King later)
    - Helpers compute week bounds, call server actions (axios), filter, and transform to unified event objects with fields: `color, day, start, end, title, url, location`
2. `EventGrid` (client):
    - Initializes Zustand `eventsStore` with server-fetched arrays
    - Reads `rinkDisplayStore` toggles and calls `parseEvents` to group by day and sort by start time
    - Renders 7 `EventColumn`s → `EventCell`s

### State Management

- Implemented with vanilla Zustand stores and React Context providers
- Stores:
    - `eventsStore`: initial and current arrays for KCI, Lynnwood, OVA; setters for initializing and updating
    - `rinkDisplayStore`: booleans for each rink; `toggleRink(rinkKey)` and `setRink(rinkKey, value)`
    - `currentWeekStore`: strings for `initialWeek` and `currentWeek`; setters present but next/prev logic not yet implemented

### Rinks and Colors

- `utils/constants/rinks.ts` defines enabled rinks. Only `KCI`, `LYNNWOOD`, `OVA` are enabled in UI. Colors in `constants/colors.ts` keyed by rink code.
- Sno-King rinks exist but are disabled; integration WIP in helpers.

### Time/Date Utilities

- `getStartEndDates({ getAsObjects? })`: Monday → Monday+7 (ISO or Date)
- `getWeekDates(startDate)`: Returns numeric day-of-month for the week
- `getDailyDates(date)`: List of `YYYY-MM-DD` for week (used for Sno-King)
- `getStartEndObjects(startDate, endDate)`: Returns `{ date, military, time }` for start/end using America/Los_Angeles
- `getDisplayDates()`: Human-readable `Month D - Month D YYYY` string

### Server Actions / External APIs

- KCI: `KCI_EVENTS_URL` (Umbraco DaySmart), filter by hockey events and date bounds
- LIC/OVA: `LIC_OVA_EVENTS_URL` with rink id, filter for Stick & Puck, Adult Drop In, Lunch Hockey; sets booking URLs appropriately
- Sno-King: DaySmart JSON: filters by resource ids; WIP iteration by day, only current day stable
- GitHub Issues: `createGithubIssue` posts to repo using `GITHUB_ISSUE_TOKEN`
- Email Feedback: `sendEmail` requires `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_REGION`, `EMAIL_FROM_ADDRESS`, `EMAIL_TO_ADDRESS`

### UI/Styling Conventions

- styled-components with SSR; `next.config.ts` enables `compiler.styledComponents`
- Theme tokens via `utils/constants`: `COLORS`, `spacing`, `fontSizes` (`lineHeight`, `fontWeight`)
- Avoid importing raw CSS/SCSS (ESLint rule)
- Fonts via `src/fonts` with Next font loader; `inter` set in `layout.tsx`

### Testing & Linting

- Jest + Testing Library + jest-styled-components; JS DOM env; ts-jest preset
- Coverage thresholds configured; collects from `src`, excludes `lib`, `types`, Next special files
- ESLint 9 flat config: Next + TS + React + a11y; opinionated rules for import order, hooks, unused imports, etc.

### Dev Scripts

- `npm run dev|build|start|lint`

### Important Aliases (tsconfig)

- `@/*` → `src/*`
- `@/icons/*` → `public/icons/*`
- `@/images/*` → `public/images/*`
- `@/mocks/*` → `src/testing/__mocks__/*`
- `@/store/*` → `src/store/*`

### Gotchas / Tips for LLMs

- Client vs Server: Helpers and actions run server-side; UI components marked with `"use client"`. Maintain boundaries when moving logic.
- Time zones: KCI uses `Etc/UTC` source; display conversions are done for America/Los_Angeles in `getStartEndObjects`.
- Sorting: `parseEvents` sorts using `start.military`; keep this shape when adding sources.
- Rink toggling: Ensure `RINKS` keys, `COLORS.rinks`, and store booleans are aligned when adding new rinks. UI uses idempotent `setRink` on checkbox `onChange` (no `onClick` handlers) to avoid duplicate toggles.
- Sno-King fetch loops are WIP; be cautious of rate limits and required cookies/headers.
- Forms: Issue form uses server action flow with `useActionState`; Feedback form composes HTML via React Email and sends with SES.

### Where to Add Things

- New rink source: add constants, server action, helper transform, extend `RINKS`, toggle in UI
- New UI pages: `app/<route>/page.tsx` and add link in `Links`
- New global styles/tokens: `utils/constants` and propagate via styled-components

### Environment Variables

- GitHub: `GITHUB_ISSUE_TOKEN`
- AWS SES: `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_REGION`, `EMAIL_FROM_ADDRESS`, `EMAIL_TO_ADDRESS`

### Roadmap Hints (from code)

- Implement previous/next week navigation in `DateHeader`
- Finish Sno-King weekly aggregation and enable rinks
- Add loading/error states for EventGrid
