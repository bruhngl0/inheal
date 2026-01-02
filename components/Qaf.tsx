"use client";

import { useState } from "react";
import "../styles/qaf.scss";

const qafs1 = [
  {
    q: "WHAT IS ART PHYCOTHERAPY?",
    a: "Art psychotherapy is a form of psychotherapy that uses artmaking as a way to...........",
  },
  {
    q: "DO NEED TO BE GOOD AT ART TO BENIFIT FROM ART THERAPY?",
    a: "Not at all. Art therapy is about expression, not skill or talent. You can use simple marks, colours.......",
  },
  {
    q: "HOW IS ART PSYCHOTHERAPY DIFFERENT FROM TRADITIONAL TALK THERAPY?",
    a: "Art therapy is a form of psychotherapy that uses the creative process of making art to improve m...........",
  },
  {
    q: "WHAT HAPPENS IN ART THERAPY SESSION?",
    a: "A session usually includes gentle conversation, creative exploration using art materials, and.......",
  },
];

export default function Qafs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="qaf-container" aria-label="Frequently Asked Questions">
      <div className="qaf-container-main">
        <h2 className="qaf-title">FAQ’S</h2>

        <ul className="qaf-list">
          {qafs1.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `qaf-content-${idx}`;
            const buttonId = `qaf-button-${idx}`;

            return (
              <li key={idx} className={`qaf-item ${isOpen ? "open" : ""}`}>
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
