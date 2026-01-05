"use client";
import { useState, useEffect, useRef } from "react";
import "../styles/qaf.scss";

// 1. Define the data outside the component
const qafs1 = [
  {
    q: "WHAT IS ART PSYCHOTHERAPY?",
    a: "Art psychotherapy is a form of psychotherapy that uses artmaking as a way to...........",
  },
  {
    q: "DO I NEED TO BE GOOD AT ART TO BENEFIT FROM ART THERAPY?",
    a: "Not at all. Art therapy is about expression, not skill or talent. You can use simple marks, colours.......",
  },
  {
    q: "HOW IS ART PSYCHOTHERAPY DIFFERENT FROM TRADITIONAL TALK THERAPY?",
    a: "Art therapy is a form of psychotherapy that uses the creative process of making art to improve m...........",
  },
  {
    q: "WHAT HAPPENS IN AN ART THERAPY SESSION?",
    a: "A session usually includes gentle conversation, creative exploration using art materials, and.......",
  },
];

export default function Qafs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // This state tracks which items have been "seen" so they don't disappear on click
  const [revealedIndices, setRevealedIndices] = useState<
    Record<number, boolean>
  >({});

  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Handle the items
          const indexAttr = entry.target.getAttribute("data-index");
          if (indexAttr !== null) {
            const idx = Number(indexAttr);
            setRevealedIndices((prev) => ({ ...prev, [idx]: true }));
          }

          // Handle the title specifically (it doesn't have a data-index)
          if (entry.target === titleRef.current) {
            entry.target.classList.add("animate-in");
          }
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="qaf-container" aria-label="Frequently Asked Questions">
      <div className="qaf-container-main">
        <h2 ref={titleRef} className="qaf-title scroll-animate">
          FAQ’S
        </h2>

        <ul className="qaf-list">
          {qafs1.map((item, idx) => {
            const isOpen = openIndex === idx;
            const isRevealed = revealedIndices[idx];
            const contentId = `qaf-content-${idx}`;
            const buttonId = `qaf-button-${idx}`;

            return (
              <li
                key={idx}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                data-index={idx} // Crucial for the observer to know which item is visible
                className={`qaf-item ${isOpen ? "open" : ""} ${isRevealed ? "animate-in" : ""} scroll-animate`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="qaf-row">
                  <h3 className="qaf-question">
                    <button
                      id={buttonId}
                      className="qaf-toggle"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggle(idx)}
                    >
                      <span className="qaf-question-text">{item.q}</span>
                      <span className="qaf-plus" aria-hidden="true">
                        {isOpen ? "–" : "+"}
                      </span>
                    </button>
                  </h3>
                </div>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="qaf-answer"
                  style={{ maxHeight: isOpen ? "500px" : "0px" }}
                >
                  {item.a.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
