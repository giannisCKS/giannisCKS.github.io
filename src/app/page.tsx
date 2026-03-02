"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
}[] = [
  {
    title: "Project Alpha",
    description:
      "A full-stack web application featuring real-time data, user authentication, and a responsive dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/giannisCKS",
    demo: null,
  },
  {
    title: "Project Beta",
    description:
      "A RESTful API service built with microservices architecture, containerized with Docker and deployed on Kubernetes.",
    tech: ["Node.js", "Express", "Docker", "Kubernetes"],
    github: "https://github.com/giannisCKS",
    demo: null,
  },
  {
    title: "Project Gamma",
    description:
      "A machine learning pipeline for data processing and visualization with an interactive web interface.",
    tech: ["Python", "FastAPI", "React", "TensorFlow"],
    github: "https://github.com/giannisCKS",
    demo: null,
  },
];

const PROJECT_ICONS = ["🌐", "🐳", "🤖"];

const skills = [
  { label: "Languages", value: "TypeScript · Python · Go", icon: "💻" },
  { label: "Frontend", value: "React · Next.js · Tailwind CSS", icon: "🎨" },
  { label: "Backend", value: "Node.js · FastAPI · REST APIs", icon: "⚙️" },
  { label: "DevOps", value: "Docker · Kubernetes · CI/CD", icon: "🚀" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const TYPING_PHRASES = [
  "Software Developer",
  "Full-Stack Engineer",
  "Open Source Enthusiast",
];

// ─── Typing animation hook ────────────────────────────────────────────────────

function useTypingAnimation(phrases: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        speed,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        speed / 2,
      );
    } else {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const typedText = useTypingAnimation(TYPING_PHRASES);
  useRevealOnScroll();

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#080c18] text-slate-100 overflow-x-hidden">
      {/* ── Navigation ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080c18]/90 backdrop-blur-md border-b border-slate-800/60 shadow-2xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer"
          >
            GT
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/giannisCKS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 hover:border-violet-500 text-slate-400 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-violet-500/10"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
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
            menuOpen ? "max-h-64 border-t border-slate-800" : "max-h-0"
          }`}
        >
          <div className="bg-[#080c18]/95 backdrop-blur-md px-6 py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
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
                  className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* Background glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-600/20 blur-[120px] animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-900/10 blur-[160px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-4 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
              Giannis
            </span>
            <br />
            <span className="text-white">Papakostas</span>
          </h1>

          <div className="h-10 flex items-center justify-center mb-8">
            <p className="text-lg md:text-2xl text-slate-400 font-light">
              {typedText}
              <span className="ml-0.5 text-violet-400 animate-blink">|</span>
            </p>
          </div>

          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Crafting scalable, high-quality software with clean architecture and
            attention to detail. Passionate about great user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-1 text-sm"
            >
              View Projects
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-slate-700 hover:border-violet-500/60 text-slate-300 hover:text-white font-semibold transition-all duration-300 hover:bg-violet-500/10 hover:-translate-y-1 text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-slate-500 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c18] via-slate-950/60 to-[#080c18]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading title="About Me" subtitle="Who I am & what I do" />

          <div className="grid md:grid-cols-5 gap-12 items-start mt-16">
            {/* Bio */}
            <div className="md:col-span-3 space-y-5 reveal">
              <p className="text-slate-300 leading-relaxed text-[15px]">
                I&apos;m a passionate software developer with a strong
                foundation in building scalable web applications and robust
                backend systems. I thrive at the intersection of clean code,
                thoughtful architecture, and great user experience.
              </p>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                With experience across the full stack, I enjoy turning complex
                problems into elegant solutions. Whether it&apos;s crafting
                pixel-perfect UIs or designing efficient APIs, I bring attention
                to detail and a drive for excellence to every project.
              </p>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                When I&apos;m not coding, I&apos;m exploring new technologies,
                contributing to open-source projects, and continuously
                sharpening my skills.
              </p>

              <div className="pt-4">
                <a
                  href="https://github.com/giannisCKS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors group"
                >
                  View my GitHub profile
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Skills grid */}
            <div className="md:col-span-2 grid grid-cols-1 gap-4">
              {skills.map((skill, i) => (
                <div
                  key={skill.label}
                  className={`reveal reveal-delay-${i + 1} group bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-violet-500/40 hover:bg-slate-900/80 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{skill.icon}</span>
                    <p className="text-violet-300 text-xs font-bold uppercase tracking-wider">
                      {skill.label}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {skill.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c18] to-slate-950/80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading title="Projects" subtitle="Things I've built" />

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`reveal reveal-delay-${i + 1} group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-7 flex flex-col hover:border-violet-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-900/30`}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/5 group-hover:to-cyan-600/5 transition-all duration-500" />

                <div className="relative flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg">
                      {PROJECT_ICONS[i % PROJECT_ICONS.length]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg font-medium group-hover:border-violet-700/50 group-hover:text-violet-300 transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative flex gap-4 pt-5 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-violet-400 text-sm font-medium transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    View Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors"
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
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-[#080c18]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <p className="text-slate-400 mt-8 mb-12 leading-relaxed text-[15px] reveal">
            I&apos;m always open to new opportunities, collaborations, and
            interesting conversations. Whether you have a project in mind or
            just want to say hi — feel free to reach out!
          </p>

          <div className="grid sm:grid-cols-3 gap-4 reveal">
            {/* GitHub */}
            <ContactCard
              href="https://github.com/giannisCKS"
              external
              label="GitHub"
              description="@giannisCKS"
              color="from-slate-700 to-slate-600"
              hoverBorder="hover:border-violet-500/50"
              hoverText="group-hover:text-violet-400"
              icon={<GitHubIcon className="w-6 h-6" />}
            />

            {/* Email */}
            <ContactCard
              href="mailto:contact@example.com"
              external={false}
              label="Email"
              description="Send a message"
              color="from-cyan-800 to-cyan-700"
              hoverBorder="hover:border-cyan-500/50"
              hoverText="group-hover:text-cyan-400"
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
            />

            {/* LinkedIn */}
            <ContactCard
              href="https://linkedin.com"
              external
              label="LinkedIn"
              description="Connect with me"
              color="from-blue-800 to-blue-700"
              hoverBorder="hover:border-blue-500/50"
              hoverText="group-hover:text-blue-400"
              icon={
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-slate-800/60 bg-[#080c18]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Giannis Papakostas. All rights
            reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with <span className="text-violet-400/70">Next.js</span>
            {" & "}
            <span className="text-cyan-400/70">Tailwind CSS</span>
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
    <div className="text-center reveal">
      {subtitle && (
        <p className="text-violet-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      <div className="mt-4 mx-auto w-12 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
    </div>
  );
}

// ─── Contact card component ───────────────────────────────────────────────────

function ContactCard({
  href,
  external,
  label,
  description,
  color,
  hoverBorder,
  hoverText,
  icon,
}: {
  href: string;
  external: boolean;
  label: string;
  description: string;
  color: string;
  hoverBorder: string;
  hoverText: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex flex-col items-center gap-3 p-6 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl ${hoverBorder} hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-slate-300 ${hoverText} transition-colors duration-300`}
      >
        {icon}
      </div>
      <div className="text-center">
        <p
          className={`text-sm font-semibold text-slate-200 ${hoverText} transition-colors duration-300`}
        >
          {label}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </a>
  );
}
