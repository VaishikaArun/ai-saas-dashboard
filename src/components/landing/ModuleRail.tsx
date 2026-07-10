import { MessageSquare, ImageIcon, FileText, Code2 } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { Reveal } from "@/components/Reveal";

const MODULES = [
  {
    id: "01",
    title: "AI Chat",
    desc: "A fast, focused assistant for everyday questions and drafting.",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    id: "02",
    title: "Image Generator",
    desc: "Turn a prompt into a finished image in one pass.",
    icon: ImageIcon,
    href: "/image-generator",
  },
  {
    id: "03",
    title: "Resume Builder",
    desc: "Structured, ATS-friendly resumes built section by section.",
    icon: FileText,
    href: "/resume-builder",
  },
  {
    id: "04",
    title: "Code Reviewer",
    desc: "Paste a diff, get specific, actionable review comments.",
    icon: Code2,
    href: "/code-reviewer",
  },
];

export function ModuleRail() {
  return (
    <section id="modules" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <span className="label-eyebrow">the four modules</span>
        <h2 className="mt-3 text-2xl font-semibold text-text-primary md:text-3xl">
          Every tool, same workspace.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map(({ id, title, desc, icon: Icon, href }, i) => (
          <Reveal key={id} delay={i * 80}>
            <TiltCard>
              <a href={href} className="block">
                <div className="relative flex items-start justify-between">
                  <Icon size={20} strokeWidth={1.75} className="text-signal" />
                  <span className="font-mono text-xs text-text-muted">{id}</span>
                </div>
                <h3 className="relative mt-8 text-base font-semibold text-text-primary">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-text-muted">{desc}</p>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}