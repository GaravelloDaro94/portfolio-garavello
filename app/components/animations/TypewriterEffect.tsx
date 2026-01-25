"use client";

import { useState, useEffect } from "react";
import { TypewriterEffectProps } from "../../models";

export default function TypewriterEffect({ 
  phrases, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000 
}: Readonly<TypewriterEffectProps>) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === currentPhrase) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(true);
      }, 0);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && currentText === "") {
      const resetTimeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 0);
      return () => clearTimeout(resetTimeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center font-mono">
      {currentText}
      <span className="inline-block w-0.5 h-6 sm:h-8 md:h-10 bg-current ml-1 animate-pulse" />
    </span>
  );
}
