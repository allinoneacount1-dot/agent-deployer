import { useEffect, useRef, useState } from "react";
import { mockAgentLog } from "@/lib/mock-data";
import type { AgentLogEntry } from "@/lib/types";

const levelColor: Record<AgentLogEntry["level"], string> = {
  info: "text-zinc-400",
  ok: "text-emerald-400",
  warn: "text-amber-400",
  error: "text-rose-400",
};

export function AgentFeed({ extra }: { extra?: AgentLogEntry[] }) {
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const all = [...mockAgentLog, ...(extra ?? [])];

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [extra]);

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Agent Activity</h3>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500">
          live · {tick % 2 === 0 ? "●" : "○"}
        </span>
      </div>
      <div
        ref={ref}
        className="max-h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1"
      >
        {all.map((e) => (
          <div key={e.id} className="flex gap-3">
            <span className="text-zinc-600 shrink-0">{e.ts}</span>
            <span className={levelColor[e.level]}>{e.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}