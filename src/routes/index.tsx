import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Cloud,
  Wallet,
  Lock,
  Bot,
  Ticket,
  Building2,
  ArrowRight,
  Check,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CloudOps — One platform for all your cloud ops" },
      {
        name: "description",
        content:
          "Govern, scan, and monitor AWS and Azure from a single unified dashboard. CloudOps unifies CloudOps, FinOps, SecOps, and AIOps.",
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
      { threshold: 0.12 },
    );
    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700", "ease-out");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it works" },
    { href: "#testimonials", label: "Customers" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Cloud className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="tracking-tight">CloudOps</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
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
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </a>
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
              className="block text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground text-center"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const stats = [
    { value: "20+", label: "AWS Regions" },
    { value: "18+", label: "Resource Types" },
    { value: "100%", label: "Alert Automation" },
    { value: "5", label: "Cloud Providers" },
  ];
  return (
    <section className="relative hero-gradient-bg pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs text-muted-foreground mb-8 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          New: AI-powered anomaly detection
        </div>
        <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.05]">
          One platform for{" "}
          <span className="text-gradient-cyan">all your cloud ops</span>
        </h1>
        <p
          className="animate-fade-up mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          style={{ animationDelay: "0.15s" }}
        >
          Govern, scan and monitor AWS & Azure from a single unified dashboard.
          Replace ten tools with one intelligent control plane built for modern cloud teams.
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-glass backdrop-blur-md px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
          >
            Sign In
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="glass-card rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gradient-cyan">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Cloud,
      emoji: "☁️",
      title: "CloudOps",
      desc: "Unified visibility across AWS and Azure with real-time inventory and topology.",
    },
    {
      icon: Wallet,
      emoji: "💰",
      title: "FinOps",
      desc: "Track spend, forecast budgets and uncover savings across every account.",
    },
    {
      icon: Lock,
      emoji: "🔒",
      title: "SecOps",
      desc: "Continuous compliance scanning with CIS, SOC 2 and HIPAA frameworks.",
    },
    {
      icon: Bot,
      emoji: "🤖",
      title: "AIOps",
      desc: "AI-driven anomaly detection and intelligent root-cause analysis.",
    },
    {
      icon: Ticket,
      emoji: "🎫",
      title: "Tickets & Alerts",
      desc: "Route incidents automatically to Jira, PagerDuty, Slack and Teams.",
    },
    {
      icon: Building2,
      emoji: "🏛️",
      title: "Governance",
      desc: "Enforce guardrails and policies across every team, account and region.",
    },
  ];
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="inline-flex rounded-full glass-card px-3 py-1 text-xs text-muted-foreground mb-4">
            Platform
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Everything your cloud team needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six powerful modules, one elegant control plane.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                data-reveal
                style={{ transitionDelay: `${i * 60}ms` }}
                className="group relative glass-card rounded-2xl p-7 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 text-xl">
                      {f.emoji}
                    </div>
                    <Icon className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Connect your clouds",
      desc: "Securely link AWS and Azure accounts in minutes with read-only IAM roles.",
    },
    {
      n: "02",
      title: "Auto-discover everything",
      desc: "CloudOps inventories every resource, policy and spend signal automatically.",
    },
    {
      n: "03",
      title: "Govern & optimize",
      desc: "Act on prioritized findings, automate guardrails and ship with confidence.",
    },
  ];
  return (
    <section id="how" className="relative py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="inline-flex rounded-full glass-card px-3 py-1 text-xs text-muted-foreground mb-4">
            How it works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            From signup to insight in minutes
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className="relative glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-gradient-cyan">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "CloudOps replaced three separate tools and cut our cloud spend by 32% in the first quarter.",
      name: "Sarah Chen",
      role: "VP Engineering, Northwind",
    },
    {
      quote:
        "The unified view across AWS and Azure is exactly what our platform team needed. Onboarding took 20 minutes.",
      name: "Marcus Patel",
      role: "Staff SRE, Lumen Health",
    },
    {
      quote:
        "Governance guardrails caught two misconfigurations on day one. ROI was instant.",
      name: "Elena Rossi",
      role: "Head of Security, Finovate",
    },
  ];
  return (
    <section id="testimonials" className="relative py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="inline-flex rounded-full glass-card px-3 py-1 text-xs text-muted-foreground mb-4">
            Loved by teams
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
              className="glass-card rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
            >
              <blockquote className="text-foreground/90 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      sub: "/forever",
      desc: "For individuals exploring cloud ops.",
      features: ["1 cloud account", "Core inventory", "Community support"],
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
        "Slack & Jira integrations",
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
        "SSO + SCIM",
        "Custom policies & guardrails",
        "Dedicated success manager",
        "99.99% SLA",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="relative py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <div className="inline-flex rounded-full glass-card px-3 py-1 text-xs text-muted-foreground mb-4">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Simple, scalable pricing
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`relative glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 ${
                t.featured ? "border-primary/60 shadow-xl shadow-primary/20" : ""
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.sub}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  t.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30"
                    : "border border-border bg-glass text-foreground hover:bg-secondary/60"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl glass-card p-12 text-center hero-gradient-bg"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Ready to unify your cloud ops?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Join thousands of teams running AWS and Azure on CloudOps.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-glass px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent">
            <Cloud className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          © {new Date().getFullYear()} CloudOps. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
