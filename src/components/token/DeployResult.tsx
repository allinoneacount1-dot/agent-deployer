import { CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { networkLabel } from "@/lib/agent";
import type { RealDeployResult } from "@/lib/wallet";

export function DeployResult({ result }: { result: RealDeployResult }) {
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
        <Row label="Contract" value={result.tokenAddress} onCopy={copy} href={result.explorerAddressUrl} />
        <Row label="Tx hash" value={result.txHash} onCopy={copy} href={result.explorerTxUrl} />
        <Row label="Deployer" value={result.deployer} onCopy={copy} />
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
  href,
}: {
  label: string;
  value: string;
  onCopy: (v: string) => void;
  href?: string;
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
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label={`Open ${label} on explorer`}
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </dd>
    </div>
  );
}