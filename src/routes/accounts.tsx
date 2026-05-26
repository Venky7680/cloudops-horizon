import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Cloud, Home, ChevronRight, Plus, Search, Bell, Settings, LogOut,
  Building2, ShieldCheck, DollarSign, KeyRound, Box, CheckCircle2,
  Sliders, Sparkles, Wrench, LayoutGrid, Activity, Server, FileCheck2, Filter,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/accounts")({
  component: Accounts,
  head: () => ({
    meta: [
      { title: "Account Governance — OmniOps" },
      { name: "description", content: "Govern multiple cloud accounts across AWS, Azure, GCP, VMware and OCI." },
    ],
  }),
});

type Provider = "AWS" | "AZURE" | "GCP" | "VMWARE" | "OCI";

const providers: { id: Provider; label: string; total: number; sub?: { master: number; linked: number }; gradient: string; ring: string; }[] = [
  { id: "AWS", label: "AWS", total: 1, sub: { master: 1, linked: 0 }, gradient: "from-[oklch(0.78_0.18_60)] to-[oklch(0.6_0.22_35)]", ring: "ring-[oklch(0.78_0.18_60/0.4)]" },
  { id: "AZURE", label: "Azure", total: 0, gradient: "from-[oklch(0.68_0.18_245)] to-[oklch(0.5_0.22_255)]", ring: "ring-[oklch(0.68_0.18_245/0.4)]" },
  { id: "GCP", label: "GCP", total: 0, gradient: "from-[oklch(0.72_0.16_260)] to-[oklch(0.55_0.22_280)]", ring: "ring-[oklch(0.72_0.16_260/0.4)]" },
  { id: "VMWARE", label: "VMware", total: 2, gradient: "from-[oklch(0.55_0.02_260)] to-[oklch(0.32_0.02_260)]", ring: "ring-[oklch(0.55_0.02_260/0.4)]" },
  { id: "OCI", label: "OCI", total: 12, gradient: "from-[oklch(0.65_0.22_27)] to-[oklch(0.5_0.22_22)]", ring: "ring-[oklch(0.65_0.22_27/0.4)]" },
];

const accounts = [
  { id: "1", name: "prod-aws-master", note: "Master payer · us-east-1", linked: 7, auth: "AssumeRole", access: "Read/Write", onboardedBy: "venkatesh", date: "Mar 12, 2025", status: "Active", cred: "ok" },
  { id: "2", name: "stage-aws", note: "Linked · eu-west-1", linked: 0, auth: "Access Key", access: "Read-only", onboardedBy: "priya.m", date: "Apr 02, 2025", status: "Active", cred: "ok" },
  { id: "3", name: "data-lake-aws", note: "Linked · ap-south-1", linked: 0, auth: "AssumeRole", access: "Read-only", onboardedBy: "venkatesh", date: "Apr 18, 2025", status: "Active", cred: "warn" },
  { id: "4", name: "sandbox-dev", note: "Linked · us-west-2", linked: 0, auth: "Access Key", access: "Read/Write", onboardedBy: "ana.l", date: "May 09, 2025", status: "Paused", cred: "err" },
];

