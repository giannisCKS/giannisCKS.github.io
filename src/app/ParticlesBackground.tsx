"use client";

import { useEffect, useRef, useState } from "react";
import commitsData from "./commits.json";

interface CommitData {
  hash: string;
  date: string;
  message: string;
  project: string;
  color: string;
  private: boolean;
}

interface HoveredNode {
  commit: CommitData;
  x: number;
  y: number;
}

interface ParticlesProps {
  activeProject?: string | null;
  theme?: "light" | "dark";
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  commit: CommitData;

  constructor(w: number, h: number, commit: CommitData) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = Math.random() * 1.5 + 2.0;
    this.commit = commit;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > w) this.vx = -this.vx;
    if (this.y < 0 || this.y > h) this.vy = -this.vy;
  }

  draw(context: CanvasRenderingContext2D, isHovered: boolean, isActive: boolean, pulseFactor: number) {
    context.beginPath();
    
    const finalRadius = isActive ? this.radius * (1.5 + pulseFactor * 0.5) : (isHovered ? this.radius * 2 : this.radius);
    
    context.arc(this.x, this.y, finalRadius, 0, Math.PI * 2);
    
    if (isActive) {
      context.fillStyle = `${this.commit.color} 1)`;
      context.shadowBlur = 15;
      context.shadowColor = `${this.commit.color} 0.8)`;
    } else {
      context.fillStyle = isHovered ? `${this.commit.color} 1)` : `${this.commit.color} 0.4)`;
      context.shadowBlur = 0;
    }
    
    context.fill();
    context.shadowBlur = 0;
    
    if (isHovered || isActive) {
      context.strokeStyle = `${this.commit.color} 0.8)`;
      context.lineWidth = isActive ? 2 : 1;
      context.stroke();
    }
  }
}

export default function ParticlesBackground({
  activeProject,
  theme = "light",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<HoveredNode | null>(null);
  
  // Use refs to store state that needs to be accessed in the animation loop without restarts
  const activeProjectRef = useRef<string | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Update the ref whenever the prop changes
  useEffect(() => {
    activeProjectRef.current = activeProject ?? null;
  }, [activeProject]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pulseAngle = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("[data-glass='true']")) {
        mouseRef.current = { x: -1000, y: -1000 };
        setHoveredNode(null);
        return;
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      setHoveredNode(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    const initParticles = () => {
      const particles = [];
      const maxDisplay = Math.min(commitsData.length, Math.floor((window.innerWidth * window.innerHeight) / 5000));
      const shuffled = [...commitsData].sort(() => 0.5 - Math.random());
      const sampled = shuffled.slice(0, maxDisplay);
      
      for (let i = 0; i < sampled.length; i++) {
        particles.push(new Particle(window.innerWidth, window.innerHeight, sampled[i] as CommitData));
      }
      particlesRef.current = particles;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-init on resize to keep density correct
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulseAngle += 0.05;
      const pulseFactor = Math.sin(pulseAngle) * 0.5 + 0.5;

      let currentlyHovered: HoveredNode | null = null;
      const currentActiveProject = activeProjectRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const isHovered = distMouse < 15;
        const isActive = currentActiveProject ? particles[i].commit.project.toLowerCase() === currentActiveProject.toLowerCase() : false;

        if (isHovered) {
          currentlyHovered = {
            commit: particles[i].commit,
            x: particles[i].x,
            y: particles[i].y
          };
          
          ctx.beginPath();
          ctx.strokeStyle = `${particles[i].commit.color} 0.8)`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        particles[i].draw(ctx, isHovered, isActive, pulseFactor);

        for (let j = i + 1; j < particles.length; j++) {
          if (particles[i].commit.project !== particles[j].commit.project) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const isBothActive = isActive && (currentActiveProject ? particles[j].commit.project.toLowerCase() === currentActiveProject.toLowerCase() : false);
            
            ctx.beginPath();
            const opacity = isBothActive ? 0.8 : (1 - distance / 130) * 0.4;
            ctx.strokeStyle = `${particles[i].commit.color} ${opacity})`;
            ctx.lineWidth = isBothActive ? 1.5 : 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      setHoveredNode(currentlyHovered);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []); // Run effect only once on mount

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-0 ${
          theme === "dark"
            ? "opacity-95 mix-blend-screen"
            : "opacity-80 mix-blend-multiply"
        }`}
      />
      {hoveredNode && (
        <div 
          className="particle-tooltip fixed z-50 pointer-events-none rounded-xl p-4 max-w-sm transition-opacity duration-150 flex flex-col gap-1.5"
          style={{
            left: `${hoveredNode.x + 20}px`,
            top: `${hoveredNode.y + 20}px`,
            transform: 'translate(0, -50%)'
          }}
        >
          <div className="flex justify-between items-center gap-4">
            <span 
              className="font-mono text-xs font-bold px-2 py-1 rounded"
              style={{
                color: `${hoveredNode.commit.color} 1)`,
                backgroundColor: `${hoveredNode.commit.color} 0.1)`,
              }}
            >
              {hoveredNode.commit.hash}
            </span>
            <span className="theme-text-muted text-xs font-medium">
              {hoveredNode.commit.date}
            </span>
          </div>
          <p className="text-[10px] font-semibold tracking-wider uppercase"
             style={{ color: `${hoveredNode.commit.color} 0.8)` }}
          >
            {hoveredNode.commit.project}
          </p>
          <p className="theme-text text-sm leading-relaxed font-medium">
            {hoveredNode.commit.message}
          </p>
        </div>
      )}
    </>
  );
}
