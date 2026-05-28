
# Pure Agent — Full UI + Mock Backend

A dark-themed control surface for an email-driven ERC-20 token deployment agent. All flows are mocked (no real wallet, no real email ingestion) so the UI feels alive without spending gas or wiring inboxes.

## Stack adaptation

Your spec uses Next.js app router + API routes. I'll adapt to Lovable's stack while preserving the page structure and component layout 1:1:

| Spec (Next.js) | Lovable equivalent |
|---|---|
| `app/dashboard/page.tsx` | `src/pages/Dashboard.tsx` + React Router route `/dashboard` |
| `app/api/email/route.ts` | Lovable Cloud edge function `email-parse` |
| `app/api/deploy/route.ts` | Lovable Cloud edge function `deploy-token` (mock) |
| `app/layout.tsx` | `src/App.tsx` with shared `<AppShell>` (Sidebar + Topbar) |
| `lib/*` | `src/lib/*` (agent, email-parser, mock-data, types) |
| `components/*` | `src/components/*` (same folder structure) |

Landing `/` redirects to `/dashboard`.

## Pages

1. **Dashboard** (`/dashboard`) — Agent Activity feed (live-looking log of parse → validate → deploy steps), Deployment cards (recent mock tokens with address, tx hash, network badge), quick stats (tokens deployed, emails processed, success rate).
2. **Email Console** (`/email-console`) — Inbox list (left) of mock inbound emails; selecting one shows raw email + parsed intent JSON side-by-side, with a "Re-run parser" button hitting the `email-parse` edge function.
3. **Token Builder** (`/token-builder`) — Form (name, symbol, supply, network select = Base Sepolia). "Deploy via Agent" button calls the mock `deploy-token` function, streams fake agent log lines, then shows the returned mock contract address + tx hash.
4. **Analytics** (`/analytics`) — Simple charts (deployments over time, success vs failure, top symbols) using mock data + Recharts.

## Components

```text
components/
  layout/      Sidebar, Topbar, AppShell
  dashboard/   AgentFeed, DeploymentCard, StatTile
  email/       EmailInbox, EmailParserView
  token/       TokenForm, DeployResult
  ui/          (shadcn primitives — already in template)
```

## Mock backend (Lovable Cloud edge functions)

- `email-parse` — accepts `{ email: string }`, runs keyword detection ("deploy token", name/symbol/supply extraction via regex), returns `{ intent, name, symbol, supply, network }`.
- `deploy-token` — accepts `{ name, symbol, supply, network }`, sleeps ~1.5s, returns `{ status: "success", tokenAddress: "0x" + random hex, txHash: "0x" + random hex, network, deployedAt }`. Pure mock — no ethers, no RPC, no private key.

Both functions return CORS headers and validate input with Zod.

## Visual direction

Honoring the styling already in your spec: pure black background, `zinc-900` cards, blue-400/500 accents, mono font for hashes/addresses, subtle green/amber status pills. Rounded-xl cards, thin borders, terminal-flavored agent feed.

## What I'm explicitly NOT building (per your "mock backend" choice)

- No `ethers.js`, no Hardhat, no `PureToken.sol` compilation, no `artifacts/`
- No real RPC URL or PRIVATE_KEY secrets
- No inbound email webhook (Postmark/SendGrid)
- No Lovable Cloud database — mock data lives in `src/lib/mock-data.ts`

When you're ready to go real, the swap points are isolated to the two edge functions and `TokenForm`'s submit handler.

## Files to create (technical)

```text
src/
  App.tsx                              (router + AppShell)
  pages/
    Dashboard.tsx
    EmailConsole.tsx
    TokenBuilder.tsx
    Analytics.tsx
    NotFound.tsx (exists)
  components/
    layout/{AppShell,Sidebar,Topbar}.tsx
    dashboard/{AgentFeed,DeploymentCard,StatTile}.tsx
    email/{EmailInbox,EmailParserView}.tsx
    token/{TokenForm,DeployResult}.tsx
  lib/
    agent.ts          (client helpers: callDeploy, callParse)
    email-parser.ts   (shared regex utilities)
    mock-data.ts      (sample emails, deployments, analytics series)
    types.ts          (Email, Deployment, ParsedIntent, Network)
  index.css           (dark theme tokens)

supabase/functions/
  email-parse/index.ts
  deploy-token/index.ts
```

Reply "go" (or edit anything above) and I'll build it.
