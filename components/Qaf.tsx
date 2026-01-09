"use client";
import { useState, useEffect, useRef } from "react";
import "../styles/qaf.scss";


/*
1. What is art psychotherapy?

Art psychotherapy is a form of psychotherapy that uses artmaking as a way to explore thoughts, emotions, and experiences. It combines creative expression with psychological understanding, allowing you to access parts of yourself that may be difficult to express through words alone.


2. Do I need to be good at art to benefit from art therapy?

Not at all. Art therapy is about expression, not skill or talent. You can use simple marks, colours, symbols, or any materials you feel drawn to. The process not the product is what matters.

3. How is art psychotherapy different from traditional talk therapy?

While talk therapy relies mainly on verbal dialogue, art psychotherapy invites you to communicate through images, sensory experience, and symbolic process. This can make it easier to access unconscious thoughts, release emotions, and express things that are hard to put into words.



4. What happens in an art therapy session?

A session usually includes gentle conversation, creative exploration using art materials, and reflective dialogue about what emerged. You are free to create at your own pace, and there is no right or wrong way to make art.



5. Is art therapy suitable for children and adolescents?

Yes. Art therapy is especially helpful for young people because it gives them a natural, non-verbal way to express feelings, process experiences, and build emotional regulation skills. It can be playful, gentle, and developmentally appropriate.



6. Can adults benefit from art psychotherapy?

Absolutely. Adults often find that art opens a different doorway into their inner world helping with clarity, emotional release, stress, identity exploration, and deeper self-understanding.


7. What issues can art therapy help with?

Art psychotherapy can support anxiety, depression, stress, trauma, grief, self-esteem, identity work, relationship challenges, inner child healing, and emotional regulation. It can also be a space for personal growth, creativity, and overall wellbeing.



8. What are environmental art therapy sessions like?

Environmental art therapy takes place outdoors or uses natural materials. Sessions may involve creating with leaves, stones, or earth, engaging with the landscape, or exploring grounding practices. Nature acts as a co-therapist calming, regulating, and supporting deeper reflection.



9. Are online sessions available?

Yes, online sessions can be arranged depending on your needs and the type of therapy you choose. Online art therapy is flexible, accessible, and equally meaningful with simple materials at home.



10. How confidential are sessions?

All sessions follow strict ethical and professional guidelines. Everything you share is confidential, except in situations where safety is at risk. This will be clearly explained during your first session.



11. What materials do I need?

For in-person sessions, all materials are provided. For online or self-guided sessions, you can use whatever you already have pencils, pens, paints, paper, or natural materials. You don’t need anything fancy or professional.



12. How do I know if art therapy is right for me?

If you’re drawn to creativity, curious about your inner world, or find it hard to express yourself with words alone, art therapy can be a beautiful fit. A consultation can help you understand what to expect and whether it aligns with your needs.


13. What is the difference between art therapy and “just doing art”?

Artmaking on your own is creative and soothing — but art psychotherapy provides a structured, safe, and reflective relationship with a trained therapist. The therapeutic process, psychological understanding, and exploration of meaning are what make it healing.



14. Can sessions be customised?

Yes. In addition to therapy sessions, Inheal offers customisable holistic options such as chakra work, inner child healing, nature rituals, and mindfulness-based art practices. These can be tailored to your personal goals and interests.

*/
// 1. Define the data outside the component
const qafs1 = [
  {
    q: "WHAT IS ART PSYCHOTHERAPY?",
    a: "Art psychotherapy is a form of psychotherapy that uses artmaking as a way to explore thoughts, emotions, and experiences. It combines creative expression with psychological understanding, allowing you to access parts of yourself that may be difficult to express through words alone.",
  },
  {
    q: "DO I NEED TO BE GOOD AT ART TO BENEFIT FROM ART THERAPY?",
    a: "Not at all. Art therapy is about expression, not skill or talent. You can use simple marks, colours, symbols, or any materials you feel drawn to. The process not the product is what matters",
  },
  {
    q: "HOW IS ART PSYCHOTHERAPY DIFFERENT FROM TRADITIONAL TALK THERAPY?",
    a: "While talk therapy relies mainly on verbal dialogue, art psychotherapy invites you to communicate through images, sensory experience, and symbolic process. This can make it easier to access unconscious thoughts, release emotions, and express things that are hard to put into words.",
  },
  {
    q: "WHAT HAPPENS IN AN ART THERAPY SESSION?",
    a: "A session usually includes gentle conversation, creative exploration using art materials, and reflective dialogue about what emerged. You are free to create at your own pace, and there is no right or wrong way to make art.",
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
