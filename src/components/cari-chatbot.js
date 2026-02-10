import { useState, useRef, useEffect } from "react";

const CARI_KNOWLEDGE = `Tu es l'Assistant CARI, le chatbot officiel du CARI St-Laurent (Centre d'Accueil et de Référence sociale et économique pour Immigrants de Saint-Laurent). Tu aides les personnes immigrantes avec leurs questions sur l'intégration au Québec.

RÈGLES IMPORTANTES:
- Réponds TOUJOURS dans la langue utilisée par l'utilisateur (français, anglais, arabe, espagnol, mandarin, etc.)
- Sois chaleureux, accueillant et empathique
- Donne des réponses concrètes et pratiques avec des infos précises
- Quand pertinent, termine par une invitation à contacter le CARI au (514) 748-2007
- Ne donne JAMAIS de conseils juridiques en immigration ni de conseils médicaux spécifiques
- Ne garantis JAMAIS de résultats (emploi, délais, etc.)
- Commence par le vouvoiement sauf si l'utilisateur tutoie
- Utilise des phrases claires et simples — beaucoup d'utilisateurs apprennent le français
- Pour les urgences: oriente vers 911, 811 (santé), SOS Violence conjugale 1-800-363-9010

IDENTITÉ DU CARI:
- Organisme à but non lucratif fondé en 1989, plus de 35 ans d'expérience
- Mission: accueillir, aider et accompagner les personnes immigrantes
- Adresse: 774, boul. Décarie, bureau 300, Saint-Laurent, QC H4L 3L5
- Téléphone: (514) 748-2007 | Courriel: info@cari.qc.ca
- Horaires: Lundi-vendredi, 8h30-17h00
- Services GRATUITS pour tous les immigrants (résidents permanents, réfugiés, demandeurs d'asile, étudiants internationaux)
- Clientèle de plus de 128 pays
- Langues: 20+ langues dont français, anglais, arabe, espagnol, mandarin, russe, créole, etc.
- Halte-garderie disponible sur place | Accessible aux personnes à mobilité réduite
- Partenaires: Gouvernement du Québec, Centraide, Ville de Montréal, Arr. Saint-Laurent, Emploi et Développement social Canada

6 SERVICES:
1. ACCUEIL ET INTÉGRATION: aide aux démarches (NAS, RAMQ, logement, école, formulaires), information et orientation, médiation interculturelle, assermentation, clinique d'impôts gratuite (mars-avril), soutien psychosocial, aide aux demandeurs d'asile
2. FRANCISATION: cours de français gratuits (temps complet 25h/sem, temps partiel, jour et soir), niveaux débutant à avancé, ateliers de conversation. Inscription: quebec.ca/education/apprendre-le-francais ou appeler le CARI
3. EMPLOI: ateliers recherche d'emploi, rédaction CV québécois, simulation entrevue, coaching professionnel, réseautage avec employeurs, accès au marché caché
4. FORMATIONS ET VIE COMMUNAUTAIRE: jumelage interculturel, cours d'anglais, informatique, préparation citoyenneté, bénévolat
5. FEMMES DU MONDE: ateliers couture/cuisine/français, soutien aux femmes immigrantes, intervention en cas de violence conjugale
6. PARENTS-JEUNESSE: soutien parental, halte-garderie, camp d'été, clinique psychoéducation, ICSI dans les écoles

GUIDES PRATIQUES — résumés pour référence rapide:

GUIDE 1 - 10 PREMIÈRES DÉMARCHES: 1) NAS (Service Canada, 1350 boul. Marcel-Laurin) 2) Compte bancaire (Desjardins, Nationale, RBC, TD, BMO — forfaits nouveaux arrivants) 3) RAMQ (délai 3 mois sauf France/Belgique/Danemark/Suède/Grèce/Finlande/Norvège/Luxembourg/Portugal avec formulaire SE-401-Q-207) 4) Logement (Kijiji, FB Marketplace, Centris — bail 12 mois, pas de dépôt de sécurité légal) 5) Téléphone (Fizz, Koodo, Public Mobile) 6) Cours de français (gratuits avec allocation) 7) École enfants (CSSMB, classes d'accueil) 8) Permis conduire (SAAQ, 90 jours grâce, ~85$) 9) Déclaration revenus (même sans revenu — accès allocations) 10) S'inscrire au CARI

GUIDE 2 - RECONNAISSANCE DIPLÔMES: Évaluation comparative MIFI (~130$, formulaire A-0361-FO) ≠ équivalence (ordre professionnel). WES pour Entrée Express (différent du MIFI). Professions réglementées: ordre professionnel obligatoire (qualificationsquebec.com). Métiers: RAC aux cégeps. Traduction OTTIAQ 50-100$/page. Délai: 6 mois à 3 ans pour professions réglementées.

GUIDE 3 - PREMIER HIVER: Décembre à fin mars, -5°C à -20°C, pointes -30°C. Système 3 couches: base mérinos (pas coton), isolation polar/laine, manteau long imperméable (150-500$+). Essentiels: bottes hiver, tuque, mitaines. Pneus hiver obligatoires 1er déc-15 mars (400-800$). Crampons piétons 10-20$. Métro fiable toute l'année. Activités: patinage gratuit, ski fond Bois-de-Liesse. Santé mentale: sortir chaque jour, rester actif.

GUIDE 4 - SYSTÈME SANTÉ: RAMQ carte soleil = consultations/examens/hospitalisations gratuits. Inscription en ligne ou en personne. Délai 3 mois (exceptions pays avec ententes). 811 = infirmière 24/7 gratuite. GAP (811 opt.3) = consultation <36h. rvsq.gouv.qc.ca = RV en ligne. Urgences: Sacré-Cœur, Lakeshore. Médecin famille: GAMF via Carnet santé Québec. Couvert: médecin, labo, hôpital, urgences, grossesse, dentaire <10 ans. Non couvert: dentaire adulte, lunettes, psy, ambulance (125-400$). Assurance médicaments obligatoire.

GUIDE 5 - APPS FRANÇAIS: 1) Mauril (Radio-Canada, québécois, gratuit, priorité) 2) Duolingo (régularité, grammaire) 3) TV5 Monde apprendre.tv5monde.com (compréhension, niveaux A1-B2) 4) Busuu (correction par natifs) 5) Podcasts: Français Authentique, innerFrench, Balado CARI. Combo: 10min app le matin + podcast trajets + exercice le soir + parler français au quotidien.

GUIDE 6 - LOGEMENT: Bail 12 mois standard (1er juillet). Chercher: Kijiji, FB Marketplace, Centris, Kangalou. Droits: PAS de dépôt sécurité (illégal QC), pas de discrimination, préavis 24h. Budget: studio 800-1200$, 3½ 1000-1500$, 4½ 1200-1800$, 5½ 1400-2200$. + Hydro 80-150$, internet 50-80$, assurance 20-40$. Arnaques: jamais payer avant visite, vérifier identité propriétaire. CARI offre consultation logement.

GUIDE 7 - EMPLOI: CV québécois: PAS de photo, PAS d'âge/statut, max 2 pages, personnaliser par offre. Entrevue: questions comportementales, technique STAR, ne pas être modeste. Réseautage: 60-80% postes = marché caché, LinkedIn français, 5 à 7, café informationnel. Sites: Emploi Québec, Indeed, LinkedIn Jobs, Jobboom. Première expérience: poste connexe, bénévolat, subventions salariales, mentorat. Normes: 40h/sem, 2 sem vacances/an, protection après 2 ans.

GUIDE 8 - FINANCES/IMPÔTS: Prix affichés EXCLUENT taxes (TPS 5% + TVQ 9.975% ≈ 15%). Pourboire 15-20%. Deux déclarations (fédéral ARC + provincial Revenu QC), deadline 30 avril. Produire même sans revenu = accès ACE (7437$/enfant max), Allocation famille QC, crédit TPS, crédit solidarité. CARI: aide impôts gratuite mars-avril. Crédit: score 300-900, carte garantie, payer solde complet, max 30% limite. Budget solo: 1770-2710$/mois. Vérification crédit gratuite: Equifax, TransUnion.

FAQ RAPIDES:
- Services CARI = GRATUITS pour tous les immigrants
- Pas besoin d'habiter Saint-Laurent
- Première visite = évaluation de besoins
- Halte-garderie disponible sur place
- NAS: Service Canada 1350 boul. Marcel-Laurin
- Assurance privée recommandée pendant délai RAMQ
- Dépôt sécurité = illégal au Québec
- Pneus hiver = obligatoires 1er déc-15 mars`;

