"use client";

import { useEffect, useState } from "react";
import { Users, Eye, MousePointerClick, RefreshCw } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { Button, Card } from "@/components/admin/ui";
import { fetchEvents, type AnalyticsEvent } from "@/lib/analytics";

const RANGES = [
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "90 days", days: 90 },
];

type Rows = [string, number][];
type View = {
  views: number;
  uniques: number;
  recent7: number;
  series: Rows;
  paths: Rows;
  devices: Rows;
  browsers: Rows;
  referrers: Rows;
};

const EMPTY_VIEW: View = {
  views: 0,
  uniques: 0,
  recent7: 0,
  series: [],
  paths: [],
  devices: [],
  browsers: [],
  referrers: [],
};

function tally(events: AnalyticsEvent[], key: keyof AnalyticsEvent): Rows {
  const map = new Map<string, number>();
  for (const e of events) {
    const k = String(e[key] || "unknown");
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

// Pure aggregation, run inside the async loader (never during render).
function buildView(events: AnalyticsEvent[], days: number): View {
  const now = Date.now();
  const buckets = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000);
    buckets.set(d.toISOString().slice(5, 10), 0);
  }
  for (const e of events) {
    const k = new Date(e.ts).toISOString().slice(5, 10);
    if (buckets.has(k)) buckets.set(k, (buckets.get(k) ?? 0) + 1);
  }
  return {
    views: events.length,
    uniques: new Set(events.map((e) => e.visitor)).size,
    recent7: events.filter((e) => e.ts >= now - 7 * 86_400_000).length,
    series: [...buckets.entries()],
    paths: tally(events, "path"),
    devices: tally(events, "device"),
    browsers: tally(events, "browser"),
    referrers: tally(events, "referrer"),
  };
}

export default function AdminDashboardPage() {
  const [days, setDays] = useState(30);
  const [tick, setTick] = useState(0);
  const [view, setView] = useState<View>(EMPTY_VIEW);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      const events = await fetchEvents(days);
      if (!active) return;
      setView(buildView(events, days));
      setLoading(false);
    };
    run();
    return () => {
      active = false;
    };
  }, [days, tick]);

  const maxBar = Math.max(1, ...view.series.map(([, n]) => n));

  return (
    <AdminShell title="Dashboard">
      <div className="mb-5 flex items-center gap-2">
        {RANGES.map((r) => (
          <Button
            key={r.days}
            variant={r.days === days ? "primary" : "ghost"}
            onClick={() => setDays(r.days)}
          >
            {r.label}
          </Button>
        ))}
        <Button variant="ghost" onClick={() => setTick((t) => t + 1)}>
          <RefreshCw size={15} /> Refresh
        </Button>
        {loading && <span className="text-sm text-neutral-400">Loading…</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Eye} label="Page views" value={view.views} />
        <StatCard icon={Users} label="Unique visitors" value={view.uniques} />
        <StatCard
          icon={MousePointerClick}
          label="Views (last 7d)"
          value={view.recent7}
        />
      </div>

      <Card className="mt-4">
        <h3 className="mb-4 font-semibold">Views over time</h3>
        <div className="flex h-40 items-end gap-1">
          {view.series.map(([label, n]) => (
            <div key={label} className="group flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t bg-neutral-900/85 transition-colors group-hover:bg-neutral-900"
                style={{ height: `${(n / maxBar) * 100}%` }}
                title={`${label}: ${n}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-neutral-400">
          <span>{view.series[0]?.[0]}</span>
          <span>{view.series[view.series.length - 1]?.[0]}</span>
        </div>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BreakdownCard title="Top pages" rows={view.paths} total={view.views} />
        <BreakdownCard title="Devices" rows={view.devices} total={view.views} />
        <BreakdownCard title="Browsers" rows={view.browsers} total={view.views} />
        <BreakdownCard
          title="Referrers"
          rows={view.referrers}
          total={view.views}
        />
      </div>

      <p className="mt-6 text-xs text-neutral-400">
        First-party analytics stored in Postgres (via Prisma) and served from
        the site&apos;s own API — no third-party trackers.
      </p>
    </AdminShell>
  );
}

function BreakdownCard({
  title,
  rows,
  total,
}: {
  title: string;
  rows: Rows;
  total: number;
}) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="flex flex-col gap-3">
        {rows.slice(0, 6).map(([label, count]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="truncate pr-2 text-neutral-700">{label}</span>
              <span className="text-neutral-500">{count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-neutral-900"
                style={{ width: `${total ? (count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-neutral-400">No data yet.</p>
        )}
      </div>
    </Card>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
}) {
  return (
    <Card className="flex items-center gap-4">
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-neutral-900 text-white">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
    </Card>
  );
}
