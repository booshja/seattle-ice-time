## Repo-wide Unit Testing Expansion Plan

### Goals

- Reach and sustain ≥80% coverage for statements, branches, functions, and lines.
- Ensure critical paths (date math, event parsing, store selectors, navigation controls) are well-covered and resilient.
- Keep tests fast, deterministic, and easy to maintain.

### Scope & Priorities

1. Critical helpers and stores (Phase 1)

- Dates: edge cases, time zone normalization, Monday anchoring.
- Event parsing: correct day bucketing, sorting by time, stability with mixed inputs.
- Stores: events store setters, `isCurrentWeekEmpty` behavior; current week store initialization and updates.

2. Core components (Phase 2)

- DateHeader: left-arrow hidden on current week; right-arrow hidden on empty week; week-change announcements via aria-live; URL param updates.
- EventGrid: renders columns with correct dates, empty-state messaging; respects rink toggles via `RinkDisplay` store.
- Navbar: shows DateHeader only on `/`, back link on other routes.
- EventColumn: sorts and displays events in ascending time; renders zero-state gracefully.
- RinkToggle: toggles state updates reflect in EventGrid parsing.

3. Data fetchers/actions (Phase 3)

- Mock axios and verify parameterization for `fetchKciEvents`, `fetchLicOvaEvents`, `fetchSnoKingEvents`.
- Validate helper wrappers (`getKciEvents`, `getLicEvents`, `getOvaEvents`) pass computed `start/end` and transform results correctly.

### Test Matrix

- Dates helpers
    - `getStartEndDatesFromBaseDate`: various weekdays, month/year boundaries, DST boundaries (at least one case), invalid base fallback.
    - `getDisplayDatesFromBaseDate`: same-month vs cross-month vs cross-year ranges.
    - `getCurrentWeekMonday`: always returns Monday based on LA timezone assumption.
- Parse helpers
    - `parseEvents`: empty inputs → all days empty; mixed inputs (KCI/LIC/OVA) → proper day assignment; sorting by `start.military`.
- Stores
    - Events: setters update `current*` and `initial*`; `setIsCurrentWeekEmpty` flips and persists; selectors derived state.
    - CurrentWeek: `setInitialWeek` sets both `initialWeek` and `currentWeek`; `setCurrentWeek` only updates `currentWeek`.
- Components
    - DateHeader: arrow visibility; clicking arrows mutates URL (mock router); aria labels and live announcements.
    - EventGrid: computes dates from `weekStartIso`; renders columns and empty state; updates `isCurrentWeekEmpty`.
    - Navbar: conditional DateHeader/back link based on `usePathname`.
    - EventColumn: displays correct event count and ordering.
    - RinkToggle: toggles state influences EventGrid parsing.
- Actions
    - axios called with expected base URL and params; responses are transformed and filtered correctly by wrappers.

### Implementation Notes

- Use `@/components/Providers/Providers` to wrap component tests for context.
- Mock `next/navigation` where route behavior is needed; prefer lightweight mocks.
- Mock axios via `jest.mock('axios')`, provide typed responses per `src/types/*`.
- Keep fixtures small; if needed, add simple JSON fixtures under `src/testing/__mocks__`.
- Prefer testing behavior over implementation details; avoid snapshot brittleness.

### Coverage Strategy

- Start with Phase 1 until global coverage ≥60%.
- Add Phase 2 to surpass ≥80%.
- Phase 3 to stabilize coverage for networking code.

### Tasks

- Phase 1
    - Add tests for `utils/helpers/dates.ts` edge cases.
    - Add tests for `utils/helpers/parseEvents.ts` sorting and merging.
    - Add tests for `store/events/eventsStore.ts` and `store/currentWeek/currentWeekStore.ts` actions.
- Phase 2
    - Add tests for `components/DateHeader`, `components/EventGrid`, `components/Navbar`, `components/EventColumn`, `components/RinkToggle`.
- Phase 3
    - Add tests for `actions/fetch*` and helper wrappers `getKciEvents`, `getLicEvents`, `getOvaEvents` using axios mocks.

### CI & Maintenance

- Run `npx jest --runInBand` in CI; fail build on coverage <80% once Phase 2 completes.
- Use stable IDs or roles for targeting elements; avoid deep DOM queries.
- Document test patterns in README for contributors.
