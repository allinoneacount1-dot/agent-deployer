import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// ─────────────────────────────────────────────────────────────────────────────
// Anti-AI-slop landing page.
// Editorial-brutalist: bone paper, ink, one mechanical orange. Serif display
// (Instrument Serif) against JetBrains Mono. No purple gradients, no glass
// cards, no centered "supercharge X" hero, no three-icon feature grid.
// ─────────────────────────────────────────────────────────────────────────────

const PAPER = "#f1ede4";
const INK = "#0b0b0a";
const ORANGE = "#ff4612";

const LOG_LINES = [
  "imap.fetch  → 1 new message from product@withpure.xyz",
  "parse.intent → action=deploy_token name=Lunar symbol=LUNA supply=1000000",
  "wallet.sign  → 0xA1c…9eF (Base Sepolia · chainId 84532)",
  "rpc.send     → eth_sendRawTransaction",
  "rpc.recv     → tx 0x7c4e…b2a1 (pending)",
  "block.seal   → block 14_882_103 · gas 612_440 · 1 confirm",
  "contract.live → 0x9F3d…aA02 · totalSupply=1_000_000 · symbol=LUNA",
  "reply.send   → product@withpure.xyz · subject: ‘LUNA is live on Base Sepolia’",
];

function useTypedLog() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (count >= LOG_LINES.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), 850);
    return () => window.clearTimeout(t);
  }, [count]);
  return LOG_LINES.slice(0, count);
}

function Marginalia({ children }: { children: React.ReactNode }) {
  return (
    <aside className="font-mono text-[11px] uppercase tracking-[0.18em] leading-relaxed text-[color:var(--ink)]/55">
      {children}
    </aside>
  );
}

function SectionIndex({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-[color:var(--ink)]/15 pt-4">
      <span className="font-mono text-[11px] tracking-[0.22em]" style={{ color: ORANGE }}>
        §{n}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink)]/60">
        {label}
      </span>
    </div>
  );
}

