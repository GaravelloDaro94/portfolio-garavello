"use client";

import { useEffect, useRef, useState } from "react";
import { HorizontalScrollProps } from "../../models";

export default function HorizontalScroll({ children }: Readonly<HorizontalScrollProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const isHoveringRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detectar si es desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // No activar scroll horizontal en móvil
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHoveringRef.current) return;

      const isAtStart = content.scrollLeft <= 1;
      const isAtEnd = content.scrollLeft + content.clientWidth >= content.scrollWidth - 1;

      // Si estamos al inicio y scrolleando hacia arriba, NO interceptar
      if (isAtStart && e.deltaY < 0) {
        return;
      }

      // Si estamos al final y scrolleando hacia abajo, NO interceptar
      if (isAtEnd && e.deltaY > 0) {
        return;
      }

      // Convertir scroll vertical a horizontal
      e.preventDefault();
      
      const scrollAmount = e.deltaY * 5;
      content.scrollLeft += scrollAmount;

      // Limpiar timeout anterior
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Snap a la sección más cercana después de dejar de scrollear
      scrollTimeout.current = setTimeout(() => {
        const sectionWidth = content.clientWidth;
        const currentScroll = content.scrollLeft;
        const targetSection = Math.round(currentScroll / sectionWidth);
        
        content.scrollTo({
          left: targetSection * sectionWidth,
          behavior: 'smooth'
        });
      }, 150);
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isDesktop]);

  // En móvil, renderizar como scroll vertical normal
  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <div 
      ref={containerRef} 
      className="h-screen w-full overflow-hidden"
    >
      <div
        ref={contentRef}
        className="flex h-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
