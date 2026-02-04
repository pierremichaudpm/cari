import React, { useState } from "react";
import { Clock, FileText, Target, ClipboardCheck } from "lucide-react";

/**
 * CARI Saint-Laurent - Test de niveau de français
 * Quiz interactif pour évaluer le niveau de français des nouveaux arrivants
 *
 * GUIDE DE STYLE CARI:
 * - Bleu Foncé: #263B5A (ancrage, confiance, professionnalisme)
 * - Turquoise: #6EC1C1 (fraîcheur, ouverture, accessibilité)
 * - Brume: #CCD8DF (sérénité, espoir, renouveau)
 * - Jaune doré: #F7BF3F (chaleur, énergie, dignité)
 * - Vermillon: #F15C39 (en action, dynamisme, passion)
 * - Typographie: DM Serif (titres), DM Sans (corps)
 */

// Palette CARI officielle (couleurs réelles du site)
const COLORS = {
  bleuFonce: "#263164",
  turquoise: "#6cbac7",
  brume: "#cce8e5",
  jauneCore: "#ffbf3f",
  vermillon: "#ff5c39",
  noir: "#000000",
  blanc: "#FFFFFF",
};

const questions = [
  // Bloc 1: Compréhension de base (A1-A2)
  {
    id: 1,
    category: "comprehension",
    difficulty: "A1",
    question: 'Complétez: "Bonjour, je _____ Marie."',
    options: ["suis", "est", "sont", "êtes"],
    correct: 0,
    points: 1,
  },
  {
    id: 2,
    category: "comprehension",
    difficulty: "A1",
    question: 'Quel mot signifie "house" en français?',
    options: ["Voiture", "Maison", "École", "Bureau"],
    correct: 1,
    points: 1,
  },
  {
    id: 3,
    category: "comprehension",
    difficulty: "A1",
    question: '"Je mange une pomme." Que fait la personne?',
    options: ["Elle dort", "Elle mange", "Elle marche", "Elle parle"],
    correct: 1,
    points: 1,
  },
  {
    id: 4,
    category: "comprehension",
    difficulty: "A2",
    question: 'Complétez: "Hier, nous _____ au cinéma."',
    options: ["allons", "sommes allés", "irons", "allions"],
    correct: 1,
    points: 2,
  },
  {
    id: 5,
    category: "comprehension",
    difficulty: "A2",
    question: '"Il fait beau aujourd\'hui." Cette phrase parle de:',
    options: ["La nourriture", "Le temps/météo", "Le travail", "La famille"],
    correct: 1,
    points: 2,
  },
  // Bloc 2: Grammaire (A2-B1)
  {
    id: 6,
    category: "grammaire",
    difficulty: "A2",
    question: 'Choisissez la forme correcte: "Elle _____ très fatiguée."',
    options: ["est", "a", "fait", "va"],
    correct: 0,
    points: 2,
  },
  {
    id: 7,
    category: "grammaire",
    difficulty: "B1",
    question: "Complétez: \"Si j'avais le temps, j' _____ au parc.\"",
    options: ["vais", "irais", "irai", "allais"],
    correct: 1,
    points: 3,
  },
  {
    id: 8,
    category: "grammaire",
    difficulty: "B1",
    question: '"Le livre que j\'ai _____ est très intéressant."',
    options: ["lu", "lire", "lis", "lus"],
    correct: 0,
    points: 3,
  },
  {
    id: 9,
    category: "grammaire",
    difficulty: "B1",
    question: 'Choisissez: "Il faut que tu _____ tes devoirs."',
    options: ["fais", "fait", "fasses", "faire"],
    correct: 2,
    points: 3,
  },
  // Bloc 3: Compréhension avancée (B1-B2)
  {
    id: 10,
    category: "avance",
    difficulty: "B1",
    question: '"Malgré la pluie, il est sorti." Que signifie "malgré"?',
    options: ["À cause de", "Même si / en dépit de", "Avant", "Pendant"],
    correct: 1,
    points: 3,
  },
  {
    id: 11,
    category: "avance",
    difficulty: "B2",
    question: 'Complétez: "Il travaille _____ réussir son examen."',
    options: ["pour que", "afin de", "bien que", "puisque"],
    correct: 1,
    points: 4,
  },
  {
    id: 12,
    category: "avance",
    difficulty: "B2",
    question: '"Elle aurait dû partir plus tôt." Cette phrase exprime:',
    options: [
      "Une certitude",
      "Un regret/reproche",
      "Une question",
      "Un souhait futur",
    ],
    correct: 1,
    points: 4,
  },
  {
    id: 13,
    category: "avance",
    difficulty: "B2",
    question: 'Quel est le sens de "Il a mis les pieds dans le plat"?',
    options: [
      "Il a cuisiné",
      "Il a dit quelque chose de gênant",
      "Il est tombé",
      "Il a bien mangé",
    ],
    correct: 1,
    points: 4,
  },
  {
    id: 14,
    category: "avance",
    difficulty: "B2",
    question: 'Complétez: "Quoi qu\'il _____, je lui fais confiance."',
    options: ["fait", "fasse", "fera", "ferait"],
    correct: 1,
    points: 4,
  },
  {
    id: 15,
    category: "avance",
    difficulty: "B2",
    question:
      '"Cette décision est susceptible d\'être modifiée." Cela signifie:',
    options: [
      "La décision est définitive",
      "La décision pourrait changer",
      "La décision est annulée",
      "La décision est urgente",
    ],
    correct: 1,
    points: 4,
  },
];

