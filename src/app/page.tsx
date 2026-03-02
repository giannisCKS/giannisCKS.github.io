"use client";

import { useState, useEffect } from "react";

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

const skills = [
  { label: "Languages", value: "TypeScript, Python, Go, JavaScript" },
  { label: "Frontend", value: "React, Next.js, Tailwind CSS, HTML/CSS" },
  { label: "Backend", value: "Node.js, FastAPI, REST APIs, GraphQL" },
  { label: "DevOps", value: "Docker, Kubernetes, CI/CD, AWS" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* ── Navigation ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
          >
            Giannis Papakostas
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
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
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors p-1"
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
            menuOpen ? "max-h-64 border-t border-gray-200" : "max-h-0"
          }`}
        >
          <div className="bg-white px-6 py-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
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
                  className="flex items-center gap-2 text-gray-900 hover:text-blue-600 text-sm font-medium transition-colors"
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
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20 pb-16"
      >
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Available for opportunities
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
            Giannis Papakostas
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
            Software Developer & Full-Stack Engineer
          </p>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Crafting scalable, high-quality software with clean architecture and
            attention to detail. Passionate about great user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-md border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold transition-all text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="About Me" subtitle="Professional Background" />

          <div className="grid md:grid-cols-5 gap-12 items-start mt-16">
            {/* Bio */}
            <div className="md:col-span-3 space-y-5">
              <p className="text-gray-700 leading-relaxed text-base">
                I&apos;m a passionate software developer with a strong
                foundation in building scalable web applications and robust
                backend systems. I thrive at the intersection of clean code,
                thoughtful architecture, and great user experience.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                With experience across the full stack, I enjoy turning complex
                problems into elegant solutions. Whether it&apos;s crafting
                pixel-perfect UIs or designing efficient APIs, I bring attention
                to detail and a drive for excellence to every project.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                When I&apos;m not coding, I&apos;m exploring new technologies,
                contributing to open-source projects, and continuously
                sharpening my skills.
              </p>

              <div className="pt-4">
                <a
                  href="https://github.com/giannisCKS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  View my GitHub profile →
                </a>
              </div>
            </div>

            {/* Skills grid */}
            <div className="md:col-span-2 space-y-6">
              {skills.map((skill) => (
                <div
                  key={skill.label}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <p className="text-blue-600 text-sm font-bold uppercase tracking-wide mb-2">
                    {skill.label}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {skill.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Projects" subtitle="Featured Work" />

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    View Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
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
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading title="Get In Touch" subtitle="Contact Information" />

          <p className="text-gray-600 mt-8 mb-12 leading-relaxed text-base">
            I&apos;m always open to new opportunities, collaborations, and
            interesting conversations. Whether you have a project in mind or
            just want to say hi — feel free to reach out!
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* GitHub */}
            <ContactCard
              href="https://github.com/giannisCKS"
              external
              label="GitHub"
              description="@giannisCKS"
              icon={<GitHubIcon className="w-6 h-6" />}
            />

            {/* Email */}
            <ContactCard
              href="mailto:contact@example.com"
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
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Giannis Papakostas. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-xs">
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
    <div className="text-center">
      {subtitle && (
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h2>
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
}: {
  href: string;
  external: boolean;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 transition-colors">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">
          {label}
        </p>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    </a>
  );
}
