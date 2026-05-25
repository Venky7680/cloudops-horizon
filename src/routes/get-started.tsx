import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Cloud, Mail, Lock, User, Building2, ArrowRight, Chrome, Github, Check, Sparkles, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/get-started")({
  component: GetStarted,
  head: () => ({
    meta: [
      { title: "Get started — OmniOps" },
      { name: "description", content: "Create your free OmniOps workspace. Connect AWS & Azure in minutes." },
    ],
  }),
});

const steps = ["Account", "Workspace", "Connect cloud"];

function GetStarted() {
  const [step, setStep] = useState(0);
  return (
    <div className="relative min-h-screen overflow-hidden hero-bg text-foreground">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-40 right-1/3 size-[36rem] rounded-full bg-[oklch(0.55_0.22_255/0.22)] blur-3xl animate-float" />

      <header className="relative z-10 flex items-center justify-between px-6 lg:px-10 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid place-items-center size-9 rounded-xl glass">
            <Cloud className="size-5 text-[var(--brand-cyan)]" />
          </div>
          <span className="font-semibold tracking-tight">OmniOps</span>
        </Link>
        <Link to="/sign-in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Already have one? <span className="text-[var(--brand-cyan)]">Sign in →</span>
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 px-6 lg:px-10 py-8 lg:py-14">
        {/* Form */}
        <div className="panel rounded-3xl p-8 lg:p-10">
          <div className="chip mb-5"><Sparkles className="size-3" /> Free 14-day trial · No card required</div>
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">Create your <span className="text-gradient">OmniOps</span> workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">Connect AWS & Azure in under 5 minutes. Read-only by default.</p>

          {/* Stepper */}
          <ol className="mt-7 flex items-center gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setStep(i)}
                  className={`size-8 grid place-items-center rounded-full text-xs font-semibold transition ${
                    i <= step
                      ? "bg-gradient-to-br from-[oklch(0.62_0.22_255)] to-[oklch(0.78_0.16_200)] text-[var(--primary-foreground)] shadow-lg shadow-[oklch(0.55_0.22_250/0.4)]"
                      : "border border-[var(--hairline)] text-muted-foreground"
                  }`}
                >{i < step ? <Check className="size-4" /> : i + 1}</button>
                <span className={`text-xs ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <div className="h-px flex-1 bg-[var(--hairline)]" />}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="btn-ghost justify-center"><Chrome className="size-4" /> Sign up with Google</button>
            <button className="btn-ghost justify-center"><Github className="size-4" /> Sign up with GitHub</button>
          </div>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-[var(--hairline)]" /> or fill in the details <div className="h-px flex-1 bg-[var(--hairline)]" />
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(Math.min(2, step + 1)); }}>
            {step === 0 && (
              <>
                <Field icon={<User className="size-4" />} label="Full name" placeholder="Jane Cooper" />
                <Field icon={<Mail className="size-4" />} label="Work email" type="email" placeholder="jane@company.com" />
                <Field icon={<Lock className="size-4" />} label="Password" type="password" placeholder="At least 12 characters" />
              </>
            )}
            {step === 1 && (
              <>
                <Field icon={<Building2 className="size-4" />} label="Company / workspace" placeholder="Acme Inc." />
                <Field icon={<Sparkles className="size-4" />} label="Workspace URL" placeholder="acme.cloudops.io" />
                <div className="grid grid-cols-3 gap-2">
                  {["1-10", "11-50", "51-500", "501-2k", "2k+", "Other"].map((r) => (
                    <button key={r} type="button" className="btn-ghost justify-center text-xs py-2">{r}</button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "AWS", color: "from-[oklch(0.78_0.18_60)] to-[oklch(0.65_0.20_40)]" },
                  { name: "Azure", color: "from-[oklch(0.68_0.18_245)] to-[oklch(0.55_0.22_255)]" },
                  { name: "GCP", color: "from-[oklch(0.72_0.16_260)] to-[oklch(0.6_0.2_280)]" },
                  { name: "OCI", color: "from-[oklch(0.65_0.22_27)] to-[oklch(0.55_0.22_20)]" },
                ].map((p) => (
                  <button key={p.name} type="button" className="panel rounded-2xl p-5 text-left hover:-translate-y-0.5 transition group">
                    <div className={`size-10 rounded-xl bg-gradient-to-br ${p.color} grid place-items-center mb-3 shadow-lg`}>
                      <Cloud className="size-5 text-white" />
                    </div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">Connect via read-only role</div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button type="button" onClick={() => setStep(Math.max(0, step - 1))} className="btn-ghost" disabled={step === 0}>Back</button>
              {step < 2 ? (
                <button type="submit" className="btn-primary">Continue <ArrowRight className="size-4" /></button>
              ) : (
                <Link to="/accounts" className="btn-primary">Finish & go to dashboard <ArrowRight className="size-4" /></Link>
              )}
            </div>
          </form>
        </div>

        {/* Side */}
        <aside className="flex flex-col gap-4">
          <div className="panel rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-[oklch(0.7_0.18_200/0.22)] blur-3xl" />
            <div className="relative">
              <div className="chip mb-4"><ShieldCheck className="size-3 text-[var(--success)]" /> Read-only by default</div>
              <h2 className="text-2xl font-semibold tracking-tight">Everything you get on day one</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  "Unified inventory across AWS, Azure, GCP & OCI",
                  "Continuous security & compliance scanning (CIS, SOC 2)",
                  "FinOps cost anomalies and right-sizing recommendations",
                  "AIOps incident correlation across providers",
                  "Native Slack, Teams, Jira & PagerDuty integrations",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1 size-4 grid place-items-center rounded-full bg-[oklch(0.78_0.17_155/0.18)]">
                      <Check className="size-3 text-[var(--success)]" />
                    </span>
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 text-sm">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Average outcomes</div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[["31%", "lower bill"], ["6×", "faster MTTR"], ["12h", "saved/week"]].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xl font-semibold text-gradient">{k}</div>
                  <div className="text-[11px] text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Field({ icon, label, type = "text", placeholder }: { icon: React.ReactNode; label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[var(--hairline)] bg-[oklch(0.22_0.035_260/0.5)] px-3 py-2.5 focus-within:ring-2 focus-within:ring-[var(--ring)] transition">
        <span className="text-muted-foreground">{icon}</span>
        <input type={type} placeholder={placeholder} className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground/60" />
      </div>
    </label>
  );
}
