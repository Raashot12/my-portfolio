"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";

export type ProjectCarouselSlide = {
  id: string;
  label: string;
  note: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  canvas: "pharmacy" | "ehr" | "website" | "sportsbook" | "backoffice";
};

type ProjectMediaCarouselProps = {
  ariaLabel: string;
  slides: ProjectCarouselSlide[];
  variant: "plural" | "betpikr";
};

const imageSizes =
  "(max-width: 430px) calc(100vw - 56px), (max-width: 700px) calc(100vw - 64px), (max-width: 960px) calc(100vw - 128px), (max-width: 1180px) 50vw, 700px";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <>
          <path d="m14 6-6 6 6 6" />
          <path d="M8 12h10" />
        </>
      ) : (
        <>
          <path d="m10 6 6 6-6 6" />
          <path d="M6 12h10" />
        </>
      )}
    </svg>
  );
}

function AutoplayIcon({ paused }: { paused: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {paused ? (
        <path d="M8 5.7v12.6c0 .8.9 1.3 1.6.9l9.2-6.3a1.1 1.1 0 0 0 0-1.8L9.6 4.8A1.1 1.1 0 0 0 8 5.7Z" />
      ) : (
        <path d="M7 5.5c0-.8.7-1.5 1.5-1.5S10 4.7 10 5.5v13c0 .8-.7 1.5-1.5 1.5S7 19.3 7 18.5v-13Zm7 0c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-13Z" />
      )}
    </svg>
  );
}

export default function ProjectMediaCarousel({
  ariaLabel,
  slides,
  variant,
}: ProjectMediaCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 6000,
      playOnInit: false,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      dragFree: false,
      duration: 28,
      loop: true,
      skipSnaps: false,
    },
    [autoplay],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [transientPauseOverride, setTransientPauseOverride] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const stopAfterInteraction = useCallback(() => {
    setUserPaused(true);
    autoplay.stop();
  }, [autoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelection = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const handleAutoplayPlay = () => setIsPlaying(true);
    const handleAutoplayStop = () => setIsPlaying(false);

    updateSelection();
    setIsPlaying(autoplay.isPlaying());
    emblaApi.on("select", updateSelection);
    emblaApi.on("reInit", updateSelection);
    emblaApi.on("pointerDown", stopAfterInteraction);
    emblaApi.on("autoplay:play", handleAutoplayPlay);
    emblaApi.on("autoplay:stop", handleAutoplayStop);

    return () => {
      emblaApi.off("select", updateSelection);
      emblaApi.off("reInit", updateSelection);
      emblaApi.off("pointerDown", stopAfterInteraction);
      emblaApi.off("autoplay:play", handleAutoplayPlay);
      emblaApi.off("autoplay:stop", handleAutoplayStop);
    };
  }, [autoplay, emblaApi, stopAfterInteraction]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setPageVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasEnteredView(true);
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.25);
      },
      { threshold: [0, 0.25, 0.5] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const shouldPlay =
      isInView &&
      pageVisible &&
      !prefersReducedMotion &&
      !userPaused &&
      (transientPauseOverride || (!isHovered && !isFocusWithin));

    if (shouldPlay) autoplay.play();
    else autoplay.stop();
  }, [
    autoplay,
    emblaApi,
    isFocusWithin,
    isHovered,
    isInView,
    pageVisible,
    prefersReducedMotion,
    transientPauseOverride,
    userPaused,
  ]);

  const scrollPrevious = () => {
    stopAfterInteraction();
    emblaApi?.scrollPrev(prefersReducedMotion);
  };

  const scrollNext = () => {
    stopAfterInteraction();
    emblaApi?.scrollNext(prefersReducedMotion);
  };

  const scrollTo = (index: number) => {
    stopAfterInteraction();
    emblaApi?.scrollTo(index, prefersReducedMotion);
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      setUserPaused(true);
      setTransientPauseOverride(false);
      autoplay.stop();
      return;
    }

    setUserPaused(false);
    setTransientPauseOverride(true);
    autoplay.play();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsFocusWithin(false);
      if (!isHovered) setTransientPauseOverride(false);
    }
  };

  const activeSlide = slides[selectedIndex] ?? slides[0];
  const currentSlideNumber = String(selectedIndex + 1).padStart(2, "0");
  const totalSlideNumber = String(slides.length).padStart(2, "0");

  return (
    <div
      ref={rootRef}
      className={`project-visual project-visual-image project-carousel project-carousel-${variant}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => {
        setIsHovered(true);
        setTransientPauseOverride(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isFocusWithin) setTransientPauseOverride(false);
      }}
      onFocusCapture={() => {
        setIsFocusWithin(true);
        setTransientPauseOverride(false);
      }}
      onBlurCapture={handleBlur}
    >
      <div className="window-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <b>{activeSlide.label}</b>
      </div>

      <div className="project-image-wrap">
        <div className="project-image-frame">
          <div className="project-carousel-viewport" ref={emblaRef}>
            <div className="project-carousel-track">
              {slides.map((slide, index) => (
                <div
                  className={`project-carousel-slide${
                    index === selectedIndex ? " is-selected" : ""
                  }`}
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length} — ${slide.label}`}
                  aria-hidden={index !== selectedIndex}
                >
                  <div
                    className={`project-carousel-canvas project-carousel-canvas-${slide.canvas}`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      sizes={imageSizes}
                      quality={82}
                      loading={hasEnteredView ? "eager" : "lazy"}
                      className="project-carousel-image"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`project-carousel-controls${
            isPlaying ? " is-playing" : ""
          }`}
          role="group"
          aria-label={`${ariaLabel} controls`}
        >
          <button
            type="button"
            className="project-carousel-arrow"
            onClick={scrollPrevious}
            aria-label={`Show previous ${ariaLabel} slide`}
          >
            <ArrowIcon direction="left" />
          </button>

          <div
            className="project-carousel-dots"
            role="group"
            aria-label="Choose a slide"
          >
            {slides.map((slide, index) => (
              <button
                type="button"
                className={index === selectedIndex ? "is-active" : undefined}
                onClick={() => scrollTo(index)}
                aria-label={`Show ${slide.label}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                key={slide.id}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>

          <span className="project-carousel-count" aria-hidden="true">
            {currentSlideNumber} / {totalSlideNumber}
          </span>

          <button
            type="button"
            className="project-carousel-arrow"
            onClick={scrollNext}
            aria-label={`Show next ${ariaLabel} slide`}
          >
            <ArrowIcon direction="right" />
          </button>

          {!prefersReducedMotion && (
            <button
              type="button"
              className="project-carousel-autoplay"
              onClick={toggleAutoplay}
              aria-label={
                isPlaying
                  ? `Pause automatic ${ariaLabel} slideshow`
                  : `Start automatic ${ariaLabel} slideshow`
              }
            >
              <AutoplayIcon paused={!isPlaying} />
            </button>
          )}
        </div>
      </div>

      <span className="visual-note note-top" aria-hidden="true">
        {activeSlide.note}
      </span>
      <span className="visual-note note-bottom" aria-hidden="true">
        Drag to explore
      </span>
      <p
        className="sr-only"
        aria-live={isPlaying ? "off" : "polite"}
        aria-atomic="true"
      >
        Showing {activeSlide.label}, slide {selectedIndex + 1} of {slides.length}.
      </p>
    </div>
  );
}
