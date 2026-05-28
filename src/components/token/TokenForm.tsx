import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callDeployToken, type DeployResult as DeployResultT } from "@/lib/agent";
import type { Network, AgentLogEntry } from "@/lib/types";
import { DeployResult } from "./DeployResult";

export function TokenForm() {
  const [name, setName] = useState("AlphaToken");
  const [symbol, setSymbol] = useState("APT");
  const [supply, setSupply] = useState("1000000");
  const [network, setNetwork] = useState<Network>("base-sepolia");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<AgentLogEntry[]>([]);
  const [result, setResult] = useState<DeployResultT | null>(null);

  async function onDeploy(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setLog([]);
    const res = await callDeployToken(
      { name, symbol, supply: Number(supply), network },
      (msg) =>
        setLog((prev) => [
          ...prev,
          {
            id: `s_${prev.length}`,
            ts: new Date().toLocaleTimeString("en-GB"),
            level: msg.startsWith("✔") ? "ok" : "info",
            message: msg,
          },
        ]),
    );
    setResult(res);
    setLoading(false);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form
        onSubmit={onDeploy}
        className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs text-zinc-400">Token name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={64}
            className="bg-black/40 border-white/10 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="symbol" className="text-xs text-zinc-400">Symbol</Label>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              required
              maxLength={8}
              className="bg-black/40 border-white/10 text-white font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="supply" className="text-xs text-zinc-400">Supply</Label>
            <Input
              id="supply"
              type="number"
              min={1}
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              required
              className="bg-black/40 border-white/10 text-white font-mono"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-zinc-400">Network</Label>
          <Select value={network} onValueChange={(v) => setNetwork(v as Network)}>
            <SelectTrigger className="bg-black/40 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base-sepolia">Base Sepolia (testnet)</SelectItem>
              <SelectItem value="ethereum-sepolia">Ethereum Sepolia (testnet)</SelectItem>
              <SelectItem value="base">Base (mainnet — mocked)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Deploying…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Deploy via Agent
            </>
          )}
        </Button>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Mock deployment. No wallet, no chain calls. Contract address and tx hash
          are randomly generated for UI demo only.
        </p>
      </form>

      <div className="space-y-4">
        <div className="rounded-xl border border-white/10 bg-zinc-900/60">
          <div className="border-b border-white/10 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">Agent log</h3>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 min-h-[8rem]">
            {log.length === 0 && (
              <p className="text-zinc-600">Waiting for deployment…</p>
            )}
            {log.map((l) => (
              <div key={l.id} className="flex gap-3">
                <span className="text-zinc-600 shrink-0">{l.ts}</span>
                <span className={l.level === "ok" ? "text-emerald-400" : "text-zinc-400"}>
                  {l.message}
                </span>
              </div>
            ))}
          </div>
        </div>
        {result && <DeployResult result={result} />}
      </div>
    </div>
  );
}