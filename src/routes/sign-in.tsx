import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Cloud, Mail, Lock, ArrowRight, Chrome, ShieldCheck, Activity, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
  head: () => ({
    meta: [
      { title: "Sign in — OmniOps" },
      { name: "description", content: "Sign in to your OmniOps multi-cloud operations dashboard." },
    ],
  }),
});

function SignIn() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden hero-bg text-foreground">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-[oklch(0.55_0.22_255/0.25)] blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 size-[32rem] rounded-full bg-[oklch(0.7_0.18_200/0.18)] blur-3xl animate-float" />

      <header className="relative z-10 flex items-center justify-between px-6 lg:px-10 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid place-items-center size-9 rounded-xl glass">
            <Cloud className="size-5 text-[var(--brand-cyan)]" />
          </div>
          <span className="font-semibold tracking-tight">OmniOps</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/get-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            New here? <span className="text-[var(--brand-cyan)]">Create account →</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-10 py-10 lg:py-16">
        {/* Left: Form */}
        <div className="panel rounded-3xl p-8 lg:p-10">
          <div className="chip mb-5"><Sparkles className="size-3" /> Welcome back</div>
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">Sign in to <span className="text-gradient">OmniOps</span></h1>
          <p className="mt-2 text-sm text-muted-foreground">Govern, scan, and monitor AWS & Azure from a single pane.</p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <button className="btn-ghost justify-center"><Chrome className="size-4" /> Google</button>
            <button className="btn-ghost justify-center"><MicrosoftLogo className="size-4" /> Microsoft</button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-[var(--hairline)]" /> or continue with email <div className="h-px flex-1 bg-[var(--hairline)]" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="text-xs text-muted-foreground">Work email</span>
              <div className="input-field mt-1.5">
                <Mail className="size-4 text-muted-foreground" />
                <input type="email" placeholder="you@company.com" className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground/60" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Password</span>
              <div className="input-field mt-1.5">
                <Lock className="size-4 text-muted-foreground" />
                <input type={show ? "text" : "password"} placeholder="••••••••" className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground/60" />
                <button type="button" onClick={() => setShow(!show)} className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground">{show ? "Hide" : "Show"}</button>
              </div>
            </label>


            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="accent-[var(--brand-cyan)]" /> Remember me
              </label>
              <a className="text-[var(--brand-cyan)] hover:underline cursor-pointer">Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary w-full justify-center mt-2">
              Sign in <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in you agree to our <a className="underline">Terms</a> & <a className="underline">Privacy</a>.
          </p>
        </div>

        {/* Right: Trust panel */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="panel rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-[oklch(0.55_0.22_255/0.3)] blur-3xl" />
            <div className="relative">
              <div className="chip mb-4"><Activity className="size-3 text-[var(--success)]" /> 99.99% uptime</div>
              <h2 className="text-2xl font-semibold tracking-tight">Trusted by teams operating <span className="text-gradient">$2B+</span> in cloud spend</h2>
              <p className="mt-3 text-sm text-muted-foreground">SOC 2 Type II, ISO 27001, and HIPAA aligned. Read-only by default, with least-privilege IAM.</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[["20+", "AWS regions"], ["18+", "Resource types"], ["100%", "Auto alerts"]].map(([k, v]) => (
                  <div key={k} className="glass rounded-xl p-3">
                    <div className="text-xl font-semibold text-gradient">{k}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="panel rounded-3xl p-6 flex items-start gap-4">
            <ShieldCheck className="size-5 text-[var(--success)] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Enterprise-grade security</div>
              <p className="text-xs text-muted-foreground mt-1">SSO/SAML, SCIM provisioning, audit logs, and customer-managed encryption keys available on Enterprise.</p>
            </div>
          </div>
          <div className="panel rounded-3xl p-6">
            <div className="text-xs text-muted-foreground">"OmniOps cut our cloud bill 31% in the first quarter."</div>
            <div className="mt-2 text-sm">— Priya M., Director of Platform, Northwind</div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MicrosoftLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="2 2 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="8" height="8" fill="#f25022" />
      <rect x="11" y="2" width="8" height="8" fill="#7fba00" />
      <rect x="2" y="11" width="8" height="8" fill="#00a4ef" />
      <rect x="11" y="11" width="8" height="8" fill="#ffb900" />
    </svg>
  );
}