// Calcul du niveau basé sur le score
const calculateLevel = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;

  if (percentage >= 85) {
    return {
      level: "B2",
      title: "Avancé",
      description:
        "Vous avez un excellent niveau de français! Vous pouvez comprendre des textes complexes et vous exprimer de façon spontanée.",
      recommendation: "Cours de perfectionnement et conversation avancée",
      color: COLORS.bleuFonce,
    };
  } else if (percentage >= 65) {
    return {
      level: "B1",
      title: "Intermédiaire",
      description:
        "Vous pouvez comprendre les points essentiels et vous débrouiller dans la plupart des situations.",
      recommendation:
        "Cours de français intermédiaire - Temps partiel ou complet",
      color: COLORS.turquoise,
    };
  } else if (percentage >= 40) {
    return {
      level: "A2",
      title: "Élémentaire",
      description:
        "Vous pouvez comprendre des phrases simples et communiquer lors de tâches quotidiennes.",
      recommendation:
        "Cours de français élémentaire - Temps complet recommandé",
      color: COLORS.jauneCore,
    };
  } else {
    return {
      level: "A1",
      title: "Débutant",
      description:
        "Vous débutez en français. Nos cours vous aideront à progresser rapidement!",
      recommendation: "Cours de français débutant - Temps complet",
      color: COLORS.vermillon,
    };
  }
};

