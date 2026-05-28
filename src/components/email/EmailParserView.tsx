import { useEffect, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callParseEmail } from "@/lib/agent";
import type { Email, ParsedIntent } from "@/lib/types";

export function EmailParserView({ email }: { email: Email }) {
  const [parsed, setParsed] = useState<ParsedIntent | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    const r = await callParseEmail(email.body);
    setParsed(r);
    setLoading(false);
  }

  useEffect(() => {
    setParsed(null);
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email.id]);

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{email.subject}</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            From {email.from} · {new Date(email.receivedAt).toLocaleString()}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={run}
          disabled={loading}
          className="border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
        >
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCcw className="h-3 w-3" />
          )}
          Re-run parser
        </Button>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
            Raw email
          </p>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
{email.body}
          </pre>
        </div>
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
            Parsed intent
          </p>
          {loading || !parsed ? (
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Loader2 className="h-3 w-3 animate-spin" /> parsing…
            </div>
          ) : (
            <pre className="text-xs text-emerald-300 font-mono leading-relaxed">
{JSON.stringify(parsed, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}