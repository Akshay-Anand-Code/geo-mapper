'use client';

import React from 'react';
import { Brain, Cpu, Network, Lock, Eye, Terminal, Database, Radio, Fingerprint, Scan, Binary, Radar } from 'lucide-react';
import Link from 'next/link';

const HowItWorksPage = () => {
  const technologies = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neural Vision Processing",
      description: "Advanced convolutional neural networks analyze visual data in real-time, extracting location signatures and environmental patterns with military-grade precision."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Quantum OSINT Framework",
      description: "Proprietary OSINT algorithms cross-reference multiple data streams, utilizing quantum-inspired optimization for enhanced geolocation accuracy."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Advanced Pattern Recognition",
      description: "Machine learning models trained on petabytes of satellite imagery and street-level data identify locations with unprecedented accuracy."
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Cyberpunk Detection Engine",
      description: "Custom-built neural architecture specifically designed for urban environments, capable of identifying locations in high-density metropolitan areas."
    }
  ];

  const processes = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: "Image Analysis",
      steps: [
        "Quantum-enhanced image preprocessing",
        "Neural feature extraction",
        "Geometric pattern matching",
        "Environmental context analysis"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Processing",
      steps: [
        "Multi-threaded data aggregation",
        "Real-time cross-referencing",
        "Parallel pattern matching",
        "Quantum database querying"
      ]
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: "Location Triangulation",
      steps: [
        "Satellite data correlation",
        "Ground-truth verification",
        "Neural positioning system",
        "Quantum accuracy enhancement"
      ]
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
              Advanced Neural Architecture
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Utilizing cutting-edge AI and quantum-inspired algorithms to process and analyze location data with unprecedented accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          Core Technologies
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {technologies.map((tech) => (
            <div key={tech.title} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-30 group-hover:opacity-70 transition duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-8 rounded-xl border border-purple-500/20">
                <div className="text-purple-400 mb-4">{tech.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{tech.title}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Flow */}
      <div className="bg-gradient-to-r from-[#1A1F2A] to-[#252B38] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Neural Processing Pipeline
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {processes.map((process) => (
              <div key={process.title} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-30 group-hover:opacity-70 transition duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-6 rounded-xl border border-purple-500/20">
                  <div className="text-purple-400 flex justify-center mb-4">{process.icon}</div>
                  <h3 className="text-lg font-semibold mb-4 text-center">{process.title}</h3>
                  <ul className="space-y-2">
                    {process.steps.map((step, index) => (
                      <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                        <Binary className="w-4 h-4 text-purple-400" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-30 group-hover:opacity-70 transition duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
          <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-8 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold">Military-Grade Security</h2>
            </div>
            <p className="text-gray-400 mb-6">
              All data is processed through quantum-resistant encryption protocols, ensuring maximum security for your sensitive location data. Our systems employ advanced neural cryptography and blockchain verification for tamper-proof results.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">Biometric Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Radar className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">Neural Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">Quantum Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 2 Teaser */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-30 group-hover:opacity-70 transition duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
          <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-8 rounded-xl border border-purple-500/20">
            <div className="text-center">
              <div className="inline-block text-sm text-purple-400 mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm" />
                <span className="relative flex items-center gap-2">
                  Coming Soon <Binary className="w-4 h-4" />
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                Phase 2: Enhanced Neural Network
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                The next evolution of our technology will introduce advanced capabilities including predictive location analysis, temporal mapping, and quantum-enhanced pattern recognition. Stay tuned for a revolutionary upgrade to our neural architecture.
              </p>
              <div className="flex justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Temporal Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-400" />
                  <span>Quantum Enhancement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span>Predictive Mapping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage; 