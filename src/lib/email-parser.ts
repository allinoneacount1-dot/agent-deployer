import type { ParsedIntent, Network } from "./types";

const networkMap: Record<string, Network> = {
  "base sepolia": "base-sepolia",
  "base-sepolia": "base-sepolia",
  base: "base",
  "ethereum sepolia": "ethereum-sepolia",
  "eth sepolia": "ethereum-sepolia",
  sepolia: "ethereum-sepolia",
};

function detectNetwork(text: string): Network | undefined {
  const lower = text.toLowerCase();
  for (const key of Object.keys(networkMap)) {
    if (lower.includes(key)) return networkMap[key];
  }
  return undefined;
}

export function parseEmailCommand(email: string): ParsedIntent {
  const lower = email.toLowerCase();
  if (!lower.includes("deploy token") && !lower.includes("deploy a token")) {
    return { intent: "unknown", confidence: 0.1 };
  }

  // name: word after "deploy token"
  const nameMatch = email.match(/deploy(?:\s+a)?\s+token\s+([A-Za-z][A-Za-z0-9_-]*)/i);
  const name = nameMatch?.[1];

  // symbol: parenthesized ticker OR "symbol XYZ"
  const symMatch =
    email.match(/\(([A-Z]{2,8})\)/) ||
    email.match(/symbol\s+([A-Za-z]{2,8})/i) ||
    email.match(/ticker\s+([A-Za-z]{2,8})/i);
  const symbol = symMatch?.[1]?.toUpperCase();

  // supply: numeric with commas
  const supMatch = email.match(/supply\s+([\d,]+)/i) || email.match(/([\d,]{4,})/);
  const supply = supMatch ? Number(supMatch[1].replace(/,/g, "")) : undefined;

  const network = detectNetwork(email) ?? "base-sepolia";

  const confidence =
    (name ? 0.3 : 0) + (symbol ? 0.3 : 0) + (supply ? 0.3 : 0) + 0.1;

  return {
    intent: "deploy_token",
    name,
    symbol,
    supply,
    network,
    confidence: Math.round(confidence * 100) / 100,
  };
}