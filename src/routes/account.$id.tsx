import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  Cloud, Search, RefreshCw, ArrowLeftRight, LogOut, HelpCircle,
  LayoutGrid, Compass, Users, Database, Globe, Zap, Server, Lock,
  Activity, FileText, BarChart3, Bell, KeyRound, Ticket, Sparkles,
  Settings2, Fingerprint, Key, Map, RotateCw, ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/account/$id")({
  component: AccountDashboard,
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} — Account Overview · OmniOps` },
      { name: "description", content: "Account identity and resource summary across all enabled regions." },
    ],
  }),
});

type NavKey =
  | "dashboard" | "overview" | "iam" | "s3" | "route53" | "cloudfront"
  | "regional" | "locks" | "health" | "activity" | "maturity"
  | "alerts" | "credentials" | "tickets";

const resourceNav: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutGrid className="size-4" /> },
  { key: "overview", label: "Overview", icon: <Compass className="size-4" /> },
  { key: "iam", label: "IAM", icon: <Users className="size-4" /> },
  { key: "s3", label: "S3 Buckets", icon: <Database className="size-4" /> },
  { key: "route53", label: "Route 53", icon: <Globe className="size-4" /> },
  { key: "cloudfront", label: "CloudFront", icon: <Zap className="size-4" /> },
  { key: "regional", label: "Regional Services", icon: <Map className="size-4" /> },
  { key: "locks", label: "Resource Locks", icon: <Lock className="size-4" /> },
  { key: "health", label: "Health Check", icon: <Activity className="size-4" /> },
  { key: "activity", label: "Activity Log", icon: <FileText className="size-4" /> },
  { key: "maturity", label: "Maturity Assessment", icon: <BarChart3 className="size-4" /> },
];

const opsNav: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: "alerts", label: "Alerts", icon: <Bell className="size-4" /> },
  { key: "credentials", label: "Credentials", icon: <KeyRound className="size-4" /> },
  { key: "tickets", label: "Tickets", icon: <Ticket className="size-4" /> },
];

const inventory = [
  { label: "EC2 Instances", icon: <Server className="size-4" />, value: 9, sub: "19 regions", trend: "+2", spark: [12, 18, 14, 22, 20, 28, 26], accent: "oklch(0.62 0.22 255)" },
  { label: "Lambda Functions", icon: <Zap className="size-4" />, value: 751, sub: "p95 84ms", trend: "+38", spark: [200, 320, 280, 420, 510, 640, 751], accent: "oklch(0.7 0.18 200)" },
  { label: "RDS Instances", icon: <Database className="size-4" />, value: 9, sub: "0 failover", trend: "—", spark: [9, 9, 9, 9, 9, 9, 9], accent: "oklch(0.72 0.17 155)" },
  { label: "S3 Buckets", icon: <Database className="size-4" />, value: 80, sub: "2 public", trend: "+1", spark: [60, 64, 68, 72, 74, 78, 80], accent: "oklch(0.82 0.16 80)" },
  { label: "IAM Users", icon: <Users className="size-4" />, value: 53, sub: "12 MFA off", trend: "—", spark: [53, 53, 53, 53, 53, 53, 53], accent: "oklch(0.68 0.18 245)" },
  { label: "CloudWatch Alarms", icon: <Bell className="size-4" />, value: 78, sub: "4 alarming", trend: "+4", spark: [50, 58, 62, 68, 72, 74, 78], accent: "oklch(0.7 0.22 27)" },
  { label: "SNS Topics", icon: <Sparkles className="size-4" />, value: 27, sub: "—", trend: "—", spark: [27, 27, 27, 27, 27, 27, 27], accent: "oklch(0.72 0.16 280)" },
  { label: "VPCs", icon: <Globe className="size-4" />, value: 27, sub: "9 peerings", trend: "+1", spark: [20, 22, 23, 24, 25, 26, 27], accent: "oklch(0.62 0.18 200)" },
];

const filters = ["All", "Compute", "Storage", "Network", "Identity"] as const;

function AccountDashboard() {
  const { id } = useParams({ from: "/account/$id" });
  const [active, setActive] = useState<NavKey>("overview");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Rail */}
      <aside className="w-14 shrink-0 border-r border-[var(--hairline)] bg-surface/60 backdrop-blur-xl flex flex-col items-center py-4 gap-1">
        <Link to="/" className="grid place-items-center size-9 rounded-xl bg-gradient-to-br from-[oklch(0.62_0.22_255)] to-[oklch(0.78_0.16_200)] shadow-md mb-3">
          <Cloud className="size-4 text-white" />
        </Link>
        {[
          { icon: <Cloud className="size-4" />, label: "CloudOps", active: true },
          { icon: <BarChart3 className="size-4" />, label: "FinOps" },
          { icon: <Lock className="size-4" />, label: "SecOps" },
          { icon: <Sparkles className="size-4" />, label: "AIOps" },
          { icon: <FileText className="size-4" />, label: "RFP" },
        ].map((p) => (
          <button
            key={p.label}
            title={p.label}
            className={`flex flex-col items-center gap-0.5 w-12 py-2 rounded-lg transition ${
              p.active
                ? "bg-[oklch(0.62_0.22_255/0.12)] text-[var(--brand-cyan)] border border-[oklch(0.62_0.22_255/0.25)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {p.icon}
            <span className="text-[9px] tracking-tight">{p.label}</span>
          </button>
        ))}
        <div className="mt-auto flex flex-col items-center gap-1">
          <button className="grid place-items-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <HelpCircle className="size-4" />
          </button>
          <Link to="/sign-in" className="grid place-items-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <LogOut className="size-4" />
          </Link>
        </div>
      </aside>

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[var(--hairline)] bg-surface/40 backdrop-blur-xl">
        <div className="p-4 border-b border-[var(--hairline)]">
          <button className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-card/60 border border-[var(--hairline)] hover:bg-card transition text-left">
            <div className="grid place-items-center size-8 rounded-lg bg-[oklch(0.62_0.22_255/0.12)] border border-[oklch(0.62_0.22_255/0.25)]">
              <Cloud className="size-4 text-[var(--brand-cyan)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{id}</div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
                Connected · AWS
              </div>
            </div>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 text-sm space-y-5">
          <Group label="Resources">
            {resourceNav.map((n) => (
              <NavItem key={n.key} icon={n.icon} active={active === n.key} onClick={() => setActive(n.key)}>
                {n.label}
              </NavItem>
            ))}
          </Group>
          <Group label="Operations">
            {opsNav.map((n) => (
              <NavItem key={n.key} icon={n.icon} active={active === n.key} onClick={() => setActive(n.key)}>
                {n.label}
              </NavItem>
            ))}
          </Group>
        </nav>

        <div className="p-3 border-t border-[var(--hairline)]">
          <div className="rounded-xl bg-card/60 border border-[var(--hairline)] p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Account ID</div>
            <div className="mt-0.5 font-mono text-xs tabular-nums">347737365365</div>
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><RotateCw className="size-3" /> 327.3s scan</span>
              <span className="inline-flex items-center gap-1"><Globe className="size-3" /> 19 regions</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-16 px-6 lg:px-8 flex items-center gap-4 border-b border-[var(--hairline)] bg-surface/60 backdrop-blur-xl sticky top-0 z-10">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/accounts" className="text-muted-foreground hover:text-foreground">{id}</Link>
            <span className="text-muted-foreground/50">›</span>
            <span className="text-muted-foreground">AWS</span>
            <span className="text-muted-foreground/50">›</span>
            <span className="font-medium">Overview</span>
          </nav>

          <div className="flex-1" />

          <div className="input-field hidden lg:flex w-64 py-1.5">
            <Search className="size-4 text-muted-foreground" />
            <input placeholder="Search" className="w-full bg-transparent outline-none text-sm" />
            <kbd className="text-[10px] text-muted-foreground border border-[var(--hairline)] rounded px-1.5 py-0.5">⌘K</kbd>
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--hairline)] text-xs hover:bg-muted/50 transition">
            <ArrowLeftRight className="size-3.5" /> Switch Account
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[oklch(0.62_0.22_255)] to-[oklch(0.55_0.20_245)] text-white text-xs font-medium shadow-md hover:shadow-lg hover:-translate-y-px transition">
            <RefreshCw className="size-3.5" /> New Scan
          </button>
          <ThemeToggle />
          <div className="text-xs text-muted-foreground hidden md:block">venkateshvetcha@gmail.com</div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 space-y-8">
            {/* Title */}
            <section>
              <div className="text-[11px] tracking-[0.22em] font-semibold text-muted-foreground uppercase mb-2">
                Overview · {id}
              </div>
              <h1 className="text-3xl lg:text-[34px] font-semibold tracking-tight">
                Account identity &amp; <span className="text-gradient">resource summary</span>
              </h1>

              {/* KPI strip */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-[var(--hairline)]">
                <Kpi label="Posture" value={<span className="text-[var(--success)]">Healthy</span>} />
                <Kpi label="Resources" value="1,034" />
                <Kpi label="MTD Spend" value="$16,354.37" />
                <Kpi label="Forecast" value={<span className="text-muted-foreground">$18,088.15</span>} />
              </div>
            </section>

            {/* Identity cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <IdentityCard
                label="Account ID"
                icon={<Fingerprint className="size-4" />}
                value="347737365365"
                hint="Member of org o-cloudops"
              />
              <IdentityCard
                label="User ARN"
                icon={<Key className="size-4" />}
                value="arn:aws:iam::3477373653 65:user/cloudops-user"
                mono
                hint="Used for this scan"
              />
              <IdentityCard
                label="Regions Scanned"
                icon={<Map className="size-4" />}
                value="19 / 19"
                hint="All enabled regions"
              />
              <IdentityCard
                label="Scan Duration"
                icon={<RotateCw className="size-4" />}
                value="327.3s"
                hint="Just now · auto-scheduled"
              />
            </section>

            {/* Inventory */}
            <section>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <div className="text-[11px] tracking-[0.22em] font-semibold text-muted-foreground uppercase">Inventory</div>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">Resources across services</h2>
                </div>
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-card/60 border border-[var(--hairline)]">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        filter === f
                          ? "bg-background text-foreground shadow-sm border border-[var(--hairline)]"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {inventory.map((it) => (
                  <InventoryCard key={it.label} {...it} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── helpers ─── */

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-2.5 mb-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">{label}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({
  icon, children, active, onClick,
}: { icon: React.ReactNode; children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition ${
        active
          ? "bg-[oklch(0.62_0.22_255/0.10)] text-foreground border border-[oklch(0.62_0.22_255/0.25)]"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
      }`}
    >
      <span className={active ? "text-[var(--brand-cyan)]" : ""}>{icon}</span>
      <span className="text-[13px]">{children}</span>
      {active && <span className="ml-auto size-1.5 rounded-full bg-[var(--brand-cyan)] animate-pulse-dot" />}
    </button>
  );
}

function Kpi({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function IdentityCard({
  label, icon, value, hint, mono,
}: { label: string; icon: React.ReactNode; value: string; hint: string; mono?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-card/50 backdrop-blur p-4 hover:border-[oklch(0.62_0.22_255/0.35)] hover:bg-card/80 transition">
      <div className="flex items-center justify-between text-muted-foreground">
        <div className="text-[10px] uppercase tracking-[0.18em]">{label}</div>
        <div className="grid place-items-center size-7 rounded-lg bg-muted/60 text-foreground">{icon}</div>
      </div>
      <div className={`mt-3 text-sm font-semibold break-words ${mono ? "font-mono text-xs leading-relaxed" : ""}`}>
        {value}
      </div>
      <div className="mt-1.5 text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}

function InventoryCard({
  label, icon, value, sub, trend, spark, accent,
}: {
  label: string; icon: React.ReactNode; value: number; sub: string;
  trend: string; spark: number[]; accent: string;
}) {
  const up = trend.startsWith("+");
  return (
    <div className="group rounded-2xl border border-[var(--hairline)] bg-card/50 backdrop-blur p-4 hover:border-[oklch(0.62_0.22_255/0.35)] hover:bg-card/80 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="grid place-items-center size-9 rounded-xl bg-muted/60 border border-[var(--hairline)]" style={{ color: accent }}>
          {icon}
        </div>
        <span
          className={`text-[10px] font-medium tabular-nums px-1.5 py-0.5 rounded ${
            up
              ? "bg-[oklch(0.78_0.17_155/0.15)] text-[var(--success)]"
              : "text-muted-foreground bg-muted/50"
          }`}
        >
          {up ? "↗ " : ""}{trend}
        </span>
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-2xl font-semibold tabular-nums">{value.toLocaleString()}</div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <span className="text-[11px] text-muted-foreground">{sub}</span>
        <Sparkline values={spark} color={accent} />
      </div>
    </div>
  );
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 80, h = 26;
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  const gid = `g-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Suppress unused import warning for Settings2
void Settings2;