const WELCOME_MESSAGES = {
  fr: "Bonjour! 👋 Je suis l'Assistant CARI. Comment puis-je vous aider aujourd'hui?",
  en: "Hello! 👋 I'm the CARI Assistant. How can I help you today?",
  es: "¡Hola! 👋 Soy el Asistente CARI. ¿Cómo puedo ayudarle hoy?",
  ar: "مرحباً! 👋 أنا مساعد CARI. كيف يمكنني مساعدتك اليوم؟",
  zh: "您好！👋 我是CARI助手。今天有什么可以帮您的？",
};

const QUICK_ACTIONS = [
  {
    label: "🏠 Premières démarches",
    prompt:
      "Quelles sont les premières démarches à faire quand j'arrive au Québec?",
  },
  { label: "📋 Services du CARI", prompt: "Quels services offre le CARI?" },
  {
    label: "🗣️ Cours de français",
    prompt: "Comment m'inscrire aux cours de français?",
  },
  {
    label: "💼 Trouver un emploi",
    prompt: "Comment chercher un emploi au Québec?",
  },
  {
    label: "🏥 Système de santé",
    prompt: "Comment fonctionne le système de santé?",
  },
  {
    label: "📍 Horaires et adresse",
    prompt: "Quels sont les horaires et l'adresse du CARI?",
  },
];

