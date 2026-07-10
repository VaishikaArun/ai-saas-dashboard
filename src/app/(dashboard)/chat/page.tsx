"use client";

import { useRef, useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Explain this error message",
  "Draft a follow-up email",
  "Summarize a long doc",
  "Brainstorm project names",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function sendMessage(overrideText?: string) {
    const text = overrideText ?? input;
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: userMsg.content }),
      });
      const data = await res.json();
      if (res.ok) {
        setChatId(data.chatId);
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error ?? "something went wrong"}` },
        ]);
      }
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <div className="flex h-full max-h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        icon={MessageSquare}
        eyebrow="assistant"
        title="AI Chat"
        accent="signal"
        status={loading ? "thinking" : "ready"}
      />

      <div className="panel-accent mb-4 flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <MessageSquare size={20} strokeWidth={1.75} />
            </div>
            <p className="mb-1.5 text-base font-medium text-text-primary">Nothing here yet</p>
            <p className="mb-6 font-mono text-sm text-text-muted">
              &gt; ask anything. session starts on first message.
            </p>
            <div className="flex max-w-md flex-wrap justify-center gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="tool-chip hover:border-signal/50 hover:text-text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`stagger-in flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-panel px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-signal text-text-primary"
                  : "border border-line bg-panel-raised text-text-primary"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <p className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="status-live" />
            assistant is thinking…
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
          className="input-field"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <Send size={15} />
          Send
        </button>
      </div>
    </div>
  );
}