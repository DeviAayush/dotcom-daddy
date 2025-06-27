import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { domainGenerationRequestSchema } from "@shared/schema";
import { generateDomainNames } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Demo endpoint with sample data
  app.post("/api/demo-domains", async (req, res) => {
    try {
      // Validate request body
      const validatedData = domainGenerationRequestSchema.parse(req.body);
      
      // Return sample domain suggestions for demo
      const demoSuggestions = [
        {
          name: `CraftVault${validatedData.extension}`,
          type: "Descriptive",
          rationale: "Combines 'craft' with 'vault', suggesting a secure repository for handmade treasures. Easy to remember and clearly communicates value.",
          availability: "available",
          telephoneTest: true,
          viralPotential: "High"
        },
        {
          name: `ArtisanAlley${validatedData.extension}`,
          type: "Wordplay",
          rationale: "Uses alliteration to create a memorable brand. 'Alley' suggests a marketplace where artisans gather, perfect for discovery.",
          availability: "check",
          telephoneTest: true,
          viralPotential: "Medium"
        },
        {
          name: `HandmadeHQ${validatedData.extension}`,
          type: "Descriptive",
          rationale: "HQ suggests headquarters or high quality - both work for a premium handmade marketplace. Short and brandable.",
          availability: "available",
          telephoneTest: true,
          viralPotential: "High"
        },
        {
          name: `CraftedCo${validatedData.extension}`,
          type: "Modern",
          rationale: "Modern, minimal approach using 'Co' suffix. Appeals to conscious consumers who value craftsmanship.",
          availability: "taken",
          telephoneTest: true,
          viralPotential: "Medium"
        },
        {
          name: `MakersMart${validatedData.extension}`,
          type: "Descriptive",
          rationale: "Clearly identifies the target audience (makers) and the function (marketplace). Strong brand potential.",
          availability: "available",
          telephoneTest: true,
          viralPotential: "High"
        }
      ];
      
      res.json({ suggestions: demoSuggestions });
    } catch (error) {
      console.error("Demo generation error:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.post("/api/generate-domains", async (req, res) => {
    try {
      // Validate request body
      const validatedData = domainGenerationRequestSchema.parse(req.body);
      
      // Store the generation request (optional for analytics)
      // await storage.createDomainGeneration(validatedData);
      
      // Generate domain names using Gemini API
      const suggestions = await generateDomainNames(validatedData);
      
      res.json({ suggestions });
    } catch (error) {
      console.error("Domain generation error:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("quota") || error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED")) {
          res.status(429).json({
            error: "API quota exceeded. Please try again later or check your Gemini API billing settings.",
            details: "The free tier has daily limits. Consider upgrading your Gemini API plan for higher quotas."
          });
        } else if (error.message.includes("API key")) {
          res.status(401).json({ 
            error: "API configuration error. Please check your Gemini API key." 
          });
        } else if (error.name === "ZodError") {
          res.status(400).json({ 
            error: "Invalid request data", 
            details: error.message 
          });
        } else {
          res.status(500).json({ 
            error: "Failed to generate domain names. Please try again.",
            details: error.message
          });
        }
      } else {
        res.status(500).json({ 
          error: "An unexpected error occurred. Please try again." 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
