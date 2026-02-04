import React, { useState, useEffect, useRef } from "react";
import Icon from "./Icon";

const Testimonials = ({ currentLanguage, translations }) => {
  const t = translations[currentLanguage] || translations.fr;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Asma B.",
      country: "Maroc",
      year: "2020",
      text: "Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois! L'accompagnement personnalisé et les ateliers m'ont donné la confiance nécessaire pour réussir mes entrevues.",
      service: "Aide à l'emploi",
      image: "/images/arabwoman.webp",
    },
    {
      id: 2,
      name: "Jean-Pierre H.",
      country: "Haïti",
      year: "2020",
      text: "De réfugié à entrepreneur, le CARI m'a accompagné à chaque étape. Aujourd'hui, j'ai ma propre entreprise et j'emploie 5 personnes.",
      service: "Accompagnement global",
      image: "/images/blackman.webp",
    },
    {
      id: 3,
      name: "Jasmine M.",
      country: "Haïti",
      year: "2021",
      text: "Le français semblait impossible, maintenant je le parle couramment! Les cours sont excellents et les enseignants très patients.",
      service: "Francisation",
      image: "/images/blackwomen.webp",
    },
    {
      id: 4,
      name: "Karla A.",
      country: "RDC",
      year: "2019",
      text: "Mes enfants sont épanouis, nous avons trouvé notre place ici. Les services familiaux du CARI ont fait toute la différence.",
      service: "Services familiaux",
      image: "/images/asianwoman.webp",
    },
    {
      id: 5,
      name: "Wei L.",
      country: "Chine",
      year: "2022",
      text: "L'aide pour comprendre le système québécois a tout changé. Je me sens maintenant chez moi à Montréal.",
      service: "Accueil & Intégration",
      image: "/images/asianman.webp",
    },
  ];

  // Auto-rotation
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const pauseRotation = () => {
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }
  };

  const resumeRotation = () => {
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  return (
    <section id="temoignages" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.testimonialsSection.title}</h2>
          <p className="section-subtitle">{t.testimonialsSection.subtitle}</p>
        </div>

        <div
          className="testimonials-carousel"
          onMouseEnter={pauseRotation}
          onMouseLeave={resumeRotation}
        >
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${index === currentTestimonial ? "active" : ""}`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-image">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="testimonial-text">
                    <div className="quote-icon">
                      <Icon name="quote-left" size={32} />
                    </div>
                    <p className="testimonial-quote">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-info">
                        {testimonial.country} • Arrivée {testimonial.year}
                      </p>
                      <span className="service-badge">
                        {testimonial.service}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="testimonial-nav prev"
            onClick={prevTestimonial}
            aria-label="Témoignage précédent"
          >
            <Icon name="chevron-left" size={24} />
          </button>
          <button
            className="testimonial-nav next"
            onClick={nextTestimonial}
            aria-label="Témoignage suivant"
          >
            <Icon name="chevron-right" size={24} />
          </button>

          {/* Dots Indicators */}
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentTestimonial ? "active" : ""}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
