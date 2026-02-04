import React, { useEffect, useRef, useState } from "react";

const Stats = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = statsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <section className="stats-bar">
      <div
        ref={statsRef}
        className={`stats-container ${isVisible ? "visible" : ""}`}
      >
        <div className="stat-box">
          <div className="stat-number">5,000+</div>
          <div className="stat-label">{t.hero.stats.peopleHelped}</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">92%</div>
          <div className="stat-label">{t.hero.stats.satisfaction}</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">85%</div>
          <div className="stat-label">{t.hero.stats.findEmployment}</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
