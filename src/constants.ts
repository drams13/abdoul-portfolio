// --- Data ---
export const CONTACT_INFO = {
  name: "OUATTARA ABDOUL DRAMANE",
  title: "DÉVELOPPEUR WEB FULL-STACK & MOBILE",
  email: "ouattaraabdouldramane8@gmail.com",
  phones: ["05 94 10 65 76", "07 87 83 89 80"],
  location: "Adjame, Abidjan",
  linkedin: "https://www.linkedin.com/in/abdoul-dramane-ouattara-a141583a8",
  github: "https://github.com/drams13"
};

export const SKILLS = [
  {
    category: "Langages",
    icon: "Code2",
    items: ["Python", "PHP", "Java EE", "JavaScript", "C#", "C", "Dart", "Kotlin"]
  },
  {
    category: "Frameworks & Web",
    icon: "Globe",
    items: ["Laravel", "React", "Node.js", "Django", "FastAPI"]
  },
  {
    category: "Mobile",
    icon: "Smartphone",
    items: ["Flutter", "Ionic", "Android Studio"]
  },
  {
    category: "IA & Data",
    icon: "BrainCircuit",
    items: ["Machine Learning", "PostgreSQL", "MySQL", "MongoDB", "shared_preferences"]
  },
  {
    category: "Design & Outils",
    icon: "Palette",
    items: ["UI/UX", "Figma", "VS Code", "Cursor", "Agile (Scrum)"]
  },
  {
    category: "Réseaux",
    icon: "Network",
    items: ["Câblage réseau", "Configuration IP", "Maintenance SI"]
  }
];

export const MATRIX_SKILLS = [
  { name: "Python", level: 75 },
  { name: "Laravel", level: 60 },
  { name: "Django", level: 60 },
  { name: "Flutter", level: 60 },
  { name: "Android Studio", level: 70 },
  { name: "React Fullstack", level: 60 },
  { name: "Node.js", level: 60 },
];

export const EXPERIENCES = [
  {
    company: "IDT | Société Ivoirienne de Télédiffusion",
    period: "Juin 2024 – Mars 2025",
    location: "Abidjan, Côte d’Ivoire",
    role: "Stagiaire Développeur & Support IT",
    description: [
      "Résolution de plus de 100+ incidents techniques (matériel, logiciels, réseau).",
      "Maintenance préventive et corrective des systèmes informatiques.",
      "Conception et développement d'une application de gestion des présences du personnel (Laravel/MySQL)."
    ]
  }
];

export const PROJECTS = [
  {
    title: "Système IA de Détection Respiratoire",
    tech: ["Python", "FastAPI", "Node.js"],
    description: "Développement d’un système IA multicapteurs pour la détection automatisée de maladies respiratoires.",
    image: "/projects/ia-detection.png"
  },
  {
    title: "Akwaaba Ivoire Quiz",
    tech: ["Android", "Kotlin", "shared_preferences"],
    description: "Application mobile alliant culture ivoirienne et jeux éducatifs pour valoriser le patrimoine national.",
    image: "/projects/akwaaba-quiz.png"
  },
  {
    title: "E-Learning Plateforme",
    tech: ["Java EE", "Maven", "PostgreSQL"],
    description: "Plateforme d’apprentissage robuste pour la gestion des cours et des utilisateurs.",
    image: "/projects/e-learning.png"
  },
  {
    title: "Gestion de Cours Agile",
    tech: ["React", "Node.js", "Agile"],
    description: "Application web d'organisation de planning enseignant basée sur la méthodologie Agile.",
    image: "/projects/gestion-agile.png"
  }
];

export const EDUCATION = [
  {
    degree: "Licence Développeur d’Application Système d’Information (DASI)",
    school: "ESATIC (École Supérieure Africaine des TIC)",
    period: "2024 – Présent",
    location: "Treichville, Abidjan"
  },
  {
    degree: "BTS Informatique Développeur d’Application",
    school: "Groupe CEFIAT",
    period: "2021 – 2023",
    location: "Plateau, Abidjan"
  },
  {
    degree: "Baccalauréat Série Scientifique D",
    school: "Lycée Moderne Koun-Fao",
    period: "2020 – 2021",
    location: "Koun-Fao, Côte d'Ivoire"
  }
];