function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "12px 16px",
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#6CBAC7",
            animation: `bounce 1.4s ${i * 0.2}s infinite ease-in-out both`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
        paddingLeft: isUser ? 48 : 0,
        paddingRight: isUser ? 0 : 48,
        animation: "fadeIn 0.3s ease",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #263164, #6CBAC7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginRight: 8,
            marginTop: 4,
            fontSize: 14,
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>
            C
          </span>
        </div>
      )}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          backgroundColor: isUser ? "#263164" : "#F0F7F6",
          color: isUser ? "#fff" : "#1a1a2e",
          fontSize: 14,
          lineHeight: 1.55,
          maxWidth: "85%",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: isUser ? "none" : "0 1px 3px rgba(38,49,100,0.06)",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default function CARIChatbot({ onClose, language }) {
  const initialLang = language && WELCOME_MESSAGES[language] ? language : "fr";
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME_MESSAGES[initialLang] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setShowQuickActions(false);
    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      // Remove the initial welcome message from API calls
      if (apiMessages.length > 1 && apiMessages[0].role === "assistant") {
        apiMessages.shift();
      }

      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: CARI_KNOWLEDGE,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply =
        data.content
          ?.filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("\n") ||
        "Désolé, une erreur est survenue. Veuillez réessayer ou nous appeler au (514) 748-2007.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, je ne suis pas disponible en ce moment. N'hésitez pas à nous appeler directement au (514) 748-2007 ou à écrire à info@cari.qc.ca.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "min(550px, 80vh)",
        width: "min(400px, 92vw)",
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 90,
        right: 20,
        zIndex: 1001,
        borderRadius: 16,
        boxShadow: "0 8px 40px rgba(38,49,100,0.25)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cce8e5; border-radius: 4px; }
        textarea::placeholder { color: #9ca3af; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #263164 0%, #1a2147 100%)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, #6CBAC7, #4a9da9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: "DM Serif Display, serif",
            }}
          >
            C
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.2,
            }}
          >
            Assistant CARI
          </div>
          <div
            style={{
              color: "#6CBAC7",
              fontSize: 11,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            En ligne · Répond en 12+ langues
          </div>
        </div>
        <button
          onClick={() => onClose && onClose()}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: 8,
            padding: "6px 8px",
            cursor: "pointer",
            color: "#fff",
            fontSize: 18,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Language selector banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 16,
            flexWrap: "wrap",
            animation: "fadeIn 0.5s ease",
          }}
        >
          {[
            { code: "fr", flag: "🇫🇷", label: "FR" },
            { code: "en", flag: "🇬🇧", label: "EN" },
            { code: "es", flag: "🇪🇸", label: "ES" },
            { code: "ar", flag: "🇸🇦", label: "AR" },
            { code: "zh", flag: "🇨🇳", label: "中文" },
          ].map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => {
                setMessages([
                  {
                    role: "assistant",
                    content: WELCOME_MESSAGES[code] || WELCOME_MESSAGES.fr,
                  },
                ]);
                setShowQuickActions(true);
              }}
              style={{
                background: "rgba(108,186,199,0.08)",
                border: "1px solid rgba(108,186,199,0.2)",
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#263164",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(108,186,199,0.15)";
                e.target.style.borderColor = "#6CBAC7";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(108,186,199,0.08)";
                e.target.style.borderColor = "rgba(108,186,199,0.2)";
              }}
            >
              <span>{flag}</span> {label}
            </button>
          ))}
        </div>

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #263164, #6CBAC7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>
                C
              </span>
            </div>
            <div
              style={{
                backgroundColor: "#F0F7F6",
                borderRadius: "16px 16px 16px 4px",
                boxShadow: "0 1px 3px rgba(38,49,100,0.06)",
              }}
            >
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Quick actions */}
        {showQuickActions && messages.length <= 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 8,
              animation: "slideUp 0.4s ease",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#8896b3",
                fontWeight: 500,
                marginBottom: 2,
                paddingLeft: 4,
              }}
            >
              Questions fréquentes
            </div>
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.prompt)}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#263164",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6CBAC7";
                  e.currentTarget.style.background = "#f8fffe";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {action.label}
                <span style={{ color: "#6CBAC7", fontSize: 16 }}>›</span>
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #f0f0f5",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            background: "#f7f8fb",
            borderRadius: 16,
            padding: "6px 6px 6px 14px",
            border: "1px solid #e8eaf0",
            transition: "border-color 0.2s",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écrivez votre question..."
            rows={1}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "none",
              padding: "6px 0",
              lineHeight: 1.4,
              color: "#1a1a2e",
              maxHeight: 80,
              overflowY: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 80) + "px";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              border: "none",
              background: input.trim() && !loading ? "#263164" : "#d1d5e0",
              cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: 10,
            color: "#b0b8cc",
          }}
        >
          CARI St-Laurent · (514) 748-2007 · 774, boul. Décarie, bur. 300
        </div>
      </div>
    </div>
  );
}
