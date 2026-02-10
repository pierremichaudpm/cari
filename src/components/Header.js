import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

const Header = ({
  currentLanguage,
  switchLanguage,
  isMobileMenuOpen,
  toggleMobileMenu,
  closeMobileMenu,
  scrollToSection,
  translations,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langDropdownRef = useRef(null);

  // Header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const langFlags = {
    fr: "FR",
    en: "EN",
    es: "ES",
    ar: "AR",
    ru: "RU",
    zh: "ZH",
    pt: "PT",
    ht: "HT",
    vi: "VI",
    tl: "TL",
    ur: "UR",
    uk: "UK",
  };

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "ar", name: "العربية" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "pt", name: "Português" },
    { code: "ht", name: "Kreyòl" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "tl", name: "Tagalog" },
    { code: "ur", name: "اردو" },
    { code: "uk", name: "Українська" },
  ];

  const t = translations[currentLanguage] || translations.fr;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode);
    setLangDropdownOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="nav-container">
        <a
          href="#accueil"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("accueil");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src="/images/newlogo.webp" alt="CARI St-Laurent" />
        </a>

        <div className="nav-right-group">
          <nav className="nav-desktop">
            <ul className="nav-menu">
              <li>
                <a
                  href="#besoins"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("besoins");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.needs}
                </a>
              </li>
              <li>
                <a
                  href="#activites"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("activites");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.activities}
                </a>
              </li>
              <li>
                <a
                  href="#ressources"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("ressources");
                  }}
                  className="nav-link nav-link-bold"
                >
                  {t.nav.news}
                </a>
              </li>
            </ul>
          </nav>

          <a
            href="#rdv"
            className="btn-rdv-header"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("rdv");
            }}
          >
            {t.nav.talkToAdvisor}
          </a>

          <div className="language-switcher" ref={langDropdownRef}>
            <div className="language-dropdown">
              <div className="lang-details">
                <button
                  className="lang-btn"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                >
                  <span id="currentLang">{langFlags[currentLanguage]}</span>
                  <Icon
                    name="globe"
                    size={18}
                    style={{ color: "white", marginLeft: "8px" }}
                  />
                </button>
                {langDropdownOpen && (
                  <div className="lang-menu">
                    <div className="lang-grid">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className={`lang-grid-item ${currentLanguage === lang.code ? "active" : ""}`}
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <span className="lang-grid-code">
                            {langFlags[lang.code]}
                          </span>
                          <span className="lang-grid-name">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-controls">
          <a
            href="#rdv"
            className="btn-rdv-mobile"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("rdv");
            }}
          >
            {t.nav.talkToAdvisor}
          </a>
          <div
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            data-testid="mobile-menu-toggle"
          >
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
        id="mobileMenu"
      >
        <ul>
          <li>
            <a
              href="#besoins"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("besoins");
                closeMobileMenu();
              }}
              className="nav-link"
            >
              {t.nav.needs}
            </a>
          </li>
          <li>
            <a
              href="#activites"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("activites");
                closeMobileMenu();
              }}
              className="nav-link"
            >
              {t.nav.activities}
            </a>
          </li>
          <li>
            <a
              href="#ressources"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("ressources");
                closeMobileMenu();
              }}
              className="nav-link"
            >
              {t.nav.news}
            </a>
          </li>
        </ul>

        {/* Language switcher in mobile menu */}
        <div className="mobile-lang-section">
          <div className="mobile-lang-grid">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`mobile-lang-item ${currentLanguage === lang.code ? "active" : ""}`}
                onClick={() => {
                  handleLanguageChange(lang.code);
                  closeMobileMenu();
                }}
              >
                <span className="mobile-lang-code">{langFlags[lang.code]}</span>
                <span className="mobile-lang-name">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
