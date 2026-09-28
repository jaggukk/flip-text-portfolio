import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import resume from "@/assets/Jagan_KK_Resume.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jagan K K — Software Developer" },
      { name: "description", content: "Portfolio of Jagan K K, a computer science graduate building expressive software, AI systems, and full-stack experiences." },
      { property: "og:title", content: "Jagan K K — Software Developer" },
      { property: "og:description", content: "Selected work, experience, and skills of Jagan K K." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

type Chapter = {
  label: string;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  detail: string;
  number?: string;
  stack?: { label: string; items: string }[];
};

const chapters: Chapter[] = [
  {
    label: "INTRO", title: "JAGAN K K", kicker: "SOFTWARE DEVELOPER",
    description: "I build software that feels as considered as it is capable. From retro desktop worlds to intelligent retrieval systems, curiosity is the engine behind my work.",
    tags: ["FULL-STACK", "AI / ML", "EXPERIMENTAL WEB"], detail: "KANNUR, KERALA · INDIA", number: "00",
  },
  {
    label: "ABOUT", title: "CURIOUS BY DESIGN", kicker: "A LITTLE ABOUT ME",
    description: "Computer Science graduate interested in programming, game development and emerging technologies. I like solving real problems, learning from experienced people, and turning ambitious ideas into working products.",
    tags: ["PYTHON", "C", "JAVASCRIPT"], detail: "OPEN TO WHAT'S NEXT", number: "01",
  },
  {
    label: "PROJECT 01", title: "CERBI", kicker: "RETRO OS DESKTOP EXPERIENCE · 2026",
    description: "A full-stack desktop OS reimagined as a retro game. Built with real-time code chat and AI-generated news summaries, then deployed on Vercel.",
    tags: ["TYPESCRIPT", "REACT", "TANSTACK START", "SUPABASE"], detail: "DIGITAL WORLDS / FULL-STACK", number: "02",
  },
  {
    label: "PROJECT 02", title: "ZITHR", kicker: "LIVE STREAMER & BROWSER CACHING · 2026",
    description: "A music streaming platform that imports Spotify playlists from CSV, resolves tracks to free streams, and caches audio in the browser for repeat listening.",
    tags: ["PYTHON", "FASTAPI", "MONGODB", "REACT", "DOCKER"], detail: "MUSIC / WEB ENGINEERING", number: "03",
  },
  {
    label: "PROJECT 03", title: "RAG STUDIO", kicker: "RAG PIPELINE & EVALUATION SUITE · 2026",
    description: "An intelligent retrieval system with PDF ingestion, vector deduplication, cross-encoder reranking, and an evaluation suite for retrieval quality, faithfulness and relevance.",
    tags: ["PYTHON", "FASTAPI", "QDRANT", "AI / ML"], detail: "INTELLIGENT SYSTEMS / SEARCH", number: "04",
  },
  {
    label: "PROJECT 04", title: "AI AR", kicker: "DATA AUGMENTATION · 2025—2026",
    description: "An admin web app and mobile experience delivering documents through geofencing and object detection. AI depth estimation and summarization transform PDFs into interactive 3D AR cards.",
    tags: ["PYTHON", "FLASK", "UNITY", "OPENCV", "MONGODB"], detail: "AUGMENTED REALITY / AI", number: "05",
  },
  {
    label: "EXPERIENCE", title: "IN PRACTICE", kicker: "DEVOPS INTERN · KERALA VISION BROADBAND LTD.",
    description: "Designed a secure automated backup system for network device configurations, with role-based access, scheduled backups, configuration comparison, device-specific commands and WhatsApp status notifications.",
    tags: ["DEVOPS", "AUTOMATION", "NETWORK SYSTEMS"], detail: "NETWORK DEVICE CONFIGURATION BACKUP", number: "06",
  },
  {
    label: "TOOLKIT", title: "THE STACK", kicker: "TOOLS OF THE TRADE",
    description: "A practical kit for building, shipping, and iterating across web, data, and AI.",
    stack: [
      { label: "Languages", items: "Python, JavaScript, SQL, C, HTML, CSS" },
      { label: "Frameworks", items: "FastAPI, Flask, React, RESTful APIs" },
      { label: "Databases", items: "PostgreSQL, MongoDB, Supabase" },
      { label: "Tools", items: "Git, Docker, LangGraph" },
    ],
    tags: ["BUILD", "CONNECT", "ITERATE"], detail: "ALWAYS LEARNING", number: "07",
  },
  {
    label: "EDUCATION", title: "FOUNDATIONS", kicker: "B.TECH IN COMPUTER SCIENCE · 2022—2026",
    description: "St. Thomas College of Engineering and Technology, Kannur, Kerala. Graduated with a CGPA of 8.38/10. Earlier: Indira Gandhi Public School, Kannur — Higher Secondary Education, 2019–2021.",
    tags: ["COMPUTER SCIENCE", "KANNUR", "8.38 / 10"], detail: "ST. THOMAS COLLEGE OF ENGINEERING AND TECHNOLOGY", number: "08",
  },
  {
    label: "CONTACT", title: "LET'S TALK", kicker: "HAVE SOMETHING IN MIND?",
    description: "I'm interested in thoughtful teams, interesting problems, and the chance to keep growing. Reach out and let's make something worthwhile.",
    tags: ["AVAILABLE FOR OPPORTUNITIES"], detail: "THE NEXT CHAPTER STARTS HERE", number: "09",
  },
];

function RollingText({ text, previous, version }: { text: string; previous: string; version: number }) {
  const length = Math.max(text.length, previous.length);
  return (
    <span aria-label={text} className="inline-block max-w-full break-words">
      {Array.from({ length }, (_, index) => {
        const next = text[index] ?? " ";
        const old = previous[index] ?? " ";
        return (
          <span key={`${version}-${index}`} aria-hidden="true" className="roll-window">
            <span className={version ? "roll-track is-rolling" : "roll-track"} style={{ animationDelay: `${Math.min(index * 19, 360)}ms` }}>
              <span>{old === " " ? "\u00a0" : old}</span>
              <span>{next === " " ? "\u00a0" : next}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Portfolio() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [version, setVersion] = useState(0);
  const activeRef = useRef(0);
  const lockRef = useRef(false);
  const lockTimer = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const setChapter = (index: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    if (next !== activeRef.current) {
      setPrevious(activeRef.current);
      activeRef.current = next;
      setActive(next);
      setVersion((value) => value + 1);
    }
  };

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: next * window.innerHeight, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // One gesture = one chapter. The lock absorbs wheel momentum / fast swipes
  // so a single swipe can never skip multiple chapters.
  const step = (dir: 1 | -1) => {
    if (lockRef.current) return;
    const next = activeRef.current + dir;
    if (next < 0 || next >= chapters.length) return;
    lockRef.current = true;
    window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      lockRef.current = false;
    }, 1000);
    setChapter(next);
    goTo(next);
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setChapter(Math.round(window.scrollY / window.innerHeight));
      });
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      if (e.cancelable) e.preventDefault();
      if (lockRef.current) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const dy = e.deltaY * unit;
      const dx = e.deltaX * unit;
      if (Math.abs(dy) < 12 || Math.abs(dy) < Math.abs(dx)) return;
      step(dy > 0 ? 1 : -1);
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      const s = touchStartRef.current;
      const t = e.touches[0];
      if (!s || !t) return;
      if (Math.abs(t.clientY - s.y) > 12 && e.cancelable) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const s = touchStartRef.current;
      touchStartRef.current = null;
      const t = e.changedTouches[0];
      if (!s || !t) return;
      const dy = s.y - t.clientY;
      const dx = s.x - t.clientX;
      if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx)) return;
      step(dy > 0 ? 1 : -1);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        if (lockRef.current) return;
        const next = e.key === "Home" ? 0 : chapters.length - 1;
        if (next === activeRef.current) return;
        lockRef.current = true;
        window.clearTimeout(lockTimer.current);
        lockTimer.current = window.setTimeout(() => {
          lockRef.current = false;
        }, 1000);
        setChapter(next);
        goTo(next);
        return;
      }
      let dir: 1 | -1 | null = null;
      if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
      else if (e.key === " ") {
        if (target && target.tagName === "BUTTON") return;
        dir = e.shiftKey ? -1 : 1;
      } else return;
      e.preventDefault();
      step(dir);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(lockTimer.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  const chapter = chapters[active] ?? chapters[0];
  const previousChapter = chapters[previous] ?? chapters[0];
  if (!chapter || !previousChapter) return null;

  return (
    <main>
      <div style={{ height: `${chapters.length * 100}vh` }}>
        <div className="portfolio-shell flex flex-col">
          <div className="portfolio-grid absolute inset-0" />
          <div className="grain absolute inset-0 z-20" />

          <header className="relative z-30 flex h-18 shrink-0 items-center justify-between border-b border-border px-5 md:h-22 md:px-10 lg:px-14">
            <Button variant="ghost" className="h-auto p-0 font-mono text-base font-bold tracking-normal text-foreground hover:bg-transparent hover:text-primary md:text-lg" onClick={() => goTo(0)} aria-label="Back to introduction">JAGAN<span className="text-primary">.</span>KK</Button>
            <div className="hidden items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground md:flex"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Software Developer</div>
            <a href={resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-foreground transition-colors hover:text-primary md:text-xs" download="Jagan_KK_Resume.pdf">Résumé <Download size={14} strokeWidth={1.6} /></a>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col md:flex-row">
            <aside className="relative z-20 hidden w-19 shrink-0 flex-col items-center justify-between border-r border-border py-9 md:flex lg:w-24">
              <span className="vertical-label font-mono text-[10px] uppercase text-muted-foreground">PORTFOLIO — 2026</span>
              <div className="flex flex-col gap-3">
                {chapters.map((item, index) => <Button key={item.label} variant="ghost" size="icon" title={item.label} aria-label={`Go to ${item.label}`} onClick={() => goTo(index)} className={`h-5 w-5 rounded-none p-0 hover:bg-transparent ${active === index ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}><span className={`block h-1 w-1 rounded-full bg-current ${active === index ? "scale-150" : ""}`} /></Button>)}
              </div>
              <span className="vertical-label rotate-180 font-mono text-[10px] text-muted-foreground">SCROLL TO EXPLORE</span>
            </aside>

            <section className="relative flex min-w-0 flex-1 flex-col justify-between overflow-hidden px-5 pb-6 pt-8 md:px-10 md:pb-10 md:pt-12 lg:px-16 lg:pt-16">
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="font-mono text-[10px] uppercase text-primary md:text-xs"><span className="mr-3 text-muted-foreground">[{chapter.number}]</span>{chapter.label}</div>
                <div className="hidden font-mono text-[10px] text-muted-foreground lg:block">KANNUR, KERALA / 11.8745° N</div>
              </div>

              <div className="tilt-stage relative z-10 my-auto grid grid-cols-1 items-center gap-8 py-8 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-12">
                <div className="tilt-topic border border-border bg-background/60 p-5 md:p-8">
                  <p key={`k-${active}`} className="content-enter mb-5 font-mono text-[10px] uppercase text-primary md:mb-8 md:text-xs">/ {chapter.kicker}</p>
                  <h1 aria-label={chapter.title} className="max-w-[95%] font-mono text-[clamp(1.9rem,5.2vw,5.5rem)] font-bold uppercase leading-[1.08] text-foreground md:max-w-full">
                    <RollingText text={chapter.title} previous={previousChapter.title} version={version} />
                  </h1>
                </div>
                <div key={`d-${active}`} className="tilt-content content-enter flex items-start gap-3 border border-border bg-background/60 p-5 md:gap-5 md:p-8">
                  <span className="mt-1.5 h-px w-6 shrink-0 bg-primary md:w-10" />
                  <div className="min-w-0">
                    <p className="max-w-xl text-sm leading-relaxed text-foreground md:text-lg md:leading-relaxed">{chapter.description}</p>
                    {chapter.stack && (
                      <dl className="mt-5 space-y-3">
                        {chapter.stack.map((group) => (
                          <div key={group.label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                            <dt className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-widest text-primary md:text-xs">
                              {group.label}
                            </dt>
                            <dd className="max-w-xl text-sm leading-relaxed text-foreground md:text-base">
                              {group.items}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {active === chapters.length - 1 && <div key="contact-actions" className="mt-7 flex flex-wrap gap-5">
                      <a href="mailto:jagsonjob@gmail.com" className="inline-flex items-center gap-2 border-b border-primary pb-1 font-mono text-xs text-primary hover:text-foreground"><Mail size={15} /> EMAIL ME <ArrowUpRight size={15} /></a>
                      <a href="https://github.com/jagan-kk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-xs text-foreground hover:text-primary"><Github size={15} /> GITHUB <ArrowUpRight size={15} /></a>
                    </div>}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between gap-4 border-t border-border pt-5 md:pt-7">
                <div className="min-w-0">
                  <div className="mb-3 font-mono text-[9px] uppercase text-muted-foreground md:text-[10px]">{chapter.detail}</div>
                  <div key={`t-${active}`} className="content-enter flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] text-foreground md:gap-x-6 md:text-[10px]">{chapter.tags.map((tag) => <span key={tag} className="before:mr-1 before:text-primary before:content-['+']">{tag}</span>)}</div>
                </div>
                <Button variant="ghost" size="icon" title={active === chapters.length - 1 ? "Back to start" : "Next section"} aria-label={active === chapters.length - 1 ? "Back to start" : "Next section"} onClick={() => goTo(active === chapters.length - 1 ? 0 : active + 1)} className="h-10 w-10 shrink-0 rounded-none border border-border text-primary hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12">{active === chapters.length - 1 ? <ArrowUpRight /> : <ArrowDownRight />}</Button>
              </div>
            </section>

            <aside className="relative z-20 hidden w-17 shrink-0 flex-col items-center justify-between border-l border-border py-9 lg:flex">
              <span className="font-mono text-xs text-primary">{chapter.number}</span>
              <div className="h-32 w-px bg-border"><div className="progress-bar w-px bg-primary" style={{ height: `${((active + 1) / chapters.length) * 100}%` }} /></div>
              <ArrowDown size={15} strokeWidth={1.5} className="text-muted-foreground" />
            </aside>
          </div>

          <footer className="relative z-30 flex h-12 shrink-0 items-center justify-between border-t border-border px-5 font-mono text-[9px] uppercase md:h-14 md:px-10 md:text-[10px] lg:px-14">
            <span className="text-muted-foreground">© 2026 JAGAN K K</span>
            <span className="text-muted-foreground">{String(active + 1).padStart(2, "0")} <span className="mx-1 text-primary">/</span> {String(chapters.length).padStart(2, "0")}</span>
            <a href="mailto:jagsonjob@gmail.com" className="flex items-center gap-1 text-foreground hover:text-primary">GET IN TOUCH <ArrowUpRight size={12} /></a>
          </footer>
        </div>
      </div>
    </main>
  );
}