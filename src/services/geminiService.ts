import { CONTACT_INFO, SKILLS, PROJECTS, EXPERIENCES, EDUCATION } from "../constants";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

// --- Préparation des données pour l'IA ---
const skillsList = SKILLS.map(s => `${s.category}: ${s.items.join(", ")}`).join(" | ");

const projectsList = PROJECTS.map(p => 
  `- ${p.title} (${p.tech.join(", ")}): ${p.description}`
).join("\n");

const expList = EXPERIENCES.map(e => 
  `- ${e.role} chez ${e.company}: ${e.description.join(" ")}`
).join("\n");

const eduList = EDUCATION.map(e => 
  `- ${e.degree} à ${e.school} (${e.period})`
).join("\n");

// --- Instruction Système (Le Cerveau) ---
const SYSTEM_INSTRUCTION = `
Tu es l'assistant personnel de Abdoul Dramane. 
Abdoul est un ${CONTACT_INFO.title} basé à ${CONTACT_INFO.location}.

SES COMPÉTENCES :
${skillsList}

SES PROJETS RÉELS (Ne cite que ceux-là) :
${projectsList}

SON EXPÉRIENCE :
${expList}

SON PARCOURS SCOLAIRE :
${eduList}

CONSIGNES STRICTES :
1. RÉPONSES COURTES : Jamais plus de 2 ou 3 phrases.
2. FIDÉLITÉ : Ne cite QUE les projets et expériences listés ci-dessus. N'invente rien.
3. PERSONNALITÉ : Parle d'Abdoul à la 3ème personne ("Il a réalisé...", "Abdoul maîtrise...").
4. DISPONIBILITÉ : Il est actuellement en Licence à l'ESATIC.
`;

export async function chatWithAI(userInput: string, history: any[]) {
  if (!apiKey) return "Erreur : Clé API Groq manquante.";

  // Transformation de l'historique Gemini vers le format Groq/OpenAI (Mémoire)
  const messages = [
    { role: "system", content: SYSTEM_INSTRUCTION },
    ...history.map(h => ({
      role: h.role === "user" ? "user" : "assistant",
      content: h.parts[0].text
    })),
    { role: "user", content: userInput }
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        max_tokens: 200,
        temperature: 0.5 // Plus bas pour éviter les inventions
      })
    });

    const result = await response.json();

    if (response.ok && result.choices && result.choices[0].message) {
      return result.choices[0].message.content;
    } else {
      console.error("Erreur Groq détaillée :", result.error?.message);
      return getSmartFallback(userInput);
    }
  } catch (error) {
    console.error("Erreur réseau Groq :", error);
    return getSmartFallback(userInput);
  }
}

// --- Fallback Intelligent utilisant tes vraies constantes ---
function getSmartFallback(userInput: string): string {
  const input = userInput.toLowerCase();
  
  if (input.includes('projet') || input.includes('réaliser')) {
    return `Abdoul a réalisé plusieurs projets comme "${PROJECTS[0].title}" (${PROJECTS[0].tech[0]}) et "${PROJECTS[1].title}".`;
  }
  
  if (input.includes('expérience') || input.includes('stage') || input.includes('travaillé')) {
    return `Abdoul a été ${EXPERIENCES[0].role} chez ${EXPERIENCES[0].company} où il a géré plus de 100 incidents techniques.`;
  }

  if (input.includes('compétence') || input.includes('techno')) {
    return `Il maîtrise notamment ${SKILLS[1].items.slice(0, 3).join(", ")} et le développement mobile.`;
  }

  return `Désolé, j'ai un petit souci technique. Abdoul est un ${CONTACT_INFO.title} diplômé de l'ESATIC.`;
}



// import { CONTACT_INFO, SKILLS } from "../constants";

// // Assure-toi que dans ton fichier .env tu as maintenant :
// // VITE_GROQ_API_KEY=gsk_...
// const apiKey = import.meta.env.VITE_GROQ_API_KEY;

// const skillsList = SKILLS.map(s => `${s.category}: ${s.items.join(", ")}`).join(" | ");

// const SYSTEM_INSTRUCTION = `
// Tu es l'assistant personnel de Abdoul Dramane. 
// Abdoul est un ${CONTACT_INFO.title}.
// Ses compétences : ${skillsList}.

// CONSIGNES :
// 1. Sois très bref (2 phrases max).
// 2. Parle d'Abdoul à la 3ème personne.
// 3. Ne réponds qu'à la question posée.
// `;

// export async function chatWithAI(userInput: string, history: any[]) {
//   if (!apiKey) return "Erreur : Clé API Groq manquante.";

//   // Groq utilise le format OpenAI (messages) au lieu du format Gemini (contents)
//   const messages = [
//     { role: "system", content: SYSTEM_INSTRUCTION },
//     // On transforme l'historique Gemini vers le format Groq/OpenAI
//     ...history.map(h => ({
//       role: h.role === "user" ? "user" : "assistant",
//       content: h.parts[0].text
//     })),
//     { role: "user", content: userInput }
//   ];

//   try {
//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${apiKey}` // La clé Groq passe dans le Header
//       },
//       body: JSON.stringify({
//         model: "llama-3.3-70b-versatile", // Le modèle le plus performant et gratuit sur Groq
//         messages: messages,
//         max_tokens: 150,
//         temperature: 0.7
//       })
//     });

