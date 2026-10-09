"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function HeaderArrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateHeader = () => {
      setIsScrolled(window.scrollY > 28);
      animationFrame = 0;
    };

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        mobileMenuRef.current?.querySelector<HTMLElement>("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header" data-scrolled={isScrolled ? "true" : "false"}>
      <a
        className="wordmark"
        href="#home"
        aria-label="Rasheed Iskilu, back to top"
        onClick={closeMobileMenu}
      >
        RI<span>.</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="mailto:rasheediskilu.dev@gmail.com">
        Let&apos;s talk <HeaderArrow />
      </a>

      <details
        className="mobile-nav"
        ref={mobileMenuRef}
        onToggle={() => setIsMenuOpen(mobileMenuRef.current?.open ?? false)}
      >
        <summary aria-controls="mobile-menu-panel" aria-expanded={isMenuOpen}>
          <span>Menu</span>
          <span className="mobile-nav-chevron" aria-hidden="true" />
        </summary>
        <nav id="mobile-menu-panel" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMobileMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </details>
    </header>
  );
}
