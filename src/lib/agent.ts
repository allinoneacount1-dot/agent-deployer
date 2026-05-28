import type { Deployment, Network, ParsedIntent } from "./types";
import { parseEmailCommand } from "./email-parser";

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return (
    "0x" + Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("")
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function callParseEmail(email: string): Promise<ParsedIntent> {
  await sleep(400);
  return parseEmailCommand(email);
}

export interface DeployInput {
  name: string;
  symbol: string;
  supply: number;
  network?: Network;
}

export interface DeployResult {
  status: "success";
  tokenAddress: string;
  txHash: string;
  network: Network;
  deployedAt: string;
}

export async function callDeployToken(
  input: DeployInput,
  onStep?: (msg: string) => void,
): Promise<DeployResult> {
  const network = input.network ?? "base-sepolia";

  onStep?.(`✔ Email parsed: deploy token ${input.name} (${input.symbol})`);
  await sleep(450);
  onStep?.("⚙ Validating token parameters: name, symbol, supply");
  await sleep(500);
  onStep?.(`⛓ Submitting contract to ${network}`);
  await sleep(700);

  const tokenAddress = randomHex(20);
  const txHash = randomHex(32);

  onStep?.(`✔ Contract deployed at ${shorten(tokenAddress)}`);
  await sleep(300);
  onStep?.(`✔ Confirmation received (tx ${shorten(txHash)})`);

  return {
    status: "success",
    tokenAddress,
    txHash,
    network,
    deployedAt: new Date().toISOString(),
  };
}

export function shorten(hash: string, head = 6, tail = 4): string {
  if (hash.length <= head + tail + 2) return hash;
  return `${hash.slice(0, head)}…${hash.slice(-tail)}`;
}

export function formatSupply(n: number): string {
  return n.toLocaleString("en-US");
}

export function networkLabel(n: Network): string {
  switch (n) {
    case "base-sepolia":
      return "Base Sepolia";
    case "base":
      return "Base";
    case "ethereum-sepolia":
      return "Ethereum Sepolia";
  }
}

export type { Deployment };