import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, Key, Server, Check, ArrowRight, Shield } from 'lucide-react';
// Import logo
// When deploying, make sure this path is correct
// and the logo.png file exists in the assets folder
import logo from './assets/logo.png';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [currentModel, setCurrentModel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
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
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 group">
              {/* Logo - uncomment and use when logo is available */}
              <div className="h-9 w-9 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {/* Replace with your actual logo */}
                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-bold">D</div>
                {/* <img src={logo} alt="Drawbridge Logo" className="w-full h-full object-contain" /> */}
              </div>
              <span className="text-xl font-semibold text-gray-800 tracking-tight group-hover:text-black transition-colors">Drawbridge</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-all">Pricing</a>
              <button className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-md">
                Sign In
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
      <section className="pt-40 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-transparent pointer-events-none"></div>
        
        {/* Subtle background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100/20 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight">
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
            <p className="text-xl md:text-2xl text-gray-600 mt-8 max-w-3xl mx-auto">
              All the latest AI models in one place
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="relative transition-all duration-300 ${showSuccess ? 'scale-102' : ''}">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`w-full px-6 py-4 rounded-xl border ${showSuccess ? 'border-green-400 bg-green-50' : 'border-gray-200'} focus:ring-2 focus:ring-gray-900/20 focus:border-transparent mb-4 transition-all hover:border-gray-300 text-lg`}
                required
              />
              <button
                type="submit"
                className={`w-full ${showSuccess ? 'bg-green-500' : 'bg-gray-900'} text-white px-6 py-4 rounded-xl hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-lg font-medium`}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-5">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for you</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="group bg-white p-10 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 relative overflow-hidden">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="text-gray-600 mt-2">Basic features</p>
                <div className="mt-6 text-5xl font-bold">$0<span className="text-xl text-gray-500 font-normal">/month</span></div>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-center text-gray-700">
                  <Check className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-lg">Sample text</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-lg">Sample text</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-lg">Sample text</span>
                </li>
              </ul>
              
              <button className="w-full border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.01] active:scale-[0.99] font-medium text-lg">
                Sign Up
              </button>
            </div>

            {/* Premium Tier */}
            <div className="group bg-gray-900 text-white p-10 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 duration-300 relative overflow-hidden">
              <div className="relative">
                <div className="mb-10">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-gray-300 mt-2">Enhanced capabilities</p>
                  <div className="mt-6 text-5xl font-bold">$20<span className="text-xl text-gray-400 font-normal">/month</span></div>
                  <p className="text-blue-300 text-sm mt-1">Limited time offer</p>
                </div>
                
                <ul className="space-y-5 mb-10">
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">Sample text</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">Sample text</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">Sample text</span>
                  </li>
                </ul>
                
                <button className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all hover:scale-[1.01] active:scale-[0.99] font-medium text-lg">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-10 md:p-14">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Early Access</h2>
                <button className="bg-white text-gray-900 px-12 py-4 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] font-medium text-lg">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © 2024 Drawbridge
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
