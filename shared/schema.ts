import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const domainGenerations = pgTable("domain_generations", {
  id: serial("id").primaryKey(),
  businessType: text("business_type").notNull(),
  keywords: text("keywords"),
  tone: text("tone").notNull(),
  extension: text("extension").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDomainGenerationSchema = createInsertSchema(domainGenerations).omit({
  id: true,
  generatedAt: true,
});

export const domainGenerationRequestSchema = z.object({
  businessType: z.string().min(1, "Business type is required"),
  keywords: z.string().optional(),
  tone: z.enum([
    "professional",
    "modern", 
    "bold",
    "classy",
    "quirky",
    "funny",
    "trendy",
    "minimalist"
  ]),
  extension: z.string().default(".com"),
});

export const domainSuggestionSchema = z.object({
  name: z.string(),
  type: z.string(),
  rationale: z.string(),
  availability: z.string().optional(),
  telephoneTest: z.boolean().optional(),
  viralPotential: z.string().optional(),
});

export const domainGenerationResponseSchema = z.object({
  suggestions: z.array(domainSuggestionSchema),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DomainGenerationRequest = z.infer<typeof domainGenerationRequestSchema>;
export type DomainSuggestion = z.infer<typeof domainSuggestionSchema>;
export type DomainGenerationResponse = z.infer<typeof domainGenerationResponseSchema>;
