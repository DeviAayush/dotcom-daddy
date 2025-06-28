import { GoogleGenAI } from "@google/genai";
import type { DomainGenerationRequest, DomainSuggestion } from "@shared/schema";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || "" 
});

if (!process.env.GEMINI_API_KEY) {
  console.error("Gemini API Key not found!");
  throw new Error("Gemini API Key not found. Please set it in .env file or env variables.");
} else {
  console.log("Gemini API Key loaded: AIzaS...");
}

export async function generateDomainNames(request: DomainGenerationRequest): Promise<DomainSuggestion[]> {
  try {
    const prompt = `You are a professional startup naming expert trained on successful frameworks used by entrepreneurs and millionaires.

Your task is to generate 10 high-quality, relevant, and creative business or domain name suggestions based on the following user input:

Inputs:
- Business Type: ${request.businessType}
- Keywords: ${request.keywords || 'None provided'}
- Tone/Style Preference: ${request.tone.join(', ')} (blend these tones naturally)
- Domain Extension: ${request.extension} (e.g., .com, .ai, .app)

Instructions:
- Use the provided keywords meaningfully in the names. They must reflect the core idea or vibe.
- Follow Greg Isenberg-style naming techniques:
    - Descriptive names (that clearly show what the product is)
    - Cultural/phrase-based names (connected to internet trends or relatable ideas)
    - Funny or memorable names (that stick in users' heads)
- Avoid bland or generic "tofu" names.
- Ensure the names are easy to say, spell, and search (pass the Telephone Test).
- Use smart wordplay, alliteration, or emotional resonance where it adds value.

Return the response as a JSON array where each item has:
- name: the domain name (include the extension)
- type: the category (e.g., "Descriptive", "Phrase", "Funny", "Trendy", "Invented")
- rationale: Brief explanation of why the name fits well
- availability: "available", "check", or "taken" (your best guess)
- telephoneTest: true/false if it passes the telephone test
- viralPotential: "Low", "Medium", "High", or "Very High"

Your response should strictly relate to the input tone, keywords, and business context. Generate exactly 10 names in this format.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",  
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string" },
              rationale: { type: "string" },
              availability: { type: "string" },
              telephoneTest: { type: "boolean" },
              viralPotential: { type: "string" }
            },
            required: ["name", "type", "rationale"]
          }
        }
      },
      contents: prompt,
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini API");
    }

    const suggestions: DomainSuggestion[] = JSON.parse(rawJson);
    return suggestions;

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // If it's a quota error, provide helpful error message
    if (error && typeof error === 'object' && 'status' in error && error.status === 429) {
      throw new Error("API quota exceeded. Please try again later or upgrade your Gemini API plan for higher quotas.");
    }
    
    throw new Error(`Failed to generate domain names: ${error}`);
  }
}
