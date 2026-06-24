import { useRouterState } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Landing page bypasses the app chrome entirely.
  if (pathname === "/") return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}