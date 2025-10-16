import type { JobAnalysisResult } from './types';

export const translations = {
  fr: {
    languageName: "Français",
    title: "PrepMyJob",
    subtitle: "Collez une offre d'emploi ou de stage pour préparer votre candidature.",
    placeholder: "Collez l'offre d'emploi ici...",
    urlPlaceholder: "Ou collez le lien (URL) de l'offre ici...",
    buttonText: "Analyser",
    buttonLoading: "Analyse en cours...",
    error: "Une erreur est survenue. Veuillez réessayer.",
    copy: "Copier",
    copied: "Copié !",
    exportPdf: "Exporter en PDF",
    
    // Welcome/Discover Page
    discoverPage: {
      title: "Bienvenue sur PrepMyJob.",
      subtitle: "Votre assistant IA pour décrocher le job de vos rêves. Analysez, préparez et postulez avec confiance.",
      ctaButton: "Essayer maintenant",
      featuresTitle: "Comment ça marche ?",
      features: {
        jobAnalysis: {
          title: "Analyse d'Offre",
          description: "Extrayez les informations clés d'une offre d'emploi pour mieux la comprendre."
        },
        cvAnalysis: {
          title: "Analyse de CV",
          description: "Obtenez un score de compatibilité et des conseils pour optimiser votre CV."
        },
        coverLetter: {
          title: "Lettre de Motivation",
          description: "Générez une lettre de motivation personnalisée et percutante en quelques clics."
        },
        interviewPrep: {
          title: "Préparation à l'Entretien",
          description: "Entraînez-vous avec des questions d'entretien sur mesure et recevez des feedbacks."
        }
      }
    },
    
    // Header
    header: {
      home: "Accueil",
      discover: "Découvrir",
      myAnalyses: "Mes Analyses",
      profile: "Profil",
      logout: "Déconnexion",
      login: "Connexion"
    },

    // Tabs Navigation
    tabs: {
      jobAnalysis: "Analyse d'Offre",
      cvAnalysis: "Analyse de CV",
      coverLetter: "Lettre de Motivation",
      interviewPrep: "Préparation Entretien"
    },

    // Job Analysis Page
    analysisHeadings: {
      keyPoints: "Points Clés du Poste",
      dailyTasks: "Missions Quotidiennes",
      tools: "Outils et Technologies",
      dailyRoutine: "Routine Journalière Typique",
      motivation: "Ce qui Motive pour ce Poste",
      interviewPoints: "Points à Aborder en Entretien"
    },
    
    // CV Analysis Page
    cvAnalysisPage: {
        title: "Analysez votre CV par rapport à l'offre d'emploi.",
        subtitle: "Téléchargez votre CV pour obtenir un score de compatibilité et des recommandations personnalisées.",
        jobOfferTitle: "1. Offre d'emploi",
        cvTitle: "2. Votre CV",
        resultsTitle: "Résultats de l'analyse",
        score: "Score de compatibilité",
        summary: "Résumé",
        keywordMatch: "Correspondance des mots-clés",
        presentKeywords: "Mots-clés présents",
        missingKeywords: "Mots-clés manquants",
        recommendations: "Recommandations"
    },

    // Cover Letter Page
    coverLetterPage: {
        title: "Générez une lettre de motivation sur mesure.",
        subtitle: "Remplissez vos informations pour créer une lettre qui se démarque.",
        formTitle: "Vos informations",
        fullName: "Nom complet",
        experienceLevel: "Niveau d'expérience (ex: 5 ans en développement web)",
        objective: "Objectif pour ce poste (ex: Apporter mon expertise en React)",
        keyStrengths: "Forces clés (optionnel, ex: Autonome, créatif)",
        tone: "Ton de la lettre",
        tones: {
            formel: 'Formel',
            professionnel: 'Professionnel',
            dynamique: 'Dynamique'
        },
        generateButton: "Générer la lettre",
        resultTitle: "Votre lettre de motivation"
    },

    // Interview Prep Page
    interviewPrepPage: {
        title: "Préparez votre entretien avec des questions ciblées.",
        subtitle: "Générez des questions probables et entraînez-vous à y répondre.",
        useCv: "Personnaliser les questions avec mon CV",
        generateButton: "Générer les questions",
        resultTitle: "Vos questions d'entretien",
        userAnswerTitle: "Votre réponse",
        userAnswerPlaceholder: "Écrivez votre réponse ici...",
        getFeedbackButton: "Obtenir un feedback",
        feedbackTitle: "Feedback"
    },
    
    // Dropzone Component
    dropzone: {
        title: "Cliquez pour choisir un fichier ou déposez-le ici",
        subtitle: "Faites glisser et déposez votre CV ici",
        accepted: "Fichiers acceptés : .pdf, .docx (max 5MB)",
        processing: "Traitement du fichier...",
        fileReady: "Fichier prêt :",
        changeFile: "Changer de fichier",
        sizeError: "Fichier trop volumineux. La taille maximale est de 5MB.",
        unsupportedError: "Type de fichier non supporté. Veuillez utiliser .pdf ou .docx.",
        pdfError: "Erreur lors de la lecture du PDF. Est-il corrompu ?",
        docxError: "Erreur lors de la lecture du DOCX.",
        genericError: "Une erreur est survenue lors du traitement du fichier."
    },

    // Auth Page
    authPage: {
      title: "Bienvenue",
      subtitle: "Connectez-vous pour sauvegarder vos analyses",
      email: "Adresse e-mail",
      password: "Mot de passe",
      loginButton: "Se connecter",
      registerButton: "S'inscrire",
      googleButton: "Continuer avec Google",
      linkedinButton: "Continuer avec LinkedIn",
      registerCta: "Pas encore de compte ?",
      loginCta: "Déjà un compte ?",
    },

    // My Analyses Page
    myAnalysesPage: {
      title: "Mes Analyses",
      subtitle: "Retrouvez ici toutes vos analyses sauvegardées.",
      noAnalyses: "Vous n'avez pas encore d'analyse sauvegardée. Commencez par analyser une offre d'emploi !",
    },

    // Profile Page
    profilePage: {
      title: "Mon Profil",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      targetRole: "Poste recherché",
      industry: "Secteur d'activité",
      saveButton: "Sauvegarder les modifications",
      changePassword: "Changer le mot de passe",
      deleteAccount: "Supprimer le compte",
    }
  },
  en: {
    languageName: "English",
    title: "PrepMyJob",
    subtitle: "Paste a job or internship offer to prepare for your application.",
    placeholder: "Paste the job offer here...",
    urlPlaceholder: "Or paste the link (URL) of the offer here...",
    buttonText: "Analyze",
    buttonLoading: "Analyzing...",
    error: "An error occurred. Please try again.",
    copy: "Copy",
    copied: "Copied!",
    exportPdf: "Export to PDF",

    // Welcome/Discover Page
    discoverPage: {
      title: "Welcome to PrepMyJob.",
      subtitle: "Your AI assistant to land your dream job. Analyze, prepare, and apply with confidence.",
      ctaButton: "Try now",
      featuresTitle: "How it works?",
      features: {
        jobAnalysis: {
          title: "Job Analysis",
          description: "Extract key information from a job offer to better understand it."
        },
        cvAnalysis: {
          title: "CV Analysis",
          description: "Get a compatibility score and tips to optimize your resume."
        },
        coverLetter: {
          title: "Cover Letter",
          description: "Generate a personalized and impactful cover letter in just a few clicks."
        },
        interviewPrep: {
          title: "Interview Prep",
          description: "Practice with tailored interview questions and receive feedback."
        }
      }
    },

    // Header
    header: {
      home: "Home",
      discover: "Discover",
      myAnalyses: "My Analyses",
      profile: "Profile",
      logout: "Logout",
      login: "Login"
    },

    // Tabs Navigation
    tabs: {
      jobAnalysis: "Job Analysis",
      cvAnalysis: "CV Analysis",
      coverLetter: "Cover Letter",
      interviewPrep: "Interview Prep"
    },

    // Job Analysis Page
    analysisHeadings: {
      keyPoints: "Key Points of the Role",
      dailyTasks: "Daily Tasks",
      tools: "Tools and Technologies",
      dailyRoutine: "Typical Daily Routine",
      motivation: "What Motivates for this Role",
      interviewPoints: "Points to Address in an Interview"
    },

    // CV Analysis Page
    cvAnalysisPage: {
        title: "Analyze your CV against the job offer.",
        subtitle: "Upload your CV to get a compatibility score and personalized recommendations.",
        jobOfferTitle: "1. Job Offer",
        cvTitle: "2. Your CV",
        resultsTitle: "Analysis Results",
        score: "Compatibility Score",
        summary: "Summary",
        keywordMatch: "Keyword Match",
        presentKeywords: "Present Keywords",
        missingKeywords: "Missing Keywords",
        recommendations: "Recommendations"
    },

    // Cover Letter Page
    coverLetterPage: {
        title: "Generate a tailor-made cover letter.",
        subtitle: "Fill in your information to create a letter that stands out.",
        formTitle: "Your Information",
        fullName: "Full Name",
        experienceLevel: "Experience level (e.g., 5 years in web development)",
        objective: "Objective for this role (e.g., To bring my expertise in React)",
        keyStrengths: "Key strengths (optional, e.g., Autonomous, creative)",
        tone: "Tone of the letter",
        tones: {
            formel: 'Formal',
            professionnel: 'Professional',
            dynamique: 'Dynamic'
        },
        generateButton: "Generate Letter",
        resultTitle: "Your Cover Letter"
    },

    // Interview Prep Page
    interviewPrepPage: {
        title: "Prepare for your interview with targeted questions.",
        subtitle: "Generate likely questions and practice answering them.",
        useCv: "Personalize questions with my CV",
        generateButton: "Generate Questions",
        resultTitle: "Your Interview Questions",
        userAnswerTitle: "Your Answer",
        userAnswerPlaceholder: "Write your answer here...",
        getFeedbackButton: "Get Feedback",
        feedbackTitle: "Feedback"
    },

    // Dropzone Component
    dropzone: {
        title: "Click to upload a file or drag and drop",
        subtitle: "Drag and drop your CV here",
        accepted: "Accepted files: .pdf, .docx (max 5MB)",
        processing: "Processing file...",
        fileReady: "File ready:",
        changeFile: "Change file",
        sizeError: "File is too large. Maximum size is 5MB.",
        unsupportedError: "Unsupported file type. Please use .pdf or .docx.",
        pdfError: "Error reading PDF file. Is it corrupted?",
        docxError: "Error reading DOCX file.",
        genericError: "An error occurred while processing the file."
    },

    // Auth Page
    authPage: {
      title: "Welcome",
      subtitle: "Log in to save your analyses",
      email: "Email address",
      password: "Password",
      loginButton: "Log in",
      registerButton: "Sign up",
      googleButton: "Continue with Google",
      linkedinButton: "Continue with LinkedIn",
      registerCta: "Don't have an account?",
      loginCta: "Already have an account?",
    },

    // My Analyses Page
    myAnalysesPage: {
      title: "My Analyses",
      subtitle: "Find all your saved analyses here.",
      noAnalyses: "You don't have any saved analyses yet. Start by analyzing a job offer!",
    },

    // Profile Page
    profilePage: {
      title: "My Profile",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      targetRole: "Target Role",
      industry: "Industry",
      saveButton: "Save Changes",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",
    }
  },
  es: {
    languageName: "Español",
    title: "PrepMyJob",
    subtitle: "Pega una oferta de trabajo o prácticas para preparar tu solicitud.",
    placeholder: "Pega la oferta de trabajo aquí...",
    urlPlaceholder: "O pega el enlace (URL) de la oferta aquí...",
    buttonText: "Analizar",
    buttonLoading: "Analizando...",
    error: "Ocurrió un error. Por favor, inténtalo de nuevo.",
    copy: "Copiar",
    copied: "¡Copiado!",
    exportPdf: "Exportar a PDF",

    discoverPage: {
      title: "Bienvenido a PrepMyJob.",
      subtitle: "Tu asistente de IA para conseguir el trabajo de tus sueños. Analiza, prepárate y postula con confianza.",
      ctaButton: "Probar ahora",
      featuresTitle: "¿Cómo funciona?",
      features: {
        jobAnalysis: { title: "Análisis de Oferta", description: "Extrae información clave de una oferta de trabajo para entenderla mejor." },
        cvAnalysis: { title: "Análisis de CV", description: "Obtén una puntuación de compatibilidad y consejos para optimizar tu currículum." },
        coverLetter: { title: "Carta de Presentación", description: "Genera una carta de presentación personalizada e impactante en pocos clics." },
        interviewPrep: { title: "Preparación de Entrevista", description: "Practica con preguntas de entrevista personalizadas y recibe comentarios." }
      }
    },
    header: { home: "Inicio", discover: "Descubrir", myAnalyses: "Mis Análisis", profile: "Perfil", logout: "Cerrar sesión", login: "Iniciar sesión" },
    tabs: { jobAnalysis: "Análisis de Oferta", cvAnalysis: "Análisis de CV", coverLetter: "Carta de Presentación", interviewPrep: "Preparación Entrevista" },
    analysisHeadings: { keyPoints: "Puntos Clave del Puesto", dailyTasks: "Tareas Diarias", tools: "Herramientas y Tecnologías", dailyRoutine: "Rutina Diaria Típica", motivation: "Motivación para este Puesto", interviewPoints: "Puntos a Tratar en la Entrevista" },
    cvAnalysisPage: { title: "Analiza tu CV en comparación con la oferta de trabajo.", subtitle: "Sube tu CV para obtener una puntuación de compatibilidad y recomendaciones personalizadas.", jobOfferTitle: "1. Oferta de trabajo", cvTitle: "2. Tu CV", resultsTitle: "Resultados del Análisis", score: "Puntuación de Compatibilidad", summary: "Resumen", keywordMatch: "Coincidencia de Palabras Clave", presentKeywords: "Palabras Clave Presentes", missingKeywords: "Palabras Clave Faltantes", recommendations: "Recomendaciones" },
    coverLetterPage: { title: "Genera una carta de presentación a medida.", subtitle: "Completa tu información para crear una carta que destaque.", formTitle: "Tu Información", fullName: "Nombre Completo", experienceLevel: "Nivel de experiencia", objective: "Objetivo para este puesto", keyStrengths: "Fortalezas clave (opcional)", tone: "Tono de la carta", tones: { formel: 'Formal', professionnel: 'Profesional', dynamique: 'Dinámico' }, generateButton: "Generar Carta", resultTitle: "Tu Carta de Presentación" },
    interviewPrepPage: { title: "Prepárate para tu entrevista con preguntas específicas.", subtitle: "Genera preguntas probables y practica tus respuestas.", useCv: "Personalizar preguntas con mi CV", generateButton: "Generar Preguntas", resultTitle: "Tus Preguntas de Entrevista", userAnswerTitle: "Tu Respuesta", userAnswerPlaceholder: "Escribe tu respuesta aquí...", getFeedbackButton: "Obtener Feedback", feedbackTitle: "Feedback" },
    dropzone: { title: "Haz clic para subir un archivo o arrástralo aquí", subtitle: "Arrastra y suelta tu CV aquí", accepted: "Archivos aceptados: .pdf, .docx (máx 5MB)", processing: "Procesando archivo...", fileReady: "Archivo listo:", changeFile: "Cambiar archivo", sizeError: "El archivo es demasiado grande. El tamaño máximo es 5MB.", unsupportedError: "Tipo de archivo no compatible. Usa .pdf o .docx.", pdfError: "Error al leer el PDF. ¿Está dañado?", docxError: "Error al leer el DOCX.", genericError: "Ocurrió un error al procesar el archivo." },
    authPage: { title: "Bienvenido", subtitle: "Inicia sesión para guardar tus análisis", email: "Correo electrónico", password: "Contraseña", loginButton: "Iniciar sesión", registerButton: "Registrarse", googleButton: "Continuar con Google", linkedinButton: "Continuar con LinkedIn", registerCta: "¿No tienes cuenta?", loginCta: "¿Ya tienes una cuenta?" },
    myAnalysesPage: { title: "Mis Análisis", subtitle: "Encuentra todos tus análisis guardados aquí.", noAnalyses: "Aún no tienes análisis guardados. ¡Empieza analizando una oferta!" },
    profilePage: { title: "Mi Perfil", firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", targetRole: "Puesto Buscado", industry: "Industria", saveButton: "Guardar Cambios", changePassword: "Cambiar Contraseña", deleteAccount: "Eliminar Cuenta" }
  },
  de: {
    languageName: "Deutsch",
    title: "PrepMyJob",
    subtitle: "Fügen Sie eine Stellenanzeige oder ein Praktikumsangebot ein, um Ihre Bewerbung vorzubereiten.",
    placeholder: "Stellenangebot hier einfügen...",
    urlPlaceholder: "Oder Link (URL) zum Angebot hier einfügen...",
    buttonText: "Analysieren",
    buttonLoading: "Analysiere...",
    error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    copy: "Kopieren",
    copied: "Kopiert!",
    exportPdf: "Als PDF exportieren",

    discoverPage: {
      title: "Willkommen bei PrepMyJob.",
      subtitle: "Ihr KI-Assistent, um Ihren Traumjob zu finden. Analysieren, vorbereiten und bewerben Sie sich mit Zuversicht.",
      ctaButton: "Jetzt ausprobieren",
      featuresTitle: "Wie es funktioniert?",
      features: {
        jobAnalysis: { title: "Stellenanalyse", description: "Extrahieren Sie wichtige Informationen aus einem Stellenangebot, um es besser zu verstehen." },
        cvAnalysis: { title: "Lebenslaufanalyse", description: "Erhalten Sie einen Kompatibilitäts-Score und Tipps zur Optimierung Ihres Lebenslaufs." },
        coverLetter: { title: "Anschreiben", description: "Erstellen Sie mit wenigen Klicks ein personalisiertes und aussagekräftiges Anschreiben." },
        interviewPrep: { title: "Bewerbungsgespräch-Vorbereitung", description: "Üben Sie mit maßgeschneiderten Interviewfragen und erhalten Sie Feedback." }
      }
    },
    header: { home: "Startseite", discover: "Entdecken", myAnalyses: "Meine Analysen", profile: "Profil", logout: "Abmelden", login: "Anmelden" },
    tabs: { jobAnalysis: "Stellenanalyse", cvAnalysis: "Lebenslaufanalyse", coverLetter: "Anschreiben", interviewPrep: "Gesprächsvorbereitung" },
    analysisHeadings: { keyPoints: "Schlüsselpunkte der Stelle", dailyTasks: "Tägliche Aufgaben", tools: "Tools und Technologien", dailyRoutine: "Typischer Tagesablauf", motivation: "Motivation für diese Stelle", interviewPoints: "Im Gespräch anzusprechende Punkte" },
    cvAnalysisPage: { title: "Analysieren Sie Ihren Lebenslauf im Vergleich zum Stellenangebot.", subtitle: "Laden Sie Ihren Lebenslauf hoch, um einen Kompatibilitäts-Score und persönliche Empfehlungen zu erhalten.", jobOfferTitle: "1. Stellenangebot", cvTitle: "2. Ihr Lebenslauf", resultsTitle: "Analyseergebnisse", score: "Kompatibilitäts-Score", summary: "Zusammenfassung", keywordMatch: "Schlüsselwort-Übereinstimmung", presentKeywords: "Vorhandene Schlüsselwörter", missingKeywords: "Fehlende Schlüsselwörter", recommendations: "Empfehlungen" },
    coverLetterPage: { title: "Erstellen Sie ein maßgeschneidertes Anschreiben.", subtitle: "Füllen Sie Ihre Informationen aus, um ein herausragendes Schreiben zu erstellen.", formTitle: "Ihre Informationen", fullName: "Vollständiger Name", experienceLevel: "Erfahrungsniveau", objective: "Ziel für diese Position", keyStrengths: "Hauptstärken (optional)", tone: "Ton des Schreibens", tones: { formel: 'Formell', professionnel: 'Professionell', dynamique: 'Dynamisch' }, generateButton: "Schreiben erstellen", resultTitle: "Ihr Anschreiben" },
    interviewPrepPage: { title: "Bereiten Sie sich mit gezielten Fragen auf Ihr Gespräch vor.", subtitle: "Generieren Sie wahrscheinliche Fragen und üben Sie, sie zu beantworten.", useCv: "Fragen mit meinem Lebenslauf personalisieren", generateButton: "Fragen generieren", resultTitle: "Ihre Interviewfragen", userAnswerTitle: "Ihre Antwort", userAnswerPlaceholder: "Schreiben Sie Ihre Antwort hier...", getFeedbackButton: "Feedback erhalten", feedbackTitle: "Feedback" },
    dropzone: { title: "Klicken Sie zum Hochladen oder ziehen Sie eine Datei hierher", subtitle: "Ziehen Sie Ihren Lebenslauf hierher", accepted: "Akzeptierte Dateien: .pdf, .docx (max 5MB)", processing: "Datei wird verarbeitet...", fileReady: "Datei bereit:", changeFile: "Datei ändern", sizeError: "Datei ist zu groß. Maximale Größe ist 5MB.", unsupportedError: "Nicht unterstützter Dateityp. Bitte .pdf oder .docx verwenden.", pdfError: "Fehler beim Lesen der PDF-Datei. Ist sie beschädigt?", docxError: "Fehler beim Lesen der DOCX-Datei.", genericError: "Beim Verarbeiten der Datei ist ein Fehler aufgetreten." },
    authPage: { title: "Willkommen", subtitle: "Melden Sie sich an, um Ihre Analysen zu speichern", email: "E-Mail-Adresse", password: "Passwort", loginButton: "Anmelden", registerButton: "Registrieren", googleButton: "Mit Google fortfahren", linkedinButton: "Mit LinkedIn fortfahren", registerCta: "Noch kein Konto?", loginCta: "Haben Sie bereits ein Konto?" },
    myAnalysesPage: { title: "Meine Analysen", subtitle: "Hier finden Sie alle Ihre gespeicherten Analysen.", noAnalyses: "Sie haben noch keine Analysen gespeichert. Beginnen Sie mit der Analyse eines Stellenangebots!" },
    profilePage: { title: "Mein Profil", firstName: "Vorname", lastName: "Nachname", email: "E-Mail", targetRole: "Zielposition", industry: "Branche", saveButton: "Änderungen speichern", changePassword: "Passwort ändern", deleteAccount: "Konto löschen" }
  },
  ar: {
    languageName: "العربية",
    title: "PrepMyJob",
    subtitle: "الصق عرض وظيفة أو تدريب لإعداد طلبك.",
    placeholder: "الصق عرض العمل هنا...",
    urlPlaceholder: "أو الصق رابط (URL) العرض هنا...",
    buttonText: "تحليل",
    buttonLoading: "جاري التحليل...",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    copy: "نسخ",
    copied: "تم النسخ!",
    exportPdf: "تصدير كملف PDF",
    discoverPage: {
      title: "مرحبًا بك في PrepMyJob.",
      subtitle: "مساعدك الذكي للحصول على وظيفة أحلامك. حلل، استعد، وقدم بثقة.",
      ctaButton: "جرب الآن",
      featuresTitle: "كيف يعمل؟",
      features: {
        jobAnalysis: { title: "تحليل العرض", description: "استخرج المعلومات الأساسية من عرض العمل لفهمه بشكل أفضل." },
        cvAnalysis: { title: "تحليل السيرة الذاتية", description: "احصل على درجة توافق ونصائح لتحسين سيرتك الذاتية." },
        coverLetter: { title: "خطاب التقديم", description: "أنشئ خطاب تقديم مخصصًا ومؤثرًا ببضع نقرات." },
        interviewPrep: { title: "التحضير للمقابلة", description: "تدرب على أسئلة مقابلة مخصصة واحصل على تقييمات." }
      }
    },
    header: { home: "الرئيسية", discover: "اكتشف", myAnalyses: "تحليلاتي", profile: "الملف الشخصي", logout: "تسجيل الخروج", login: "تسجيل الدخول" },
    tabs: { jobAnalysis: "تحليل العرض", cvAnalysis: "تحليل السيرة الذاتية", coverLetter: "خطاب التقديم", interviewPrep: "التحضير للمقابلة" },
    analysisHeadings: { keyPoints: "النقاط الرئيسية للوظيفة", dailyTasks: "المهام اليومية", tools: "الأدوات والتقنيات", dailyRoutine: "الروتين اليومي المعتاد", motivation: "ما يحفز لهذه الوظيفة", interviewPoints: "نقاط لمناقشتها في المقابلة" },
    cvAnalysisPage: { title: "حلل سيرتك الذاتية مقارنة بعرض العمل.", subtitle: "قم بتحميل سيرتك الذاتية للحصول على درجة توافق وتوصيات مخصصة.", jobOfferTitle: "1. عرض العمل", cvTitle: "2. سيرتك الذاتية", resultsTitle: "نتائج التحليل", score: "درجة التوافق", summary: "ملخص", keywordMatch: "تطابق الكلمات الرئيسية", presentKeywords: "الكلمات الرئيسية الموجودة", missingKeywords: "الكلمات الرئيسية المفقودة", recommendations: "التوصيات" },
    coverLetterPage: { title: "أنشئ خطاب تقديم مخصص.", subtitle: "املأ معلوماتك لإنشاء خطاب يبرز.", formTitle: "معلوماتك", fullName: "الاسم الكامل", experienceLevel: "مستوى الخبرة (مثال: 5 سنوات في تطوير الويب)", objective: "الهدف من هذه الوظيفة (مثال: تقديم خبرتي في React)", keyStrengths: "نقاط القوة الرئيسية (اختياري، مثال: مستقل، مبدع)", tone: "نبرة الخطاب", tones: { formel: 'رسمي', professionnel: 'مهني', dynamique: 'ديناميكي' }, generateButton: "إنشاء الخطاب", resultTitle: "خطاب التقديم الخاص بك" },
    interviewPrepPage: { title: "استعد لمقابلتك بأسئلة مستهدفة.", subtitle: "أنشئ أسئلة محتملة وتدرب على الإجابة عليها.", useCv: "تخصيص الأسئلة باستخدام سيرتي الذاتية", generateButton: "إنشاء الأسئلة", resultTitle: "أسئلة المقابلة الخاصة بك", userAnswerTitle: "إجابتك", userAnswerPlaceholder: "اكتب إجابتك هنا...", getFeedbackButton: "الحصول على تقييم", feedbackTitle: "تقييم" },
    dropzone: { title: "انقر لاختيار ملف أو قم بسحبه وإفلاته هنا", subtitle: "اسحب وأفلت سيرتك الذاتية هنا", accepted: "الملفات المقبولة: .pdf, .docx (5 ميغابايت كحد أقصى)", processing: "جاري معالجة الملف...", fileReady: "الملف جاهز:", changeFile: "تغيير الملف", sizeError: "الملف كبير جدًا. الحجم الأقصى هو 5 ميغابايت.", unsupportedError: "نوع الملف غير مدعوم. يرجى استخدام .pdf أو .docx.", pdfError: "خطأ في قراءة ملف PDF. هل هو تالف؟", docxError: "خطأ في قراءة ملف DOCX.", genericError: "حدث خطأ أثناء معالجة الملف." },
    authPage: { title: "مرحبًا", subtitle: "سجل الدخول لحفظ تحليلاتك", email: "عنوان البريد الإلكتروني", password: "كلمة المرور", loginButton: "تسجيل الدخول", registerButton: "إنشاء حساب", googleButton: "المتابعة باستخدام Google", linkedinButton: "المتابعة باستخدام LinkedIn", registerCta: "ليس لديك حساب بعد؟", loginCta: "هل لديك حساب بالفعل؟" },
    myAnalysesPage: { title: "تحليلاتي", subtitle: "تجد هنا جميع تحليلاتك المحفوظة.", noAnalyses: "ليس لديك أي تحليلات محفوظة بعد. ابدأ بتحليل عرض عمل!" },
    profilePage: { title: "ملفي الشخصي", firstName: "الاسم الأول", lastName: "اسم العائلة", email: "البريد الإلكتروني", targetRole: "الوظيفة المستهدفة", industry: "قطاع النشاط", saveButton: "حفظ التغييرات", changePassword: "تغيير كلمة المرور", deleteAccount: "حذف الحساب" }
  }
};