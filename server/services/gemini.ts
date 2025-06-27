import { GoogleGenAI } from "@google/genai";
import type { DomainGenerationRequest, DomainSuggestion } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || "" 
});

export async function generateDomainNames(request: DomainGenerationRequest): Promise<DomainSuggestion[]> {
  try {
    const prompt = `You are a startup naming expert trained on frameworks used by successful entrepreneurs and millionaires.

Based on the following user input, suggest 10 creative, brandable, and scroll-stopping domain name ideas for their new business.

Details:
- Business Type: ${request.businessType}
- Keywords (optional): ${request.keywords || 'None provided'}
- Tone/Style Preference: ${request.tone} (e.g., funny, classy, quirky, modern, bold, professional)
- Preferred Domain Extension: ${request.extension} (e.g., .com, .ai, .store)

Guidelines:
- Use naming techniques inspired by Greg Isenberg's framework:
    - Descriptive names (clearly explain the business's value or appeal)
    - Culturally-relevant phrases (that resonate with trends or specific communities)
    - Humorous or playful ideas (that are memorable and viral-worthy)
- Avoid generic, forgettable, or "tofu" names (bland or hard to remember).
- Follow the "telephone test" – names should be easy to say, spell, and search.
- Use clever wordplay or subtle alliteration where it enhances memorability.
- At least 2 names should come with a short explanation of why they work well.
- Optionally, suggest whether a domain or social handle may be available.

Your goal is to create names that could help this product go viral and build a strong internet-first brand.

Generate at least 10 high-quality names per request.

Return the response as a JSON array where each item has:
- name: the domain name
- type: the category (e.g., "Descriptive", "Cultural Phrase", "Humorous", "Wordplay")
- rationale: explanation of why this name works well
- availability: "available", "check", or "taken" (your best guess)
- telephoneTest: true/false if it passes the telephone test
- viralPotential: "Low", "Medium", "High", or "Very High"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
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
    throw new Error(`Failed to generate domain names: ${error}`);
  }
}
