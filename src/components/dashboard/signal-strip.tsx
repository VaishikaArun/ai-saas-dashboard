"use client";

import { useEffect, useState } from "react";
import { Cpu, Wifi, Activity, Terminal } from "lucide-react";

export function SignalStrip() {
  const [latency, setLatency] = useState(240);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 30);
        return Math.max(120, Math.min(380, prev + drift));
      });
      setTick((t) => t + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getLatencyColor = (ms: number) => {
    if (ms < 200) return "text-emerald-400";
    if (ms < 300) return "text-chat";
    return "text-resume";
  };

  return (
    <div className="h-10 border-b border-white/5 bg-[#080814]/40 backdrop-blur-md flex items-center px-6 gap-6 overflow-x-auto justify-between select-none">
      <div className="flex items-center gap-6">
        {/* Live Status indicator */}
        <span className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">online</span>
        </span>

        {/* Telemetry data */}
        <div className="flex items-center gap-5">
          {/* Model */}
          <span className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
            <Cpu size={12} className="text-chat opacity-70" />
            <span className="text-text-muted uppercase text-[9px] tracking-wider">model:</span>
            <span className="text-chat bg-chat/5 border border-chat/10 px-2 py-0.5 rounded-full text-[10px] font-bold">gpt-4o-mini</span>
          </span>

          {/* Latency */}
          <span className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
            <Activity size={12} className="text-code opacity-70" />
            <span className="text-text-muted uppercase text-[9px] tracking-wider">latency:</span>
            <span className={`font-bold transition-all duration-500 ${getLatencyColor(latency)}`}>
              {latency}ms
            </span>
          </span>

          {/* Uptime */}
          <span className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
            <Wifi size={12} className="text-emerald-400 opacity-70" />
            <span className="text-text-muted uppercase text-[9px] tracking-wider">telemetry:</span>
            <span className="text-emerald-400 font-bold">99.98% uptime</span>
          </span>
        </div>
      </div>

      {/* Session indicator */}
      <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-text-muted">
        <Terminal size={12} className="text-code/70" />
        <span className="text-text-muted uppercase text-[9px] tracking-wider">session:</span>
        <span className="text-code bg-code/5 border border-code/10 px-2 py-0.5 rounded font-bold uppercase">
          #{(1000 + tick).toString(36)}
        </span>
      </div>
    </div>
  );
}
