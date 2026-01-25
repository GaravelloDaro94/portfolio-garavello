"use client";

import { useState, useEffect, useRef } from "react";
import { TypewriterTitleProps } from "../../models";

export default function TypewriterTitle({ 
  text, 
  className = "",
  typingSpeed = 80
}: Readonly<TypewriterTitleProps>) {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setDisplayText("");
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || displayText.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayText(text.substring(0, displayText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isVisible, text, typingSpeed]);

  return (
    <h2 ref={elementRef} className={className}>
      <span className="inline-flex items-center">
        <span className="font-mono">{displayText}</span>
        {isVisible && (
          <span className="inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-current ml-1 animate-pulse align-middle" />
        )}
      </span>
    </h2>
  );
}
