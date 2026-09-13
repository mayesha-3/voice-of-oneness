// GoldConfettiBackground.tsx
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  tilt: number;
  tiltAngle: number;
  tiltAngleSpeed: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export const GoldConfettiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const firedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 75; // Balanced for high performance and visual density

    // Luxurious metallic gold palette
    const goldPalette = [
      "#D4AF37", // Metallic Gold
      "#FFD700", // Bright Pure Gold
      "#F59E0B", // Amber Gold
      "#FDE68A", // Shimmering Pale Gold
      "#B45309", // Deep Bronze/Brass
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height * 0.8, // Staggered spawn points above viewport
          size: Math.random() * 8 + 6,
          color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
          tilt: Math.random() * 10 - 10,
          tiltAngle: Math.random() * Math.PI * 2,
          tiltAngleSpeed: Math.random() * 0.07 + 0.03,
          velocityX: Math.random() * 2 - 1,
          velocityY: Math.random() * 2.2 + 1.8,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 3 - 1.5,
          opacity: 1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Kinematics and oscillation
        p.tiltAngle += p.tiltAngleSpeed;
        p.y += p.velocityY;
        p.x += Math.sin(p.tiltAngle) * 1.5 + p.velocityX;
        p.rotation += p.rotationSpeed;

        // Dynamic 3D card tilt calculation
        p.tilt = Math.sin(p.tiltAngle) * 12;

        // Subtle wind drift
        p.x += 0.3;

        // Fade out towards the bottom third
        if (p.y > canvas.height * 0.75) {
          p.opacity = Math.max(0, p.opacity - 0.015);
        }

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          activeParticles++;

          ctx.save();
          ctx.beginPath();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Draw ribbon rectangle with 3D width transformation
          const ribbonWidth = p.tilt;
          const ribbonHeight = p.size * 1.4;
          ctx.fillRect(
            -ribbonWidth / 2,
            -ribbonHeight / 2,
            ribbonWidth,
            ribbonHeight,
          );

          // Specular highlight line on high-shine pieces
          if (p.color === "#FFD700" || p.color === "#FDE68A") {
            ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
            ctx.fillRect(
              -ribbonWidth / 2,
              -ribbonHeight / 2,
              ribbonWidth * 0.3,
              ribbonHeight,
            );
          }

          ctx.restore();
        }
      }

      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const triggerBurst = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      initParticles();
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    // Primary: Trigger on mount
    triggerBurst();

    // Secondary fallback: First user scroll or touch interaction
    const handleFirstScroll = () => {
      if (!firedRef.current) {
        triggerBurst();
      }
      window.removeEventListener("scroll", handleFirstScroll);
      window.removeEventListener("touchstart", handleFirstScroll);
    };

    window.addEventListener("scroll", handleFirstScroll, { passive: true });
    window.addEventListener("touchstart", handleFirstScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleFirstScroll);
      window.removeEventListener("touchstart", handleFirstScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 h-full w-full"
    />
  );
};

export default GoldConfettiBackground;
