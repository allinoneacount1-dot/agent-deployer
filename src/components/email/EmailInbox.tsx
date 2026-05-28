import type { Email } from "@/lib/types";

const statusDot: Record<Email["status"], string> = {
  new: "bg-blue-400",
  parsed: "bg-amber-400",
  deployed: "bg-emerald-400",
};

export function EmailInbox({
  emails,
  selectedId,
  onSelect,
}: {
  emails: Email[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 overflow-hidden">
      <div className="border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Inbox</h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">{emails.length} messages</p>
      </div>
      <ul className="divide-y divide-white/5 max-h-[28rem] overflow-y-auto">
        {emails.map((e) => {
          const active = e.id === selectedId;
          return (
            <li key={e.id}>
              <button
                onClick={() => onSelect(e.id)}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  active ? "bg-blue-500/10" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDot[e.status]}`} />
                  <span className="text-xs text-zinc-400 truncate">{e.from}</span>
                </div>
                <p className="text-sm text-white mt-1 truncate">{e.subject}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{e.body}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}