import type { Deployment, Email, AgentLogEntry } from "./types";

export const mockEmails: Email[] = [
  {
    id: "em_001",
    from: "ceo@alphalabs.xyz",
    subject: "Deploy token AlphaToken",
    body: "Hey agent — please deploy token AlphaToken with symbol APT and supply 1,000,000 on Base Sepolia. Thanks.",
    receivedAt: "2026-05-28T09:14:22Z",
    status: "deployed",
  },
  {
    id: "em_002",
    from: "founder@nimbus.io",
    subject: "new token please",
    body: "deploy token Nimbus, symbol NMB, supply 500000, base sepolia",
    receivedAt: "2026-05-28T08:51:09Z",
    status: "parsed",
  },
  {
    id: "em_003",
    from: "ops@kettle.fi",
    subject: "Re: launch plan",
    body: "Sounds good. Let's also deploy token Kettle (KTL) with supply 2500000 on base-sepolia tonight.",
    receivedAt: "2026-05-28T07:32:00Z",
    status: "new",
  },
  {
    id: "em_004",
    from: "spam@randomvc.biz",
    subject: "checking in",
    body: "Just wanted to see how things are going. Let's catch up next week!",
    receivedAt: "2026-05-27T22:10:44Z",
    status: "new",
  },
  {
    id: "em_005",
    from: "treasury@harbor.dao",
    subject: "Deploy HARBOR governance token",
    body: "Please deploy token Harbor with symbol HRB and supply 10000000 on Base Sepolia testnet.",
    receivedAt: "2026-05-27T18:02:11Z",
    status: "deployed",
  },
];

export const mockDeployments: Deployment[] = [
  {
    id: "dp_001",
    name: "AlphaToken",
    symbol: "APT",
    supply: 1_000_000,
    network: "base-sepolia",
    tokenAddress: "0x9a3f2c1b88e74ad6c33b8c4ab1e9d72e1f4a85b2",
    txHash: "0x8e1d4b22ac9f7f1e1a0d6b9c3e2a5d7c9f0e1b4a2d3c4e5f6a7b8c9d0e1f2a3b",
    deployedAt: "2026-05-28T09:15:01Z",
    status: "success",
    triggeredBy: "email",
  },
  {
    id: "dp_002",
    name: "Harbor",
    symbol: "HRB",
    supply: 10_000_000,
    network: "base-sepolia",
    tokenAddress: "0x4b21de9a7c0e5e1d8a3b6c2f9d8e7a1b4c5d6e7f",
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    deployedAt: "2026-05-27T18:03:42Z",
    status: "success",
    triggeredBy: "email",
  },
  {
    id: "dp_003",
    name: "Kettle",
    symbol: "KTL",
    supply: 2_500_000,
    network: "base-sepolia",
    tokenAddress: "0x7c8d9e0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
    txHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
    deployedAt: "2026-05-26T14:22:08Z",
    status: "success",
    triggeredBy: "manual",
  },
  {
    id: "dp_004",
    name: "Drift",
    symbol: "DRFT",
    supply: 750_000,
    network: "base-sepolia",
    tokenAddress: "0x0000000000000000000000000000000000000000",
    txHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    deployedAt: "2026-05-25T11:08:30Z",
    status: "failed",
    triggeredBy: "email",
  },
];

export const mockAgentLog: AgentLogEntry[] = [
  { id: "lg_1", ts: "09:15:01", level: "ok", message: "✔ Email parsed: deploy token AlphaToken (APT)" },
  { id: "lg_2", ts: "09:15:01", level: "info", message: "⚙ Validating token parameters: name, symbol, supply" },
  { id: "lg_3", ts: "09:15:02", level: "info", message: "⛓ Submitting contract to Base Sepolia" },
  { id: "lg_4", ts: "09:15:04", level: "ok", message: "✔ Contract deployed at 0x9a3f…85b2" },
  { id: "lg_5", ts: "09:15:04", level: "ok", message: "✔ Confirmation received (tx 0x8e1d…2a3b)" },
  { id: "lg_6", ts: "08:51:10", level: "ok", message: "✔ Email parsed: deploy token Nimbus (NMB)" },
  { id: "lg_7", ts: "08:51:11", level: "warn", message: "⚠ Awaiting human review (low confidence: 0.62)" },
];

export const analyticsSeries = [
  { day: "Mon", deployed: 3, failed: 0 },
  { day: "Tue", deployed: 5, failed: 1 },
  { day: "Wed", deployed: 2, failed: 0 },
  { day: "Thu", deployed: 7, failed: 1 },
  { day: "Fri", deployed: 4, failed: 0 },
  { day: "Sat", deployed: 1, failed: 0 },
  { day: "Sun", deployed: 6, failed: 2 },
];

export const topSymbols = [
  { symbol: "APT", count: 4 },
  { symbol: "HRB", count: 3 },
  { symbol: "KTL", count: 2 },
  { symbol: "NMB", count: 2 },
  { symbol: "DRFT", count: 1 },
];