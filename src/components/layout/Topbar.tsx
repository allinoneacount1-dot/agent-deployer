import { useRouterState } from "@tanstack/react-router";
import { Activity } from "lucide-react";

const titles: Record<string, { title: string; sub: string }> = {
  "/dashboard": { title: "Dashboard", sub: "Live agent activity and recent deployments" },
  "/email-console": { title: "Email Console", sub: "Inbound mail and parsed intents" },
  "/token-builder": { title: "Token Builder", sub: "Manually trigger an agent deployment" },
  "/analytics": { title: "Analytics", sub: "Deployment health over time" },
};

export function Topbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const meta = titles[pathname] ?? { title: "Pure Agent", sub: "" };

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur">
      <div>
        <h2 className="text-lg font-semibold text-white">{meta.title}</h2>
        {meta.sub && <p className="text-xs text-zinc-500 mt-0.5">{meta.sub}</p>}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <Activity className="h-3 w-3" />
        Agent online
      </div>
    </header>
  );
}