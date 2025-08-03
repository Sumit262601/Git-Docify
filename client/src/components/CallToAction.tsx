import React from 'react';
import { ArrowRight } from 'lucide-react';
import AuthModal from './AuthModal';
import { useState } from 'react';

const CallToAction: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Streamline Your Project's
          <span className="block">Documentation?</span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who have transformed their documentation workflow with GitDocify
        </p>

        <button 
          onClick={() => openAuthModal('signup')}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
        >
          Sign Up for Free
          <ArrowRight className="ml-2" size={20} />
        </button>

        <p className="text-blue-200 mt-4 text-sm">
          No credit card required • Free forever plan available
        </p>
      </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
};

export default CallToAction;