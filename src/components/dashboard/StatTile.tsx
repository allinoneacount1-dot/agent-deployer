import type { LucideIcon } from "lucide-react";

export function StatTile({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-zinc-500">{label}</span>
        <Icon className="h-4 w-4 text-zinc-500" />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-white tabular-nums">{value}</span>
        {delta && <span className="text-xs text-emerald-400">{delta}</span>}
      </div>
    </div>
  );
}