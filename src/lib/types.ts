export type Network = "base-sepolia" | "base" | "ethereum-sepolia";

export interface ParsedIntent {
  intent: "deploy_token" | "unknown";
  name?: string;
  symbol?: string;
  supply?: number;
  network?: Network;
  confidence?: number;
}

export interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
  status: "new" | "parsed" | "deployed";
}

export interface Deployment {
  id: string;
  name: string;
  symbol: string;
  supply: number;
  network: Network;
  tokenAddress: string;
  txHash: string;
  deployedAt: string;
  status: "success" | "pending" | "failed";
  triggeredBy: "email" | "manual";
}

export interface AgentLogEntry {
  id: string;
  ts: string;
  level: "info" | "ok" | "warn" | "error";
  message: string;
}