//     const result = await response.json();

//     if (response.ok && result.choices && result.choices[0].message) {
//       return result.choices[0].message.content;
//     } else {
//       console.error("Erreur Groq détaillée :", result.error?.message);
//       return getSmartFallback(userInput);
//     }
//   } catch (error) {
//     console.error("Erreur réseau Groq :", error);
//     return getSmartFallback(userInput);
//   }
// }

// function getSmartFallback(userInput: string): string {
//   const input = userInput.toLowerCase();
//   if (input.includes('compétence') || input.includes('techno')) {
//     return `Abdoul maîtrise ${SKILLS[0].items.join(", ")} et d'autres outils comme ${SKILLS[1].items[0]}.`;
//   }
//   return "Désolé, j'ai un souci technique. Je suis l'assistant d'Abdoul, développeur Full-Stack.";
// }












// import { CONTACT_INFO, SKILLS } from "../constants";

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// const skillsList = SKILLS.map(s => `${s.category}: ${s.items.join(", ")}`).join(" | ");

// const SYSTEM_INSTRUCTION = `
// Tu es l'assistant personnel de Abdoul Dramane. 
// Abdoul est un ${CONTACT_INFO.title}.
// Ses compétences : ${skillsList}.

// CONSIGNES :
// 1. Sois très bref (2 phrases max).
// 2. Parle d'Abdoul à la 3ème personne.
// 3. Ne réponds qu'à la question posée.
// `;

// export async function chatWithAI(userInput: string, history: any[]) {
//   if (!apiKey) return "Erreur : Clé API manquante.";

//   // LE FIX EST ICI : "parts" doit être un tableau []
//   const data = {
//     system_instruction: {
//       parts: [{ text: SYSTEM_INSTRUCTION }] // Ajout des crochets []
//     },
//     contents: [
//       ...history, 
//       { role: "user", parts: [{ text: userInput }] }
//     ],
//     generationConfig: {
//       maxOutputTokens: 150,
//       temperature: 0.7,
//     }
//   };

//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       }
//     );

//     const result = await response.json();

//     if (response.ok && result.candidates && result.candidates[0].content) {
//       return result.candidates[0].content.parts[0].text;
//     } else {
//       // SI CA ECHOUE : On affiche l'erreur réelle dans la console pour comprendre
//       console.error("L'IA a renvoyé une erreur :", result.error?.message);
//       return getSmartFallback(userInput);
//     }
//   } catch (error) {
//     return getSmartFallback(userInput);
//   }
// }

// function getSmartFallback(userInput: string): string {
//   const input = userInput.toLowerCase();
//   if (input.includes('compétence') || input.includes('techno')) {
//     return `Abdoul maîtrise ${SKILLS[0].items.join(", ")} et d'autres outils comme ${SKILLS[1].items[0]}.`;
//   }
//   return "Désolé, j'ai un souci technique. Je suis l'assistant d'Abdoul, développeur Full-Stack.";
// }














// import { CONTACT_INFO, SKILLS } from "../constants";

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// // On prépare une liste propre des compétences pour l'IA
// const skillsList = SKILLS.map(s => `${s.category}: ${s.items.join(", ")}`).join(" | ");

// const SYSTEM_PROMPT = `
// Tu es l'assistant de Abdoul Dramane. 
// Abdoul est un ${CONTACT_INFO.title}.
// Ses compétences techniques sont : ${skillsList}.
// RÈGLES :
// 1. Réponds de façon courte (2-3 phrases).
// 2. Ne sois pas répétitif.
// 3. Si on demande ses compétences, cite 2 ou 3 exemples précis parmi sa liste.
// `;

// export async function chatWithAI(userInput: string, history: any[]) {
//   if (!apiKey) return "Erreur de clé API.";

//   // Construction des messages avec l'historique pour que l'IA "se souvienne"
//   const data = {
//     contents: [
//       { parts: [{ text: SYSTEM_PROMPT }] }, // On donne le contexte à chaque fois
//       ...history, // On ajoute le passé de la conversation
//       { parts: [{ text: userInput }] } // On ajoute la nouvelle question
//     ]
//   };

//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       }
//     );

//     const result = await response.json();

//     if (response.ok && result.candidates) {
//       return result.candidates[0].content.parts[0].text;
//     } else {
//       // Si l'IA bug, on utilise un fallback amélioré qui utilise tes vrais SKILLS
//       return getSmartFallback(userInput);
//     }
//   } catch (error) {
//     return getSmartFallback(userInput);
//   }
// }

// // Un fallback qui n'est plus "bête" mais qui utilise tes vraies données
// function getSmartFallback(userInput: string): string {
//   const input = userInput.toLowerCase();
  
//   if (input.includes('compétence') || input.includes('techno') || input.includes('sait faire')) {
//     return `Abdoul maîtrise notamment : ${SKILLS[0].items.slice(0, 3).join(", ")} et bien d'autres technos en ${SKILLS[1].category}.`;
//   }
  
//   if (input.includes('qui')) {
//     return `Abdoul est un ${CONTACT_INFO.title} basé à ${CONTACT_INFO.location}.`;
//   }

//   return "Je suis l'assistant d'Abdoul. Posez-moi une question sur ses projets ou ses compétences !";
// }