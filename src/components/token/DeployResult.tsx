import { CheckCircle2, Copy } from "lucide-react";
import type { DeployResult as DeployResultT } from "@/lib/agent";
import { networkLabel } from "@/lib/agent";

export function DeployResult({ result }: { result: DeployResultT }) {
  function copy(v: string) {
    navigator.clipboard?.writeText(v);
  }
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
      <div className="flex items-center gap-2 text-emerald-300">
        <CheckCircle2 className="h-4 w-4" />
        <span className="text-sm font-semibold">Deployment successful</span>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-emerald-400/70">
          {networkLabel(result.network)}
        </span>
      </div>
      <dl className="mt-3 space-y-2 text-xs">
        <Row label="Contract" value={result.tokenAddress} onCopy={copy} />
        <Row label="Tx hash" value={result.txHash} onCopy={copy} />
        <div className="flex justify-between">
          <dt className="text-zinc-500">Deployed at</dt>
          <dd className="text-zinc-300">{new Date(result.deployedAt).toLocaleString()}</dd>
        </div>
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="flex items-center gap-2 font-mono text-zinc-200 truncate">
        <span className="truncate">{value}</span>
        <button
          onClick={() => onCopy(value)}
          className="text-zinc-500 hover:text-white transition-colors"
          aria-label={`Copy ${label}`}
        >
          <Copy className="h-3 w-3" />
        </button>
      </dd>
    </div>
  );
}