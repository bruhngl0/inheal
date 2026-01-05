"use client";

import { useEffect, useRef } from "react";
import "../styles/faq.scss";

const testimonialData = [
  {
    id: 1,
    title: "What is Art Therapy?",
    text: "Art therapy is a form of psychotherapy that uses the creative process of making art to improve m...........",
  },
  {
    id: 2,
    title: "What is Art Therapy?",
    text: "Art therapy is a form of psychotherapy that uses the creative process of making art to improve m...........",
  },
  {
    id: 3,
    title: "What is Art Therapy?",
    text: "Art therapy is a form of psychotherapy that uses the creative process of making art to improve m...........",
  },
  {
    id: 4,
    title: "What is Art Therapy?",
    text: "Art therapy is a form of psychotherapy that uses the creative process of making art to improve m...........",
  },
];

const Faqs = () => {
  const headRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    if (headRef.current) observer.observe(headRef.current);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="faq-main">
      <div ref={headRef} className="faq-head scroll-animate">
        <h1>TESTIMONIALS</h1>
      </div>

      {/* Row 1 */}
      <div className="faq-block-1">
        {testimonialData.slice(0, 2).map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="faq-container scroll-animate"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="faq-c-head">
              <p>{item.title}</p>
            </div>
            <div className="faq-c-des">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="faq-block-2">
        {testimonialData.slice(2, 4).map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[idx + 2] = el;
            }}
            className="faq-container scroll-animate"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="faq-c-head">
              <p>{item.title}</p>
            </div>
            <div className="faq-c-des">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
