import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Zap, Laptop, PaintBucket } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import Button from '../components/Button';

const LandingPage: React.FC = () => {
  const { setPrompt, generateWebsite } = useBuilder();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrompt(inputValue);
    generateWebsite(inputValue);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="text-blue-500" size={28} />
            <h1 className="text-xl font-bold">Veltrix</h1>
          </div>
          <div>
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl w-full text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Build Your Website with AI
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Describe your website and our AI will generate it for you, complete with code and design.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="relative mt-8 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-gray-900 rounded-lg p-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your website idea in detail..."
                  className="w-full p-4 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px] text-gray-100"
                  required
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="mt-4 animate-pulse-slow">
              Generate Website
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-12">
          <FeatureCard 
            icon={<Zap className="text-yellow-500" size={24} />}
            title="Fast Generation" 
            description="Get your website code in seconds with our AI-powered platform."
          />
          <FeatureCard 
            icon={<Laptop className="text-green-500" size={24} />}
            title="Modern Code" 
            description="Generate clean, modern code that's ready for production."
          />
          <FeatureCard 
            icon={<PaintBucket className="text-purple-500" size={24} />}
            title="Beautiful Design" 
            description="Create stunning designs without any design experience."
          />
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 WebCrafter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 transform transition-all hover:scale-105 hover:shadow-lg hover:border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default LandingPage;