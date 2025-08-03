import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import AuthModal from './AuthModal';
import { useState } from 'react';

const Roadmap: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const phases = [
    {
      phase: "Phase 1",
      title: "README Generation",
      description: "AI-powered README files that capture your project's essence, features, and setup instructions automatically.",
      status: "completed"
    },
    {
      phase: "Phase 2", 
      title: "Full Code Documentation",
      description: "Comprehensive documentation for classes, functions, and more with intelligent analysis and cross-references.",
      status: "current"
    },
    {
      phase: "Phase 3",
      title: "Advanced Integration",
      description: "Deep integration with popular development tools, CI/CD pipelines, and documentation platforms.",
      status: "upcoming"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Code Documentation is Next Generation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our roadmap to complete code documentation transformation
          </p>
        </div>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="flex items-start space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(phase.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {phase.phase}
                  </span>
                  {phase.status === 'current' && (
                    <span className="ml-3 text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Join us early and be among the first to work for a more scalable documentation future.
          </p>
          <button 
            onClick={() => openAuthModal('signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          onSwitchMode={setAuthMode}
        />
      </div>
    </section>
  );
};

export default Roadmap;