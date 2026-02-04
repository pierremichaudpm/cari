import React, { useState, useEffect } from "react";

const Mission = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("mission");
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(scrolled);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowHistoryModal(false);
    };
    if (showHistoryModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showHistoryModal]);

  const images = [
    "/images/arabwoman.webp",
    "/images/blackman.webp",
    "/images/blackwomen.webp",
    "/images/asianwoman.webp",
    "/images/asianman.webp",
  ];

  return (
    <>
      <section id="mission" className="mission-parallax-section">
        {/* Background with diverse group photo */}
        <div className="mission-backdrop">
          <div className="mission-overlay"></div>
        </div>

        {/* Content */}
        <div className="mission-content-wrapper">
          <div className="container">
            <div className="mission-content">
              {/* Tagline */}
              <h2 className="mission-tagline">
                {t.mission?.tagline || "La diversité nous rapproche"}
              </h2>

              {/* Mission statement */}
              <p className="mission-statement">
                {t.mission?.statement ||
                  "Accueillir, aider et accompagner les personnes immigrantes dans leur intégration personnelle, sociale et professionnelle."}
              </p>

              {/* Vision */}
              <div className="mission-vision">
                <h3>{t.mission?.visionLabel || "Notre vision"}</h3>
                <p>
                  {t.mission?.vision ||
                    "Servir et rassembler autour d'expertises et de pratiques innovantes pour un meilleur vivre ensemble."}
                </p>
              </div>

              {/* Values */}
              <div className="mission-values">
                <h3>{t.mission?.valuesLabel || "Nos valeurs"}</h3>
                <div className="mission-values-grid">
                  {(t.mission?.values || [
                    "Dévouement",
                    "Confiance",
                    "Tolérance",
                    "Altruisme",
                    "Solidarité",
                    "Équité",
                  ]).map((value, index) => (
                    <span key={index} className="mission-value-badge">
                      {value}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="mission-cta-button"
                onClick={() => setShowHistoryModal(true)}
              >
                {t.mission?.historyCTA || "Notre histoire"}
                <span className="mission-cta-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* History Modal */}
      {showHistoryModal && (
        <div
          className="history-modal-overlay"
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            className="history-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="history-modal-close"
              onClick={() => setShowHistoryModal(false)}
              aria-label={t.aria?.close || "Fermer"}
            >
              ✕
            </button>

            <div className="history-modal-body">
              <div className="history-modal-image">
                <img
                  src="/images/cari-building.webp"
                  alt={t.mission?.buildingAlt || "Édifice CARI St-Laurent"}
                  onError={(e) => {
                    e.target.src = "/images/newlogo.webp";
                  }}
                />
              </div>

              <div className="history-modal-text">
                <h2>{t.mission?.historyTitle || "Notre histoire"}</h2>

                <p className="history-intro">
                  {t.mission?.historyIntro ||
                    "Créé en 1989, le Centre d'Accueil et de Référence sociale et économique pour Immigrants de Saint-Laurent (CARI St-Laurent) est un organisme à but non lucratif, non confessionnel et non partisan."}
                </p>


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mission;
