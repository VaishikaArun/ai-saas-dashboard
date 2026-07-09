"use client";

import { useState } from "react";
import { Sparkles, FileText, Download, Copy, Check } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

export default function ResumeBuilderPage() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!role.trim() || !experience.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, experience, skills }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setResult(data.resume.content.generated);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <PageHeader icon={FileText} eyebrow="writer" title="Resume Builder" accent="resume" />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Workspace */}
        <div className="panel p-6 space-y-5 panel-resume">
          <span className="label-eyebrow text-resume font-semibold text-xs tracking-wider block border-b border-white/5 pb-2">Target Profile</span>
          
          <div className="space-y-1.5">
            <label className="label-eyebrow block">Target role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
              placeholder="e.g. Lead Frontend Engineer"
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-eyebrow block">Experience notes</label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows={8}
              className="input-field resize-none text-xs"
              placeholder="Paste raw notes of your accomplishments, tasks, or role description. The agent will transform them into professional bullet points."
            />
          </div>
          <div className="space-y-1.5">
            <label className="label-eyebrow block">Skills (optional)</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input-field"
              placeholder="React, Next.js, TypeScript, Tailwind, CSS..."
            />
          </div>
          
          {error && <p className="text-xs text-alert font-mono">{error}</p>}
          
          <button
            onClick={generate}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-resume to-yellow-500 px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(245,158,11,0.3)] disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink animate-ping" />
                Structuring resume points...
              </span>
            ) : (
              <>
                <Sparkles size={15} />
                Generate Resume Section
              </>
            )}
          </button>
        </div>

        {/* Output Document Preview */}
        <div className="panel-raised p-6 relative overflow-hidden flex flex-col min-h-[480px]">
          {loading && (
            <div className="absolute inset-0 bg-[#080814]/75 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-resume opacity-75" />
                <span className="relative inline-flex rounded-xl h-6 w-6 bg-resume flex items-center justify-center text-ink">
                  <FileText size={12} />
                </span>
              </div>
              <p className="text-xs font-mono text-resume uppercase tracking-widest animate-pulse">authoring professional section</p>
            </div>
          )}

          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="label-eyebrow text-resume font-semibold text-xs tracking-wider">Document Output</span>
            {result && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-text-primary hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    Copy Text
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto font-body text-sm text-[#E0E2FD] pr-1 leading-relaxed">
            {result ? (
              <div className="bg-ink/50 border border-white/5 p-6 rounded-xl relative shadow-inner select-text">
                <pre className="whitespace-pre-wrap font-sans text-sm text-[#F3F4F6]">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-3 opacity-60">
                <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-text-muted">
                  <Sparkles size={18} />
                </div>
                <p className="text-xs text-text-muted font-mono">
                  &gt; Waiting for section generator parameters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}