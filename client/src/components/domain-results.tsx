import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { DomainSuggestion } from "@shared/schema";

interface DomainResultsProps {
  results: DomainSuggestion[] | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
  onRegenerate: () => void;
}

export default function DomainResults({
  results,
  isLoading,
  error,
  onReset,
  onRegenerate
}: DomainResultsProps) {
  const { toast } = useToast();

  const copyToClipboard = async (domain: string) => {
    try {
      await navigator.clipboard.writeText(domain);
      toast({
        title: "Copied!",
        description: `${domain} has been copied to your clipboard.`,
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = domain;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Copied!",
        description: `${domain} has been copied to your clipboard.`,
      });
    }
  };

  const getAvailabilityColor = (availability?: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'text-green-400';
      case 'check':
        return 'text-yellow-400';
      case 'taken':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getAvailabilityIcon = (availability?: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'fas fa-check-circle';
      case 'check':
        return 'fas fa-exclamation-circle';
      case 'taken':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  };

  const getAvailabilityText = (availability?: string) => {
    switch (availability?.toLowerCase()) {
      case 'available':
        return 'Available';
      case 'check':
        return 'Check Availability';
      case 'taken':
        return 'Taken';
      default:
        return 'Unknown';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Descriptive': 'bg-purple-500/20 text-purple-300',
      'Cultural Phrase': 'bg-indigo-500/20 text-indigo-300',
      'Humorous': 'bg-green-500/20 text-green-300',
      'Wordplay': 'bg-yellow-500/20 text-yellow-300',
      'Action-Oriented': 'bg-red-500/20 text-red-300',
      'Tech-Forward': 'bg-blue-500/20 text-blue-300',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-300';
  };

  // Loading State
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-12">
            <div className="animate-pulse mb-6">
              <i className="fas fa-robot text-6xl text-purple-400"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">AI is Crafting Your Domain Names</h3>
            <p className="text-gray-400 mb-8">Using millionaire naming strategies to create scroll-stopping domain ideas...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-12">
            <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-6"></i>
            <h3 className="text-2xl font-bold mb-4 text-red-300">Generation Failed</h3>
            <p className="text-gray-400 mb-8">{error}</p>
            <Button
              onClick={onReset}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <i className="fas fa-redo mr-2"></i>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Results State
  if (results && results.length > 0) {
    return (
      <section id="results-section" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Generated Domain Names</h2>
            <p className="text-gray-400">Here are your AI-generated domain suggestions based on millionaire naming frameworks</p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all group opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {result.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {result.rationale}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.name)}
                    className="ml-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <i className="fas fa-copy text-gray-400 hover:text-purple-400"></i>
                  </Button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`flex items-center space-x-1 ${getAvailabilityColor(result.availability)}`}>
                      <i className={getAvailabilityIcon(result.availability)}></i>
                      <span>{getAvailabilityText(result.availability)}</span>
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">
                      Telephone Test: {result.telephoneTest ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <i className="fas fa-fire"></i>
                    <span className="ml-1">Viral Potential: {result.viralPotential || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Generate More Button */}
          <div className="text-center mt-12">
            <Button
              onClick={onRegenerate}
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-gray-700"
            >
              <i className="fas fa-refresh mr-2"></i>
              Generate More Names
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
