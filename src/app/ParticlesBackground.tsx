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
}

export default function ParticlesBackground({ activeProject }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<HoveredNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let pulseAngle = 0;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("[data-glass='true']")) {
        mouse.x = -1000;
        mouse.y = -1000;
        setHoveredNode(null);
        return;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setHoveredNode(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

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
        
        // Active project nodes are larger and glow
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
        context.shadowBlur = 0; // Reset shadow for other drawings
        
        if (isHovered || isActive) {
          context.strokeStyle = `${this.commit.color} 0.8)`;
          context.lineWidth = isActive ? 2 : 1;
          context.stroke();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const maxDisplay = Math.min(commitsData.length, Math.floor((canvas.width * canvas.height) / 5000));
      const shuffled = [...commitsData].sort(() => 0.5 - Math.random());
      const sampled = shuffled.slice(0, maxDisplay);
      
      for (let i = 0; i < sampled.length; i++) {
        particles.push(new Particle(canvas.width, canvas.height, sampled[i] as CommitData));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulseAngle += 0.05;
      const pulseFactor = Math.sin(pulseAngle) * 0.5 + 0.5;

      let currentlyHovered: HoveredNode | null = null;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const isHovered = distMouse < 15;
        const isActive = activeProject ? particles[i].commit.project.toLowerCase() === activeProject.toLowerCase() : false;

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
            const isBothActive = isActive && (activeProject ? particles[j].commit.project.toLowerCase() === activeProject.toLowerCase() : false);
            
            ctx.beginPath();
            // Lines for active project are more opaque
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
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeProject]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-80 mix-blend-multiply"
      />
      {hoveredNode && (
        <div 
          className="fixed z-50 pointer-events-none bg-white/70 backdrop-blur-3xl border border-white/40 shadow-2xl shadow-blue-500/10 rounded-xl p-4 max-w-sm transition-opacity duration-150 flex flex-col gap-1.5"
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
            <span className="text-xs text-gray-500 font-medium">
              {hoveredNode.commit.date}
            </span>
          </div>
          <p className="text-[10px] font-semibold tracking-wider uppercase"
             style={{ color: `${hoveredNode.commit.color} 0.8)` }}
          >
            {hoveredNode.commit.project}
          </p>
          <p className="text-sm text-gray-800 leading-relaxed font-medium">
            {hoveredNode.commit.message}
          </p>
        </div>
      )}
    </>
  );
}