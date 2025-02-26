import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, Key, Server, Check, ArrowRight, Shield } from 'lucide-react';
import logo from './logo.png';

function App() {
  const [email, setEmail] = useState('');
  const [currentModel, setCurrentModel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showError, setShowError] = useState(false);

  const aiModels = [
    { name: "GPT-4o", color: "#10a37f" },
    { name: "Claude 3.7 Sonnet", color: "#ff6600" },
    { name: "Deepseek-R1", color: "#0066ff" },
    { name: "Grok-3", color: "#8e44ad" },
    { name: "o3-mini", color: "#9c27b0" },
    { name: "Qwen2.5-Max", color: "#00bcd4" },
    { name: "Gemini 2.0 Flash", color: "#4285f4" },
    { name: "Llama-3.3", color: "#fb8c00" },
    { name: "o1-preview", color: "#ff5722" }
  ];

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
      {/* Simplified Header with Zero Indentation */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Drawbridge" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-xl font-semibold text-gray-800">Drawbridge</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className={`inline-block transition-all duration-500 ${transitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                Access to{" "}
                <span style={{ color: aiModels[currentModel].color }}>
                  {aiModels[currentModel].name}
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-6">
              All the latest AI models in one place
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-6 py-4 rounded-xl border mb-4 text-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 text-lg font-medium"
            >
              {showError ? (
                <span className="text-red-300">Service unavailable</span>
              ) : (
                <>
                  Join Waitlist <ArrowRight className="inline ml-2" />
                </>
              )}
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              <Shield className="inline mr-1" /> We respect your privacy
            </p>
          </form>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">One platform for all AI models</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border">
                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-xl text-gray-500">/month</span></div>
              <ul className="space-y-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 mr-3 text-gray-900" />
                    Lorem ipsum dolor
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-gray-900 hover:bg-gray-100">
                Get Started
              </button>
            </div>

            <div className="bg-gray-900 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">$20<span className="text-xl text-gray-400">/month</span></div>
              <ul className="space-y-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 mr-3 text-white" />
                    Lorem ipsum dolor
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-600">
          © 2024 Drawbridge
        </div>
      </footer>
    </div>
  );
}

export default App;