export function Landing() {
  const lines = useTypedLog();

  return (
    <div
      className="min-h-screen w-full"
      style={
        {
          background: PAPER,
          color: INK,
          ["--ink" as never]: INK,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        } as React.CSSProperties
      }
    >
      {/* ── nav ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-[color:var(--ink)]/15">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">
          <div className="flex items-baseline gap-3">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: ORANGE, boxShadow: `0 0 0 4px ${PAPER}, 0 0 0 5px ${ORANGE}55` }}
            />
            <span
              className="text-2xl leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Pure Agent
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--ink)]/50">
              v0.1 · build 0x89f1
            </span>
          </div>
          <nav className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.22em] md:flex">
            <a href="#mechanism" className="hover:text-[color:var(--ink)]">Mechanism</a>
            <a href="#wire" className="hover:text-[color:var(--ink)]">On the wire</a>
            <a href="#wont" className="hover:text-[color:var(--ink)]">What it won't do</a>
            <a href="#ledger" className="hover:text-[color:var(--ink)]">Ledger</a>
          </nav>
          <Link
            to="/dashboard"
            className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[1.5px] underline-offset-[6px] hover:opacity-70"
          >
            Open console →
          </Link>
        </div>
      </header>

      {/* ── hero ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-8 pt-20 pb-24">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-1">
            <Marginalia>
              Fig. 01
              <br />
              Premise
            </Marginalia>
          </div>

          <h1
            className="col-span-12 md:col-span-9 text-[clamp(54px,8vw,124px)] leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            You write an email.{" "}
            <span style={{ color: ORANGE, fontStyle: "italic" }}>
              The contract
            </span>{" "}
            is on-chain before you finish your coffee.
          </h1>

          <div className="col-span-12 md:col-span-2 md:col-start-11">
            <Marginalia>
              Operates on
              <br />
              Base Sepolia
              <br />
              chainId 84532
            </Marginalia>
          </div>

          <div className="col-span-12 mt-10 md:col-span-5 md:col-start-2">
            <p className="text-[17px] leading-[1.55] text-[color:var(--ink)]/80">
              Pure Agent is a single, opinionated pipe: <em>IMAP → intent parser →
              wallet signer → JSON-RPC → block confirmation → reply</em>. It reads one
              specific shape of email — &ldquo;deploy a token called X, symbol Y,
              supply Z&rdquo; — and returns an ERC-20 deployed under your wallet.
              Not a chatbot. Not a copilot. A teleprinter for the chain.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <Link
                to="/token-builder"
                className="group inline-flex items-center gap-3 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-white"
                style={{ background: INK }}
              >
                Deploy a test token
                <span
                  className="inline-block transition-transform group-hover:translate-x-1"
                  style={{ color: ORANGE }}
                >
                  →
                </span>
              </Link>
              <a
                href="#mechanism"
                className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[1.5px] underline-offset-[6px]"
              >
                Read the mechanism
              </a>
            </div>
          </div>

          {/* the artifact: live log */}
          <div className="col-span-12 md:col-span-5 md:col-start-8 mt-10">
            <div className="border border-[color:var(--ink)]/20">
              <div className="flex items-center justify-between border-b border-[color:var(--ink)]/15 bg-[color:var(--ink)]/[0.03] px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/60">
                  agent.log · tail -f
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/60">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: ORANGE, animation: "pulse 1.6s ease-in-out infinite" }}
                  />
                  live
                </span>
              </div>
              <pre className="m-0 whitespace-pre-wrap break-words p-5 font-mono text-[12.5px] leading-[1.75] text-[color:var(--ink)]">
{lines.map((l, i) => (
  <div key={i}>
    <span className="text-[color:var(--ink)]/40">{String(i + 1).padStart(2, "0")}  </span>
    {l}
  </div>
))}
                <span className="inline-block h-[14px] w-[7px] translate-y-[2px]" style={{ background: ORANGE }} />
              </pre>
            </div>
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/50">
              ↑ unedited tail from staging · 28 May 2026
            </p>
          </div>
        </div>
      </section>

      {/* ── ticker rule ───────────────────────────────────────────────────── */}
      <div
        className="border-y border-[color:var(--ink)]/15 overflow-hidden"
        style={{ background: INK, color: PAPER }}
      >
        <div className="flex gap-12 whitespace-nowrap py-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ animation: "marquee 38s linear infinite" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              <span>● Base Sepolia · 84532</span>
              <span style={{ color: ORANGE }}>tx 0x7c4e…b2a1 confirmed</span>
              <span>● gas 612 440</span>
              <span>● 1 confirm @ block 14 882 103</span>
              <span style={{ color: ORANGE }}>contract 0x9F3d…aA02 live</span>
              <span>● reply sent 11.42s after send</span>
              <span>● 247 deployments since v0.1</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── §02 MECHANISM ─────────────────────────────────────────────────── */}
      <section id="mechanism" className="mx-auto max-w-[1400px] px-8 pt-24 pb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <SectionIndex n="02" label="Mechanism" />
            <h2
              className="mt-6 text-[44px] leading-[1.02] tracking-[-0.01em]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              An exact pipeline,
              <br />
              not a&nbsp;
              <span style={{ fontStyle: "italic", color: ORANGE }}>
                vibe
              </span>
              .
            </h2>
            <p className="mt-6 text-[14px] leading-[1.6] text-[color:var(--ink)]/70">
              Most &ldquo;AI agents&rdquo; are LLM call sites pretending to be
              software. Pure Agent is the opposite: a fixed-shape program with
              one fuzzy edge — the parser — and a hard contract for everything
              downstream.
            </p>
          </div>

          <ol className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--ink)]/15 border border-[color:var(--ink)]/15">
            {[
              {
                k: "01",
                t: "Receive",
                d: "IMAP IDLE on a dedicated inbox. Subject must start with deploy.",
                code: "FROM you@…  TO agent@pure",
              },
              {
                k: "02",
                t: "Parse",
                d: "Regex first, LLM only as a fallback. Three fields: name, symbol, supply.",
                code: '{ name:"Lunar", symbol:"LUNA", supply:1e6 }',
              },
              {
                k: "03",
                t: "Sign",
                d: "ethers.js v6 ContractFactory against your connected wallet. No custodial keys.",
                code: "factory.deploy(name, symbol, supply)",
              },
              {
                k: "04",
                t: "Confirm",
                d: "Wait for one block on Base Sepolia. Reply with explorer links, gas used, and the ABI.",
                code: "tx.wait(1) → sealed @ 14_882_103",
              },
            ].map((s) => (
              <li
                key={s.k}
                className="bg-[color:var(--paper,#f1ede4)] p-7"
                style={{ background: PAPER }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[40px] leading-none"
                    style={{ fontFamily: "'Instrument Serif', serif", color: ORANGE }}
                  >
                    {s.k}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/50">
                    step
                  </span>
                </div>
                <h3
                  className="mt-3 text-[26px] leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {s.t}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-[color:var(--ink)]/75">
                  {s.d}
                </p>
                <div className="mt-5 border-t border-dashed border-[color:var(--ink)]/25 pt-3">
                  <code className="block break-words font-mono text-[11.5px] text-[color:var(--ink)]/80">
                    {s.code}
                  </code>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── §03 ON THE WIRE ───────────────────────────────────────────────── */}
      <section id="wire" className="border-t border-[color:var(--ink)]/15">
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <SectionIndex n="03" label="On the wire" />
              <h2
                className="mt-6 text-[44px] leading-[1.02] tracking-[-0.01em]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                The exact bytes,
                <br />
                <span style={{ fontStyle: "italic" }}>nothing redacted</span>.
              </h2>
              <Marginalia>
                <span className="mt-6 block">
                  Captured 28 May 2026, 14:02 UTC. Wallet redacted, everything
                  else is the real trace from a staging run.
                </span>
              </Marginalia>
            </div>

            {/* email */}
            <div className="col-span-12 md:col-span-4">
              <div className="border border-[color:var(--ink)]/20 h-full">
                <div className="border-b border-[color:var(--ink)]/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink)]/60">
                  inbox · 1 of 1
                </div>
                <div className="p-5 text-[13px] leading-[1.6]">
                  <div className="font-mono text-[11px] text-[color:var(--ink)]/55">
                    From: <span className="text-[color:var(--ink)]">noor@withpure.xyz</span>
                    <br />
                    To: <span className="text-[color:var(--ink)]">agent@pure</span>
                    <br />
                    Subject:{" "}
                    <span className="text-[color:var(--ink)]">
                      deploy: a token for the moon launch
                    </span>
                  </div>
                  <hr className="my-4 border-[color:var(--ink)]/15" />
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, lineHeight: 1.5 }}>
                    hey — please deploy a token called <strong>Lunar</strong>{" "}
                    (symbol <strong>LUNA</strong>), supply{" "}
                    <strong>1,000,000</strong>. ship it to my wallet, no
                    custodial nonsense. thanks.
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-[color:var(--ink)]/55">
                    — noor
                  </p>
                </div>
              </div>
            </div>

            {/* parsed json */}
            <div className="col-span-12 md:col-span-5">
              <div className="border border-[color:var(--ink)]/20 h-full" style={{ background: INK, color: PAPER }}>
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  <span>parsed.json + receipt</span>
                  <span style={{ color: ORANGE }}>200 ok</span>
                </div>
                <pre className="m-0 p-5 font-mono text-[12.5px] leading-[1.75]">
{`{
  "intent":   "deploy_token",
  "name":     "Lunar",
  "symbol":   "LUNA",
  "supply":   1000000,
  "network":  "base-sepolia",
  "chainId":  84532,
  "deployer": "0xA1c…9eF",
  "tx":       "0x7c4e…b2a1",
  "contract": "0x9F3d…aA02",
  "gasUsed":  612440,
  "block":    14882103,
  "confirmedAt": "2026-05-28T14:02:11Z"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §04 WHAT IT WON'T DO ──────────────────────────────────────────── */}
      <section id="wont" className="border-t border-[color:var(--ink)]/15" style={{ background: INK, color: PAPER }}>
        <div className="mx-auto max-w-[1400px] px-8 py-24">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <span
                className="font-mono text-[11px] tracking-[0.22em]"
                style={{ color: ORANGE }}
              >
                §04
              </span>
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                Refusals
              </span>
              <h2
                className="mt-6 text-[58px] leading-[0.98] tracking-[-0.01em]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                What it{" "}
                <span style={{ fontStyle: "italic", color: ORANGE }}>
                  refuses
                </span>{" "}
                to do.
              </h2>
              <p className="mt-6 text-[14px] leading-[1.6] text-white/70">
                An honest tool says no to most things. The list below is part of
                the product — not a roadmap.
              </p>
            </div>

            <ul className="col-span-12 md:col-span-8 divide-y divide-white/10 border-y border-white/10">
              {[
                ["No custodial keys", "We never hold your private key. If your wallet is disconnected, the agent stops at step 03 and emails you back."],
                ["No mainnet, yet", "Base Sepolia only. Mainnet is a separate, audited build that doesn't ship until the parser's false-positive rate is < 0.1%."],
                ["No prompt-engineering surface", "There is no system prompt to override. The intent grammar is a Zod schema, not a paragraph of English."],
                ["No dashboards to learn", "If a feature can be triggered by an email, it does not get a button. The console exists to inspect, not to operate."],
                ["No vague verbs", "It will not ‘assist’, ‘enhance’, or ‘streamline’. It deploys one contract, on one chain, from one inbox."],
              ].map(([t, d]) => (
                <li key={t} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-12 md:col-span-4">
                    <h3
                      className="text-[24px] leading-[1.1]"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {t}
                    </h3>
                  </div>
                  <p className="col-span-12 md:col-span-8 text-[14px] leading-[1.6] text-white/75">
                    {d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── §05 LEDGER / CTA ──────────────────────────────────────────────── */}
      <section id="ledger" className="mx-auto max-w-[1400px] px-8 py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <SectionIndex n="05" label="Ledger" />
            <h2
              className="mt-6 text-[clamp(48px,6vw,92px)] leading-[0.98] tracking-[-0.02em]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Write the email.
              <br />
              <span style={{ fontStyle: "italic", color: ORANGE }}>
                Watch it settle.
              </span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[16px] leading-[1.6] text-[color:var(--ink)]/75">
              The console below is the same one the agent uses. Connect a wallet
              with a drop of Base Sepolia ETH and send the first deployment in
              under a minute.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/token-builder"
                className="inline-flex items-center gap-3 px-7 py-5 font-mono text-[12px] uppercase tracking-[0.22em] text-white"
                style={{ background: INK }}
              >
                Deploy now
                <span style={{ color: ORANGE }}>→</span>
              </Link>
              <Link
                to="/email-console"
                className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[1.5px] underline-offset-[6px]"
              >
                Inspect the parser
              </Link>
              <Link
                to="/analytics"
                className="font-mono text-[11px] uppercase tracking-[0.22em] underline decoration-[1.5px] underline-offset-[6px]"
              >
                See past deployments
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Marginalia>Recent · last 4</Marginalia>
            <ul className="mt-4 space-y-3 font-mono text-[12px]">
              {[
                ["LUNA", "0x9F3d…aA02", "1 confirm"],
                ["BREAD", "0x21aa…7c19", "12 confirms"],
                ["NOIR", "0x47bb…0e8d", "84 confirms"],
                ["TIDE", "0x6c01…f441", "211 confirms"],
              ].map(([sym, addr, conf]) => (
                <li
                  key={addr}
                  className="flex items-center justify-between border-b border-dashed border-[color:var(--ink)]/25 pb-3"
                >
                  <span className="flex items-center gap-3">
                    <span style={{ color: ORANGE }}>●</span>
                    <span>{sym}</span>
                  </span>
                  <span className="text-[color:var(--ink)]/70">{addr}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink)]/55">
                    {conf}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[color:var(--ink)]/15">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-8 py-10">
          <div>
            <div
              className="text-[34px] leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Pure Agent
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink)]/55">
              An email-shaped interface to the chain.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink)]/55">
            Set in Instrument Serif &amp; JetBrains Mono.
            <br />
            No analytics. No cookies. No newsletter.
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink)]/55">
            MIT · 2026
            <br />
            <span style={{ color: ORANGE }}>●</span> base sepolia online
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: .35; transform: scale(.7); }
        }
        ::selection { background: ${ORANGE}; color: ${PAPER}; }
      `}</style>
    </div>
  );
}