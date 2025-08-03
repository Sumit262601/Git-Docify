import React from 'react';
import { Check, Star } from 'lucide-react';
import AuthModal from './AuthModal';
import { useState } from 'react';

const Pricing: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "",
      description: "Perfect for trying out GitDocify",
      features: [
        "5 README generations",
        "Basic templates",
        "Email support",
        "7-day access"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "border border-blue-600 text-blue-600 hover:bg-blue-50"
    },
    {
      name: "Starter Pack", 
      price: "$3.99",
      period: "one-time",
      description: "Great for small projects and personal use",
      features: [
        "50 README generations",
        "Premium templates",
        "Priority support",
        "30-day access",
        "Custom branding"
      ],
      buttonText: "Get Started",
      buttonStyle: "border border-blue-600 text-blue-600 hover:bg-blue-50"
    },
    {
      name: "Monthly",
      price: "$14.99",
      period: "/month",
      description: "Perfect for active developers",
      features: [
        "Unlimited README generations",
        "All premium features",
        "Priority support",
        "API access",
        "Team collaboration",
        "Advanced analytics"
      ],
      buttonText: "Choose Monthly",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700"
    },
    {
      name: "Lifetime Access",
      price: "$54.99",
      period: "one-time",
      description: "Best value for serious developers",
      features: [
        "Everything in Monthly",
        "Lifetime updates",
        "Priority feature requests",
        "Early access to new features",
        "Exclusive community access",
        "Commercial license"
      ],
      buttonText: "Get Lifetime Access",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700",
      popular: true,
      savings: "Save $125"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {plan.savings && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {plan.savings}
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openAuthModal('signup')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => openAuthModal('signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start for Free
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

export default Pricing;