import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Zap, Key, Server, Check, ArrowRight, Shield } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [currentModel, setCurrentModel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const aiModels = [
    { name: "o3-mini", color: "#9c27b0" },
    { name: "Grok-3", color: "#e91e63" },
    { name: "Qwen2.5-Max", color: "#00bcd4" },
    { name: "GPT-4o", color: "#10a37f" },
    { name: "Claude 3.7 Sonnet", color: "#8e44ad" },
    { name: "Gemini 2.0 Flash", color: "#4285f4" },
    { name: "Deepseek-R1", color: "#1e88e5" },
    { name: "Llama-3.3", color: "#fb8c00" },
    { name: "o1", color: "#ff5722" }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI model rotation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentModel((prev) => (prev + 1) % aiModels.length);
        setTransitioning(false);
      }, 600);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "All in One",
      description: "Access to over 30 leading AI models"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Up to Date",
      description: "Latest models added as they release"
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "API Integration",
      description: "Connect your existing provider keys"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Private Data",
      description: "Enhanced privacy for sensitive conversations"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setShowSuccess(true);
    setTimeout(() => {
      setEmail('');
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header with blur effect */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 group">
              {/* Logo */}
              <div className="h-9 w-9 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/api/placeholder/36/36" 
                  alt="Drawbridge Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-gray-800 tracking-tight group-hover:text-black transition-colors">Drawbridge</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#demo" className="text-gray-600 hover:text-gray-800 transition-all">Demo</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-all">Pricing</a>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-md">
                Try It
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-transparent pointer-events-none"></div>
        
        {/* Subtle background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-100/20 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center">
              <span 
                className={`inline-block transition-all duration-500 ease-in-out ${
                  transitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
                }`}
              >
                Access to{" "}
                <span 
                  style={{
                    color: aiModels[currentModel].color,
                    display: 'inline'
                  }}
                >
                  {aiModels[currentModel].name}
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mt-6">
              All the latest AI models in one place
            </p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className={`group relative transition-all duration-300 ${showSuccess ? 'scale-102' : ''}`}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`w-full px-4 py-3 rounded-xl border ${showSuccess ? 'border-green-400 bg-green-50' : 'border-gray-200'} focus:ring-2 focus:ring-gray-900/20 focus:border-transparent mb-4 transition-all hover:border-gray-300`}
                required
              />
              <button
                type="submit"
                className={`w-full ${showSuccess ? 'bg-green-500' : 'bg-gray-900'} text-white px-6 py-3 rounded-xl hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2`}
              >
                {showSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Email Submitted</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-gray-500 text-sm flex justify-center gap-2 items-center">
              <Shield className="w-4 h-4" />
              <span>We respect your privacy</span>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">One platform for all AI models</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Access all models through a single interface</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-md hover:-translate-y-1 duration-300"
              >
                <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for you</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md hover:-translate-y-1 duration-300 relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="text-gray-600 mt-2">Basic features</p>
                <div className="mt-4 text-4xl font-bold">$0<span className="text-xl text-gray-500 font-normal">/month</span></div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                  <span>Sample text</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                  <span>Sample text</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                  <span>Sample text</span>
                </li>
              </ul>
              
              <button className="w-full border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.01] active:scale-[0.99] font-medium">
                Sign Up
              </button>
            </div>

            {/* Premium Tier */}
            <div className="group bg-gray-900 text-white p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-xl">
                  EARLY BIRD
                </div>
              </div>
              
              <div className="relative">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-gray-300 mt-2">Enhanced capabilities</p>
                  <div className="mt-4 text-4xl font-bold">$20<span className="text-xl text-gray-400 font-normal">/month</span></div>
                  <p className="text-blue-300 text-sm mt-1">Limited time offer</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Sample text</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Sample text</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Sample text</span>
                  </li>
                </ul>
                
                <button className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all hover:scale-[1.01] active:scale-[0.99] font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-10">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-6">Early Access</h2>
                <button className="bg-white text-gray-900 px-10 py-3 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] font-medium">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-600">
          © 2024 Drawbridge
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
