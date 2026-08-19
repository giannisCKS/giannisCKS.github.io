"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

type IconComponent = React.ComponentType<{ className?: string }>;

interface Skill {
  label: string;
  items: string;
  icon: IconComponent;
}

interface Experience {
  role: string;
  company: string;
  dates: string;
  location: string;
  bullets: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  live: string | null;
  github: string | null;
  image: string;
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const skills: Skill[] = [
  {
    label: "Full Stack",
    items:
      "TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, Python, FastAPI, REST APIs",
    icon: CodeIcon,
  },
  {
    label: "Data & Platforms",
    items:
      "PostgreSQL, Supabase, PostGIS, Qdrant, SQLite/D1, Cloudflare Pages/Workers/R2/D1, Vercel, GitHub Actions",
    icon: DatabaseIcon,
  },
  {
    label: "Business Systems & Automation",
    items:
      "Role-based dashboards, notifications, approval flows, audit logging, payment flows, webhooks",
    icon: GearsIcon,
  },
  {
    label: "AI & Workflow Systems",
    items:
      "Claude Code, OpenAI Codex, OpenCode, local LLMs, Ollama/Llama, retrieval workflows, OCR pipelines",
    icon: RobotIcon,
  },
  {
    label: "Infrastructure & Security",
    items:
      "Linux, Podman, containers, secure access patterns, GDPR-aware design, incident triage",
    icon: ShieldIcon,
  },
  {
    label: "Languages",
    items: "Greek (Native), English (Professional)",
    icon: GlobeIcon,
  },
];

const experiences: Experience[] = [
  {
    role: "Freelance Full Stack Developer & IT Support",
    company: "Small Businesses",
    dates: "2023–Present",
    location: "Ioannina, Greece",
    bullets: [
      "Delivered full-stack websites, internal tooling, and tech ops for small businesses.",
      "Translated operational needs into scoped technical solutions.",
      "Diagnosed Windows, Linux, and SaaS incidents.",
      "Applied security and GDPR-aware practices.",
    ],
  },
  {
    role: "E-Commerce Systems Developer & Operations",
    company: "ragefactory.gr",
    dates: "2020–2022",
    location: "Ioannina, Greece",
    bullets: [
      "Owned reliability of the business-critical e-commerce storefront during COVID.",
      "Resolved front-end faults, product-data inconsistencies, and transactional friction.",
      "Worked across WordPress and OpenCart stacks.",
    ],
  },
  {
    role: "Plugin Developer & Technical Admin",
    company: "GameforceGreece / MellonGR",
    dates: "2015–2017",
    location: "Remote",
    bullets: [
      "Built plugins and community tooling.",
      "Administered live services with permission controls and incident triage.",
    ],
  },
];

const projects: Project[] = [
  {
    title: "Spatia",
    description:
      "Marketplace and operations platform for venue discovery, booking, provider coordination, and payment flows. Role-specific dashboards, RLS, and Stripe Connect.",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "PostgreSQL",
      "PostGIS",
    ],
    live: "https://spatia-market.vercel.app",
    github: null,
    image: "/projects/spatia.webp",
  },
  {
    title: "Dancefolklore.gr",
    description:
      "Bilingual content, product, and admin operations platform for traditional Greek dance and folklore.",
    tech: [
      "React",
      "TypeScript",
      "Cloudflare Pages",
      "Workers",
      "D1",
      "R2",
      "Hono",
    ],
    live: "https://dancefolklore.gr",
    github: "https://github.com/raptisfolklore/dancefolklore",
    image: "/projects/dancefolklore.webp",
  },
  {
    title: "Gerakofolia Villa",
    description:
      "Tourism booking and presentation website with responsive UI, property content, and enquiry support.",
    tech: ["Next.js", "React", "TypeScript", "Cloudflare Pages"],
    live: "https://gerakofolia-villa.gr",
    github: "https://github.com/giannisCKS/gerakofolia",
    image: "/projects/gerakofolia-villa.webp",
  },
  {
    title: "DocScrape",
    description:
      "Local AI document intelligence system: monitors folders, OCR, Qdrant indexing, and citation-backed answers via local Llama.",
    tech: ["Python", "FastAPI", "React", "Qdrant", "Ollama"],
    live: null,
    github: "https://github.com/giannisCKS/DocScrape",
    image: "/projects/docscrape.webp",
  },
  {
    title: "ASAC",
    description:
      "Isolated AI research CLI with Node.js/TypeScript, Podman containers, private networking, and local Llama.",
    tech: ["Node.js", "TypeScript", "Podman", "Ollama"],
    live: null,
    github: "https://github.com/giannisCKS/ASAC",
    image: "/projects/asac.webp",
  },
  {
    title: "AI Runner & Agent Workflow Tooling",
    description:
      "Local engineering execution and review support, routing Claude Code, OpenAI Codex, OpenCode, Hermes, and OpenClaw through repeatable workflows.",
    tech: ["TypeScript", "Local LLMs", "Agent Workflows", "CLI"],
    live: null,
    github: null,
    image: "/projects/ai-runner.webp",
  },
];

