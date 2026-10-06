"use client";

import { useEffect, useState } from "react";

type HeroTypewriterProps = {
  text: string;
};

export default function HeroTypewriter({ text }: HeroTypewriterProps) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setVisibleText(text);
      return;
    }

    let characterIndex = 0;
    let typingTimer: number;

    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        characterIndex += 1;
        setVisibleText(text.slice(0, characterIndex));

        if (characterIndex >= text.length) {
          window.clearInterval(typingTimer);
        }
      }, 105);
    }, 420);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typingTimer);
    };
  }, [text]);

  return (
    <span className="hero-typewriter" aria-hidden="true">
      <span className="hero-typewriter-reserve">{text}</span>
      <span className="hero-typewriter-output">
        {visibleText}
        <span className="hero-typewriter-cursor" />
      </span>
    </span>
  );
}
