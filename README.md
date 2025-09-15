# Seattle Ice Time

A web app to aggregate Hockey ice time schedules from the Greater Seattle Area into one place!

## Features

- Aggregated schedules from multiple rinks (KCI, LIC/OVA, Sno-King)
- Weekly calendar grid with loading skeletons for fast perceived performance
- Rink filters and state persisted via lightweight stores (Zustand)
- Emotion with SSR support
- Feedback form emailed via AWS SES
- Issue reporter that opens a GitHub issue and emails a summary
- Plausible analytics (privacy-friendly), with outbound link tracking

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Emotion (`@emotion/react`, `@emotion/styled`) with SSR
- **State**: Zustand
- **Email**: AWS SES via `@aws-sdk/client-ses` + `nodemailer`, templated with `@react-email`
- **HTTP**: axios
- **Analytics**: `next-plausible`
- **Testing**: Jest, Testing Library, jsdom, @emotion/jest, ts-jest
- **TypeScript**: 5.x

## Environment Variables

The app uses the following environment variables:

- `AWS_ACCESS_KEY` – IAM access key for SES
- `AWS_SECRET_KEY` – IAM secret key for SES
- `AWS_REGION` – AWS region for SES (e.g. us-west-2)
- `EMAIL_FROM_ADDRESS` – Verified SES sender
- `EMAIL_TO_ADDRESS` – Destination for feedback/issue summary emails
- `GITHUB_ISSUE_TOKEN` – Fine-scoped token to create issues in `booshja/seattle-ice-time`

Optional (Plausible is configured via code with domain `seattleicetime.com` using `next-plausible` proxy), but you can set typical `PL_NEXT_PROXY_*` vars if needed. See `next-plausible` docs for advanced setups.

## Getting Started

1. Install dependencies

```bash
yarn install
```

2. Create a `.env.local` with required variables

```bash
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
AWS_REGION=...
EMAIL_FROM_ADDRESS=...
EMAIL_TO_ADDRESS=...
GITHUB_ISSUE_TOKEN=...
```

3. Run the development server

```bash
yarn run dev
```

Open http://localhost:3000

## Scripts

- `yarn run dev` – Start Next.js dev server
- `yarn run build` – Build production bundle
- `yarn run start` – Start production server
- `yarn run lint` – Run eslint
- `yarn run test` – Run Jest tests
- `yarn run test:watch` – Jest in watch mode
- `yarn run test:ci` – Jest in band with coverage

## Testing

Jest is configured via `jest.config.mjs` with:

- jsdom environment
- ts-jest preset
- Coverage collected for `src/**` (excluding tests, email templates, fonts, styled files, constants/strings, lib, types, and Next special files)

Run tests:

```bash
yarn test
```

View coverage in `coverage/` (HTML report at `coverage/lcov-report/index.html`).

## Analytics

Plausible is enabled via `next-plausible`:

## Contributing

- Open an issue or PR in this repo
- Run tests and lint before submitting
- Keep code readable and typed; prefer small, focused PRs