// ─── Icons ──────────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  );
}

function GearsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function RobotIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M12 5v6" />
      <circle cx="12" cy="5" r="2" />
      <path d="M8 15h.01" />
      <path d="M16 15h.01" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ─── Shared components ───────────────────────────────────────────────────────

function ThemeToggleButton({
  theme,
  onClick,
}: {
  theme: Theme;
  onClick: () => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      ) : (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 3v2.5M12 18.5V21M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M3 12h2.5M18.5 12H21M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77M12 16a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

function NextButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      className="next-button"
      onClick={onClick}
      aria-label={label ?? "Next panel"}
    >
      <svg
        className="next-button-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

function BackButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      className="back-button"
      onClick={onClick}
      aria-label={label ?? "Previous panel"}
    >
      <svg
        className="next-button-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

function Navbar({
  theme,
  onToggleTheme,
  scrolled,
  menuOpen,
  setMenuOpen,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}) {
  const scrollToPanel = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`nav ${scrolled ? "nav-scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <a
        href="#banner"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault();
          scrollToPanel("banner");
        }}
      >
        Ioannis Papakostas
      </a>

      <div className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToPanel(link.href.slice(1));
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://github.com/giannisCKS"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button"
        >
          <GitHubIcon className="w-4 h-4" />
          <span>GitHub</span>
        </a>
        <a
          href="/Ioannis_Papakostas_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
            />
          </svg>
          <span>Resume</span>
        </a>
        <ThemeToggleButton theme={theme} onClick={onToggleTheme} />
      </div>

      <button
        type="button"
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToPanel(link.href.slice(1));
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/giannisCKS"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-button"
            onClick={() => setMenuOpen(false)}
          >
            <GitHubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="/Ioannis_Papakostas_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-button"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
            <span>Resume</span>
          </a>
          <ThemeToggleButton
            theme={theme}
            onClick={() => {
              onToggleTheme();
              setMenuOpen(false);
            }}
          />
        </div>
      )}
    </nav>
  );
}

function SkillIcon({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className="grid-icon-item">
      <div className="grid-icon-circle">
        <Icon className="w-8 h-8" />
      </div>
      <span className="grid-icon-label">{skill.label}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="gallery-item">
      <div
        className="gallery-thumb"
        role="img"
        aria-label={`${project.title} thumbnail`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} thumbnail`}
          loading="lazy"
        />
      </div>
      <div className="gallery-body">
        <h3 className="gallery-title">{project.title}</h3>
        <p className="text-sm leading-relaxed opacity-90">
          {project.description}
        </p>
        <div className="gallery-tags">
          {project.tech.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="gallery-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span className="sr-only">
                GitHub repository for {project.title}
              </span>
              <span aria-hidden="true">GitHub</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ContactRow({
  href,
  icon: Icon,
  iconClass,
  label,
  value,
  external,
}: {
  href: string;
  icon: IconComponent;
  iconClass: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="contact-item"
    >
      <span className={`contact-icon ${iconClass}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <div className="contact-label">{label}</div>
        <div className="contact-value">{value}</div>
      </div>
    </a>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  return stored === "light" ? "light" : "dark";
}

function subscribeTheme(callback: () => void) {
  const handler = (event: StorageEvent) => {
    if (event.key === "theme") callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

export default function Home() {
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getStoredTheme,
    () => "dark",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
  };

  const handlePanelsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrolled(target.scrollTop > 20 || target.scrollLeft > 20);
  };

  const scrollToPanel = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Message from ${form.name || "website visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:giannispapakostas2k@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="panels" ref={panelsRef} onScroll={handlePanelsScroll}>
        {/* Panel 1 — Banner */}
        <section id="banner" className="panel panel-right">
          <div className="panel-inner">
            <motion.div
              className="content max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="heading-1 major">
                Hello, my name is Ioannis Papakostas
              </h1>
              <p className="text-lg mb-4">
                Full-Stack Developer | Internal Tools, Automation & Business
                Systems
              </p>
              <p className="mb-8 opacity-90">
                Full-stack developer with 8+ years across web, e-commerce, ops,
                and internal tooling. I translate messy operational problems
                into maintainable systems that reduce manual work and improve
                day-to-day execution.
              </p>
              <a
                href="/Ioannis_Papakostas_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                View Resume
              </a>
            </motion.div>
          </div>
          <NextButton
            onClick={() => scrollToPanel("about")}
            label="Scroll to About panel"
          />
        </section>

        {/* Panel 2 — About */}
        <section id="about" className="panel panel-right spotlight">
          <div className="panel-inner">
            <motion.div
              className="content max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="heading-2 major">About</h2>
              <p className="mb-6">
                Full-stack developer with 8+ years of hands-on experience across
                web development, e-commerce systems, technical operations, and
                internal tooling. Builds secure business platforms and workflow
                automation from stakeholder discovery through deployment using
                TypeScript, React/Next.js, Python/FastAPI, SQL,
                Supabase/PostgreSQL, and AI-assisted development workflows.
              </p>
              <p className="mb-6">
                Experienced translating ambiguous operational problems into
                maintainable tools that reduce manual work and improve
                day-to-day execution.
              </p>
              <p className="text-sm opacity-80">
                BSc Informatics & Telecommunications, University of Ioannina
                (Expected 2026)
              </p>
            </motion.div>
          </div>
          <BackButton
            onClick={() => scrollToPanel("banner")}
            label="Back to Banner panel"
          />
          <NextButton
            onClick={() => scrollToPanel("skills")}
            label="Scroll to Skills panel"
          />
        </section>

        {/* Panel 3 — Skills */}
        <section id="skills" className="panel panel-color1">
          <div className="panel-inner flex-col items-center text-center">
            <motion.div
              className="content max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="heading-2 major">Skills</h2>
              <p className="mb-12">
                A practical toolkit spanning the full stack, data platforms,
                business automation, AI-assisted workflows, and secure
                infrastructure.
              </p>
            </motion.div>
            <motion.div
              className="grid-icons"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {skills.map((skill) => (
                <SkillIcon key={skill.label} skill={skill} />
              ))}
            </motion.div>
          </div>
          <BackButton
            onClick={() => scrollToPanel("about")}
            label="Back to About panel"
          />
          <NextButton
            onClick={() => scrollToPanel("experience")}
            label="Scroll to Experience panel"
          />
        </section>

        {/* Panel 4 — Experience */}
        <section id="experience" className="panel panel-left spotlight">
          <div className="panel-inner">
            <motion.div
              className="content max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="heading-2 major">Experience</h2>
              {experiences.map((exp) => (
                <div key={exp.role} className="mb-8">
                  <h3 className="heading-3">{exp.role}</h3>
                  <p className="text-sm font-semibold opacity-90 mb-1">
                    {exp.company} · {exp.dates}
                  </p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm opacity-85">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
          <BackButton
            onClick={() => scrollToPanel("skills")}
            label="Back to Skills panel"
          />
          <NextButton
            onClick={() => scrollToPanel("projects")}
            label="Scroll to Projects panel"
          />
        </section>

        {/* Panel 5 — Projects */}
        <section id="projects" className="panel">
          <div className="w-full max-w-[1200px]">
            <motion.div
              className="panel-color2 rounded-t-lg p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="heading-2 major">Projects</h2>
              <p>
                Selected builds across marketplaces, content platforms, local AI
                tooling, and automation workflows.
              </p>
            </motion.div>
            <motion.div
              className="p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="gallery">
                {projects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </motion.div>
          </div>
          <BackButton
            onClick={() => scrollToPanel("experience")}
            label="Back to Experience panel"
          />
          <NextButton
            onClick={() => scrollToPanel("contact")}
            label="Scroll to Contact panel"
          />
        </section>

        {/* Panel 6 — Contact */}
        <section id="contact" className="panel panel-color4-alt">
          <div className="panel-inner">
            <motion.div
              className="content span-3-25"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="heading-2 major">Contact</h2>
              <p className="mb-8">
                Have a project or operational challenge in mind? Send a message
                and I will get back to you.
              </p>
              <form className="form" onSubmit={handleContactSubmit}>
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button type="submit" className="button button-primary">
                  Send Message
                </button>
              </form>
            </motion.div>
            <motion.div
              className="content span-1-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="contact-list">
                <ContactRow
                  href="https://github.com/giannisCKS"
                  icon={GitHubIcon}
                  iconClass="contact-icon-purple"
                  label="GitHub"
                  value="github.com/giannisCKS"
                  external
                />
                <ContactRow
                  href="mailto:giannispapakostas2k@gmail.com"
                  icon={EmailIcon}
                  iconClass="contact-icon-salmon"
                  label="Email"
                  value="giannispapakostas2k@gmail.com"
                />
                <ContactRow
                  href="https://giannisCKS.github.io"
                  icon={WebsiteIcon}
                  iconClass="contact-icon-navy"
                  label="Website"
                  value="giannisCKS.github.io"
                  external
                />
              </div>
            </motion.div>
          </div>
          <BackButton
            onClick={() => scrollToPanel("projects")}
            label="Back to Projects panel"
          />
          <p className="mt-10 text-center text-sm opacity-75">
            © {new Date().getFullYear()} Ioannis Papakostas. Built with Next.js
            & Tailwind CSS.
          </p>
        </section>
      </main>
    </>
  );
}
