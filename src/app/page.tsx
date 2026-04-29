"use client";

import { CSSProperties, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
}[] = [
  {
    title: "Dancefolklore.gr",
    description:
      "A specialized Greek web platform dedicated to documenting Greek traditional dance, costumes, and folklore.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/raptisfolklore/dancefolklore",
    demo: "https://dancefolklore.gr",
  },
  {
    title: "Gerakofolia Villa",
    description:
      "A bilingual marketing site for a private sea-view villa in Nikiana, Lefkada, with localized pages, gallery content, and direct booking contact flows.",
    tech: ["Next.js", "React", "TypeScript", "Cloudflare Pages"],
    github: "https://github.com/giannisCKS/gerakofolia",
    demo: "https://gerakofolia-villa.gr/",
  },
  {
    title: "ProLink",
    description:
      "A hyper-local service marketplace connecting clients and vetted professionals in real-time, featuring a Next.js REST API and Flutter mobile app.",
    tech: ["Next.js", "TypeScript", "Flutter", "Prisma", "PostgreSQL"],
    github: "https://github.com/giannisCKS/ProLink",
    demo: null,
  },
  {
    title: "DocScrape",
    description:
      "A local PDF reasoning workspace that watches document folders, indexes text and OCR output with Qdrant, and answers questions with citations through Ollama-backed models.",
    tech: ["Python", "FastAPI", "React", "Qdrant", "Ollama"],
    github: "https://github.com/giannisCKS/DocScrape",
    demo: null,
  },
  {
    title: "ASAC",
    description:
      "A local-first Node.js/TypeScript CLI for running a professional penetration research assistant inside an isolated Podman pod with Ollama-backed inference, explicit import/export flows, and offline-by-default networking.",
    tech: ["Node.js", "TypeScript", "Podman", "Ollama", "Security CLI"],
    github: "https://github.com/giannisCKS/ASAC",
    demo: null,
  },
];

