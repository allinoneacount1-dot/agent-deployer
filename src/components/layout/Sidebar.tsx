import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, Coins, BarChart3, Zap } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-console", label: "Email Console", icon: Mail },
  { to: "/token-builder", label: "Token Builder", icon: Coins },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/10 bg-zinc-950 p-4">
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="grid place-items-center h-8 w-8 rounded-md bg-blue-500/15 text-blue-400">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white leading-none">Pure Agent</h1>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
            mock console
          </p>
        </div>
      </div>

      <nav className="mt-6 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={[
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-blue-500/10 text-blue-300"
                  : "text-zinc-400 hover:text-white hover:bg-white/5",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-white/10 bg-zinc-900 p-3">
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          All deploys are mocked. No wallet, no gas, no chain calls.
        </p>
      </div>
    </aside>
  );
}