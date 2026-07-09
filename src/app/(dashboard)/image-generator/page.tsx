"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wand2, ImageIcon, Download, Eye, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

type GeneratedImage = { id: string; prompt: string; url: string; createdAt: string };

async function readResponseData(res: Response) {
  try {
    return await res.json();
  } catch {
    const text = await res.text();
    return { error: text || "Request failed" };
  }
}

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/image")
      .then(readResponseData)
      .then((data) => setImages(data.images ?? []));
  }, []);

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await readResponseData(res);
      if (!res.ok) {
        setError(data.error ?? "Generation failed");
        return;
      }
      setImages((prev) => [data.image, ...prev]);
      setPrompt("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ImageIcon}
        eyebrow="generation"
        title="Image Generator"
        accent="image"
        status={loading ? "rendering" : undefined}
      />

      {/* Input panel with artistic glows */}
      <div className="panel p-5 relative overflow-hidden panel-image">
        {loading && <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-image to-chat animate-pulse" />}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="Describe the masterpiece you want to render (e.g. A neon spaceship in cyberpunk nebula)..."
            className="input-field flex-1"
          />
          <button
            onClick={generate}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-image to-code px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 shadow-[0_4px_15px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.99] disabled:opacity-40"
          >
            <Wand2 size={15} />
            {loading ? "Rendering..." : "Generate Artwork"}
          </button>
        </div>
        {error && <p className="text-xs text-alert font-mono mt-3">{error}</p>}
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="panel overflow-hidden group hover:border-image/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300 relative flex flex-col justify-between"
            style={{ animationDelay: `${Math.min(i, 8) * 60}ms`, animationFillMode: "forwards" }}
          >
            {/* Image Canvas */}
            <div className="relative aspect-square bg-[#050510] overflow-hidden">
              <Image
                src={img.url}
                alt={img.prompt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              {/* Blur screen on hover with options */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <a
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
                  title="Open Fullscreen"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Prompt details */}
            <div className="p-3 bg-[#080814]/80 backdrop-blur-sm border-t border-white/5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-text-primary line-clamp-2 leading-relaxed italic">
                "{img.prompt}"
              </p>
              <div className="mt-2.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-text-muted">
                <span>DALL-E 3</span>
                <span>{new Date(img.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}

        {images.length === 0 && !loading && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-image/5 border border-image/20 flex items-center justify-center text-image shadow-[0_0_15px_rgba(236,72,153,0.25)]">
              <ImageIcon size={22} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-text-primary">Gallery Empty</p>
              <p className="text-xs text-text-muted font-mono max-w-xs mx-auto">
                No generated artwork found. Describe a scene in the prompt box above to begin.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}