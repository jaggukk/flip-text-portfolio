import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import mechanism from "@/assets/odometer-mechanism.jpg";
import resume from "@/assets/Jagan_KK_Resume.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jagan K K — Developer & Creative Technologist" },
      { name: "description", content: "Portfolio of Jagan K K, a computer science graduate building expressive software, AI systems, and full-stack experiences." },
      { property: "og:title", content: "Jagan K K — Developer & Creative Technologist" },
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
};

const chapters: Chapter[] = [
  {
    label: "INTRO", title: "JAGAN K K", kicker: "DEVELOPER / CREATIVE TECHNOLOGIST",
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
    description: "Languages: Python, JavaScript, SQL, C, HTML, CSS. Frameworks: FastAPI, Flask, React and RESTful APIs. Databases: PostgreSQL, MongoDB and Supabase. Tools: Git, Docker and LangGraph.",
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

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.max(0, Math.min(chapters.length - 1, Math.round(window.scrollY / window.innerHeight)));
        if (index !== activeRef.current) {
          setPrevious(activeRef.current);
          activeRef.current = index;
          setActive(index);
          setVersion((value) => value + 1);
        }
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const goTo = (index: number) => window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
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
            <div className="hidden items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground md:flex"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Developer / Creative Technologist</div>
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
              <div className="pointer-events-none absolute inset-y-0 right-[-28%] w-[78%] opacity-25 md:right-[-5%] md:w-[60%] md:opacity-50 lg:opacity-70">
                <img src={mechanism} alt="Mechanical odometer rollers" width={960} height={1280} className="mechanism-image h-full w-full object-cover object-center" />
              </div>
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="font-mono text-[10px] uppercase text-primary md:text-xs"><span className="mr-3 text-muted-foreground">[{chapter.number}]</span>{chapter.label}</div>
                <div className="hidden font-mono text-[10px] text-muted-foreground lg:block">KANNUR, KERALA / 11.8745° N</div>
              </div>

              <div className="relative z-10 my-auto max-w-5xl py-8 md:py-12">
                <p key={`k-${active}`} className="content-enter mb-5 font-mono text-[10px] uppercase text-primary md:mb-8 md:text-xs">/ {chapter.kicker}</p>
                <h1 aria-label={chapter.title} className="max-w-[95%] font-mono text-[clamp(2.15rem,7vw,7.5rem)] font-bold uppercase leading-[1.08] text-foreground md:max-w-[85%] lg:max-w-[90%]">
                  <RollingText text={chapter.title} previous={previousChapter.title} version={version} />
                </h1>
                <div key={`d-${active}`} className="content-enter mt-6 flex items-start gap-3 md:mt-10 md:gap-5">
                  <span className="mt-1.5 h-px w-6 shrink-0 bg-primary md:w-10" />
                  <p className="max-w-xl text-sm leading-relaxed text-foreground md:text-lg md:leading-relaxed">{chapter.description}</p>
                </div>
                {active === chapters.length - 1 && <div key="contact-actions" className="content-enter mt-7 flex flex-wrap gap-5 pl-9 md:pl-15">
                  <a href="mailto:jagsonjob@gmail.com" className="inline-flex items-center gap-2 border-b border-primary pb-1 font-mono text-xs text-primary hover:text-foreground"><Mail size={15} /> EMAIL ME <ArrowUpRight size={15} /></a>
                  <a href="https://github.com/jagan-kk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-xs text-foreground hover:text-primary"><Github size={15} /> GITHUB <ArrowUpRight size={15} /></a>
                </div>}
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