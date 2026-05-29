import { BrowserProvider, ContractFactory, type Eip1193Provider } from "ethers";
import tokenArtifact from "./pure-token.json";
import type { Network } from "./types";

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      on?: (event: string, cb: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, cb: (...args: unknown[]) => void) => void;
    };
  }
}

export const NETWORK_CONFIG: Record<Network, { chainIdHex: string; chainIdDec: number; name: string; rpc: string; explorer: string; currency: { name: string; symbol: string; decimals: number } }> = {
  "base-sepolia": {
    chainIdHex: "0x14a34",
    chainIdDec: 84532,
    name: "Base Sepolia",
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    currency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  },
  "ethereum-sepolia": {
    chainIdHex: "0xaa36a7",
    chainIdDec: 11155111,
    name: "Ethereum Sepolia",
    rpc: "https://rpc.sepolia.org",
    explorer: "https://sepolia.etherscan.io",
    currency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  },
  base: {
    chainIdHex: "0x2105",
    chainIdDec: 8453,
    name: "Base",
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    currency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
};

export function hasInjectedWallet(): boolean {
  return typeof window !== "undefined" && !!window.ethereum;
}

export async function connectWallet(): Promise<string> {
  if (!hasInjectedWallet()) throw new Error("No injected wallet found. Install MetaMask or another EVM wallet.");
  const provider = new BrowserProvider(window.ethereum!);
  const accounts = (await provider.send("eth_requestAccounts", [])) as string[];
  if (!accounts?.[0]) throw new Error("No account returned by wallet.");
  return accounts[0];
}

export async function getCurrentAccount(): Promise<string | null> {
  if (!hasInjectedWallet()) return null;
  const provider = new BrowserProvider(window.ethereum!);
  const accounts = (await provider.send("eth_accounts", [])) as string[];
  return accounts?.[0] ?? null;
}

export async function ensureNetwork(network: Network): Promise<void> {
  if (!hasInjectedWallet()) throw new Error("No injected wallet found.");
  const cfg = NETWORK_CONFIG[network];
  const eth = window.ethereum!;
  const currentHex = (await eth.request({ method: "eth_chainId" })) as string;
  if (currentHex?.toLowerCase() === cfg.chainIdHex.toLowerCase()) return;
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: cfg.chainIdHex }] });
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code === 4902 || code === -32603) {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: cfg.chainIdHex,
          chainName: cfg.name,
          rpcUrls: [cfg.rpc],
          nativeCurrency: cfg.currency,
          blockExplorerUrls: [cfg.explorer],
        }],
      });
    } else {
      throw err;
    }
  }
}

export interface RealDeployInput {
  name: string;
  symbol: string;
  supply: number;
  network: Network;
}

export interface RealDeployResult {
  status: "success";
  tokenAddress: string;
  txHash: string;
  network: Network;
  deployedAt: string;
  deployer: string;
  explorerTxUrl: string;
  explorerAddressUrl: string;
}

export async function deployTokenWithWallet(
  input: RealDeployInput,
  onStep?: (msg: string) => void,
): Promise<RealDeployResult> {
  if (!hasInjectedWallet()) throw new Error("No injected wallet found. Install MetaMask.");
  const cfg = NETWORK_CONFIG[input.network];

  onStep?.(`✔ Validated params: ${input.name} (${input.symbol}) supply=${input.supply}`);
  onStep?.(`⚙ Switching wallet to ${cfg.name}…`);
  await ensureNetwork(input.network);

  const provider = new BrowserProvider(window.ethereum!);
  const signer = await provider.getSigner();
  const deployer = await signer.getAddress();
  onStep?.(`✔ Signer ready: ${deployer}`);

  const factory = new ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, signer);
  onStep?.("⛓ Submitting deployment transaction (confirm in wallet)…");
  const contract = await factory.deploy(input.name, input.symbol, BigInt(input.supply));
  const tx = contract.deploymentTransaction();
  if (!tx) throw new Error("Deployment transaction missing.");
  onStep?.(`⛓ Tx submitted: ${tx.hash}`);

  await contract.waitForDeployment();
  const tokenAddress = await contract.getAddress();
  onStep?.(`✔ Contract deployed at ${tokenAddress}`);

  return {
    status: "success",
    tokenAddress,
    txHash: tx.hash,
    network: input.network,
    deployedAt: new Date().toISOString(),
    deployer,
    explorerTxUrl: `${cfg.explorer}/tx/${tx.hash}`,
    explorerAddressUrl: `${cfg.explorer}/address/${tokenAddress}`,
  };
}