## Week Navigation Feature Plan

### Clarifying questions

- **Back navigation limits**: Should users be able to navigate to past weeks indefinitely, or should we cap at the current week (i.e., hide/disable the left arrow for past weeks)?
- **URL behavior**: Do you want the selected week reflected in the URL (e.g., `/?weekStart=YYYY-MM-DD`) so links are shareable and reloadable?
- **Loading UX**: On week change, is a full-page route transition acceptable, or should we add an inline loading skeleton within the grid?
- **Time zone**: Should we continue to use America/Los_Angeles for week boundaries and display, regardless of the user’s local time?
- **Prefetching**: Do we need to prefetch the next/previous week events for snappier navigation, or is on-demand fetch acceptable for now?
- **Tests**: Any specific test coverage you want (e2e for URL changes, unit coverage for date helpers, etc.)?

### Decisions based on your answers

- Cap back navigation at the current week: the left arrow is hidden when viewing the current week.
- When a week has no events for any rink, show a clear message and hide the right arrow for going further into the future.
- Week in URL is optional; for v1 we will use `weekStart=YYYY-MM-DD` to enable simple SSR fetching. We can remove it later if desired.
- Page transitions are acceptable for v1; we can add an inline loading skeleton later.
- Always use America/Los_Angeles for date math and display.
- On-demand fetching for v1; consider prefetching next/previous week as an enhancement.
- Unit tests are preferred; no e2e yet. No localStorage persistence needed.

### High-level UX

- The `DateHeader` shows the current displayed week string and provides left/right arrow buttons.
- Clicking left/right updates the week by ±1 week and navigates (push) to the same page with an updated `weekStart` query param (used for SSR simplicity).
- The page reloads server-side with events for the new week and re-renders the grid.
- Left arrow is hidden when the displayed week equals the current week.
- If a displayed week has no events across all rinks, show a friendly feedback message and hide the right arrow (cannot go further into the future).

### Data flow overview

1. `/?weekStart=YYYY-MM-DD` (optional) is read in `app/page.tsx`.
2. Server computes `[startISO, endISO]` for that week and calls existing helpers `getKciEvents`, `getLicEvents`, `getOvaEvents` with those values.
3. Server passes events and `weekStart` down to `EventGrid`.
4. `EventGrid` computes the 7 day numbers based on `weekStart` and displays events.
5. `DateHeader` reads the current `weekStart` from `useSearchParams`, computes a display string, and updates the WeekDisplay store for consistency.
6. Arrow clicks compute the next/prev Monday from the current `weekStart` (or current Monday if missing) and push a new URL, triggering SSR re-fetch.

### Required changes

- Dates helpers (`src/utils/helpers/dates.ts`):
    - Add `getStartEndDatesFromBaseDate(base: Date): [string, string]` to derive week `[start, end]` from any base date (anchored to Monday, inclusive week span).
    - Add `getDisplayDatesFromBaseDate(base: Date): string` to create the header string from a base date.
    - Add `getCurrentWeekMonday(): Date` to compute today’s Monday in America/Los_Angeles for left-arrow capping.
    - Keep existing functions unchanged for backward compatibility.

- Week display store (`src/store/currentWeek/*`):
    - Store keeps `initialWeek` (today’s week) and `currentWeek` (displayed week).
    - On mount/effect in `DateHeader`, compute display string from URL `weekStart` (or current week if missing). Always compute today’s week separately and call `setInitialWeek(todayDisplay)`. Update `currentWeek` whenever `weekStart` changes.

- `DateHeader` (`src/components/DateHeader/DateHeader.tsx`):
    - Read `weekStart` via `useSearchParams`.
    - Compute display string with `getDisplayDatesFromBaseDate` using the current `weekStart` (or today’s Monday for default).
    - Replace button onClick handlers to compute ±7d Monday and `router.push` to `/?weekStart=YYYY-MM-DD`.
    - Cap back navigation: hide the left button when displayed week equals today’s week (derived via `getCurrentWeekMonday`).
    - Hide the right button when the events store indicates the displayed week has zero events across all rinks.

