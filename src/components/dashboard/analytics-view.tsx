"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, MessageSquare, ImageIcon, FileText, Code2 } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { PageHeader } from "./page-header";

type Analytics = {
  totals: { chats: number; images: number; resumes: number; reviews: number };
  timeline: { date: string; count: number }[];
};

const STAT_CARDS = [
  { key: "chats", label: "Chat sessions", icon: MessageSquare, accent: "signal" },
  { key: "images", label: "Images generated", icon: ImageIcon, accent: "data" },
  { key: "resumes", label: "Resumes built", icon: FileText, accent: "data" },
  { key: "reviews", label: "Code reviews", icon: Code2, accent: "signal" },
] as const;

export function AnalyticsView() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader icon={LayoutDashboard} eyebrow="overview" title="Workspace activity" accent="signal" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, accent }, i) => {
          const isData = accent === "data";
          return (
            <div
              key={key}
              className="panel p-4 stagger-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`icon-badge ${isData ? "is-data" : ""}`} style={{ width: 32, height: 32 }}>
                  <Icon size={15} strokeWidth={1.75} />
                </div>
                <span className="label-eyebrow">total</span>
              </div>
              <p className="font-mono text-2xl text-text-primary animate-count-flicker">
                {loading ? "—" : data?.totals[key] ?? 0}
              </p>
              <p className="text-xs text-text-muted mt-1">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="panel-accent is-data p-5 relative overflow-hidden">
        <div className="scan-overlay is-active" />
        <div className="flex items-center justify-between mb-4">
          <span className="label-eyebrow">last 7 days · combined activity</span>
          <span className="flex items-center gap-1.5">
            <span className="live-dot is-data" />
            <span className="label-eyebrow">live</span>
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.timeline ?? []}>
              <defs>
                <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FD1C5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4FD1C5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#262A31" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => d.slice(5)}
                stroke="#8A8F98"
                tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "#262A31" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                stroke="#8A8F98"
                tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: "#131519",
                  border: "1px solid #262A31",
                  borderRadius: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#8A8F98" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#4FD1C5"
                strokeWidth={2}
                fill="url(#fillCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}