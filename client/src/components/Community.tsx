import React from 'react';
import { Users, Star, MessageCircle } from 'lucide-react';
import AuthModal from './AuthModal';
import { useState } from 'react';

const Community: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Join the Thriving Community of Developers
          <span className="block text-blue-300">Using GitDocify</span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Trusted by developers globally
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Users className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">50,000+</div>
            <div className="text-blue-200">Active Developers</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Star className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-blue-200">Average Rating</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <MessageCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-blue-200">Community Support</div>
          </div>
        </div>

        <button 
          onClick={() => openAuthModal('signup')}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
        >
          LIMITED TIME OFFER
        </button>
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

export default Community;