import React from "react";
import Icon from "./Icon";

const Appointment = ({
  currentLanguage,
  translations,
  selectedService,
  handleServiceSelect,
  handleSubmit,
  services,
}) => {
  const t = translations[currentLanguage] || translations.fr;

  const consultationTypes = {
    welcome: t.appointment.consultationTypes.welcome,
    french: t.appointment.consultationTypes.french,
    employment: t.appointment.consultationTypes.employment,
    family: t.appointment.consultationTypes.family,
    women: t.appointment.consultationTypes.women,
    volunteering: t.appointment.consultationTypes.volunteering,
  };

  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
  ];

  const serviceDetails = {
    welcome: { icon: <Icon name="home" size={24} />, color: "blue" },
    french: { icon: <Icon name="book-open" size={24} />, color: "orange" },
    employment: { icon: <Icon name="briefcase" size={24} />, color: "blue" },
    family: { icon: <Icon name="users" size={24} />, color: "orange" },
    women: { icon: <Icon name="female" size={24} />, color: "blue" },
    volunteering: {
      icon: <Icon name="hands-helping" size={24} />,
      color: "orange",
    },
  };

  return (
    <section id="rdv" className="appointment-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.appointment.title}</h2>
          <p className="section-subtitle">{t.appointment.subtitle}</p>
        </div>

        <div className="appointment-container">
          <div className="appointment-steps">
            <div className="step-indicator">
              <span className="step-number active">1</span>
              <span className="step-label">Votre besoin</span>
            </div>
            <div className="step-line"></div>
            <div className="step-indicator">
              <span className="step-number">2</span>
              <span className="step-label">Vos coordonnées</span>
            </div>
            <div className="step-line"></div>
            <div className="step-indicator">
              <span className="step-number">3</span>
              <span className="step-label">Confirmation</span>
            </div>
          </div>

          <div className="appointment-card">
            <div className="service-grid">
              {services.map((service) => {
                const details = serviceDetails[service.id];
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`service-btn ${selectedService === service.id ? "selected" : ""}`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="service-icon-wrapper">{details.icon}</div>
                    <span className="service-name">
                      {consultationTypes[service.id]}
                    </span>
                    {selectedService === service.id && (
                      <span className="service-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <form
              id="appointmentForm"
              className="appointment-form"
              onSubmit={handleSubmit}
            >
              <div className="form-cols">
                <div className="form-group">
                  <label htmlFor="appointmentName">Nom complet *</label>
                  <input
                    type="text"
                    id="appointmentName"
                    name="name"
                    required
                    placeholder="Prénom et nom"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentPhone">Téléphone *</label>
                  <input
                    type="tel"
                    id="appointmentPhone"
                    name="phone"
                    required
                    placeholder="(514) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentEmail">Courriel *</label>
                  <input
                    type="email"
                    id="appointmentEmail"
                    name="email"
                    required
                    placeholder="votre@courriel.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentDate">Date souhaitée *</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentTime">Heure *</label>
                  <select id="appointmentTime" name="time" required>
                    <option value="">Choisir une heure</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="appointmentMessage">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="appointmentMessage"
                    name="message"
                    rows="3"
                    placeholder="Décrivez brièvement votre situation..."
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Confirmer le rendez-vous
                </button>
                <p className="form-note">
                  <Icon name="info-circle" size={16} />
                  Vous recevrez une confirmation par courriel dans les 24h
                </p>
              </div>
            </form>
          </div>

          <div className="contact-banner">
            <div className="contact-item">
              <div className="contact-icon-circle">
                <Icon name="phone" size={24} />
              </div>
              <div className="contact-info-text">
                <strong>Téléphone</strong>
                <p>(514) 748-2007</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon-circle">
                <Icon name="clock" size={24} />
              </div>
              <div className="contact-info-text">
                <strong>Horaire</strong>
                <p>Lun-Ven: 9h - 17h</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon-circle">
                <Icon name="map-marker-alt" size={24} />
              </div>
              <div className="contact-info-text">
                <strong>Adresse</strong>
                <p>774 boul. Décarie, Bureau 300</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