const FrenchLevelTest = ({ onClose, onBookAppointment }) => {
  const [currentStep, setCurrentStep] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
  const progress = (currentQuestion / questions.length) * 100;

  const handleStartQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep("quiz");
      setIsAnimating(false);
    }, 300);
  };

  const handleSelectOption = (optionIndex) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const handleValidate = () => {
    if (selectedOption === null) return;

    const question = questions[currentQuestion];
    const isCorrect = selectedOption === question.correct;

    setShowFeedback(true);

    if (isCorrect) {
      setScore((prev) => prev + question.points);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        selected: selectedOption,
        correct: question.correct,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    setIsAnimating(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setCurrentStep("result");
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleRestart = () => {
    setCurrentStep("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
  };

  const result =
    currentStep === "result" ? calculateLevel(score, maxScore) : null;

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(38, 59, 90, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem",
      backdropFilter: "blur(4px)",
    },
    modal: {
      backgroundColor: COLORS.blanc,
      borderRadius: "24px",
      maxWidth: "600px",
      width: "100%",
      maxHeight: "90vh",
      overflow: "auto",
      position: "relative",
      boxShadow: "0 25px 50px -12px rgba(38, 59, 90, 0.25)",
      animation: "modalIn 0.3s ease-out",
      fontFamily: '"DM Sans", sans-serif',
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: COLORS.blanc,
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s",
      zIndex: 10,
    },
    header: {
      backgroundColor: COLORS.bleuFonce,
      padding: "1rem 2rem",
      color: COLORS.blanc,
      textAlign: "center",
    },
    headerTitle: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: "1.75rem",
      fontWeight: "400",
      marginBottom: "0.5rem",
    },
    content: {
      padding: "2rem",
      opacity: isAnimating ? 0 : 1,
      transform: isAnimating ? "translateX(20px)" : "translateX(0)",
      transition: "all 0.3s ease",
    },
    progressBar: {
      height: "8px",
      backgroundColor: COLORS.brume,
      borderRadius: "4px",
      overflow: "hidden",
      marginBottom: "1.5rem",
    },
    progressFill: {
      height: "100%",
      backgroundColor: COLORS.turquoise,
      borderRadius: "4px",
      transition: "width 0.5s ease",
      width: `${progress}%`,
    },
    questionCategory: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      backgroundColor: COLORS.brume,
      color: COLORS.bleuFonce,
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: "1rem",
    },
    questionText: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: "1.25rem",
      fontWeight: "400",
      color: COLORS.bleuFonce,
      marginBottom: "1.5rem",
      lineHeight: "1.5",
    },
    optionsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    option: (isSelected, isCorrect, isWrong) => ({
      padding: "1rem 1.25rem",
      border: `2px solid ${
        isCorrect
          ? "#22c55e"
          : isWrong
            ? COLORS.vermillon
            : isSelected
              ? COLORS.bleuFonce
              : COLORS.brume
      }`,
      borderRadius: "12px",
      backgroundColor: isCorrect
        ? "#f0fdf4"
        : isWrong
          ? "#fef2f2"
          : isSelected
            ? `${COLORS.turquoise}15`
            : COLORS.blanc,
      cursor: showFeedback ? "default" : "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1rem",
      fontFamily: '"DM Sans", sans-serif',
    }),
    optionCircle: (isSelected) => ({
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      border: `2px solid ${isSelected ? COLORS.bleuFonce : COLORS.brume}`,
      backgroundColor: isSelected ? COLORS.bleuFonce : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 0.2s ease",
    }),
    primaryButton: {
      padding: "1rem 2rem",
      borderRadius: "50px",
      border: "none",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: COLORS.vermillon,
      color: COLORS.blanc,
      fontFamily: '"DM Sans", sans-serif',
    },
    secondaryButton: {
      padding: "1rem 2rem",
      borderRadius: "50px",
      border: `2px solid ${COLORS.brume}`,
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: "transparent",
      color: COLORS.bleuFonce,
      fontFamily: '"DM Sans", sans-serif',
    },
    resultCard: {
      textAlign: "center",
      padding: "1rem",
    },
    levelBadge: (color) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: color,
      color: COLORS.blanc,
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      boxShadow: `0 10px 40px ${color}50`,
      fontFamily: '"DM Sans", sans-serif',
    }),
    resultTitle: {
      fontFamily: '"DM Serif Text", serif',
      fontSize: "1.75rem",
      fontWeight: "400",
      color: COLORS.bleuFonce,
      marginBottom: "0.5rem",
    },
    recommendationBox: {
      backgroundColor: COLORS.brume,
      padding: "1.5rem",
      borderRadius: "16px",
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
          }
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          ✕
        </button>

        {/* Header */}
        <div style={styles.header}>
          <div style={{ marginBottom: "0px", marginTop: "20px" }}>
            <img
              src="/images/logo-white.webp"
              alt="CARI St-Laurent"
              style={{ height: "90px", width: "auto" }}
            />
          </div>
          <h2 style={styles.headerTitle}>Test de niveau de français</h2>
          <p
            style={{
              opacity: 0.9,
              fontSize: "0.95rem",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {currentStep === "intro" &&
              "Découvrez votre niveau en 15 questions"}
            {currentStep === "quiz" &&
              `Question ${currentQuestion + 1} sur ${questions.length}`}
            {currentStep === "result" && "Votre résultat"}
          </p>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* INTRO SCREEN */}
          {currentStep === "intro" && (
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: COLORS.bleuFonce,
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                }}
              >
                Ce test rapide vous aidera à déterminer votre niveau de français
                et à trouver le cours adapté à vos besoins.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                  marginBottom: "2rem",
                  textAlign: "left",
                }}
              >
                {[
                  { icon: <Clock size={24} />, text: "Environ 10 minutes" },
                  { icon: <FileText size={24} />, text: "15 questions" },
                  { icon: <Target size={24} />, text: "Résultat immédiat" },
                  {
                    icon: <ClipboardCheck size={24} />,
                    text: "Recommandation personnalisée",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      backgroundColor: COLORS.brume,
                      borderRadius: "10px",
                    }}
                  >
                    <span style={{ display: "flex", color: COLORS.bleuFonce }}>
                      {item.icon}
                    </span>
                    <span style={{ color: COLORS.bleuFonce }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                style={styles.primaryButton}
                onClick={handleStartQuiz}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Commencer le test
              </button>
            </div>
          )}

          {/* QUIZ SCREEN */}
          {currentStep === "quiz" && (
            <div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>

              <div>
                <span style={styles.questionCategory}>
                  {questions[currentQuestion].category === "comprehension" &&
                    "🔤 Compréhension"}
                  {questions[currentQuestion].category === "grammaire" &&
                    "📖 Grammaire"}
                  {questions[currentQuestion].category === "avance" &&
                    "🎓 Avancé"}
                  {" • "}
                  Niveau {questions[currentQuestion].difficulty}
                </span>

                <p style={styles.questionText}>
                  {questions[currentQuestion].question}
                </p>

                <div style={styles.optionsGrid}>
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect =
                      showFeedback &&
                      index === questions[currentQuestion].correct;
                    const isWrong =
                      showFeedback &&
                      isSelected &&
                      index !== questions[currentQuestion].correct;

                    return (
                      <button
                        key={index}
                        style={styles.option(isSelected, isCorrect, isWrong)}
                        onClick={() => handleSelectOption(index)}
                        onMouseOver={(e) =>
                          !showFeedback &&
                          !isSelected &&
                          (e.currentTarget.style.borderColor = COLORS.turquoise)
                        }
                        onMouseOut={(e) =>
                          !showFeedback &&
                          !isSelected &&
                          (e.currentTarget.style.borderColor = COLORS.brume)
                        }
                      >
                        <div style={styles.optionCircle(isSelected)}>
                          {isSelected && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill={COLORS.blanc}
                            >
                              <circle cx="6" cy="6" r="4" />
                            </svg>
                          )}
                        </div>
                        <span style={{ color: COLORS.bleuFonce }}>
                          {option}
                        </span>
                        {isCorrect && (
                          <span
                            style={{ marginLeft: "auto", color: "#22c55e" }}
                          >
                            ✓
                          </span>
                        )}
                        {isWrong && (
                          <span
                            style={{
                              marginLeft: "auto",
                              color: COLORS.vermillon,
                            }}
                          >
                            ✗
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      borderRadius: "10px",
                      backgroundColor: answers[answers.length - 1]?.isCorrect
                        ? "#f0fdf4"
                        : "#fef2f2",
                      color: answers[answers.length - 1]?.isCorrect
                        ? "#166534"
                        : COLORS.vermillon,
                      fontSize: "0.95rem",
                    }}
                  >
                    {answers[answers.length - 1]?.isCorrect
                      ? "✓ Bonne réponse!"
                      : `✗ La bonne réponse était: "${questions[currentQuestion].options[questions[currentQuestion].correct]}"`}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  {!showFeedback ? (
                    <button
                      style={{
                        ...styles.primaryButton,
                        opacity: selectedOption === null ? 0.5 : 1,
                        cursor:
                          selectedOption === null ? "not-allowed" : "pointer",
                      }}
                      onClick={handleValidate}
                      disabled={selectedOption === null}
                    >
                      Valider
                    </button>
                  ) : (
                    <button style={styles.primaryButton} onClick={handleNext}>
                      {currentQuestion < questions.length - 1
                        ? "Question suivante →"
                        : "Voir mon résultat"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* RESULT SCREEN */}
          {currentStep === "result" && result && (
            <div style={styles.resultCard}>
              <div style={styles.levelBadge(result.color)}>{result.level}</div>

              <h3 style={styles.resultTitle}>Niveau {result.title}</h3>

              <p
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "1rem",
                }}
              >
                Score: {score} / {maxScore} points (
                {Math.round((score / maxScore) * 100)}%)
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: COLORS.bleuFonce,
                  lineHeight: "1.6",
                }}
              >
                {result.description}
              </p>

              <div style={styles.recommendationBox}>
                <p
                  style={{
                    fontWeight: "600",
                    color: COLORS.bleuFonce,
                    marginBottom: "0.5rem",
                  }}
                >
                  📌 Notre recommandation:
                </p>
                <p style={{ color: COLORS.bleuFonce }}>
                  {result.recommendation}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={styles.primaryButton}
                  onClick={onBookAppointment}
                >
                  Parlez à un conseiller
                </button>
                <button style={styles.secondaryButton} onClick={handleRestart}>
                  Refaire le test
                </button>
              </div>

              {/* Level scale */}
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1rem",
                  backgroundColor: COLORS.brume,
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: "0.75rem",
                  }}
                >
                  Échelle des niveaux (CECR)
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  {[
                    { level: "A1", color: COLORS.vermillon },
                    { level: "A2", color: COLORS.jauneCore },
                    { level: "B1", color: COLORS.turquoise },
                    { level: "B2", color: COLORS.bleuFonce },
                  ].map((item) => (
                    <div
                      key={item.level}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "8px",
                        backgroundColor:
                          item.level === result.level ? item.color : "#e5e5e5",
                        color:
                          item.level === result.level ? COLORS.blanc : "#666",
                        fontWeight: item.level === result.level ? "700" : "400",
                        fontSize: "0.85rem",
                        textAlign: "center",
                      }}
                    >
                      {item.level}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Text&display=swap');

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FrenchLevelTest;
