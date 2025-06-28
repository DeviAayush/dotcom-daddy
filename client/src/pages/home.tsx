import { useState, useRef } from "react";
import DomainGenerator from "@/components/domain-generator";
import DomainResults from "@/components/domain-results";
import DotComDaddyLogo from "@/components/logo";
import type { DomainSuggestion } from "@shared/schema";

export default function Home() {
  const [results, setResults] = useState<DomainSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const domainGeneratorRef = useRef<HTMLDivElement>(null);

  const scrollToDomainGenerator = () => {
    domainGeneratorRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleGenerationStart = () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
  };

  const handleGenerationSuccess = (suggestions: DomainSuggestion[]) => {
    setResults(suggestions);
    setIsLoading(false);
    setError(null);
  };

  const handleGenerationError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    setResults(null);
  };

  const resetState = () => {
    setResults(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-dark-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <DotComDaddyLogo className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-white">DotComDaddy</h1>
                <p className="text-xs text-gray-400">AI-Powered Domain Generator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                <i className="fas fa-robot text-purple-400"></i>
                <span>Powered by Gemini AI</span>
              </div>
              <button 
                onClick={scrollToDomainGenerator}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <i className="fas fa-sparkles text-purple-400"></i>
            <span className="text-purple-300 text-sm font-medium">Smart Domain Names for Smart Entrepreneurs</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Generate Scroll-Stopping
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Domain Names</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover brandable domain names using frameworks and strategies from successful entrepreneurs and millionaires. 
            Create names that go viral and build internet-first brands.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">10K+</div>
              <div className="text-sm text-gray-400">Domains Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-400">95%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">AI Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Generator Form */}
      <div ref={domainGeneratorRef}>
        <DomainGenerator
          onGenerationStart={handleGenerationStart}
          onGenerationSuccess={handleGenerationSuccess}
          onGenerationError={handleGenerationError}
          isLoading={isLoading}
        />
      </div>

      {/* Results Section */}
      <DomainResults
        results={results}
        isLoading={isLoading}
        error={error}
        onReset={resetState}
        onRegenerate={() => {
          // This would trigger regeneration with the same parameters
          setResults(null);
          setError(null);
        }}
      />

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-dark-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DotComDaddy?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our AI uses proven naming strategies from successful entrepreneurs to create domain names that build brands and drive success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-brain text-2xl text-purple-400"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Millionaire Frameworks</h3>
              <p className="text-gray-400">Based on Greg Isenberg's naming strategies and frameworks used by successful entrepreneurs.</p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-indigo-500/30 transition-all">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-rocket text-2xl text-indigo-400"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Viral Potential</h3>
              <p className="text-gray-400">Names designed to be scroll-stopping, memorable, and capable of going viral on social platforms.</p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-green-500/30 transition-all">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check-double text-2xl text-green-400"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Telephone Test</h3>
              <p className="text-gray-400">All suggestions pass the telephone test - easy to say, spell, and search for online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <DotComDaddyLogo className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-bold">DotComDaddy</h3>
                  <p className="text-sm text-gray-400">AI-Powered Domain Generator</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Generate brandable domain names using frameworks and strategies from successful entrepreneurs and millionaires.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DotComDaddy. All rights reserved. Powered by Gemini AI.</p>
            <p className="mt-2 text-sm">Created by Aayush Gupta</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
