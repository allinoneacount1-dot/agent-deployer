import { createFileRoute } from "@tanstack/react-router";
import { Coins, Mail, CheckCircle2, Activity } from "lucide-react";
import { AgentFeed } from "@/components/dashboard/AgentFeed";
import { DeploymentCard } from "@/components/dashboard/DeploymentCard";
import { StatTile } from "@/components/dashboard/StatTile";
import { mockDeployments, mockEmails } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Pure Agent" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const deployed = mockDeployments.filter((d) => d.status === "success").length;
  const failed = mockDeployments.filter((d) => d.status === "failed").length;
  const total = mockDeployments.length;
  const successRate = Math.round((deployed / total) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Tokens deployed" value={String(deployed)} delta="+2 this week" icon={Coins} />
        <StatTile label="Emails processed" value={String(mockEmails.length)} delta="+3 today" icon={Mail} />
        <StatTile label="Success rate" value={`${successRate}%`} icon={CheckCircle2} />
        <StatTile label="Failures" value={String(failed)} icon={Activity} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AgentFeed />
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
          <h3 className="text-sm font-semibold text-white">Pipeline</h3>
          <ol className="mt-4 space-y-3 text-xs">
            {[
              ["Inbound email", "5 received"],
              ["Parsed by agent", "4 parsed"],
              ["Validated", "4 validated"],
              ["Deployed", "3 on-chain (mock)"],
            ].map(([k, v], i) => (
              <li key={k} className="flex items-center gap-3">
                <span className="grid place-items-center h-5 w-5 rounded-full border border-blue-400/30 bg-blue-500/10 text-[10px] text-blue-300 font-mono">
                  {i + 1}
                </span>
                <span className="text-zinc-300 flex-1">{k}</span>
                <span className="text-zinc-500 font-mono">{v}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Recent deployments</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockDeployments.map((d) => (
            <DeploymentCard key={d.id} d={d} />
          ))}
        </div>
      </div>
    </div>
  );
}