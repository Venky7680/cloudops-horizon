import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Cloud,
  Wallet,
  ShieldCheck,
  Bot,
  TicketCheck,
  Building2,
  ArrowRight,
  Check,
  Menu,
  X,
  Sparkles,
  Activity,
  AlertTriangle,
  TrendingUp,
  Search,
  Bell,
  ChevronRight,
  Zap,
  Plug,
  Radar,
  Gauge,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CloudOps — One platform for all your cloud ops" },
      {
        name: "description",
        content:
          "Govern, scan, and monitor AWS and Azure from a single unified dashboard. CloudOps unifies CloudOps, FinOps, SecOps, AIOps, Tickets and Governance.",
      },
      { property: "og:title", content: "CloudOps — Multi-cloud operations platform" },
      {
        property: "og:description",
        content: "Govern, scan and monitor AWS & Azure from one unified dashboard.",
      },
    ],
  }),
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-6");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-6",
        "transition-all",
        "duration-700",
        "ease-out",
      );
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

/* ───────────────────────── NAVBAR ───────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#platform", label: "Platform" },
    { href: "#how", label: "How it works" },
    { href: "#customers", label: "Customers" },
    { href: "#pricing", label: "Pricing" },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-cyan shadow-lg shadow-brand/30">
            <Cloud className="h-4 w-4 text-primary-foreground" />
            <span className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">CloudOps</span>
          <span className="chip ml-1 hidden sm:inline-flex !py-0.5 !text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            v4.2 live
          </span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/sign-in"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link to="/get-started" className="btn-primary !py-2 !px-4">
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background/90 backdrop-blur-xl px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link to="/get-started" className="btn-primary w-full justify-center">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}

/* ───────────────────────── PRODUCT DASHBOARD MOCK ───────────────────────── */
function DashboardMock() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* glow */}
      <div className="absolute -inset-x-10 -top-10 -bottom-10 bg-gradient-to-tr from-brand/30 via-brand-cyan/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
      <div className="relative panel rounded-2xl p-1.5 overflow-hidden">
        {/* window chrome */}
        <div className="flex items-center justify-between px-4 h-10 border-b border-hairline">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            </div>
            <span className="hidden sm:inline text-[11px] text-muted-foreground font-mono">
              app.cloudops.io / overview
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-2 border border-hairline text-[11px] text-muted-foreground">
              <Search className="h-3 w-3" /> Search resources…
            </div>
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-brand to-brand-cyan" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 p-2 bg-surface/60">
          {/* sidebar */}
          <aside className="hidden lg:flex col-span-2 flex-col gap-1 rounded-xl bg-surface-2/60 border border-hairline p-2">
            {[
              { i: Activity, l: "Overview", active: true },
              { i: Cloud, l: "Inventory" },
              { i: ShieldCheck, l: "Security" },
              { i: Wallet, l: "Costs" },
              { i: Bot, l: "AIOps" },
              { i: TicketCheck, l: "Tickets" },
              { i: Building2, l: "Policies" },
            ].map((it) => (
              <div
                key={it.l}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] ${
                  it.active
                    ? "bg-brand/15 text-foreground border border-brand/30"
                    : "text-muted-foreground hover:bg-surface-3/40"
                }`}
              >
                <it.i className="h-3.5 w-3.5" />
                {it.l}
              </div>
            ))}
            <div className="mt-2 px-2 pt-2 border-t border-hairline">
              <div className="text-[9px] text-muted-foreground/70 uppercase tracking-widest mb-1.5">
                Accounts
              </div>
              {["prod-aws", "stage-aws", "azure-eu"].map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 px-1.5 py-1 text-[10px] text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {a}
                </div>
              ))}
            </div>
          </aside>

          {/* main */}
          <div className="col-span-12 lg:col-span-7 space-y-2">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  l: "Resources",
                  v: "14,282",
                  d: "+248 this week",
                  c: "text-foreground",
                  bar: "from-brand to-brand-cyan",
                  w: "78%",
                },
                {
                  l: "Security score",
                  v: "98.4",
                  d: "+1.2%",
                  c: "text-success",
                  bar: "from-success to-brand-cyan",
                  w: "94%",
                },
                {
                  l: "Monthly spend",
                  v: "$42.8k",
                  d: "-$2.1k saved",
                  c: "text-warning",
                  bar: "from-warning to-danger",
                  w: "62%",
                },
              ].map((k) => (
                <div
                  key={k.l}
                  className="rounded-lg bg-surface-2/70 border border-hairline p-3"
                >
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground/70 font-medium">
                    {k.l}
                  </div>
                  <div className={`mt-1 text-xl font-semibold font-mono ${k.c}`}>{k.v}</div>
                  <div className="text-[10px] text-muted-foreground">{k.d}</div>
                  <div className="mt-2 h-1 rounded-full bg-surface-3/60 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${k.bar}`}
                      style={{ width: k.w }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-lg bg-surface-2/70 border border-hairline p-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    Workload performance
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Last 7 days · AWS + Azure
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> AWS
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> Azure
                  </span>
                </div>
              </div>
              <Chart />
            </div>

            {/* Resource list */}
            <div className="rounded-lg bg-surface-2/70 border border-hairline overflow-hidden">
              <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.6fr] gap-3 px-3 py-2 border-b border-hairline text-[9px] uppercase tracking-widest text-muted-foreground/70 font-medium">
                <span>Resource</span>
                <span>Region</span>
                <span>Status</span>
                <span className="text-right">Cost/hr</span>
              </div>
              {[
                {
                  n: "db-primary-01",
                  r: "us-east-1",
                  s: "Active",
                  sc: "success",
                  c: "$0.48",
                  d: "bg-brand",
                },
                {
                  n: "cache-node-prod",
                  r: "eu-west-1",
                  s: "Active",
                  sc: "success",
                  c: "$0.12",
                  d: "bg-brand-cyan",
                },
                {
                  n: "api-gw-ingress",
                  r: "ap-south-1",
                  s: "Degraded",
                  sc: "warning",
                  c: "$0.31",
                  d: "bg-warning",
                },
              ].map((r) => (
                <div
                  key={r.n}
                  className="grid grid-cols-[1.4fr_1fr_0.8fr_0.6fr] gap-3 px-3 py-2 text-[11px] items-center border-b border-hairline last:border-0"
                >
                  <div className="flex items-center gap-2 text-foreground/90 font-medium">
                    <span className={`h-2 w-2 rounded-sm ${r.d}`} /> {r.n}
                  </div>
                  <span className="text-muted-foreground font-mono">{r.r}</span>
                  <span
                    className={`w-fit px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      r.sc === "success"
                        ? "text-success bg-success/10"
                        : "text-warning bg-warning/10"
                    }`}
                  >
                    {r.s}
                  </span>
                  <span className="text-right text-foreground/90 font-mono">{r.c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* alerts column */}
          <aside className="col-span-12 lg:col-span-3 space-y-2">
            <div className="rounded-lg bg-surface-2/70 border border-hairline p-3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Bell className="h-3.5 w-3.5 text-brand-cyan" /> Live alerts
                </div>
                <span className="text-[9px] text-muted-foreground">3 new</span>
              </div>
              {[
                {
                  l: "CRITICAL",
                  c: "danger",
                  t: "Unusual S3 egress · us-west-2",
                  d: "2m",
                },
                {
                  l: "WARNING",
                  c: "warning",
                  t: "Drift detected in prod VPC",
                  d: "15m",
                },
                { l: "INFO", c: "brand", t: "Auto-backup completed", d: "1h" },
              ].map((a, i) => (
                <div
                  key={i}
                  className={`mb-2 last:mb-0 p-2 rounded-md border ${
                    a.c === "danger"
                      ? "bg-danger/5 border-danger/30"
                      : a.c === "warning"
                        ? "bg-warning/5 border-warning/30"
                        : "bg-brand/5 border-brand/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-[9px] font-semibold tracking-wider ${
                        a.c === "danger"
                          ? "text-danger"
                          : a.c === "warning"
                            ? "text-warning"
                            : "text-brand-cyan"
                      }`}
                    >
                      {a.l}
                    </span>
                    <span className="text-[9px] text-muted-foreground font-mono">{a.d}</span>
                  </div>
                  <p className="text-[10.5px] text-foreground/85 leading-snug">{a.t}</p>
                </div>
              ))}
            </div>

            {/* AI suggestion */}
            <div className="relative rounded-lg p-3 overflow-hidden border border-brand/40 bg-gradient-to-br from-brand/30 to-brand-cyan/20">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground mb-1">
                  <Sparkles className="h-3 w-3 text-brand-cyan" /> AI Optimizer
                </div>
                <p className="text-[10.5px] text-foreground/80 leading-snug">
                  Found 12 unused volumes — save{" "}
                  <span className="font-semibold text-foreground">$184/mo</span>.
                </p>
                <button className="mt-2 w-full py-1.5 rounded-md bg-foreground/10 hover:bg-foreground/15 text-[10px] font-semibold text-foreground transition-colors">
                  Apply optimization
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Chart() {
  const points = [22, 38, 30, 55, 48, 70, 62, 80, 68, 88, 76, 92];
  const points2 = [18, 28, 36, 30, 42, 38, 56, 48, 64, 58, 72, 64];
  const max = 100;
  const pathFor = (p: number[]) =>
    p
      .map((v, i) => {
        const x = (i / (p.length - 1)) * 100;
        const y = 100 - (v / max) * 100;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  return (
    <div className="relative h-32">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.20 250)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.62 0.20 250)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.16 200)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.82 0.16 200)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${pathFor(points)} L 100 100 L 0 100 Z`}
          fill="url(#g1)"
        />
        <path d={pathFor(points)} fill="none" stroke="oklch(0.72 0.20 250)" strokeWidth="0.6" />
        <path
          d={`${pathFor(points2)} L 100 100 L 0 100 Z`}
          fill="url(#g2)"
        />
        <path
          d={pathFor(points2)}
          fill="none"
          stroke="oklch(0.82 0.16 200)"
          strokeWidth="0.6"
        />
      </svg>
      <div className="absolute inset-0 flex justify-between text-[8px] text-muted-foreground/60 items-end pb-0.5 px-1 font-mono pointer-events-none">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const stats = [
    { v: "20+", l: "AWS Regions" },
    { v: "18+", l: "Resource Types" },
    { v: "100%", l: "Alert Automation" },
    { v: "5", l: "Cloud Providers" },
  ];
  return (
    <section className="relative hero-bg pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-brand/25 blur-[100px] animate-float pointer-events-none" />
      <div
        className="absolute top-40 right-10 h-80 w-80 rounded-full bg-brand-cyan/20 blur-[110px] animate-float pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="chip mb-7 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
          New · AI-powered anomaly detection
          <ChevronRight className="h-3 w-3" />
        </div>
        <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.02]">
          One platform for{" "}
          <span className="text-gradient">all your cloud ops</span>
        </h1>
        <p
          className="animate-fade-up mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          style={{ animationDelay: "0.15s" }}
        >
          Govern, scan and monitor AWS & Azure from a single unified dashboard. Replace ten
          disconnected tools with one intelligent control plane built for modern cloud teams.
        </p>
        <div
          className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.3s" }}
        >
          <Link to="/get-started" className="btn-primary">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/sign-in" className="btn-ghost">
            Sign In
          </Link>
        </div>
        <div
          className="animate-fade-up mt-5 flex items-center justify-center gap-5 text-[11px] text-muted-foreground"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-success" /> No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-success" /> 14-day Pro trial
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-success" /> SOC 2 Type II
          </span>
        </div>

        {/* dashboard */}
        <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <DashboardMock />
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={s.l}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group relative glass rounded-2xl p-6 text-left hover:-translate-y-1 hover:border-brand/50 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/0 to-brand-cyan/0 group-hover:from-brand/10 group-hover:to-brand-cyan/5 transition-all" />
              <div className="relative">
                <div className="text-4xl font-bold text-gradient">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  {s.l}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── LOGO STRIP ───────────────────────── */
function LogoStrip() {
  const logos = ["NORTHWIND", "LUMEN", "FINOVATE", "ACME CORP", "HELIX", "ORBITAL", "VANTA", "ZENITH"];
  return (
    <section className="py-14 border-y border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted by platform teams at
        </p>
        <div className="relative">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((l, i) => (
              <span
                key={i}
                className="text-2xl font-bold tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors"
              >
                {l}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FEATURES BENTO ───────────────────────── */
function Features() {
  const features = [
    {
      icon: Cloud,
      emoji: "☁️",
      title: "CloudOps",
      desc: "Unified visibility across AWS and Azure with real-time inventory and topology mapping.",
      tone: "brand",
      span: "md:col-span-2",
      visual: <CloudOpsVisual />,
    },
    {
      icon: Wallet,
      emoji: "💰",
      title: "FinOps",
      desc: "Track spend, forecast budgets and uncover savings across every cloud account.",
      tone: "cyan",
      visual: <FinOpsVisual />,
    },
    {
      icon: ShieldCheck,
      emoji: "🔒",
      title: "SecOps",
      desc: "Continuous compliance scanning with CIS, SOC 2 and HIPAA frameworks.",
      tone: "brand",
      visual: <SecOpsVisual />,
    },
    {
      icon: Bot,
      emoji: "🤖",
      title: "AIOps",
      desc: "AI-driven anomaly detection and intelligent root-cause analysis.",
      tone: "cyan",
      span: "md:col-span-2",
      visual: <AIOpsVisual />,
    },
    {
      icon: TicketCheck,
      emoji: "🎫",
      title: "Tickets & Alerts",
      desc: "Route incidents automatically to Jira, PagerDuty, Slack and Teams.",
      tone: "brand",
      visual: <TicketsVisual />,
    },
    {
      icon: Building2,
      emoji: "🏛️",
      title: "Governance",
      desc: "Enforce guardrails and policies across every team, account and region.",
      tone: "cyan",
      visual: <GovernanceVisual />,
    },
  ];
  return (
    <section id="platform" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> Platform
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Everything your cloud team needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six powerful modules integrated into one hyper-efficient control plane.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`group relative panel rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                f.span ?? ""
              } ${
                f.tone === "brand"
                  ? "hover:border-brand/50"
                  : "hover:border-brand-cyan/50"
              }`}
            >
              <div
                className={`absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${
                  f.tone === "brand" ? "bg-brand/20" : "bg-brand-cyan/20"
                }`}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${
                      f.tone === "brand"
                        ? "bg-brand/15 border-brand/30"
                        : "bg-brand-cyan/15 border-brand-cyan/30"
                    }`}
                  >
                    {f.emoji}
                  </div>
                  <f.icon
                    className={`h-4 w-4 ${
                      f.tone === "brand" ? "text-brand" : "text-brand-cyan"
                    } opacity-50`}
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-md">
                  {f.desc}
                </p>
                <div className="mt-5">{f.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CloudOpsVisual() {
  return (
    <div className="relative h-40 rounded-xl border border-hairline bg-surface-2/40 overflow-hidden">
      <svg viewBox="0 0 400 160" className="w-full h-full">
        <defs>
          <radialGradient id="node-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.20 250)" />
            <stop offset="100%" stopColor="oklch(0.50 0.18 245)" />
          </radialGradient>
        </defs>
        {[
          [60, 80, 200, 50],
          [60, 80, 200, 110],
          [200, 50, 340, 30],
          [200, 50, 340, 80],
          [200, 110, 340, 130],
          [200, 110, 340, 80],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="oklch(0.5 0.1 250 / 0.5)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
        {[
          [60, 80, 9],
          [200, 50, 7],
          [200, 110, 7],
          [340, 30, 5],
          [340, 80, 5],
          [340, 130, 5],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="url(#node-g)" />
        ))}
      </svg>
      <div className="absolute top-2 left-2 text-[10px] font-mono text-muted-foreground/70">
        topology · live
      </div>
    </div>
  );
}
function FinOpsVisual() {
  return (
    <div className="h-40 rounded-xl border border-hairline bg-surface-2/40 p-3 flex items-end gap-1.5">
      {[40, 65, 52, 78, 60, 88, 72, 95, 80, 70, 60, 85].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-brand-cyan/40 to-brand-cyan/80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
function SecOpsVisual() {
  return (
    <div className="h-40 rounded-xl border border-hairline bg-surface-2/40 p-3 space-y-1.5">
      {[
        { l: "CIS Benchmark", v: 96, c: "bg-success" },
        { l: "SOC 2", v: 88, c: "bg-brand" },
        { l: "HIPAA", v: 72, c: "bg-warning" },
      ].map((r) => (
        <div key={r.l}>
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-muted-foreground">{r.l}</span>
            <span className="text-foreground font-mono">{r.v}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-3/60 overflow-hidden">
            <div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function AIOpsVisual() {
  return (
    <div className="h-40 rounded-xl border border-hairline bg-surface-2/40 p-3 grid grid-cols-2 gap-2">
      <div className="rounded-md bg-surface-3/40 p-2 border border-hairline">
        <div className="text-[9px] uppercase text-muted-foreground tracking-widest">
          Anomaly
        </div>
        <div className="mt-1 text-sm font-semibold text-danger">+428%</div>
        <div className="text-[10px] text-muted-foreground">db-primary IOPS</div>
      </div>
      <div className="rounded-md bg-surface-3/40 p-2 border border-hairline">
        <div className="text-[9px] uppercase text-muted-foreground tracking-widest">
          Root cause
        </div>
        <div className="mt-1 text-sm font-semibold text-foreground">N+1 query</div>
        <div className="text-[10px] text-muted-foreground">api/orders</div>
      </div>
      <div className="rounded-md bg-surface-3/40 p-2 border border-hairline col-span-2 flex items-center gap-2">
        <Sparkles className="h-3 w-3 text-brand-cyan" />
        <span className="text-[11px] text-foreground/90">
          Suggested: add composite index on{" "}
          <span className="font-mono text-brand-cyan">(user_id, created_at)</span>
        </span>
      </div>
    </div>
  );
}
function TicketsVisual() {
  return (
    <div className="h-40 rounded-xl border border-hairline bg-surface-2/40 p-2 space-y-1.5">
      {[
        { t: "Jira · OPS-1042", s: "Open", c: "warning" },
        { t: "PagerDuty · P1", s: "Ack", c: "brand" },
        { t: "Slack · #incidents", s: "Sent", c: "success" },
      ].map((r) => (
        <div
          key={r.t}
          className="flex items-center justify-between rounded-md bg-surface-3/40 px-2.5 py-2 border border-hairline"
        >
          <span className="text-[11px] text-foreground/90">{r.t}</span>
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
              r.c === "success"
                ? "text-success bg-success/10"
                : r.c === "warning"
                  ? "text-warning bg-warning/10"
                  : "text-brand-cyan bg-brand/10"
            }`}
          >
            {r.s}
          </span>
        </div>
      ))}
    </div>
  );
}
function GovernanceVisual() {
  return (
    <div className="h-40 rounded-xl border border-hairline bg-surface-2/40 p-3 space-y-1.5 font-mono text-[10px]">
      {[
        "✓ require-mfa-all-users",
        "✓ deny-public-s3-buckets",
        "✓ enforce-encryption-at-rest",
        "⚠ tag-policy:cost-center",
      ].map((l) => (
        <div
          key={l}
          className={`px-2 py-1 rounded ${
            l.startsWith("⚠")
              ? "bg-warning/10 text-warning"
              : "bg-success/10 text-success"
          }`}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── HOW IT WORKS ───────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Plug,
      title: "Connect your clouds",
      desc: "Securely link AWS and Azure accounts in minutes with read-only IAM roles. Zero agents.",
    },
    {
      n: "02",
      icon: Radar,
      title: "Auto-discover everything",
      desc: "CloudOps inventories every resource, policy and spend signal automatically.",
    },
    {
      n: "03",
      icon: Gauge,
      title: "Govern & optimize",
      desc: "Act on prioritized findings, automate guardrails and ship with confidence.",
    },
  ];
  return (
    <section id="how" className="relative py-28 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="chip mb-4">
            <Zap className="h-3 w-3 text-brand-cyan" /> How it works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            From signup to insight in minutes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three steps. Production-ready visibility on day one.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-5 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="relative panel rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 border border-brand/30">
                  <s.icon className="h-5 w-5 text-brand-cyan" />
                </div>
                <span className="text-5xl font-bold text-gradient leading-none">{s.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */
function Testimonials() {
  const items = [
    {
      quote:
        "CloudOps replaced three separate tools and cut our cloud spend by 32% in the first quarter. The ROI was instant.",
      name: "Sarah Chen",
      role: "VP Engineering",
      company: "Northwind",
      metric: "−32% spend",
    },
    {
      quote:
        "The unified view across AWS and Azure is exactly what our platform team needed. Onboarding took twenty minutes.",
      name: "Marcus Patel",
      role: "Staff SRE",
      company: "Lumen Health",
      metric: "20-min setup",
    },
    {
      quote:
        "Governance guardrails caught two production misconfigurations on day one. We sleep better at night.",
      name: "Elena Rossi",
      role: "Head of Security",
      company: "Finovate",
      metric: "99.99% uptime",
    },
  ];
  return (
    <section id="customers" className="relative py-28 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="chip mb-4">
            <TrendingUp className="h-3 w-3 text-brand-cyan" /> Loved by teams
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Trusted by cloud teams worldwide
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="panel rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-warning text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-brand/10 text-brand-cyan border border-brand/20">
                  {t.metric}
                </span>
              </div>
              <blockquote className="text-foreground/90 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-hairline">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-brand-cyan" />
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PRICING ───────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      sub: "/forever",
      desc: "For individuals exploring cloud ops.",
      features: ["1 cloud account", "Core inventory", "Community support", "7-day metrics"],
      cta: "Get Started",
      featured: false,
    },
    {
      name: "Team",
      price: "$49",
      sub: "/user / mo",
      desc: "For growing platform teams.",
      features: [
        "Unlimited cloud accounts",
        "FinOps + SecOps modules",
        "Slack, Jira & PagerDuty",
        "12-month metric retention",
        "Priority support",
      ],
      cta: "Start Free Trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      sub: "",
      desc: "For organizations at scale.",
      features: [
        "SSO + SCIM provisioning",
        "Custom policies & guardrails",
        "Dedicated success manager",
        "Audit logs & exports",
        "99.99% uptime SLA",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="relative py-28 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Simple, scalable pricing
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-5 items-start">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`relative panel rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                t.featured
                  ? "border-brand/60 shadow-2xl shadow-brand/20 md:scale-[1.03]"
                  : ""
              }`}
            >
              {t.featured && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-brand-cyan px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-brand/40">
                    Most popular
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand/10 to-transparent pointer-events-none" />
                </>
              )}
              <div className="relative">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                  {t.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-foreground tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{t.sub}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                <ul className="mt-7 space-y-3.5">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground/90"
                    >
                      <span
                        className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full ${
                          t.featured ? "bg-brand/20" : "bg-success/15"
                        }`}
                      >
                        <Check
                          className={`h-2.5 w-2.5 ${
                            t.featured ? "text-brand-cyan" : "text-success"
                          }`}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    t.featured ? "btn-primary !w-full" : "btn-ghost !w-full"
                  }`}
                >
                  {t.cta} {t.featured && <ArrowRight className="h-3.5 w-3.5" />}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl panel p-14 text-center hero-bg"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative">
            <div className="chip mb-5">
              <AlertTriangle className="h-3 w-3 text-warning" /> Limited Q2 onboarding slots
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
              Ready to unify your{" "}
              <span className="text-gradient">cloud ops</span>?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join thousands of teams running AWS and Azure on CloudOps.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/get-started" className="btn-primary">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/sign-in" className="btn-ghost">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */
function Footer() {
  const cols = [
    { h: "Product", l: ["Platform", "Integrations", "Changelog", "Roadmap"] },
    { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
    { h: "Resources", l: ["Docs", "Blog", "Status", "Security"] },
  ];
  return (
    <footer className="border-t border-border/40 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-cyan">
                <Cloud className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-semibold tracking-tight text-foreground">CloudOps</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The unified control plane for AWS and Azure operations.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
                {c.h}
              </div>
              <ul className="space-y-2.5">
                {c.l.map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} CloudOps Inc. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" /> All
              systems normal
            </span>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
