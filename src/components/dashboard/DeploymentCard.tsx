import { ExternalLink } from "lucide-react";
import type { Deployment } from "@/lib/types";
import { formatSupply, networkLabel, shorten } from "@/lib/agent";

const statusStyles: Record<Deployment["status"], string> = {
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  failed: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

export function DeploymentCard({ d }: { d: Deployment }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white">{d.name}</h4>
            <span className="text-xs text-zinc-500 font-mono">{d.symbol}</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {networkLabel(d.network)} · supply {formatSupply(d.supply)}
          </p>
        </div>
        <span
          className={`text-[10px] uppercase tracking-wider rounded-full border px-2 py-0.5 ${statusStyles[d.status]}`}
        >
          {d.status}
        </span>
      </div>

      <dl className="mt-3 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-zinc-500">Contract</dt>
          <dd className="font-mono text-zinc-300 truncate">{shorten(d.tokenAddress, 8, 6)}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-zinc-500">Tx</dt>
          <dd className="font-mono text-zinc-300 truncate flex items-center gap-1">
            {shorten(d.txHash, 8, 6)}
            <ExternalLink className="h-3 w-3 text-zinc-600" />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-zinc-500">Trigger</dt>
          <dd className="text-zinc-400">{d.triggeredBy}</dd>
        </div>
      </dl>
    </div>
  );
}