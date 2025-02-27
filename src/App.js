import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, Key, Server, Check, ArrowRight, Shield } from 'lucide-react';
import logo from './logo.png';

function App() {
  const [currentModel, setCurrentModel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [modelOrder, setModelOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modelFilter, setModelFilter] = useState('all');

  const aiModels = [
    // LLMs
    { name: "GPT-4o", color: "#10a37f", type: "llm" },
    { name: "Claude 3.7 Sonnet", color: "#ff6600", type: "llm" },
    { name: "Deepseek-R1", color: "#0066ff", type: "llm" },
    { name: "Grok-3", color: "#8e44ad", type: "llm" },
    { name: "Gemini 2.0 Flash", color: "#4285f4", type: "llm" },
    { name: "Llama-3.3", color: "#ffc107", type: "llm" },
    { name: "o1-preview", color: "#607d8b", type: "llm" },
    { name: "Qwen2.5-Max", color: "#00bcd4", type: "llm" },
    { name: "o3-mini", color: "#e91e63", type: "llm" },
    
    // Image generation
    { name: "DALL-E 3.5", color: "#e91e63", type: "image" },
    { name: "Midjourney V6", color: "#8e44ad", type: "image" },
    { name: "Stable Diffusion XL 2.0", color: "#00bcd4", type: "image" },
    
    // Text-to-Speech
    { name: "ElevenLabs Helio", color: "#ffc107", type: "speech" },
  ];

  const getModelAction = (type) => {
    switch (type) {
      case "llm": return "Generate text with";
      case "image": return "Create images with";
      case "speech": return "Produce audio with";
      default: return "Access to";
    }
  };

  const getModelType = (type) => {
    switch (type) {
      case "llm": return "Language Model";
      case "image": return "Image Generation";
      case "speech": return "Text-to-Speech";
      default: return type;
    }
  };

  const filteredModels = modelFilter === 'all' 
    ? aiModels 
    : aiModels.filter(model => model.type === modelFilter);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const indices = Array.from({ length: aiModels.length }, (_, i) => i);
    const shuffled = shuffleArray(indices);
    setModelOrder(shuffled);
    setCurrentModel(shuffled[0]);
  }, [aiModels.length]);

  useEffect(() => {
    if (modelOrder.length === 0) return;
    
    const intervalId = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % modelOrder.length;
        if (nextIndex === 0) {
          const newOrder = shuffleArray(Array.from({ length: aiModels.length }, (_, i) => i));
          setModelOrder(newOrder);
          setCurrentModel(newOrder[0]);
        } else {
          setCurrentModel(modelOrder[nextIndex]);
        }
        setCurrentIndex(nextIndex);
        setTransitioning(false);
      }, 600);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, modelOrder, aiModels.length]);

  const features = [
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "All in One",
      description: "Access to leading LLMs, image and voice models"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Up to Date",
      description: "Latest models added as they release"
    },
    {
      icon: <Key className="w-7 h-7" />,
      title: "API Support",
      description: "Connect your existing provider keys"
    },
    {
      icon: <Server className="w-7 h-7" />,
      title: "Private Data",
      description: "Enhanced privacy for sensitive conversations"
    }
  ];

  return (
    <div className="bg-white font-sans">
      <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
        {/* Changed container padding */}
        <div className="w-full max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
          {/* Adjusted grid alignment */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 md:h-16 w-full">
            {/* Removed left margin */}
            <div 
              className="flex items-center gap-2 cursor-pointer -ml-2 md:-ml-1"
              onClick={() => window.location.href = '/'}
            >
              <img src={logo} alt="Drawbridge Logo" className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-lg md:text-xl font-semibold text-gray-800">Drawbridge</span>
            </div>
            
            <nav className="hidden md:flex items-center justify-end gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-800 transition-all">Features</a>
              <a href="#models" className="text-gray-600 hover:text-gray-800 transition-all">Models</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-all">Pricing</a>
              <button className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition-all">
                Sign In
              </button>
            </nav>

            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 justify-self-end">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Keep all other sections EXACTLY the same as before */}
      <section className="min-h-screen flex flex-col justify-center pt-16 pb-16 px-2 sm:px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 md:mb-16">
            <div className="h-auto min-h-16 md:h-28 flex items-center justify-center mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
                <span className={`inline-block transition-all duration-500 ease-in-out ${
                  transitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
                }`}>
                  {getModelAction(aiModels[currentModel].type)}{" "}
                  <span style={{ color: aiModels[currentModel].color }}>
                    {aiModels[currentModel].name}
                  </span>
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-2 md:mt-4 max-w-3xl mx-auto">
              All the latest AI technology in one place
            </p>
          </div>

          <form 
            action="https://formspree.io/f/xldgqelq" 
            method="POST" 
            className="max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none mb-4 text-base md:text-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl hover:bg-gray-800 transition-all text-base md:text-lg font-medium"
            >
              Join Waitlist
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </button>
            
            <div className="mt-4 text-gray-500 text-sm text-center">
              <Shield className="inline-block w-4 h-4 mr-1" />
              <span>We respect your privacy</span>
            </div>
          </form>
        </div>
      </section>

      <section id="features" className="min-h-screen flex flex-col justify-center py-12 md:py-16 px-2 sm:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Fear of missing out?</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">Access multiple AI models through a single interface</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-3 md:mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Models Section */}
      <section id="models" className="min-h-screen flex flex-col justify-center py-12 md:py-16 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Explore Our Models</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Access the latest AI models all in one place
            </p>
            
            {/* Model Type Filter */}
            <div className="mt-6 max-w-xs mx-auto">
              <select 
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
              >
                <option value="all">All Models</option>
                <option value="llm">Language Models</option>
                <option value="image">Image Generation</option>
                <option value="speech">Text-to-Speech</option>
              </select>
            </div>
          </div>
          
          {/* Models Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {filteredModels.map((model, index) => (
              <div 
                key={index}
                className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div 
                  className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" 
                  style={{ backgroundColor: model.color }}
                ></div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{getModelType(model.type)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="min-h-screen flex flex-col justify-center py-12 md:py-16 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Simple, transparent pricing</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for you</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 mx-auto w-full max-w-6xl px-2 sm:px-4">
            <div className="flex-1 bg-gray-50 p-6 md:p-8 lg:p-10 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Free</h3>
                <div className="mt-3 md:mt-4 text-3xl md:text-4xl font-bold">$0<span className="text-lg md:text-xl text-gray-500 font-normal">/month</span></div>
              </div>
              
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-gray-900 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">Lorem ipsum dolor sit amet</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full border-2 border-gray-900 text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-gray-200 transition-all font-medium">
                Sign Up
              </button>
            </div>

            <div className="flex-1 bg-gray-900 text-white p-6 md:p-8 lg:p-10 rounded-xl shadow-md flex flex-col">
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold">Premium</h3>
                <div className="mt-3 md:mt-4 text-3xl md:text-4xl font-bold">$20<span className="text-lg md:text-xl text-gray-400 font-normal">/month</span></div>
              </div>
              
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                      <Check className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="text-sm md:text-base">Lorem ipsum dolor sit amet</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-gray-100 transition-all font-medium">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © 2025 Drawbridge
        </div>
      </footer>
    </div>
  );
}

export default App;
