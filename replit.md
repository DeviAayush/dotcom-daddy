# MillionaireDomains - AI-Powered Domain Generator

## Overview

MillionaireDomains is a SaaS application that generates creative domain names using AI insights based on naming frameworks used by successful entrepreneurs and millionaires. The application leverages Google's Gemini API to generate brandable, memorable domain names tailored to specific business types, tones, and preferences.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API with single domain generation endpoint
- **Request Validation**: Zod schemas for type-safe validation
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in shared directory for type safety
- **Tables**: 
  - `users` - User authentication data
  - `domain_generations` - Analytics tracking for generation requests
- **Migrations**: Managed through Drizzle Kit

## Key Components

### AI Integration
- **Provider**: Google Gemini 2.5 Pro API
- **Service**: Dedicated Gemini service (`server/services/gemini.ts`)
- **Prompt Engineering**: Structured prompt based on Greg Isenberg's naming framework
- **Response Format**: JSON structured output with domain suggestions including rationale, type classification, and availability estimation

### Form System
- **Component**: `DomainGenerator` with controlled form inputs
- **Validation**: Zod schema validation for business type, keywords, tone, and extension
- **Tone Options**: Professional, modern, bold, classy, quirky, funny, trendy, minimalist
- **Extension Support**: Configurable domain extensions (.com default)

### Results Display
- **Component**: `DomainResults` with interactive domain cards
- **Features**: Copy to clipboard, availability indicators, regeneration options
- **Analytics**: Tracks generation requests for business insights

### Shared Type Safety
- **Schema Location**: `shared/schema.ts`
- **Validation**: Drizzle-Zod integration for runtime type checking
- **Type Exports**: Shared between frontend and backend for consistency

## Data Flow

1. **User Input**: Form submission with business details and preferences
2. **Validation**: Client-side and server-side validation using Zod schemas
3. **API Processing**: Express route validates request and calls Gemini service
4. **AI Generation**: Gemini API processes structured prompt and returns JSON response
5. **Response Handling**: Results parsed and returned to frontend
6. **UI Update**: Results displayed with interactive features and error handling

## External Dependencies

### Core Dependencies
- **AI Service**: Google Gemini API (`@google/genai`)
- **Database**: Neon Database serverless PostgreSQL (`@neondatabase/serverless`)
- **UI Components**: Extensive Radix UI component library
- **Form Management**: React Hook Form with Zod resolvers
- **Development**: Replit-specific plugins for development environment

### Development Tools
- **Database Management**: Drizzle Kit for migrations and schema management
- **Build Process**: ESBuild for server bundling, Vite for client bundling
- **Type Checking**: TypeScript with strict configuration
- **Styling**: PostCSS with Tailwind CSS and Autoprefixer

## Deployment Strategy

### Production Build
- **Client**: Vite builds to `dist/public` directory
- **Server**: ESBuild bundles server code to `dist/index.js`
- **Static Assets**: Served through Express static middleware

### Environment Configuration
- **Development**: `npm run dev` - TSX with hot reload
- **Production**: `npm run start` - Node.js with bundled code
- **Database**: Environment variable `DATABASE_URL` required
- **AI API**: `GEMINI_API_KEY` or `API_KEY` environment variable required

### Replit Integration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Deployment**: Autoscale deployment target
- **Port Mapping**: Internal port 5000 mapped to external port 80
- **Workflows**: Parallel execution with automatic port waiting

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```