- Home page (`src/app/page.tsx`):
    - Accept `searchParams` (Next.js App Router) to read `weekStart`.
    - Compute `[start, end]` from `weekStart` using `getStartEndDatesFromBaseDate` (fall back to current week if missing/invalid) and pass to `getKciEvents/getLicEvents/getOvaEvents`.
    - Pass `weekStart` (ISO) to `EventGrid` as a new prop.

- `EventGrid` (`src/components/EventGrid/EventGrid.tsx`):
    - Accept a new `weekStartIso?: string` prop.
    - Use it to compute the base Monday and call `getWeekDates(baseMonday)` instead of deriving from `new Date()`.
    - If no events are present across all rinks, render a centered, friendly feedback state (e.g., “No events this week”) instead of an empty grid.
    - No client fetching required; continue parsing and rendering from props.

- Events store selector (new):
    - Add a small selector/helper to determine if the current week’s `currentKci`, `currentLynnwood`, and `currentOlympicview` arrays are all empty; `DateHeader` can use this to disable the right arrow.

### Edge cases

- If `weekStart` is missing/invalid, fall back to the current week’s Monday derived in America/Los_Angeles.
- Always normalize `weekStart` to the Monday of its week.
- Ensure date math uses the same time zone assumptions to avoid off-by-one day issues.
- When a week is empty, show the feedback message and hide the right arrow for further navigation.

### Optional enhancements (later)

- Add a loading skeleton displayed while navigating between weeks.
- Prefetch next/previous week routes or data (optimistic) to reduce perceived latency.
- Optionally drop the `weekStart` URL param later and migrate to client-side fetching if desired.

### Type considerations

- We will continue to use `Events` and `EventObject` from `src/types/events.ts`. No new event types are introduced.
- KCI/LIC/OVA transformed objects already conform to their respective `*EventObject` interfaces; no changes needed there.
- Empty-week detection can be done in two ways (both type-safe):
    - After parsing, check that every array in `Events` is length 0.
    - Or at the store level, check `currentKci.length + currentLynnwood.length + currentOlympicview.length === 0`.
- The right-arrow disable logic in `DateHeader` will rely on a selector that returns a `boolean` (no new types required).
- Any new date helper functions will be typed to return `string` ISO dates (start/end) and `Date` where applicable.

### Messaging (empty future week)

Suggested copy options (pick one):

- Option A (concise): "No events found for this week. Try going back a week or refresh."
- Option B (neutral + guidance): "No events are scheduled for this week. Go back a week or refresh the page."
- Option C (your tone): "No events are available this far into the future, or there was an error. Please go back a week or refresh the page and try again."

We will use Option C unless you prefer A or B.

### Accessibility (a11y)

- Buttons: use semantic `<button>` with descriptive `aria-label` (e.g., "Go to previous week", "Go to next week").
- Visibility: arrows are removed from the DOM when hidden; ensure layout doesn’t shift excessively.
- Announcements: add an `aria-live="polite"` region that announces the newly selected week (e.g., "Week of March 3 to March 9").
- Keyboard: ensure buttons are reachable via tab; focus remains on the clicked control after navigation.
- Contrast: ensure buttons and text meet WCAG AA contrast.
- Empty state: provide a `role="status"` wrapper or use the same aria-live region to announce the no-events message.

### Repo-wide testing plan (unit tests)

- Dates helpers: test `getStartEndDatesFromBaseDate`, `getDisplayDatesFromBaseDate`, `getCurrentWeekMonday` across edge cases and time zone assumptions.
- Event helpers: test filters and transforms to ensure `EventObject` shape and correct day assignment.
- Events store selector: test emptiness selector for combinations of non-empty/empty arrays.
- `DateHeader`: test left/right arrow visibility logic and that week-change handlers compute correct next/prev Mondays.
- `EventGrid`: test that the empty-state message renders when all inputs are empty; otherwise renders columns with sorted events.
- Optional: snapshot tests for `DateHeader` and `EventGrid` visual states.
