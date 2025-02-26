import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, Key, Server, Check, ArrowRight, Shield } from 'lucide-react';
import logo from './logo.png';

function App() {
  const [email, setEmail] = useState('');
  const [currentModel, setCurrentModel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showError, setShowError] = useState(false);

  const aiModels = [
    { name: "o3-mini", color: "#9c27b0" },
    { name: "Grok-3", color: "#e91e63" },
    { name: "Qwen2.5-Max", color: "#00bcd4" },
    { name: "GPT-4o", color: "#10a37f" },
    { name: "Claude 3.7 Sonnet", color: "#8e44ad" },
    { name: "Gemini 2.0 Flash", color: "#4285f4" },
    { name: "Deepseek-R1", color: "#1e88e5" },
    { name: "Llama-3.3", color: "#fb8c00" },
    { name: "o1-preview", color: "#ff5722" }
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

  const features = [
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "All in One",
      description: "Access to over 30 leading AI models"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Up to Date",
      description: "Latest models added as they release"
    },
    {
      icon: <Key className="w-7 h-7" />,
      title: "API Integration",
      description: "Connect your existing provider keys"
    },
    {
      icon: <Server className="w-7 h-7" />,
      title: "Private Data",
      description: "Enhanced privacy for sensitive conversations"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  return (
    <div className="bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              {/* Logo */}
              <div className="h-9 w-9 overflow-hidden">
                <img src={logo} alt="Drawbridge Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-semibold text-gray-800">Drawbridge</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-800 transition-all">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-all">Pricing</a>
              <button className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition-all">
                Sign In
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center pt-16 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            {/* Fixed height container to prevent layout shifts */}
            <div className="h-24 md:h-28 flex items-center justify-center mb-4">
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
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-3xl mx-auto">
              All the latest AI models in one place
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none mb-4 text-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all text-lg font-medium"
            >
              {showError ? (
                <span className="text-red-300">Service not available yet</span>
              ) : (
                <>
                  <span>Join Waitlist</span>
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </>
              )}
            </button>
            
            <div className="mt-4 text-gray-500 text-sm text-center">
              <Shield className="inline-block w-4 h-4 mr-1" />
              <span>We respect your privacy</span>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">One platform for all AI models</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Access all models through a single interface</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex flex-col justify-center py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for you</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-10 mx-auto max-w-7xl">
            {/* Free Tier */}
            <div className="w-full md:w-2/5 bg-gray-50 p-12 rounded-xl border border-gray-200 shadow-sm">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="text-gray-600 mt-2">Basic features</p>
                <div className="mt-4 text-4xl font-bold">$0<span className="text-xl text-gray-500 font-normal">/month</span></div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-base">Sample text</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-base">Sample text</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                  <span className="text-base">Sample text</span>
                </li>
              </ul>
              
              <button className="w-full border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium">
                Sign Up
              </button>
            </div>

            {/* Premium Tier */}
            <div className="w-full md:w-2/5 bg-gray-900 text-white p-12 rounded-xl shadow-md">
              <div>
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
                    <span className="text-base">Sample text</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base">Sample text</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base">Sample text</span>
                  </li>
                </ul>
                
                <button className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © 2024 Drawbridge
        </div>
      </footer>
    </div>
  );
}

export default App;
