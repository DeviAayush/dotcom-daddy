import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { domainGenerationRequestSchema } from "@shared/schema";
import { generateDomainNames } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
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
        if (error.message.includes("API key")) {
          res.status(401).json({ 
            error: "API configuration error. Please contact support." 
          });
        } else if (error.name === "ZodError") {
          res.status(400).json({ 
            error: "Invalid request data", 
            details: error.message 
          });
        } else {
          res.status(500).json({ 
            error: "Failed to generate domain names. Please try again." 
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
