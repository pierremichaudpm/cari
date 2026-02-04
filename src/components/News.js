import React, { useState } from "react";
import Icon from "./Icon";
import NewsModal from "./NewsModal";

const News = ({ currentLanguage, translations }) => {
  const [isMoreContentModalOpen, setIsMoreContentModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  const t = translations[currentLanguage] || translations.fr;

  // CARI categories with colors - labels from translations
  const nc = t.newsCategories || {};
  const categories = {
    francisation: {
      label: nc.francisation || "Francisation",
      color: "#6CBAC7",
    },
    emploi: { label: nc.emploi || "Emploi", color: "#FF5C39" },
    femmes: { label: nc.femmes || "Femmes du monde", color: "#6CBAC7" },
    integration: { label: nc.integration || "Intégration", color: "#FFBF3F" },
    parents: { label: nc.parents || "Parents & Jeunesse", color: "#FF5C39" },
  };

  // Locale mapping for date formatting
  const localeMap = {
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
  };
  const dateLocale = localeMap[currentLanguage] || "fr-CA";

  // 9 fake news items - 3 shown initially, 6 in "more content" modal
  const newsItems = [
    {
      id: 1,
      type: "text",
      category: "francisation",
      title: "Nouvelle session de cours de français intensifs",
      excerpt:
        "Inscription maintenant ouverte pour notre programme de francisation accélérée qui débute en mars 2025...",
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
      author: "Marie Dubois",
      date: "2025-01-28",
      content: `# Nouvelle session de cours de français intensifs

Nous sommes heureux d'annoncer l'ouverture des inscriptions pour notre programme de francisation accélérée qui débutera en mars 2025.

## Détails du programme

Ce programme intensif est conçu pour les nouveaux arrivants qui souhaitent améliorer rapidement leurs compétences en français. Les cours auront lieu du lundi au vendredi, de 9h00 à 12h00.

### Ce qui est inclus :
- 15 heures de cours par semaine
- Matériel pédagogique fourni
- Activités de conversation en groupe
- Sorties culturelles mensuelles
- Certificat à la fin du programme

## Critères d'admissibilité

- Être résident permanent ou citoyen canadien
- Avoir 18 ans ou plus
- Avoir des connaissances de base en français (niveau débutant accepté)

Pour vous inscrire, veuillez nous contacter au 514-747-8229 ou passer directement à nos bureaux. Les places sont limitées!`,
    },
    {
      id: 2,
      type: "video",
      category: "emploi",
      title: "Témoignage: Comment CARI m'a aidé à trouver mon premier emploi",
      excerpt:
        "Découvrez l'histoire inspirante de Ahmed qui a trouvé un emploi en TI grâce à nos services d'accompagnement...",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop",
      author: "Pierre Lambert",
      date: "2025-01-25",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: "8:42",
      content: `# Témoignage: Comment CARI m'a aidé à trouver mon premier emploi

Ahmed partage son parcours inspirant depuis son arrivée au Canada jusqu'à l'obtention de son premier emploi dans le secteur des technologies de l'information.

## Son parcours

Arrivé au Canada il y a deux ans, Ahmed a d'abord eu du mal à faire reconnaître ses compétences et son diplôme en informatique. C'est en découvrant les services d'accompagnement à l'emploi du CARI qu'il a pu bénéficier d'un soutien personnalisé.

### Les services qui l'ont aidé :
- Révision et adaptation de son CV canadien
- Préparation aux entrevues d'embauche
- Réseautage avec des employeurs du secteur TI
- Ateliers sur la reconnaissance des acquis
- Accompagnement dans ses recherches d'emploi

Aujourd'hui, Ahmed travaille comme développeur web dans une entreprise montréalaise et continue de participer aux activités du CARI pour aider d'autres nouveaux arrivants.`,
    },
    {
      id: 3,
      type: "audio",
      category: "femmes",
      title: "Podcast: Les défis et réussites des femmes immigrantes",
      excerpt:
        "Dans ce balado, trois femmes partagent leur expérience d'intégration au Québec et les ressources qui les ont aidées...",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
      author: "Fatima Benali",
      date: "2025-01-22",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "24:15",
      content: `# Podcast: Les défis et réussites des femmes immigrantes

Dans cet épisode spécial de notre série "Femmes du monde", nous recevons trois femmes inspirantes qui partagent leur parcours d'immigration et d'intégration au Québec.

## Les invitées

### Amina, du Maroc
Arrivée il y a 5 ans, Amina nous parle de son expérience en tant que mère célibataire et comment elle a réussi à concilier études, travail et vie familiale.

### Svetlana, d'Ukraine
Récemment arrivée, Svetlana partage les défis liés à la barrière linguistique et comment les ateliers du CARI l'ont aidée à s'adapter.

### Carmen, de Colombie
Professionnelle établie depuis 10 ans, Carmen revient sur son parcours et donne ses conseils aux nouvelles arrivantes.

## Thèmes abordés
- L'importance du réseau de soutien
- La reconnaissance des diplômes
- L'équilibre travail-famille
- Les ressources communautaires disponibles
- La résilience et l'adaptation culturelle

Un épisode rempli d'espoir et de conseils pratiques pour toutes les femmes en processus d'immigration.`,
    },
    {
      id: 4,
      type: "text",
      category: "integration",
      title: "Guide pratique: Vos premiers pas au Québec",
      excerpt:
        "Un guide complet pour vous aider à naviguer vos premières semaines au Québec: logement, santé, transport...",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
      author: "Jean Tremblay",
      date: "2025-01-20",
      content: `# Guide pratique: Vos premiers pas au Québec

Bienvenue au Québec! Ce guide vous aidera à vous orienter pendant vos premières semaines dans votre nouveau pays.

## 1. Documents essentiels

Dès votre arrivée, assurez-vous d'avoir:
- Votre confirmation de résidence permanente (COPR)
- Votre passeport
- Vos documents médicaux
- Vos diplômes et relevés de notes

## 2. Logement

### Options temporaires
- Auberges de jeunesse
- Hôtels économiques
- Airbnb court terme

### Trouver un logement permanent
Utilisez ces ressources: Kijiji, Facebook Marketplace, Du Proprio. N'oubliez pas de vérifier la Régie du logement pour connaître vos droits.

## 3. Santé

Inscrivez-vous à la RAMQ (Régie de l'assurance maladie du Québec) dans les 90 jours suivant votre arrivée. En attendant votre carte, gardez une assurance privée.

## 4. Transport

La STM (Société de transport de Montréal) offre un excellent réseau de métro et autobus. Procurez-vous une carte OPUS pour des tarifs réduits.

## 5. Ouverture de compte bancaire

Les principales banques (RBC, TD, Scotia, Desjardins) offrent des forfaits pour nouveaux arrivants sans frais mensuels pendant la première année.

## 6. Téléphonie et internet

Comparez les offres de Videotron, Bell, Rogers et Fido pour trouver le forfait qui vous convient.

Le CARI peut vous accompagner dans toutes ces démarches. N'hésitez pas à nous contacter!`,
    },
    {
      id: 5,
      type: "video",
      category: "parents",
      title: "Activités familiales d'hiver: Découvrir le Québec en famille",
      excerpt:
        "Profitez de l'hiver québécois avec vos enfants! Découvrez les meilleures activités familiales adaptées aux nouveaux arrivants...",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      author: "Sophie Martin",
      date: "2025-01-18",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      duration: "12:18",
      content: `# Activités familiales d'hiver: Découvrir le Québec en famille

L'hiver québécois peut sembler intimidant pour les nouveaux arrivants, mais c'est une saison magnifique à découvrir en famille!

## Activités gratuites ou peu coûteuses

### Patinage
De nombreux parcs offrent des patinoires extérieures gratuites. Apportez vos patins ou louez-en sur place pour quelques dollars.

### Glissade
Les parcs municipaux ont des pentes de glissade accessibles à tous. N'oubliez pas d'apporter votre traîneau!

### Festivals d'hiver
- Fête des Neiges (Parc Jean-Drapeau)
- Igloofest (Vieux-Port)
- Carnaval de Québec

## S'habiller pour l'hiver

### Pour les enfants
- Habit de neige une-pièce (snowsuit)
- Bottes d'hiver imperméables
- Mitaines (pas de gants pour les petits)
- Cache-cou et tuque

### Conseils pratiques
- Superposez les couches (layering)
- Investissez dans de bons manteaux
- Gardez toujours des vêtements de rechange dans la voiture

## Bibliothèques et centres communautaires

Les bibliothèques municipales offrent l'heure du conte, des ateliers créatifs et des espaces de jeux intérieurs gratuits.

## Nos ateliers parents-enfants

Le CARI organise des sorties familiales mensuelles pour découvrir le Québec ensemble. Consultez notre calendrier d'activités pour vous inscrire!`,
    },
    {
      id: 6,
      type: "audio",
      category: "emploi",
      title: "Balado: Équivalences de diplômes au Québec",
      excerpt:
        "Tout ce que vous devez savoir sur la reconnaissance de vos diplômes étrangers et les démarches à suivre...",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      author: "Carlos Rodriguez",
      date: "2025-01-15",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "18:32",
      content: `# Balado: Équivalences de diplômes au Québec

La reconnaissance des acquis et diplômes étrangers est une étape cruciale pour les professionnels immigrants. Ce balado vous guide à travers les démarches.

## Les organismes d'évaluation

### MIFI (Ministère de l'Immigration)
Pour l'évaluation comparative des études effectuées hors du Canada.

### Ordres professionnels
Chaque profession réglementée a son propre ordre qui évalue les diplômes.

## Processus général

### 1. Collecte de documents
- Diplômes originaux ou copies certifiées
- Relevés de notes
- Descriptions de cours
- Traductions officielles

### 2. Soumission de la demande
Le processus peut prendre de 2 à 6 mois selon l'organisme.

### 3. Formation complémentaire
Certains professionnels doivent suivre des cours additionnels ou des stages.

## Professions les plus touchées
- Médecins et infirmières
- Ingénieurs
- Enseignants
- Comptables
- Avocats

## Ressources disponibles

Le CARI offre des ateliers gratuits sur la reconnaissance des acquis et peut vous orienter vers les bons organismes.

N'hésitez pas à prendre rendez-vous avec nos conseillers en emploi!`,
    },
    {
      id: 7,
      type: "text",
      category: "francisation",
      title: "5 applications gratuites pour apprendre le français",
      excerpt:
        "Complétez vos cours de français avec ces applications mobiles recommandées par nos professeurs de francisation...",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      author: "Isabelle Gagnon",
      date: "2025-01-12",
      content: `# 5 applications gratuites pour apprendre le français

Nos enseignants de francisation recommandent ces applications pour pratiquer le français au quotidien.

## 1. Duolingo

**Gratuit avec publicités**
L'application la plus populaire pour apprendre les bases. Exercices courts et gamifiés, idéal pour pratiquer 10-15 minutes par jour.

### Points forts
- Interface ludique et motivante
- Progression structurée
- Exercices de prononciation

## 2. TV5MONDE Apprendre

**Entièrement gratuit**
Application développée par la chaîne francophone internationale avec des contenus basés sur des vidéos authentiques.

### Points forts
- Contenu québécois disponible
- Tous les niveaux (A1 à B2)
- Exercices basés sur des situations réelles

## 3. Français Authentique

**Gratuit (version premium disponible)**
Application axée sur la compréhension orale avec des podcasts quotidiens.

### Points forts
- Vocabulaire du quotidien
- Méthode naturelle d'apprentissage
- Transcriptions disponibles

## 4. Memrise

**Gratuit avec version premium**
Focus sur l'apprentissage du vocabulaire avec répétition espacée.

### Points forts
- Mémorisation efficace
- Vidéos de locuteurs natifs
- Contenu communautaire

## 5. Tandem

**Gratuit**
Application d'échange linguistique pour pratiquer avec des francophones.

### Points forts
- Conversation avec des natifs
- Corrections mutuelles
- Pratique orale et écrite

## Conseils d'utilisation

Combinez plusieurs applications pour travailler différentes compétences:
- Vocabulaire le matin (Duolingo, Memrise)
- Écoute pendant les trajets (Français Authentique)
- Conversation le soir (Tandem)

N'oubliez pas que ces apps complètent mais ne remplacent pas les cours en présentiel!`,
    },
    {
      id: 8,
      type: "video",
      category: "femmes",
      title: "Atelier: Entrepreneuriat féminin au Québec",
      excerpt:
        "Retrouvez l'enregistrement de notre atelier sur les ressources et programmes d'aide pour les femmes entrepreneures...",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      author: "Nadia Ouellet",
      date: "2025-01-10",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: "45:23",
      content: `# Atelier: Entrepreneuriat féminin au Québec

Enregistrement complet de notre atelier sur l'entrepreneuriat féminin, animé en partenariat avec Femmes d'Affaires du Québec.

## Au programme

### 1. Le paysage entrepreneurial québécois
- Statistiques sur les femmes entrepreneures
- Secteurs porteurs
- Défis spécifiques aux femmes immigrantes

### 2. Programmes d'aide financière

**Subventions et prêts:**
- PME MTL Centre-Ville
- Fonds d'emprunt Québec (FEQ)
- Banque de développement du Canada (BDC)

**Programmes spécifiques aux femmes:**
- Fonds Femmes ESSOR
- Réseau M (anciennement Réseau des femmes d'affaires)

### 3. Formation et accompagnement

**Organismes ressources:**
- Centre d'entrepreneuriat de l'École HEC
- Carrefour Jeunesse-Emploi
- SAJE Montréal

### 4. Réseautage et mentorat

L'importance de développer son réseau professionnel et de trouver des mentores qui comprennent les défis de l'immigration.

## Témoignages

Trois entrepreneures immigrantes partagent leur parcours:
- Yasmine, fondatrice d'une entreprise de services-conseils
- Olga, propriétaire d'un salon de coiffure
- Maria, créatrice de mode

## Prochaines étapes

Le CARI offre un programme d'accompagnement personnalisé pour les femmes qui souhaitent lancer leur entreprise.

Inscrivez-vous à notre prochain café-rencontre entrepreneurial!`,
    },
    {
      id: 9,
      type: "text",
      category: "integration",
      title: "Comprendre le système de santé québécois",
      excerpt:
        "Guide complet sur le fonctionnement du système de santé au Québec, de la carte RAMQ aux services d'urgence...",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      author: "Dr. Hassan Malik",
      date: "2025-01-08",
      content: `# Comprendre le système de santé québécois

Le système de santé québécois est public et universel. Ce guide vous aide à naviguer dans ses différentes composantes.

## La carte RAMQ

### Comment l'obtenir

**Délai:** 3 mois de carence pour les nouveaux arrivants (sauf exceptions)

**Documents requis:**
- Preuve de résidence au Québec
- Document d'immigration (COPR, certificat de sélection)
- Pièce d'identité avec photo

**Inscription:**
- En ligne sur le site de la RAMQ
- Par courrier
- En personne dans un bureau de Services Québec

### Pendant la période de carence

Souscrivez à une assurance privée pour couvrir les urgences.

## Les niveaux de soins

### 1. Médecin de famille
Le pilier du système. Malheureusement, il y a une pénurie.

**Alternatives:**
- Cliniques sans rendez-vous
- Groupes de médecine de famille (GMF)
- Guichet d'accès à un médecin de famille (GAMF)

### 2. Cliniques médicales
Pour les consultations non urgentes sans médecin de famille.

### 3. Urgences
Pour les situations graves uniquement. Temps d'attente de plusieurs heures selon la gravité.

### 4. Info-Santé 811
Service téléphonique gratuit 24/7 avec une infirmière.

## Services gratuits vs payants

**Gratuits avec la RAMQ:**
- Consultations médicales
- Hospitalisations
- Chirurgies
- Examens de laboratoire

**Non couverts (payants):**
- Médicaments (sauf à l'hôpital)
- Soins dentaires (sauf chirurgies)
- Optométrie (sauf examen de base)
- Ambulance (50-250$)

## Assurance médicaments

**Obligatoire au Québec!**

Options:
- Régime public de la RAMQ
- Assurance privée de l'employeur
- Assurance privée individuelle

## Services pour immigrants

Le CARI peut vous aider à:
- Remplir vos formulaires RAMQ
- Trouver une clinique près de chez vous
- Comprendre vos droits
- Accéder à des services en plusieurs langues

N'hésitez pas à nous contacter pour un accompagnement personnalisé!`,
    },
  ];

  // First 3 cards shown by default
  const displayedNews = newsItems.slice(0, 3);
  // Last 6 cards shown in modal
  const moreNews = newsItems.slice(3, 9);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsNewsModalOpen(true);
  };

  const handleMoreContentClick = () => {
    setIsMoreContentModalOpen(true);
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
    setTimeout(() => setSelectedNews(null), 300);
  };

  const closeMoreContentModal = () => {
    setIsMoreContentModalOpen(false);
  };

  // Get icon for content type
  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "video";
      case "audio":
        return "mic";
      case "text":
      default:
        return "file-text";
    }
  };

  return (
    <>
      <section id="nouvelles" className="news-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.newsSection.title}</h2>
            <p className="section-subtitle">{t.newsSection.subtitle}</p>
          </div>

          {/* News Cards Grid */}
          <div className="news-grid">
            {displayedNews.map((news) => (
              <div
                key={news.id}
                className="news-card"
                onClick={() => handleNewsClick(news)}
              >
                {/* Content Type Icon - subtle in top right */}
                <div className="news-type-icon">
                  <Icon name={getTypeIcon(news.type)} size={16} />
                </div>

                {/* Image */}
                <div className="news-image-wrapper">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="news-image"
                  />
                  {news.duration && (
                    <span className="news-duration">{news.duration}</span>
                  )}
                </div>

                {/* Card Body */}
                <div className="news-card-body">
                  <span
                    className="news-category"
                    style={{
                      backgroundColor: categories[news.category].color,
                    }}
                  >
                    {categories[news.category].label}
                  </span>

                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>

                  <div className="news-footer">
                    <span className="news-author">{news.author}</span>
                    <span className="news-date">
                      {new Date(news.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Content CTA */}
          <div className="section-cta">
            <button className="btn-primary" onClick={handleMoreContentClick}>
              {t.news.moreContentButton}
            </button>
          </div>
        </div>
      </section>

      {/* More Content Modal - Shows additional 6 news cards */}
      {isMoreContentModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeMoreContentModal();
            }
          }}
        >
          <div className="modal-content modal-more-content">
            <button
              className="modal-close"
              onClick={closeMoreContentModal}
              aria-label={t.aria.close}
            >
              <Icon name="x" size={24} />
            </button>

            <div className="modal-header">
              <h2>{t.news.moreNewsTitle}</h2>
            </div>

            <div className="news-grid">
              {moreNews.map((news) => (
                <div
                  key={news.id}
                  className="news-card"
                  onClick={() => {
                    closeMoreContentModal();
                    handleNewsClick(news);
                  }}
                >
                  <div className="news-type-icon">
                    <Icon name={getTypeIcon(news.type)} size={16} />
                  </div>

                  <div className="news-image-wrapper">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="news-image"
                    />
                    {news.duration && (
                      <span className="news-duration">{news.duration}</span>
                    )}
                  </div>

                  <div className="news-card-body">
                    <span
                      className="news-category"
                      style={{
                        backgroundColor: categories[news.category].color,
                      }}
                    >
                      {categories[news.category].label}
                    </span>

                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-excerpt">{news.excerpt}</p>

                    <div className="news-footer">
                      <span className="news-author">{news.author}</span>
                      <span className="news-date">
                        {new Date(news.date).toLocaleDateString(dateLocale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* News Content Modal - Shows full article/video/audio */}
      <NewsModal
        isOpen={isNewsModalOpen}
        onClose={closeNewsModal}
        news={selectedNews}
        currentLanguage={currentLanguage}
        translations={translations}
      />
    </>
  );
};

export default News;
