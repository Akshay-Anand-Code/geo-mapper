'use client';

import React from 'react';
import { Brain, Cpu, Globe, Lock, Microscope, Network, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CompanyPage = () => {
  const researchAreas = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Systems",
      description: "Developing next-generation artificial intelligence systems with enhanced cognitive capabilities and natural language understanding."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Neural Networks",
      description: "Pioneering research in deep learning architectures and neural network optimization for real-world applications."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Privacy-Preserving AI",
      description: "Creating innovative solutions that balance powerful AI capabilities with robust privacy protection mechanisms."
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Research & Development",
      description: "Continuous investment in cutting-edge research to push the boundaries of what's possible in AI technology."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1117] via-[#161B22] to-[#0D1117] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
              Advancing the Future of Intelligence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're on a mission to democratize advanced AI technology through groundbreaking research and development in machine learning, neural networks, and privacy-preserving computation.
            </p>
          </div>
        </div>
      </div>

      {/* Research Areas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          Our Research Initiatives
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {researchAreas.map((area) => (
            <div key={area.title} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-8 rounded-xl border border-purple-500/20">
                <div className="text-purple-400 mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
                <p className="text-gray-400">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-r from-[#1A1F2A] to-[#252B38] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Cpu className="w-12 h-12" />, label: "Quantum Computing" },
              { icon: <Shield className="w-12 h-12" />, label: "Privacy Tech" },
              { icon: <Globe className="w-12 h-12" />, label: "Global Infrastructure" },
              { icon: <Sparkles className="w-12 h-12" />, label: "AI Models" },
            ].map((tech) => (
              <div key={tech.label} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-50 group-hover:opacity-100 transition duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-6 rounded-xl border border-purple-500/20">
                  <div className="text-purple-400 flex justify-center mb-4">{tech.icon}</div>
                  <p className="text-gray-300">{tech.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Join Us in Shaping the Future
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          We're always looking for talented individuals who share our passion for advancing AI technology and making it accessible to everyone.
        </p>
        <Link 
          href="/contact" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default CompanyPage; 