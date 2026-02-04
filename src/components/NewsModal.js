import React, { useRef, useEffect } from "react";
import Icon from "./Icon";

const NewsModal = ({
  isOpen,
  onClose,
  news,
  currentLanguage,
  translations,
}) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const playerRef = useRef(null);

  const t = translations?.[currentLanguage] || translations?.fr || {};

  // Initialize Plyr when modal opens with media
  useEffect(() => {
    if (!isOpen || !news) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      return;
    }

    // Dynamic import of Plyr
    const initPlyr = async () => {
      const Plyr = (await import("plyr")).default;
      await import("plyr/dist/plyr.css");

      if (news.type === "video" && videoRef.current && news.videoUrl) {
        playerRef.current = new Plyr(videoRef.current, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
        });
      } else if (news.type === "audio" && audioRef.current && news.audioUrl) {
        playerRef.current = new Plyr(audioRef.current, {
          controls: ["play", "progress", "current-time", "mute", "volume"],
        });
      }
    };

    initPlyr();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isOpen, news]);

  // Scroll to top when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !news) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format content (simple markdown-like rendering)
  const renderContent = (content) => {
    const lines = content.split("\n");
    const elements = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // H1
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={key++} className="modal-content-h1">
            {line.substring(2)}
          </h1>,
        );
      }
      // H2
      else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="modal-content-h2">
            {line.substring(3)}
          </h2>,
        );
      }
      // H3
      else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="modal-content-h3">
            {line.substring(4)}
          </h3>,
        );
      }
      // List item
      else if (line.startsWith("- ")) {
        elements.push(
          <li key={key++} className="modal-content-li">
            {line.substring(2)}
          </li>,
        );
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<br key={key++} />);
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(
          <p key={key++} className="modal-content-p">
            {line}
          </p>,
        );
      }
    }

    return elements;
  };

  return (
    <div
      className="modal-overlay news-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="modal-content news-modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={t.aria.close}
        >
          <Icon name="x" size={24} />
        </button>

        {/* Video Player */}
        {news.type === "video" && news.videoUrl && (
          <div className="news-modal-media">
            <video ref={videoRef} controls playsInline>
              <source src={news.videoUrl} type="video/mp4" />
              {t.media?.videoNotSupported ||
                "Your browser does not support video playback."}
            </video>
          </div>
        )}

        {/* Image for audio/text */}
        {(news.type === "audio" || news.type === "text") && (
          <div className="news-modal-image-wrapper">
            <img
              src={news.image}
              alt={news.title}
              className="news-modal-image"
            />
          </div>
        )}

        {/* Audio Player (below image) */}
        {news.type === "audio" && news.audioUrl && (
          <div className="news-modal-media news-modal-audio">
            <audio ref={audioRef} controls>
              <source src={news.audioUrl} type="audio/mp3" />
              {t.media?.audioNotSupported ||
                "Your browser does not support audio playback."}
            </audio>
          </div>
        )}

        {/* Content Body */}
        <div className="news-modal-body">
          <span
            className="news-category"
            style={{
              backgroundColor:
                news.category === "francisation"
                  ? "#6CBAC7"
                  : news.category === "emploi"
                    ? "#FF5C39"
                    : news.category === "femmes"
                      ? "#6CBAC7"
                      : news.category === "integration"
                        ? "#FFBF3F"
                        : "#FF5C39",
            }}
          >
            {t.newsCategories?.[news.category] || news.category}
          </span>

          <h1 className="news-modal-title">{news.title}</h1>

          <div className="news-modal-meta">
            <span>
              <strong>{news.author}</strong>
            </span>
            <span>
              {new Date(news.date).toLocaleDateString(
                {
                  fr: "fr-CA",
                  en: "en-CA",
                  es: "es",
                  ar: "ar",
                  ru: "ru",
                  zh: "zh-CN",
                  pt: "pt-BR",
                  ht: "fr-HT",
                  vi: "vi",
                  tl: "tl",
                  ur: "ur",
                  uk: "uk",
                }[currentLanguage] || "fr-CA",
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </span>
          </div>

          {/* Social Share Buttons */}
          <div className="news-modal-share">
            <div className="news-modal-share-label">
              <Icon name="share-2" size={16} />
              <span>{t.newsModal.share}:</span>
            </div>
            <div className="news-modal-share-buttons">
              <button
                className="news-share-btn facebook"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                    "width=600,height=400",
                  );
                }}
                title={t.newsModal?.shareOn?.facebook || "Share on Facebook"}
              >
                <Icon name="facebook" size={18} />
              </button>
              <button
                className="news-share-btn twitter"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`,
                    "_blank",
                    "width=600,height=400",
                  );
                }}
                title={t.newsModal?.shareOn?.twitter || "Share on Twitter"}
              >
                <Icon name="twitter" size={18} />
              </button>
              <button
                className="news-share-btn linkedin"
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                    "_blank",
                    "width=600,height=400",
                  );
                }}
                title={t.newsModal?.shareOn?.linkedin || "Share on LinkedIn"}
              >
                <Icon name="linkedin" size={18} />
              </button>
              <button
                className="news-share-btn whatsapp"
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(news.title)}%20${encodeURIComponent(window.location.href)}`,
                    "_blank",
                    "width=600,height=400",
                  );
                }}
                title={t.newsModal?.shareOn?.whatsapp || "Share on WhatsApp"}
              >
                <Icon name="message-circle" size={18} />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="news-modal-text">{renderContent(news.content)}</div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
