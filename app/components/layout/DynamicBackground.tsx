"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useThemeDetection } from "../../hooks/useThemeDetection";

export default function DynamicBackground() {
  const { isDark } = useThemeDetection();
  
  // Detectar si estamos en el cliente sin causar hydration mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted || !isDark) return;

    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleDirection: number;
    }

    const particles: Particle[] = [];
    const particleCount = 120;

    // Crear estrellas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Efecto de parpadeo/brillo
        particle.opacity += particle.twinkleSpeed * particle.twinkleDirection;
        
        // Invertir dirección cuando alcanza los límites
        if (particle.opacity >= 1) {
          particle.opacity = 1;
          particle.twinkleDirection = -1;
        } else if (particle.opacity <= 0.1) {
          particle.opacity = 0.1;
          particle.twinkleDirection = 1;
        }

        // Dibujar estrella con efecto de brillo
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(0.3, `rgba(200, 220, 240, ${particle.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(139, 162, 181, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dibujar el centro brillante de la estrella
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, isDark]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Dark Mode: Partículas */}
      {isDark && (
        <canvas
          id="particles-canvas"
          className="fixed inset-0 -z-10"
          style={{ background: '#1C1C1C' }}
        />
      )}
    </>
  );
}
