import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { domainGenerationRequestSchema, type DomainGenerationRequest, type DomainSuggestion } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/lib/queryClient";

interface DomainGeneratorProps {
  onGenerationStart: () => void;
  onGenerationSuccess: (suggestions: DomainSuggestion[]) => void;
  onGenerationError: (error: string) => void;
  isLoading: boolean;
}

export default function DomainGenerator({
  onGenerationStart,
  onGenerationSuccess,
  onGenerationError,
  isLoading
}: DomainGeneratorProps) {
  const [demoMode, setDemoMode] = useState(false);
  
  const form = useForm<DomainGenerationRequest>({
    resolver: zodResolver(domainGenerationRequestSchema),
    defaultValues: {
      businessType: "",
      keywords: "",
      tone: "professional",
      extension: ".com",
    },
  });

  const onSubmit = async (data: DomainGenerationRequest) => {
    try {
      onGenerationStart();
      
      // Use demo endpoint if demo mode is enabled
      const endpoint = demoMode ? "/api/demo-domains" : "/api/generate-domains";
      const response = await apiRequest("POST", endpoint, data);
      const result = await response.json();
      
      if (result.suggestions && Array.isArray(result.suggestions)) {
        onGenerationSuccess(result.suggestions);
        
        // Scroll to results section
        setTimeout(() => {
          const resultsSection = document.getElementById('results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Generation error:", error);
      if (error instanceof Error) {
        onGenerationError(error.message);
      } else {
        onGenerationError("Failed to generate domain names. Please try again.");
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-dark-950 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Generate Your Perfect Domain</h2>
            <p className="text-gray-400">Fill in the details below and let our AI create brandable domain names using millionaire naming strategies.</p>
            
            {/* Demo Mode Toggle */}
            <div className="flex items-center justify-center space-x-3 mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
              <span className="text-yellow-200 text-sm">API quota temporarily exceeded</span>
              <div className="flex items-center space-x-2 ml-4">
                <Label htmlFor="demo-mode" className="text-sm text-yellow-200">
                  Try Demo Mode
                </Label>
                <Switch
                  id="demo-mode"
                  checked={demoMode}
                  onCheckedChange={setDemoMode}
                />
              </div>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-sm font-medium text-gray-200">
                Business Type <span className="text-red-400">*</span>
              </Label>
              <Input
                id="businessType"
                placeholder="e.g., E-commerce platform, Food delivery app, Fitness coaching..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                {...form.register("businessType")}
              />
              {form.formState.errors.businessType && (
                <p className="text-red-400 text-sm">{form.formState.errors.businessType.message}</p>
              )}
            </div>

            {/* Keywords (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-sm font-medium text-gray-200">
                Keywords <span className="text-gray-500">(Optional)</span>
              </Label>
              <Input
                id="keywords"
                placeholder="e.g., fast, smart, easy, pro, hub..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                {...form.register("keywords")}
              />
            </div>

            {/* Tone/Style Preference */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-sm font-medium text-gray-200">
                Tone/Style Preference <span className="text-red-400">*</span>
              </Label>
              <Select 
                value={form.watch("tone")} 
                onValueChange={(value) => form.setValue("tone", value as any)}
              >
                <SelectTrigger className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all">
                  <SelectValue placeholder="Select a tone..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="classy">Classy</SelectItem>
                  <SelectItem value="quirky">Quirky</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                  <SelectItem value="trendy">Trendy</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.tone && (
                <p className="text-red-400 text-sm">{form.formState.errors.tone.message}</p>
              )}
            </div>

            {/* Domain Extension */}
            <div className="space-y-2">
              <Label htmlFor="extension" className="text-sm font-medium text-gray-200">
                Preferred Domain Extension
              </Label>
              <Select 
                value={form.watch("extension")} 
                onValueChange={(value) => form.setValue("extension", value)}
              >
                <SelectTrigger className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value=".com">.com</SelectItem>
                  <SelectItem value=".ai">.ai</SelectItem>
                  <SelectItem value=".io">.io</SelectItem>
                  <SelectItem value=".app">.app</SelectItem>
                  <SelectItem value=".store">.store</SelectItem>
                  <SelectItem value=".tech">.tech</SelectItem>
                  <SelectItem value=".co">.co</SelectItem>
                  <SelectItem value=".net">.net</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner animate-spin"></i>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic"></i>
                      <span>Generate Domain Names</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
