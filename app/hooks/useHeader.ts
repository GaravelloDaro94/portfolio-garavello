import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SectionId, ALL_SECTIONS } from "../models";
import { preventDefault } from "../utils/handler";

export function useHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Always release the lock first
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);

      if (isHome && window.scrollY < 80) {
        setActiveSection("home");
        // Re-apply lock only on the home hero
        window.addEventListener("wheel", preventDefault, { passive: false }); // Rueda ratón
        window.addEventListener("touchmove", preventDefault, { passive: false }); // Móvil
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Always clean up the scroll lock on unmount
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [isHome]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections: SectionId[] = ALL_SECTIONS;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-40% 0px -59% 0px",
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return {
    scrolled,
    activeSection,
    scrollToSection,
  };
}
