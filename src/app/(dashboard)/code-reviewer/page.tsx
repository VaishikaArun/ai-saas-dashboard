"use client";

import { useState } from "react";
import { ScanSearch, Code2, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

const LANGUAGES = ["TypeScript", "JavaScript", "Python", "Java", "Go", "SQL", "Other"];

export default function CodeReviewerPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function review() {
    if (!code.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setFeedback(data.review.feedback);
    } finally {
      setLoading(false);
    }
  }

  // Parse feedback to apply custom styles if possible
  const renderFeedback = (text: string) => {
    return text.split("\n").map((line, i) => {
      let icon = null;
      let lineStyle = "text-text-primary";

      if (line.toLowerCase().includes("warning") || line.toLowerCase().includes("risk")) {
        icon = <AlertTriangle size={13} className="text-resume shrink-0 mt-0.5" />;
        lineStyle = "text-resume/90 bg-resume/5 px-2 py-0.5 rounded border border-resume/10 my-1";
      } else if (line.toLowerCase().includes("optimization") || line.toLowerCase().includes("suggest") || line.toLowerCase().includes("could")) {
        icon = <Lightbulb size={13} className="text-chat shrink-0 mt-0.5" />;
        lineStyle = "text-chat/90 bg-chat/5 px-2 py-0.5 rounded border border-chat/10 my-1";
      } else if (line.startsWith("###") || line.startsWith("##")) {
        lineStyle = "text-code font-bold text-base mt-4 mb-2 block border-b border-white/5 pb-1";
      } else if (line.startsWith("-") || line.startsWith("*")) {
        lineStyle = "text-text-primary pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-code";
      }

      return (
        <span key={i} className={`flex items-start gap-2 text-sm leading-relaxed ${lineStyle}`}>
          {icon}
          <span>{line.replace(/^###\s*|^##\s*|^-\s*|^\*\s*/, "")}</span>
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Code2} eyebrow="review" title="Code Reviewer" accent="code" />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Input Panel */}
        <div className="panel p-6 space-y-4 panel-code">
          <div className="flex items-center justify-between">
            <span className="label-eyebrow text-code font-semibold text-xs tracking-wider">Source Workspace</span>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#080814] border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-text-primary hover:border-code/50 transition-colors focus:outline-none focus:ring-1 focus:ring-code"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/5 bg-[#03020A]/70">
            {/* Visual Editor Marks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#050510]/50 border-r border-white/5 flex flex-col items-center pt-3 select-none font-mono text-[9px] text-text-muted/40 space-y-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              className="w-full pl-11 pr-4 py-3 bg-transparent text-xs font-mono resize-none focus:outline-none focus:ring-0 text-[#E0E2FD] placeholder:text-text-muted/30"
              placeholder="// Paste your code here to analyze with the reviewer..."
              spellCheck={false}
            />
          </div>

          {error && (
            <p className="text-xs text-alert font-mono bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl flex items-center gap-2">
              <AlertTriangle size={14} />
              {error}
            </p>
          )}

          <button
            onClick={review}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-code to-chat px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-115 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(139,92,246,0.3)] disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink animate-ping" />
                Analyzing structure...
              </span>
            ) : (
              <>
                <ScanSearch size={15} />
                Analyze Source Code
              </>
            )}
          </button>
        </div>

        {/* Feedback Panel */}
        <div className="panel-raised p-6 relative overflow-hidden flex flex-col min-h-[480px]">
          {loading && (
            <div className="absolute inset-0 bg-[#080814]/75 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-code opacity-75" />
                <span className="relative inline-flex rounded-xl h-6 w-6 bg-code flex items-center justify-center text-ink">
                  <Code2 size={12} />
                </span>
              </div>
              <p className="text-xs font-mono text-code uppercase tracking-widest animate-pulse">scanning source code</p>
            </div>
          )}

          <span className="label-eyebrow text-code font-semibold text-xs tracking-wider block mb-4 border-b border-white/5 pb-2">Analysis Diagnostics</span>

          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-1">
            {feedback ? (
              <div className="space-y-2">
                {renderFeedback(feedback)}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-3 opacity-60">
                <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-text-muted">
                  <ScanSearch size={18} />
                </div>
                <p className="text-xs text-text-muted font-mono">
                  &gt; Waiting for review diagnostic request.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}