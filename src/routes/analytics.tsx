import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analyticsSeries, topSymbols, mockDeployments } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Pure Agent" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const total = mockDeployments.length;
  const success = mockDeployments.filter((d) => d.status === "success").length;

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-zinc-900/60 p-4">
          <h3 className="text-sm font-semibold text-white">Deployments over time</h3>
          <p className="text-[11px] text-zinc-500">Last 7 days · mock data</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <LineChart data={analyticsSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#09090b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="deployed" stroke="#60a5fa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="failed" stroke="#f43f5e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
          <h3 className="text-sm font-semibold text-white">Success rate</h3>
          <p className="text-[11px] text-zinc-500">All-time · mock</p>
          <div className="mt-6 flex items-end gap-2">
            <span className="text-5xl font-semibold text-white tabular-nums">
              {Math.round((success / total) * 100)}
            </span>
            <span className="text-lg text-zinc-500 pb-1">%</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
              style={{ width: `${(success / total) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-zinc-500">
            <span>{success} success</span>
            <span>{total - success} failed</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
        <h3 className="text-sm font-semibold text-white">Top symbols</h3>
        <div className="mt-4 h-56">
          <ResponsiveContainer>
            <BarChart data={topSymbols}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="symbol" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "#09090b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}