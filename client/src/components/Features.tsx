import React from 'react';
import { Bot, Zap, FileText, Globe } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "Compatible with AI Public Defco Pages",
      description: "Seamlessly integrate with AI-powered documentation platforms for enhanced visibility and accessibility."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Lightning Fast README Generation",
      description: "Generate comprehensive README files in seconds with our advanced AI algorithms and templates."
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Full Documentation Coming Soon",
      description: "Complete documentation suites including API docs, tutorials, and comprehensive guides."
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Multi-Language Support",
      description: "Support for every programming language and framework with intelligent context understanding."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create professional documentation that scales with your project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;