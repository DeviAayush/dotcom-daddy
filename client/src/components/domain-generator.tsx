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
      tone: [],
      extension: ".com",
    },
  });

  const onSubmit = async (data: DomainGenerationRequest) => {
    try {
      onGenerationStart();
      
      const response = await apiRequest("POST", "/api/generate-domains", data);
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
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-200">
                Tone/Style Preference <span className="text-red-400">*</span> <span className="text-gray-500 text-xs">(Click multiple)</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "professional", label: "Professional", icon: "fas fa-briefcase" },
                  { value: "modern", label: "Modern", icon: "fas fa-rocket" },
                  { value: "bold", label: "Bold", icon: "fas fa-fire" },
                  { value: "classy", label: "Classy", icon: "fas fa-gem" },
                  { value: "quirky", label: "Quirky", icon: "fas fa-smile" },
                  { value: "funny", label: "Funny", icon: "fas fa-laugh" },
                  { value: "trendy", label: "Trendy", icon: "fas fa-chart-line" },
                  { value: "minimalist", label: "Minimalist", icon: "fas fa-circle" }
                ].map((tone) => {
                  const toneValue = tone.value as "professional" | "modern" | "bold" | "classy" | "quirky" | "funny" | "trendy" | "minimalist";
                  const isSelected = form.watch("tone").includes(toneValue);
                  
                  return (
                    <Button
                      key={tone.value}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => {
                        const currentTones = form.watch("tone");
                        if (isSelected) {
                          form.setValue("tone", currentTones.filter(t => t !== toneValue));
                        } else {
                          form.setValue("tone", [...currentTones, toneValue]);
                        }
                      }}
                      className={`flex flex-col items-center space-y-2 p-4 h-auto transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-500"
                          : "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50 hover:border-purple-500/50"
                      }`}
                    >
                      <i className={`${tone.icon} text-lg`}></i>
                      <span className="text-xs font-medium">{tone.label}</span>
                    </Button>
                  );
                })}
              </div>
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
