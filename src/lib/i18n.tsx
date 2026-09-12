import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Language = "fr" | "en" | "es";

export const languages: { code: Language; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "fr";

  const stored = window.localStorage.getItem("souss-language") as Language | null;
  if (stored === "fr" || stored === "en" || stored === "es") return stored;

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("en")) return "en";
  if (browserLanguage.startsWith("es")) return "es";
  return "fr";
};

export const translations = {
  fr: {
    header: {
      institute: "Institut Souss Al-'Ālima",
      nav: ["Accueil", "Cursus", "Méthodologie", "Riwāyāt", "Encadrement", "Contact"],
      enroll: "S'inscrire",
      enrollWhatsapp: "S'inscrire sur WhatsApp",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      language: "Langue",
    },
    hero: {
      badge: "Enseignement coranique en ligne",
      title: ["Apprendre le Coran,", "selon la tradition", "marocaine."],
      body: "Mémorisation, Tajwīd, Rasm wa Dabt et langue arabe, avec un accompagnement rigoureux et fidèle aux écoles traditionnelles du Souss.",
      enroll: "S'inscrire",
      seeCursus: "Voir les cursus",
      imageAlt: "Enseignement traditionnel du Coran avec les tablettes",
    },
    presentation: {
      badge: "Institut Souss Al-'Ālima",
      title: "Une école en ligne, enracinée dans la transmission du Souss.",
      body: "L'institut accompagne les francophones dans l'apprentissage du Coran, de la récitation et des bases de la langue arabe, avec une pédagogie structurée et fidèle aux écoles coraniques marocaines.",
      pillars: [
        ["Warsh", "Riwāya centrale"],
        ["Souss", "Tradition marocaine"],
        ["En ligne", "Format francophone"],
      ],
      objective: "Objectif",
      objectiveText: "Transmettre un enseignement rigoureux, progressif et humain.",
      approach: "Approche",
      approachText: "Théorie, pratique, correction et accompagnement individuel.",
      cta: "Découvrir les cursus",
      imageAlt: "Enseignement coranique traditionnel au Maroc",
    },
    cursus: {
      badge: "Programmes",
      title: "Des cursus clairs, vivants et guidés.",
      body: "L'élève choisit son parcours, comprend immédiatement le niveau attendu, l'objectif visé et l'encadrement proposé, puis peut écrire directement à l'institut sur WhatsApp.",
      ticker: ["Coran", "Tajwīd", "Warsh", "Rasm wa Dabt", "Langue arabe", "Suivi individuel", "Transmission", "Zoom"],
      labels: {
        availableTitle: "Cursus disponibles",
        availableSub: "Choisis un parcours pour voir le détail",
        rhythm: "Rythme",
        level: "Niveau",
        outcome: "Objectif",
        keyPoints: "Points clés",
        keyPointsSub: "Ce que l'élève travaille",
        supervision: "Encadrement",
        supervisionSub: "Référent du cursus",
        details: "Détails du parcours",
        detailsSub: "Organisation et prochaine étape",
        detailsText: "L'inscription commence par un échange WhatsApp. L'élève indique son niveau, ses disponibilités et son objectif ; l'institut peut ensuite orienter vers le cursus le plus adapté.",
        request: "Demander ce cursus",
        whatsapp: "WhatsApp",
      },
      items: [
        {
          title: "Cursus Coran",
          subtitle: "Mémorisation, correction et écriture coranique",
          description: "Un parcours progressif pour apprendre, corriger et mémoriser le Coran avec un suivi personnalisé.",
          rhythm: "Suivi régulier",
          level: "Débutant à avancé",
          outcome: "Mémorisation, révision, wird quotidien et préparation encadrée",
          points: [
            "Mémorisation : commencer ou achever la mémorisation du Coran.",
            "Révision : consolider les acquis grâce à une révision régulière et accompagnée.",
            "Wird quotidien : suivre une portion quotidienne fixe, avec une explication de ses sens pour associer lecture, compréhension et méditation.",
            "Perfectionnement et ijāza : pour les personnes ayant mémorisé le Coran, préparer une ijāza dans l'une des lectures mutawātir, après évaluation et validation de l'encadrement. L'ijāza n'est pas automatique.",
          ],
          supervisorRole: "Professeur de Coran à Sidi Mokhtār",
          message: "Salam, je souhaite avoir des informations sur le cursus Coran de l'Institut Souss Al-'Ālima.",
        },
        {
          title: "Séminaires de Tajwīd",
          subtitle: "Cours théoriques et pratiques sous supervision",
          description: "Des séminaires consacrés au Tajwīd et à la récitation selon Warsh, avec un encadrement spécialisé.",
          rhythm: "Jeudi à 21h",
          level: "Lecture correcte requise",
          outcome: "Récitation plus précise selon Warsh",
          points: ["Riwāya Warsh par Ṭarīq Yūsuf al-Arzāq", "Cours en ligne via Zoom", "Travail théorique et correction appliquée"],
          supervisorRole: "Professeur de Tajwīd et producteur de programmes à la Radio Mohammed VI du Saint Coran",
          message: "Salam, je souhaite avoir des informations sur les séminaires de Tajwīd de l'Institut Souss Al-'Ālima.",
        },
        {
          title: "Cursus langue arabe",
          subtitle: "Grammaire, pratique et lecture narrative",
          description: "Un enseignement de la grammaire arabe selon la méthodologie des écoles traditionnelles du Souss.",
          rhythm: "Séminaires guidés",
          level: "Bases à consolider",
          outcome: "Compréhension grammaticale et goût de la langue",
          points: ["Étude de l'Al-Ajroumiya", "Analyse grammaticale appliquée", "Lecture narrative as-sard"],
          supervisorRole: "Professeur à l'école traditionnelle d'Ilmaten (Rasmouka)",
          message: "Salam, je souhaite avoir des informations sur le cursus langue arabe de l'Institut Souss Al-'Ālima.",
        },
      ],
    },
    methodology: {
      badge: "Méthodologie",
      title: "Une méthode traditionnelle, lisible dès le premier cours.",
      body: "Chaque élève avance avec un cadre simple : comprendre le point à corriger, pratiquer, recevoir un retour, puis stabiliser avant de passer à l'étape suivante.",
      imageAlt: "Enseignement traditionnel avec la lūḥa",
      imageBadge: "Lūḥa et numérique",
      imageText: "La rigueur de la tablette traditionnelle, adaptée au suivi en ligne.",
      step: "Étape",
      steps: [
        ["Diagnostic", "Identifier le niveau réel de lecture, de mémorisation et de prononciation."],
        ["Correction", "Travailler la récitation avec retours précis, sans surcharge inutile."],
        ["Écriture", "Intégrer le Rasm wa Dabt pour relier lecture, support écrit et mémorisation."],
        ["Suivi", "Consolider par la murājaʿa, les objectifs courts et la régularité."],
      ],
      studentExperience: "Expérience élève",
      studentText: "Moins de répétition visuelle, plus de clarté dans le parcours.",
      principle: "Principe",
      principleText: "Le savoir se reçoit, se pratique et se vérifie auprès d'un enseignant.",
    },
    riwayat: {
      badge: "Riwāyāt",
      title: "Trois lectures, une orientation claire.",
      body: "La section distingue les traditions proposées sans les présenter comme trois blocs identiques. L'élève comprend tout de suite ce qui relève de la découverte, de la précision et de la spécialité marocaine.",
      forWhom: "Pour qui ?",
      origin: "Origine",
      workedPoints: "Points travaillés",
      specialty: "Notre spécialité",
      audience: ["Perfectionner la lecture coranique", "Mémoriser avec une structure claire", "Découvrir le Rasm ʿUthmānī", "Étudier dans une tradition malékite marocaine"],
      items: [
        {
          description: "La lecture la plus répandue dans le monde musulman.",
          origin: "Kufa, Irak",
          status: "Base accessible",
          features: ["Lecture largement enseignée", "Repères simples", "Bonne entrée en matière"],
        },
        {
          description: "Une transmission médinoise reliée à l'Imam Nāfiʿ.",
          origin: "École de Médine",
          status: "Précision classique",
          features: ["Tradition médinoise", "Attention articulatoire", "Méthode progressive"],
        },
        {
          description: "La spécialité de l'institut, étudiée dans l'esprit des écoles marocaines.",
          origin: "École marocaine",
          status: "Notre spécialité",
          features: ["Ṭarīq Yūsuf al-Arzāq", "Tradition maghrébine", "Lien avec la méthode de Sidi Mokhtār"],
        },
      ],
    },
    supervision: {
      badge: "Encadrement",
      title: "Une chaîne de transmission, présentée avec clarté.",
      body: "L'encadrement n'est plus une longue biographie difficile à parcourir : les maîtres, l'enseignant et la transmission actuelle sont structurés comme une lecture guidée.",
      transmission: "Transmission",
      level: "Niveau",
      function: "Fonction",
      domains: "Domaines transmis",
      chain: ["Maîtres", "Enseignant", "Élèves"],
      profiles: [
        {
          role: "al-ʿAllāma",
          label: "Maître des sciences",
          place: "Tāfrawt, Souss",
          note: "Maître spirituel et scientifique, reconnu pour son enseignement des sciences religieuses et de l'adab.",
          domains: ["Langue arabe", "Fiqh", "Naḥw", "Uṣūl al-fiqh", "Manṭiq"],
        },
        {
          role: "al-Muqriʾ",
          label: "Maître du Coran",
          place: "Baʿmrān, Sud marocain",
          note: "Référence dans la transmission fidèle du Coran, du Rasm, du Ḍabṭ et des lectures.",
          domains: ["ʿUlūm al-Qur'ān", "Mutashābih", "Rasm", "Ḍabṭ", "Qirāʾāt"],
        },
        {
          role: "L'enseignant",
          label: "Transmission actuelle",
          place: "École traditionnelle de Sidi Mokhtār",
          note: "Professeur de Coran formé dans la tradition du Souss, il accompagne les élèves avec rigueur et pédagogie.",
          domains: ["Tajwīd", "Rasm wa Dabt", "Murājaʿa", "Suivi personnalisé", "Pédagogie du Souss"],
        },
      ],
    },
    contact: {
      badge: "Contact",
      title: "Une question, une demande ou une inscription ?",
      body: "Écrivez-nous directement sur WhatsApp avec votre niveau, le cursus souhaité et vos disponibilités. Le message est préparé pour aller vite, sans formulaire répétitif.",
      imageAlt: "Enseignement coranique traditionnel",
      steps: ["Demande d'information", "Orientation vers le bon cursus", "Inscription aux prochaines sessions"],
      direct: "WhatsApp direct",
      quick: ["Demande", "Inscription"],
      whatsappSuffix: "WhatsApp",
      seeCursus: "Voir les cursus",
      advice: "Conseil",
      adviceText: "Pour une réponse plus précise, indiquez votre niveau de lecture, votre objectif et le créneau souhaité.",
      messages: {
        information: "Salam, je souhaite avoir des informations sur les cours de l'Institut Souss Al-'Ālima.",
        inscription: "Salam, je souhaite m'inscrire à une formation de l'Institut Souss Al-'Ālima.",
      },
    },
    footer: {
      description: "Enseignement traditionnel du Coran en ligne selon la méthode de Sidi Mokhtār",
      features: "Fonctionnalités",
      featureItems: ["Cours en ligne programmés", "Fiches PDF téléchargeables", "Espace personnel élève", "Accès aux vidéos de cours"],
      links: "Liens rapides",
      contact: "Contact",
      rights: "© 2024 Institut Souss Al-'Ālima. Tous droits réservés.",
    },
  },
  en: {
    header: {
      institute: "Souss Al-'Ālima Institute",
      nav: ["Home", "Courses", "Methodology", "Riwāyāt", "Supervision", "Contact"],
      enroll: "Enroll",
      enrollWhatsapp: "Enroll on WhatsApp",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
    },
    hero: {
      badge: "Online Quran education",
      title: ["Learn the Quran,", "through the Moroccan", "tradition."],
      body: "Memorization, Tajwīd, Rasm wa Dabt and Arabic language, with rigorous guidance rooted in the traditional schools of the Souss.",
      enroll: "Enroll",
      seeCursus: "View courses",
      imageAlt: "Traditional Quran teaching with tablets",
    },
    presentation: {
      badge: "Souss Al-'Ālima Institute",
      title: "An online school rooted in the transmission of the Souss.",
      body: "The institute supports French-speaking students in Quran learning, recitation and the foundations of Arabic, with a structured pedagogy faithful to Moroccan Quranic schools.",
      pillars: [["Warsh", "Core riwāya"], ["Souss", "Moroccan tradition"], ["Online", "Francophone format"]],
      objective: "Objective",
      objectiveText: "Transmit rigorous, progressive and human-centered teaching.",
      approach: "Approach",
      approachText: "Theory, practice, correction and individual guidance.",
      cta: "Explore courses",
      imageAlt: "Traditional Quran teaching in Morocco",
    },
    cursus: {
      badge: "Programs",
      title: "Clear, living and guided courses.",
      body: "Students choose a path, immediately understand the expected level, the goal and the supervision, then contact the institute directly on WhatsApp.",
      ticker: ["Quran", "Tajwīd", "Warsh", "Rasm wa Dabt", "Arabic", "Individual follow-up", "Transmission", "Zoom"],
      labels: {
        availableTitle: "Available courses",
        availableSub: "Choose a path to view details",
        rhythm: "Rhythm",
        level: "Level",
        outcome: "Goal",
        keyPoints: "Key points",
        keyPointsSub: "What the student works on",
        supervision: "Supervision",
        supervisionSub: "Course reference teacher",
        details: "Course details",
        detailsSub: "Organization and next step",
        detailsText: "Enrollment begins with a WhatsApp exchange. The student shares their level, availability and goal; the institute then guides them toward the most suitable course.",
        request: "Request this course",
        whatsapp: "WhatsApp",
      },
      items: [
        {
          title: "Quran Course",
          subtitle: "Memorization, correction and Quranic writing",
          description: "A progressive path to learn, correct and memorize the Quran with personal follow-up.",
          rhythm: "Regular follow-up",
          level: "Beginner to advanced",
          outcome: "Memorization, revision, daily wird and guided preparation",
          points: [
            "Memorization: begin or complete memorization of the Quran.",
            "Revision: consolidate what has been learned through regular guided review.",
            "Daily wird: follow a fixed daily portion, with explanation of its meanings to connect reading, understanding and reflection.",
            "Advanced work and ijāza: for students who have memorized the Quran, prepare an ijāza in one of the mutawātir readings after assessment and supervision approval. The ijāza is not automatic.",
          ],
          supervisorRole: "Quran teacher at Sidi Mokhtār",
          message: "Salam, I would like information about the Quran course at Souss Al-'Ālima Institute.",
        },
        {
          title: "Tajwīd Seminars",
          subtitle: "Theoretical and practical classes under supervision",
          description: "Seminars dedicated to Tajwīd and Warsh recitation, with specialized guidance.",
          rhythm: "Thursday at 9 PM",
          level: "Correct reading required",
          outcome: "More precise recitation according to Warsh",
          points: ["Warsh riwāya through Ṭarīq Yūsuf al-Arzāq", "Online classes via Zoom", "Theory and applied correction"],
          supervisorRole: "Tajwīd professor and program producer at Radio Mohammed VI of the Holy Quran",
          message: "Salam, I would like information about the Tajwīd seminars at Souss Al-'Ālima Institute.",
        },
        {
          title: "Arabic Language Course",
          subtitle: "Grammar, practice and narrative reading",
          description: "Arabic grammar taught according to the methodology of the traditional schools of the Souss.",
          rhythm: "Guided seminars",
          level: "Foundations to strengthen",
          outcome: "Grammatical understanding and a taste for the language",
          points: ["Study of Al-Ajroumiya", "Applied grammatical analysis", "Narrative reading as-sard"],
          supervisorRole: "Teacher at the traditional school of Ilmaten (Rasmouka)",
          message: "Salam, I would like information about the Arabic language course at Souss Al-'Ālima Institute.",
        },
      ],
    },
    methodology: {
      badge: "Methodology",
      title: "A traditional method, clear from the first lesson.",
      body: "Each student progresses with a simple framework: understand what needs correction, practice, receive feedback, then consolidate before moving forward.",
      imageAlt: "Traditional teaching with the lūḥa",
      imageBadge: "Lūḥa and digital",
      imageText: "The rigor of the traditional tablet, adapted to online follow-up.",
      step: "Step",
      steps: [["Diagnostic", "Identify the real level of reading, memorization and pronunciation."], ["Correction", "Work on recitation with precise feedback, without unnecessary overload."], ["Writing", "Integrate Rasm wa Dabt to connect reading, written support and memorization."], ["Follow-up", "Consolidate through murājaʿa, short goals and regularity."]],
      studentExperience: "Student experience",
      studentText: "Less visual repetition, more clarity in the path.",
      principle: "Principle",
      principleText: "Knowledge is received, practiced and verified with a teacher.",
    },
    riwayat: {
      badge: "Riwāyāt",
      title: "Three readings, one clear direction.",
      body: "The section distinguishes the proposed traditions without presenting them as identical blocks. Students immediately understand what relates to discovery, precision and the Moroccan specialty.",
      forWhom: "For whom?",
      origin: "Origin",
      workedPoints: "Points covered",
      specialty: "Our specialty",
      audience: ["Improve Quranic reading", "Memorize with clear structure", "Discover Rasm ʿUthmānī", "Study within a Moroccan Mālikī tradition"],
      items: [
        { description: "The most widespread reading in the Muslim world.", origin: "Kufa, Iraq", status: "Accessible foundation", features: ["Widely taught reading", "Simple landmarks", "Good entry point"] },
        { description: "A Medinan transmission connected to Imam Nāfiʿ.", origin: "School of Medina", status: "Classical precision", features: ["Medinan tradition", "Articulatory attention", "Progressive method"] },
        { description: "The institute's specialty, studied in the spirit of Moroccan schools.", origin: "Moroccan school", status: "Our specialty", features: ["Ṭarīq Yūsuf al-Arzāq", "Maghrebi tradition", "Link with the Sidi Mokhtār method"] },
      ],
    },
    supervision: {
      badge: "Supervision",
      title: "A chain of transmission, presented with clarity.",
      body: "Supervision is no longer a long biography that is hard to scan: the masters, teacher and current transmission are structured as a guided reading.",
      transmission: "Transmission",
      level: "Level",
      function: "Function",
      domains: "Transmitted fields",
      chain: ["Masters", "Teacher", "Students"],
      profiles: [
        { role: "al-ʿAllāma", label: "Master of sciences", place: "Tāfrawt, Souss", note: "Spiritual and scholarly master, known for teaching religious sciences and adab.", domains: ["Arabic language", "Fiqh", "Naḥw", "Uṣūl al-fiqh", "Manṭiq"] },
        { role: "al-Muqriʾ", label: "Master of Quran", place: "Baʿmrān, Southern Morocco", note: "A reference in faithful Quranic transmission, Rasm, Ḍabṭ and readings.", domains: ["ʿUlūm al-Qur'ān", "Mutashābih", "Rasm", "Ḍabṭ", "Qirāʾāt"] },
        { role: "The Teacher", label: "Current transmission", place: "Traditional school of Sidi Mokhtār", note: "Quran teacher trained in the Souss tradition, guiding students with rigor and pedagogy.", domains: ["Tajwīd", "Rasm wa Dabt", "Murājaʿa", "Personal follow-up", "Souss pedagogy"] },
      ],
    },
    contact: {
      badge: "Contact",
      title: "A question, request or enrollment?",
      body: "Write to us directly on WhatsApp with your level, desired course and availability. The message is prepared to make the process fast, without a repetitive form.",
      imageAlt: "Traditional Quran teaching",
      steps: ["Information request", "Guidance toward the right course", "Enrollment for upcoming sessions"],
      direct: "Direct WhatsApp",
      quick: ["Request", "Enrollment"],
      whatsappSuffix: "WhatsApp",
      seeCursus: "View courses",
      advice: "Advice",
      adviceText: "For a more precise answer, include your reading level, your goal and your preferred time slot.",
      messages: {
        information: "Salam, I would like information about the courses at Souss Al-'Ālima Institute.",
        inscription: "Salam, I would like to enroll in a training course at Souss Al-'Ālima Institute.",
      },
    },
    footer: {
      description: "Traditional online Quran teaching according to the method of Sidi Mokhtār",
      features: "Features",
      featureItems: ["Scheduled online classes", "Downloadable PDF sheets", "Student personal space", "Access to course videos"],
      links: "Quick links",
      contact: "Contact",
      rights: "© 2024 Souss Al-'Ālima Institute. All rights reserved.",
    },
  },
  es: {
    header: {
      institute: "Instituto Souss Al-'Ālima",
      nav: ["Inicio", "Cursos", "Metodología", "Riwāyāt", "Supervisión", "Contacto"],
      enroll: "Inscribirse",
      enrollWhatsapp: "Inscribirse por WhatsApp",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      language: "Idioma",
    },
    hero: {
      badge: "Enseñanza coránica en línea",
      title: ["Aprender el Corán,", "según la tradición", "marroquí."],
      body: "Memorización, Tajwīd, Rasm wa Dabt y lengua árabe, con un acompañamiento riguroso fiel a las escuelas tradicionales del Souss.",
      enroll: "Inscribirse",
      seeCursus: "Ver cursos",
      imageAlt: "Enseñanza tradicional del Corán con tablillas",
    },
    presentation: {
      badge: "Instituto Souss Al-'Ālima",
      title: "Una escuela en línea, arraigada en la transmisión del Souss.",
      body: "El instituto acompaña a francófonos en el aprendizaje del Corán, la recitación y las bases de la lengua árabe, con una pedagogía estructurada y fiel a las escuelas coránicas marroquíes.",
      pillars: [["Warsh", "Riwāya central"], ["Souss", "Tradición marroquí"], ["En línea", "Formato francófono"]],
      objective: "Objetivo",
      objectiveText: "Transmitir una enseñanza rigurosa, progresiva y humana.",
      approach: "Enfoque",
      approachText: "Teoría, práctica, corrección y acompañamiento individual.",
      cta: "Descubrir los cursos",
      imageAlt: "Enseñanza coránica tradicional en Marruecos",
    },
    cursus: {
      badge: "Programas",
      title: "Cursos claros, vivos y guiados.",
      body: "El alumno elige su recorrido, comprende de inmediato el nivel esperado, el objetivo y la supervisión, y puede escribir directamente al instituto por WhatsApp.",
      ticker: ["Corán", "Tajwīd", "Warsh", "Rasm wa Dabt", "Árabe", "Seguimiento individual", "Transmisión", "Zoom"],
      labels: {
        availableTitle: "Cursos disponibles",
        availableSub: "Elige un recorrido para ver el detalle",
        rhythm: "Ritmo",
        level: "Nivel",
        outcome: "Objetivo",
        keyPoints: "Puntos clave",
        keyPointsSub: "Lo que trabaja el alumno",
        supervision: "Supervisión",
        supervisionSub: "Referente del curso",
        details: "Detalles del recorrido",
        detailsSub: "Organización y siguiente paso",
        detailsText: "La inscripción empieza con un intercambio por WhatsApp. El alumno indica su nivel, disponibilidad y objetivo; el instituto puede orientarlo hacia el curso más adecuado.",
        request: "Solicitar este curso",
        whatsapp: "WhatsApp",
      },
      items: [
        {
          title: "Curso de Corán",
          subtitle: "Memorización, corrección y escritura coránica",
          description: "Un recorrido progresivo para aprender, corregir y memorizar el Corán con seguimiento personalizado.",
          rhythm: "Seguimiento regular",
          level: "Principiante a avanzado",
          outcome: "Memorización, revisión, wird diario y preparación guiada",
          points: [
            "Memorización: empezar o completar la memorización del Corán.",
            "Revisión: consolidar lo aprendido mediante una revisión regular y acompañada.",
            "Wird diario: seguir una porción diaria fija, con explicación de sus sentidos para unir lectura, comprensión y meditación.",
            "Perfeccionamiento e ijāza: para quienes han memorizado el Corán, preparar una ijāza en una de las lecturas mutawātir tras evaluación y validación del acompañamiento. La ijāza no es automática.",
          ],
          supervisorRole: "Profesor de Corán en Sidi Mokhtār",
          message: "Salam, quisiera información sobre el curso de Corán del Instituto Souss Al-'Ālima.",
        },
        {
          title: "Seminarios de Tajwīd",
          subtitle: "Clases teóricas y prácticas bajo supervisión",
          description: "Seminarios dedicados al Tajwīd y a la recitación según Warsh, con acompañamiento especializado.",
          rhythm: "Jueves a las 21h",
          level: "Lectura correcta requerida",
          outcome: "Recitación más precisa según Warsh",
          points: ["Riwāya Warsh por Ṭarīq Yūsuf al-Arzāq", "Clases en línea por Zoom", "Trabajo teórico y corrección aplicada"],
          supervisorRole: "Profesor de Tajwīd y productor de programas en Radio Mohammed VI del Sagrado Corán",
          message: "Salam, quisiera información sobre los seminarios de Tajwīd del Instituto Souss Al-'Ālima.",
        },
        {
          title: "Curso de lengua árabe",
          subtitle: "Gramática, práctica y lectura narrativa",
          description: "Una enseñanza de gramática árabe según la metodología de las escuelas tradicionales del Souss.",
          rhythm: "Seminarios guiados",
          level: "Bases por consolidar",
          outcome: "Comprensión gramatical y gusto por la lengua",
          points: ["Estudio de Al-Ajroumiya", "Análisis gramatical aplicado", "Lectura narrativa as-sard"],
          supervisorRole: "Profesor en la escuela tradicional de Ilmaten (Rasmouka)",
          message: "Salam, quisiera información sobre el curso de lengua árabe del Instituto Souss Al-'Ālima.",
        },
      ],
    },
    methodology: {
      badge: "Metodología",
      title: "Un método tradicional, claro desde la primera clase.",
      body: "Cada alumno avanza con un marco simple: comprender el punto a corregir, practicar, recibir una devolución y consolidar antes de pasar a la siguiente etapa.",
      imageAlt: "Enseñanza tradicional con la lūḥa",
      imageBadge: "Lūḥa y digital",
      imageText: "El rigor de la tablilla tradicional, adaptado al seguimiento en línea.",
      step: "Etapa",
      steps: [["Diagnóstico", "Identificar el nivel real de lectura, memorización y pronunciación."], ["Corrección", "Trabajar la recitación con devoluciones precisas, sin carga innecesaria."], ["Escritura", "Integrar el Rasm wa Dabt para unir lectura, soporte escrito y memorización."], ["Seguimiento", "Consolidar mediante murājaʿa, objetivos breves y regularidad."]],
      studentExperience: "Experiencia del alumno",
      studentText: "Menos repetición visual, más claridad en el recorrido.",
      principle: "Principio",
      principleText: "El saber se recibe, se practica y se verifica con un maestro.",
    },
    riwayat: {
      badge: "Riwāyāt",
      title: "Tres lecturas, una orientación clara.",
      body: "La sección distingue las tradiciones propuestas sin presentarlas como tres bloques idénticos. El alumno comprende enseguida qué corresponde al descubrimiento, la precisión y la especialidad marroquí.",
      forWhom: "¿Para quién?",
      origin: "Origen",
      workedPoints: "Puntos trabajados",
      specialty: "Nuestra especialidad",
      audience: ["Perfeccionar la lectura coránica", "Memorizar con una estructura clara", "Descubrir el Rasm ʿUthmānī", "Estudiar dentro de una tradición mālikí marroquí"],
      items: [
        { description: "La lectura más extendida en el mundo musulmán.", origin: "Kufa, Irak", status: "Base accesible", features: ["Lectura ampliamente enseñada", "Referencias simples", "Buena puerta de entrada"] },
        { description: "Una transmisión medinense vinculada al Imam Nāfiʿ.", origin: "Escuela de Medina", status: "Precisión clásica", features: ["Tradición medinense", "Atención articulatoria", "Método progresivo"] },
        { description: "La especialidad del instituto, estudiada en el espíritu de las escuelas marroquíes.", origin: "Escuela marroquí", status: "Nuestra especialidad", features: ["Ṭarīq Yūsuf al-Arzāq", "Tradición magrebí", "Vínculo con el método de Sidi Mokhtār"] },
      ],
    },
    supervision: {
      badge: "Supervisión",
      title: "Una cadena de transmisión, presentada con claridad.",
      body: "La supervisión ya no es una larga biografía difícil de recorrer: los maestros, el profesor y la transmisión actual están estructurados como una lectura guiada.",
      transmission: "Transmisión",
      level: "Nivel",
      function: "Función",
      domains: "Ámbitos transmitidos",
      chain: ["Maestros", "Profesor", "Alumnos"],
      profiles: [
        { role: "al-ʿAllāma", label: "Maestro de las ciencias", place: "Tāfrawt, Souss", note: "Maestro espiritual y científico, reconocido por su enseñanza de las ciencias religiosas y del adab.", domains: ["Lengua árabe", "Fiqh", "Naḥw", "Uṣūl al-fiqh", "Manṭiq"] },
        { role: "al-Muqriʾ", label: "Maestro del Corán", place: "Baʿmrān, sur de Marruecos", note: "Referencia en la transmisión fiel del Corán, del Rasm, del Ḍabṭ y de las lecturas.", domains: ["ʿUlūm al-Qur'ān", "Mutashābih", "Rasm", "Ḍabṭ", "Qirāʾāt"] },
        { role: "El profesor", label: "Transmisión actual", place: "Escuela tradicional de Sidi Mokhtār", note: "Profesor de Corán formado en la tradición del Souss, acompaña a los alumnos con rigor y pedagogía.", domains: ["Tajwīd", "Rasm wa Dabt", "Murājaʿa", "Seguimiento personalizado", "Pedagogía del Souss"] },
      ],
    },
    contact: {
      badge: "Contacto",
      title: "¿Una pregunta, solicitud o inscripción?",
      body: "Escríbenos directamente por WhatsApp con tu nivel, el curso deseado y tu disponibilidad. El mensaje está preparado para ir rápido, sin formulario repetitivo.",
      imageAlt: "Enseñanza coránica tradicional",
      steps: ["Solicitud de información", "Orientación hacia el curso adecuado", "Inscripción a próximas sesiones"],
      direct: "WhatsApp directo",
      quick: ["Solicitud", "Inscripción"],
      whatsappSuffix: "WhatsApp",
      seeCursus: "Ver cursos",
      advice: "Consejo",
      adviceText: "Para una respuesta más precisa, indica tu nivel de lectura, tu objetivo y el horario deseado.",
      messages: {
        information: "Salam, quisiera información sobre los cursos del Instituto Souss Al-'Ālima.",
        inscription: "Salam, quisiera inscribirme en una formación del Instituto Souss Al-'Ālima.",
      },
    },
    footer: {
      description: "Enseñanza tradicional del Corán en línea según el método de Sidi Mokhtār",
      features: "Funciones",
      featureItems: ["Clases en línea programadas", "Fichas PDF descargables", "Espacio personal del alumno", "Acceso a vídeos de clases"],
      links: "Enlaces rápidos",
      contact: "Contacto",
      rights: "© 2024 Instituto Souss Al-'Ālima. Todos los derechos reservados.",
    },
  },
} as const;

type Translation = typeof translations.fr;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    window.localStorage.setItem("souss-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: translations[language] as Translation,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
};
