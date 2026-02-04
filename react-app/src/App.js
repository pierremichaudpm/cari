import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import "./styles/main.css";
import { useAppContext } from "./contexts/AppContext";
import { heroSlides } from "./constants/heroSlides";
import { services } from "./constants/services";
import { LanguageSelectorWrapper } from "./components/cari/LanguageSelector";
import {
  ParallaxStatsSection,
  ParallaxTestimonialBand,
  ParallaxCTASection,
  COLORS,
} from "./components/cari/ParallaxBreathing";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Needs from "./components/Needs";

// Lazy load below-the-fold components
const Activities = lazy(() => import("./components/Activities"));
const News = lazy(() => import("./components/News"));
const Appointment = lazy(() => import("./components/Appointment"));
const Chat = lazy(() => import("./components/Chat"));

function App() {
  const {
    currentLanguage,
    switchLanguage: switchLanguageContext,
    translations,
    isLoading,
  } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentHero, setCurrentHero] = useState(0);
  const [selectedService, setSelectedService] = useState("welcome");
  const heroIntervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Language switching
  const switchLanguage = (lang) => {
    switchLanguageContext(lang);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Hero carousel functions
  const showHero = (index) => {
    if (index >= 0 && index < heroSlides.length) {
      setCurrentHero(index);
    }
  };

  const nextHeroSlide = React.useCallback(() => {
    setCurrentHero((prev) => (prev + 1) % 5);
    // Reset interval to prevent immediate auto-advance after manual interaction
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentHero((prev) => (prev + 1) % 5);
        }
      }, 5000);
    }
  }, []);

  const prevHeroSlide = React.useCallback(() => {
    setCurrentHero((prev) => (prev - 1 + 5) % 5);
    // Reset interval to prevent immediate auto-advance after manual interaction
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentHero((prev) => (prev + 1) % 5);
        }
      }, 5000);
    }
  }, []);

  // Hero carousel auto-rotation - robust implementation
  useEffect(() => {
    // Don't start if still loading
    if (isLoading) {
      return;
    }

    // Clear any existing interval first
    if (heroIntervalRef.current) {
      clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = null;
    }

    // Use a single interval that checks pause state internally
    // This prevents race conditions from multiple intervals
    heroIntervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentHero((prev) => (prev + 1) % 5);
      }
    }, 5000);

    // Handle tab visibility - reset timer when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isPausedRef.current) {
        // Tab is visible again, restart with fresh interval
        if (heroIntervalRef.current) {
          clearInterval(heroIntervalRef.current);
        }
        heroIntervalRef.current = setInterval(() => {
          if (!isPausedRef.current) {
            setCurrentHero((prev) => (prev + 1) % 5);
          }
        }, 5000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (heroIntervalRef.current) {
        clearInterval(heroIntervalRef.current);
        heroIntervalRef.current = null;
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isLoading]);

  // Simple pause/resume using ref flag - no interval manipulation
  const pauseHeroRotation = React.useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeHeroRotation = React.useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // Touch gestures for hero carousel
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    if (touchEndXRef.current < touchStartXRef.current - 50) {
      nextHeroSlide();
    }
    if (touchEndXRef.current > touchStartXRef.current + 50) {
      prevHeroSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextHeroSlide();
      }
      if (e.key === "ArrowLeft") {
        prevHeroSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextHeroSlide, prevHeroSlide]);

  // Service selection
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const successMessage =
      translations[currentLanguage]?.success?.appointment ||
      translations.fr.success.appointment;
    alert(successMessage);
  };

  // Smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      closeMobileMenu();
    }
  };

  // Chat toggle
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  // Show loading state while translations load
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Chargement...</div>
      </div>
    );
  }

  return (
    <LanguageSelectorWrapper
      onLanguageChange={(lang) => {
        console.log("Langue sélectionnée:", lang);
        switchLanguage(lang);
      }}
    >
      <div className="App">
        <Header
          currentLanguage={currentLanguage}
          switchLanguage={switchLanguage}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          closeMobileMenu={closeMobileMenu}
          scrollToSection={scrollToSection}
          translations={translations}
        />

        <main>
          <Hero
            heroSlides={heroSlides}
            currentHero={currentHero}
            showHero={showHero}
            nextHeroSlide={nextHeroSlide}
            prevHeroSlide={prevHeroSlide}
            pauseHeroRotation={pauseHeroRotation}
            resumeHeroRotation={resumeHeroRotation}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
            currentLanguage={currentLanguage}
            translations={translations}
          />

          <Needs
            currentLanguage={currentLanguage}
            translations={translations}
            scrollToSection={scrollToSection}
          />

          <ParallaxStatsSection
            imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80"
            title="Ensemble, nous faisons la différence"
            subtitle="Depuis 1989, le CARI accompagne les nouveaux arrivants vers leur réussite"
            stats={[
              { value: "5,000+", label: "Personnes aidées/an" },
              { value: "92%", label: "Taux de satisfaction" },
              { value: "85%", label: "Trouvent un emploi" },
              { value: "12", label: "Langues parlées" },
            ]}
          />

          <Suspense fallback={<div style={{ minHeight: "400px" }}></div>}>
            <Activities
              currentLanguage={currentLanguage}
              translations={translations}
            />

            <ParallaxTestimonialBand
              backgroundColor={COLORS.brume}
              testimonials={[
                {
                  quote:
                    "Grâce au CARI, j'ai trouvé mon emploi de rêve en 6 mois! L'équipe m'a accompagné à chaque étape.",
                  name: "Asma B.",
                  origin: "Maroc • Arrivée 2020",
                  avatar:
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
                },
                {
                  quote:
                    "Les cours de français m'ont permis d'être autonome rapidement. Je recommande à tous les nouveaux arrivants!",
                  name: "Ahmed K.",
                  origin: "Syrie • Arrivé 2021",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
                },
                {
                  quote:
                    "Le programme Femmes du monde m'a donné confiance et un réseau d'amies formidable.",
                  name: "Maria L.",
                  origin: "Colombie • Arrivée 2019",
                  avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
                },
              ]}
            />

            <News
              currentLanguage={currentLanguage}
              translations={translations}
            />

            <div style={{ position: "relative" }}>
              <ParallaxCTASection
                title="Prêt à commencer votre nouvelle vie au Québec?"
                subtitle="Notre équipe multilingue est là pour vous accompagner à chaque étape de votre intégration."
                imageUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80"
                hideButtons={true}
              />
              <div
                style={{ marginTop: "-80px", position: "relative", zIndex: 20 }}
              >
                <Appointment
                  currentLanguage={currentLanguage}
                  translations={translations}
                  selectedService={selectedService}
                  handleServiceSelect={handleServiceSelect}
                  handleSubmit={handleAppointmentSubmit}
                  services={services}
                />
              </div>
            </div>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Chat
            chatOpen={chatOpen}
            toggleChat={toggleChat}
            currentLanguage={currentLanguage}
            translations={translations}
          />
        </Suspense>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/images/logo-footer.webp" alt="CARI St-Laurent" />
            </div>
            <div className="footer-info">
              <p>© 2024 Tous droits réservés.</p>
              <p>Organisme à but non lucratif d'aide aux immigrants</p>
            </div>
          </div>
        </footer>
      </div>
    </LanguageSelectorWrapper>
  );
}

export default App;
