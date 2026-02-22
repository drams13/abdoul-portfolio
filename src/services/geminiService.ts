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

// test de mis à jour