import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import Icon from "./Icon";
import {
  useScrollReveal,
  useScrollRevealGroup,
} from "../hooks/useScrollReveal";

const Needs = ({ currentLanguage, translations, scrollToSection }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Services - All cards use the same unified multi-color design
  const needsCards = [
    {
      id: "welcome",
      icon: "fa-home",
      text: t.needs.cards.welcome,
    },
    {
      id: "french",
      icon: "fa-book-open",
      text: t.needs.cards.french,
    },
    {
      id: "employment",
      icon: "fa-briefcase",
      text: t.needs.cards.employment,
    },
    {
      id: "family",
      icon: "fa-users",
      text: t.needs.cards.family,
    },
    {
      id: "women",
      icon: "fa-female",
      text: t.needs.cards.women,
    },
    {
      id: "volunteering",
      icon: "fa-hands-helping",
      text: t.needs.cards.volunteering,
    },
  ];

  const headerRef = useScrollReveal();
  const gridRef = useScrollRevealGroup();
  const ctaRef = useScrollReveal();

  const handleCardClick = (card) => {
    setSelectedService(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <>
      <section id="besoins" className="needs-section">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 57 57"
          fill="none"
          className="needs-deco-svg"
          aria-hidden="true"
        >
          <path
            d="M 42.691406 11.277344 C 42.3125 10.871094 41.796875 10.644531 41.238281 10.644531 C 40.734375 10.644531 40.253906 10.832031 39.882812 11.175781 C 39.082031 11.921875 39.039062 13.179688 39.785156 13.984375 C 42.703125 17.121094 43.625 21.03125 42.523438 25.605469 C 40.859375 32.515625 34.699219 39.648438 27.746094 42.96875 C 27.742188 42.972656 27.738281 42.976562 27.734375 42.976562 C 24.796875 44.984375 21.667969 46.0625 18.890625 46.0625 C 16.789062 46.0625 14.890625 45.445312 13.429688 44.148438 C 10.105469 41.199219 10.007812 35.582031 12.71875 30.140625 C 11.570312 32.308594 10.777344 34.589844 10.425781 36.757812 C 9.726562 41.554688 11.558594 45.589844 15.472656 47.390625 C 17.226562 48.214844 19.359375 48.554688 21.488281 48.554688 C 23.40625 48.554688 25.371094 48.199219 27.167969 47.519531 C 36.171875 44.238281 44.25 35.414062 46.382812 26.535156 C 47.796875 20.667969 46.519531 15.390625 42.691406 11.277344"
            fill="#FFFFFF"
          />
          <path
            d="M 15.890625 24.199219 C 16.328125 21.230469 18.417969 17.886719 21.085938 15.875 C 21.945312 15.210938 22.90625 14.628906 23.984375 13.992188 C 24.441406 13.722656 24.765625 13.292969 24.898438 12.777344 C 25.03125 12.265625 24.957031 11.730469 24.6875 11.273438 C 24.332031 10.671875 23.675781 10.296875 22.972656 10.296875 C 22.621094 10.296875 22.273438 10.390625 21.96875 10.570312 C 20.769531 11.277344 19.695312 11.929688 18.675781 12.71875 C 14.203125 16.09375 11.355469 21.890625 11.902344 26.507812 C 12.03125 27.59375 12.335938 28.601562 12.816406 29.507812 L 12.929688 29.722656 C 13.664062 28.328125 14.582031 26.953125 15.675781 25.640625 Z"
            fill="#FFBF3F"
          />
          <circle cx="32.14" cy="11.93" r="3.27" fill="#FFFFFF" />
        </svg>
        <div className="container">
          <div className="section-header scroll-reveal" ref={headerRef}>
            <h2 className="section-title">{t.needs.title}</h2>
            <p className="section-subtitle">{t.needs.subtitle}</p>
            <p className="section-instruction">{t.needs.instruction}</p>
          </div>

          <div className="needs-grid" ref={gridRef}>
            {needsCards.map((card) => (
              <div
                key={card.id}
                className="need-card need-card-multicolor scroll-reveal-child"
                onClick={() => handleCardClick(card)}
                role="button"
                tabIndex={0}
                aria-label={`${t.aria?.learnMoreAbout || "Learn more about"} ${card.text}`}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(card);
                  }
                }}
              >
                <div className="need-icon-container">
                  <div className="need-icon">
                    <Icon name={card.icon.replace("fa-", "")} size={32} />
                  </div>
                  <div className="need-accent-bar"></div>
                </div>
                <h3 className="need-title">{card.text}</h3>
                <p className="need-description">
                  {t.services.cards[card.id]?.description || ""}
                </p>
                <div className="need-card-arrow">
                  <Icon name="arrow-right" size={20} />
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta scroll-reveal-scale" ref={ctaRef}>
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection("rdv")}
            >
              {t.hero.letsTalk}
            </button>
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
        translations={translations}
        currentLanguage={currentLanguage}
      />
    </>
  );
};

export default Needs;
