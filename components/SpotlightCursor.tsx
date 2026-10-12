"use client";

import { useEffect, useRef, useState } from "react";

type CursorTarget = HTMLElement & {
  dataset: DOMStringMap;
};

function getTargetLabel(target: CursorTarget | null) {
  if (!target) return "";

  const explicitLabel = target.dataset.cursorLabel;
  if (explicitLabel) return explicitLabel;

  if (target.tagName === "BUTTON") return "OPEN";
  if (target instanceof HTMLAnchorElement) {
    if (target.hasAttribute("download")) return "DOWNLOAD";
    if (target.href.startsWith("mailto:")) return "EMAIL";
    if (target.target === "_blank") return "VISIT";
    return "VIEW";
  }

  return "EXPLORE";
}

export default function SpotlightCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -120, y: -120 });
  const position = useRef({ x: -120, y: -120 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );

    if (!mediaQuery.matches) return;

    document.body.classList.add("spotlight-cursor-enabled");

    let animationFrame = 0;

    const render = () => {
      position.current.x += (pointer.current.x - position.current.x) * 0.18;
      position.current.y += (pointer.current.y - position.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.setProperty("--cursor-x", `${position.current.x}px`);
        cursorRef.current.style.setProperty("--cursor-y", `${position.current.y}px`);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      setIsVisible(true);

      const element = event.target instanceof Element ? event.target : null;
      const interactive = element?.closest<CursorTarget>(
        "a, button, [data-cursor-label]",
      );
      const nextLabel = getTargetLabel(interactive ?? null);

      setIsInteractive(Boolean(interactive));
      setLabel((currentLabel) =>
        currentLabel === nextLabel ? currentLabel : nextLabel,
      );
    };

    const hideCursor = () => setIsVisible(false);
    const handlePointerLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) hideCursor();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave, { passive: true });
    window.addEventListener("blur", hideCursor);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("blur", hideCursor);
      document.body.classList.remove("spotlight-cursor-enabled");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`spotlight-cursor${isVisible ? " is-visible" : ""}${
        isInteractive ? " is-interactive" : ""
      }`}
      aria-hidden="true"
    >
      <span className="spotlight-cursor-core" />
      <span className="spotlight-cursor-label">{label}</span>
    </div>
  );
}