function Accounts() {
  const [active, setActive] = useState<Provider>("AWS");
  return (
    <div className="relative min-h-screen text-foreground bg-background">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="absolute -top-40 -left-20 size-[30rem] rounded-full bg-[oklch(0.55_0.22_255/0.18)] blur-3xl" />
      <div className="absolute -bottom-40 right-0 size-[30rem] rounded-full bg-[oklch(0.7_0.18_200/0.12)] blur-3xl" />

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen border-r border-[var(--hairline)] bg-surface/70 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2.5 px-5 h-16 border-b border-[var(--hairline)]">
            <div className="grid place-items-center size-9 rounded-xl bg-gradient-to-br from-[oklch(0.62_0.22_255)] to-[oklch(0.78_0.16_200)] shadow-lg shadow-[oklch(0.55_0.22_250/0.4)]">
              <Cloud className="size-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">OmniOps</span>
          </Link>

          <nav className="flex-1 px-3 py-5 text-sm space-y-6 overflow-y-auto">
            <Group label="Governance">
              <NavItem icon={<Building2 className="size-4" />} active>Account Governance</NavItem>
              <NavItem icon={<ShieldCheck className="size-4" />}>GuardRails</NavItem>
              <NavItem icon={<FileCheck2 className="size-4" />}>Policies</NavItem>
            </Group>
            <Group label="Operations">
              <NavItem icon={<Sliders className="size-4" />}>Operations</NavItem>
              <NavItem icon={<ShieldCheck className="size-4" />}>Security</NavItem>
              <NavItem icon={<DollarSign className="size-4" />}>Cost</NavItem>
              <NavItem icon={<KeyRound className="size-4" />}>Access</NavItem>
              <NavItem icon={<Box className="size-4" />}>Resource</NavItem>
              <NavItem icon={<CheckCircle2 className="size-4" />}>Compliance</NavItem>
            </Group>
            <Group label="Workspace">
              <NavItem icon={<Wrench className="size-4" />}>Self Service</NavItem>
              <NavItem icon={<Sparkles className="size-4" />}>Recommendations</NavItem>
              <NavItem icon={<LayoutGrid className="size-4" />}>Tools Integrations</NavItem>
            </Group>
          </nav>

          <div className="p-3 border-t border-[var(--hairline)]">
            <div className="glass rounded-xl p-3 flex items-center gap-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-[oklch(0.62_0.22_255)] to-[oklch(0.78_0.16_200)] grid place-items-center text-xs font-bold">V</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">venkateshvetcha@gm…</div>
                <div className="text-[10px] text-muted-foreground">Administrator</div>
              </div>
              <Settings className="size-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
            <button className="mt-2 w-full flex items-center justify-center gap-2 text-xs text-[oklch(0.7_0.22_22)] hover:text-[oklch(0.8_0.22_22)] py-2 rounded-lg transition">
              <LogOut className="size-3.5" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-6 lg:px-8 border-b border-[var(--hairline)] bg-surface/80 backdrop-blur-xl">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Home className="size-4" />
              <ChevronRight className="size-3.5" />
              <span className="text-foreground font-medium">Account Governance</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="input-field hidden md:flex w-72 py-1.5">
                <Search className="size-4 text-muted-foreground" />
                <input placeholder="Search accounts, regions, tags…" className="w-full bg-transparent outline-none text-sm" />
                <kbd className="text-[10px] text-muted-foreground border border-[var(--hairline)] rounded px-1.5 py-0.5">⌘K</kbd>
              </div>
              <ThemeToggle />
              <button className="relative grid place-items-center size-9 rounded-xl glass">
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[var(--danger)] animate-pulse-dot" />
              </button>
              <div className="text-xs text-right hidden md:block">
                <div className="text-muted-foreground">Tenant</div>
                <div className="font-medium">venkateshvetcha@gmail.com</div>
              </div>
            </div>
          </header>

          {/* Page */}
          <div className="p-6 lg:p-8 space-y-7">
            {/* Title row */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="chip mb-3"><Activity className="size-3 text-[var(--success)]" /> 15 accounts · 3 providers synced</div>
                <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">Cloud Account <span className="text-gradient">Summary</span></h1>
                <p className="mt-1.5 text-sm text-muted-foreground">Govern multiple cloud accounts across AWS, Azure, GCP, VMware & OCI.</p>
              </div>
              <button className="btn-primary"><Plus className="size-4" /> Add new account</button>
            </div>

            {/* Provider tiles */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {providers.map((p) => {
                const isActive = active === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    className={`group relative overflow-hidden rounded-2xl p-5 text-left transition border ${
                      isActive ? `border-transparent ring-2 ${p.ring}` : "border-[var(--hairline)] hover:-translate-y-0.5"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} ${isActive ? "opacity-100" : "opacity-25 group-hover:opacity-40"} transition`} />
                    <div className="absolute inset-0 bg-[oklch(0.14_0.035_260/0.55)]" />
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="text-[11px] tracking-[0.18em] font-semibold text-white/85">{p.label.toUpperCase()}</div>
                        <Cloud className="size-4 text-white/80" />
                      </div>
                      {p.sub ? (
                        <div className="mt-4 space-y-1.5">
                          <Row label="Master / Payer" value={p.sub.master} />
                          <Row label="Linked Accounts" value={p.sub.linked} />
                        </div>
                      ) : (
                        <>
                          <div className="mt-3 text-4xl font-semibold tabular-nums text-white">{p.total}</div>
                          <div className="text-[11px] text-white/75 mt-0.5">Total Cloud Accounts</div>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Filters + table */}
            <section className="panel rounded-2xl overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 p-5 border-b border-[var(--hairline)]">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Server className="size-4 text-[var(--brand-cyan)]" />
                  {active} Master / Payer Accounts
                  <span className="chip ml-1">{accounts.length}</span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2 rounded-xl border border-[var(--hairline)] bg-[oklch(0.22_0.035_260/0.5)] px-3 py-1.5 w-60">
                  <Search className="size-4 text-muted-foreground" />
                  <input placeholder="Search Accounts" className="w-full bg-transparent outline-none text-xs" />
                </div>
                <Select label="Access Type" />
                <Select label="Status" />
                <Select label="Credential" />
                <button className="grid place-items-center size-9 rounded-xl glass"><Filter className="size-4" /></button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      <Th>Account Information</Th>
                      <Th>Linked</Th>
                      <Th>Auth Type</Th>
                      <Th>Access</Th>
                      <Th>Onboarded By</Th>
                      <Th>Date</Th>
                      <Th>Status</Th>
                      <Th>Credential</Th>
                      <Th className="text-right">Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((a) => (
                      <tr key={a.id} className="border-t border-[var(--hairline)] hover:bg-[oklch(0.25_0.035_260/0.4)] transition group">
                        <Td>
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-xl bg-gradient-to-br from-[oklch(0.78_0.18_60)] to-[oklch(0.6_0.22_35)] grid place-items-center shadow-md">
                              <Cloud className="size-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">{a.name}</div>
                              <div className="text-xs text-muted-foreground">{a.note}</div>
                            </div>
                          </div>
                        </Td>
                        <Td><span className="chip tabular-nums">{a.linked}</span></Td>
                        <Td className="text-muted-foreground">{a.auth}</Td>
                        <Td>
                          <span className={`text-xs px-2 py-0.5 rounded-md border ${a.access === "Read-only" ? "border-[oklch(0.7_0.18_200/0.4)] text-[var(--brand-cyan)] bg-[oklch(0.7_0.18_200/0.1)]" : "border-[oklch(0.62_0.22_255/0.4)] text-[oklch(0.78_0.18_255)] bg-[oklch(0.62_0.22_255/0.1)]"}`}>{a.access}</span>
                        </Td>
                        <Td className="text-muted-foreground">{a.onboardedBy}</Td>
                        <Td className="text-muted-foreground">{a.date}</Td>
                        <Td>
                          <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md ${a.status === "Active" ? "bg-[oklch(0.78_0.17_155/0.15)] text-[var(--success)]" : "bg-[oklch(0.82_0.16_80/0.15)] text-[var(--warning)]"}`}>
                            <span className={`size-1.5 rounded-full ${a.status === "Active" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}`} />{a.status}
                          </span>
                        </Td>
                        <Td>
                          <span className={`size-2.5 rounded-full inline-block ${a.cred === "ok" ? "bg-[var(--success)]" : a.cred === "warn" ? "bg-[var(--warning)]" : "bg-[var(--danger)]"}`} />
                        </Td>
                        <Td className="text-right">
                          <Link to="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[oklch(0.62_0.22_255)] to-[oklch(0.55_0.20_245)] text-xs font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-px transition">
                            View <ChevronRight className="size-3.5" />
                          </Link>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t border-[var(--hairline)] text-xs text-muted-foreground">
                <div>Showing <span className="text-foreground font-medium">{accounts.length}</span> of {accounts.length} accounts</div>
                <div className="flex items-center gap-1">
                  <button className="size-8 grid place-items-center rounded-lg glass">‹</button>
                  <button className="size-8 grid place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.62_0.22_255)] to-[oklch(0.55_0.20_245)] text-white font-semibold">1</button>
                  <button className="size-8 grid place-items-center rounded-lg glass">›</button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-2.5 mb-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">{label}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
function NavItem({ icon, children, active }: { icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition ${active ? "bg-gradient-to-r from-[oklch(0.62_0.22_255/0.18)] to-transparent text-foreground border border-[oklch(0.62_0.22_255/0.3)]" : "text-muted-foreground hover:text-foreground hover:bg-[oklch(0.25_0.035_260/0.4)]"}`}>
      <span className={active ? "text-[var(--brand-cyan)]" : ""}>{icon}</span>{children}
    </button>
  );
}
function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/10 backdrop-blur px-2.5 py-1.5">
      <span className="text-[11px] text-white/85">{label}</span>
      <span className="text-sm font-semibold text-white tabular-nums">{value}</span>
    </div>
  );
}
function Select({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-[var(--hairline)] bg-[oklch(0.22_0.035_260/0.5)] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
      {label} <ChevronRight className="size-3 rotate-90" />
    </button>
  );
}
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left font-medium px-5 py-3 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-5 py-3 align-middle ${className}`}>{children}</td>;
}