const skills = [
  { label: "Languages", value: "TypeScript, Python, Go, JavaScript, Java, Flutter" },
  { label: "Frontend", value: "React, Next.js, Tailwind CSS, HTML/CSS" },
  { label: "Backend", value: "Node.js, FastAPI, REST APIs, GraphQL" },
  { label: "DevOps", value: "Podman, Kubernetes, CI/CD, AWS" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type Theme = "light" | "dark";

const projectThemes: Record<
  string,
  {
    eyebrow: string;
    accent: string;
    accentSoft: string;
  }
> = {
  "Dancefolklore.gr": {
    eyebrow: "Cultural Archive",
    accent: "rgba(195, 194, 163, 0.92)",
    accentSoft: "rgba(195, 194, 163, 0.22)",
  },
  "Gerakofolia Villa": {
    eyebrow: "Hospitality Website",
    accent: "rgba(20, 184, 166, 0.92)",
    accentSoft: "rgba(20, 184, 166, 0.2)",
  },
  ProLink: {
    eyebrow: "Service Platform",
    accent: "rgba(59, 130, 246, 0.92)",
    accentSoft: "rgba(59, 130, 246, 0.2)",
  },
  DocScrape: {
    eyebrow: "Document Reasoning",
    accent: "rgba(245, 158, 11, 0.92)",
    accentSoft: "rgba(245, 158, 11, 0.2)",
  },
  ASAC: {
    eyebrow: "Security Research CLI",
    accent: "rgba(14, 165, 233, 0.92)",
    accentSoft: "rgba(14, 165, 233, 0.2)",
  },
};

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ─── GitHub SVG ───────────────────────────────────────────────────────────────

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

// ─── Navbar component ───────────────────────────────────────────────────────────

function ThemeToggleButton({
  theme,
  onClick,
  className,
}: {
  theme: Theme;
  onClick: () => void;
  className?: string;
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`theme-toggle ${className ?? ""}`.trim()}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "theme-nav-shell theme-nav-shell-scrolled py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="theme-brand text-xl font-bold tracking-tight transition-colors"
        >
          Giannis Papakostas
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="theme-nav-link text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/giannisCKS"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-nav-button text-sm font-medium"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </li>
          <li>
            <ThemeToggleButton theme={theme} onClick={onToggleTheme} />
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="theme-nav-link md:hidden transition-colors p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72 border-t theme-border-color" : "max-h-0"
        }`}
      >
        <div className="theme-menu-surface px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="theme-nav-link text-sm font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/giannisCKS"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-nav-link flex items-center gap-2 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </li>
            <li>
              <ThemeToggleButton
                theme={theme}
                onClick={() => {
                  onToggleTheme();
                  setMenuOpen(false);
                }}
                className="w-full justify-center"
              />
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const nextTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : "light";

    const frameId = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <main className="theme-main min-h-screen overflow-x-hidden relative">
      <ParticlesBackground activeProject={hoveredProject} theme={theme} />
      {/* ── Navigation ── */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* ── Hero ── */}
      <section className="hero-stage min-h-screen px-6 pt-28 pb-16">
        <motion.div
          className="hero-shell mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.7fr)]"
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8 text-left">
            <motion.h1
              variants={fadeUp}
              className="theme-text-strong max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
            >
              Giannis
              <br />
              Papakostas
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="theme-text max-w-2xl text-base leading-8 md:text-lg"
            >
              Crafting scalable, high-quality software with clean architecture
              and attention to detail. Passionate about great user experiences.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#projects"
                className="theme-button-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="theme-button-secondary inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            data-glass="true"
            className="hero-aside"
          >
            <div className="space-y-5">
              <div>
                <p className="theme-text-faint text-xs font-semibold uppercase tracking-[0.32em]">
                  Focus Areas
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.slice(0, 3).map((skill) => (
                    <span key={skill.label} className="hero-chip">
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hero-rule" />

              <div className="space-y-3">
                <p className="theme-text-muted text-sm font-semibold uppercase tracking-[0.22em]">
                  Build Style
                </p>
                <p className="theme-text text-sm leading-7">
                  Clean systems, dependable APIs, thoughtful interfaces, and
                  product-minded execution across the stack.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 px-6 bg-transparent">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <SectionHeading title="About Me" subtitle="Professional Background" />

          <div className="grid md:grid-cols-5 gap-12 items-start mt-16">
            {/* Bio */}
            <motion.div
              variants={fadeUp}
              data-glass="true"
              className="editorial-sheet md:col-span-3"
            >
              <div className="theme-divider flex flex-wrap items-center justify-between gap-4 border-b pb-5">
                <p className="theme-text-faint text-xs font-semibold uppercase tracking-[0.32em]">
                  Bio
                </p>
                <p className="theme-text-faint text-xs font-medium uppercase tracking-[0.28em]">
                  Systems + UX
                </p>
              </div>
              <p className="theme-text leading-relaxed text-base">
                I&apos;m a passionate software developer with a strong
                foundation in building scalable web applications and robust
                backend systems. I thrive at the intersection of clean code,
                thoughtful architecture, and great user experience.
              </p>
              <p className="theme-text-muted leading-relaxed text-base">
                With experience across the full stack, I enjoy turning complex
                problems into elegant solutions. Whether it&apos;s crafting
                pixel-perfect UIs or designing efficient APIs, I bring attention
                to detail and a drive for excellence to every project.
              </p>
              <p className="theme-text-muted leading-relaxed text-base">
                When I&apos;m not coding, I&apos;m exploring new technologies,
                contributing to open-source projects, and continuously
                sharpening my skills.
              </p>

              <div className="pt-4">
                <a
                  href="https://github.com/giannisCKS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-link inline-flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  View my GitHub profile →
                </a>
              </div>
            </motion.div>

            {/* Skills grid */}
            <motion.div
              variants={staggerContainer}
              className="md:col-span-2 space-y-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  variants={fadeUp}
                  data-glass="true"
                  className="skill-ribbon"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="theme-accent-text mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
                        {skill.label}
                      </p>
                      <p className="theme-text text-sm leading-relaxed">
                        {skill.value}
                      </p>
                    </div>
                    <span className="theme-text-faint text-xs font-semibold uppercase tracking-[0.26em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 px-6 bg-transparent">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <SectionHeading title="Projects" subtitle="Featured Work" />

          <motion.div
            variants={staggerContainer}
            className="project-console mt-16"
          >
            {projects.map((project) => {
              const theme = projectThemes[project.title];
              const isActive = hoveredProject === project.title;
              const isDimmed = hoveredProject !== null && !isActive;
              const panelStyle = {
                "--project-accent": theme.accent,
                "--project-accent-soft": theme.accentSoft,
              } as CSSProperties;

              return (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  data-glass="true"
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  animate={{ opacity: isDimmed ? 0.58 : 1 }}
                  transition={{ duration: 0.18 }}
                  className="project-console-card"
                  style={panelStyle}
                >
                  <div className="project-console-topline">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="project-console-led"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span className="project-console-eyebrow">
                        {theme.eyebrow}
                      </span>
                    </div>
                  </div>

                  <div className="project-console-body">
                    <div className="space-y-4">
                      <div>
                        <h3 className="project-console-title theme-text-strong">
                          {project.title}
                        </h3>
                      </div>

                      <p className="project-console-description theme-text">
                        {project.description}
                      </p>

                      <div className="project-console-tags">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="theme-tag project-console-tag"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-console-actions theme-divider">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-button-secondary project-console-link"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        Repository
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-accent-button project-console-link"
                          style={{
                            borderColor: theme.accentSoft,
                            color: theme.accent,
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-6 bg-transparent">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              title="Get In Touch"
              subtitle="Contact Information"
            />

            <p className="theme-text mt-8 mb-12 leading-relaxed text-base">
              I&apos;m always open to new opportunities, collaborations, and
              interesting conversations. Whether you have a project in mind or
              just want to say hi — feel free to reach out!
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-3"
          >
            {/* GitHub */}
            <ContactCard
              href="https://github.com/giannisCKS"
              external
              label="GitHub"
              description="@giannisCKS"
              icon={<GitHubIcon className="w-6 h-6" />}
              variants={fadeUp}
            />

            {/* Email */}
            <ContactCard
              href="mailto:giannis2k@icloud.com"
              external={false}
              label="Email"
              description="Send a message"
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              variants={fadeUp}
            />

            {/* LinkedIn */}
            <ContactCard
              href="https://linkedin.com"
              external
              label="LinkedIn"
              description="Connect with me"
              icon={
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
              variants={fadeUp}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="theme-footer py-8 px-6 border-t bg-transparent">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="theme-text text-sm">
            © {new Date().getFullYear()} Giannis Papakostas. All rights
            reserved.
          </p>
          <p className="theme-text-faint text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}

// ─── Section heading component ────────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading text-center">
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="section-heading-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="section-heading-title"
      >
        {title}
      </motion.h2>
    </div>
  );
}

// ─── Contact card component ───────────────────────────────────────────────────

function ContactCard({
  href,
  external,
  label,
  description,
  icon,
  variants,
}: {
  href: string;
  external: boolean;
  label: string;
  description: string;
  icon: React.ReactNode;
  variants?: Variants;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      variants={variants}
      whileHover={{ y: -8 }}
      data-glass="true"
      className="contact-rail group"
    >
      <div className="contact-rail-icon">
        <div className="theme-icon transition-colors">
          {icon}
        </div>
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="theme-text-faint text-[0.68rem] font-semibold uppercase tracking-[0.3em]">
          {label}
        </p>
        <p className="contact-rail-title mt-2 text-sm font-semibold transition-colors">
          {description}
        </p>
      </div>
      <div className="contact-rail-arrow" aria-hidden="true">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M5 12h14m-5-5l5 5-5 5"
          />
        </svg>
      </div>
    </motion.a>
  );
}
