'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Globe, ArrowRight, Code, Shield, Database, Image as ImageIcon, Send, MapPin } from 'lucide-react';import { Loader } from '@googlemaps/js-api-loader';
import Image from 'next/image';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  image?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  timestamp?: Date;
}

interface LocationInfo {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }

interface AddressButtonProps {
  address: string;
}

const AddressButton = ({ address }: AddressButtonProps) => {
  const shortenAddress = (addr: string) => {
    if (addr.length <= 8) return addr;
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative">
      <button 
        onClick={() => {
          navigator.clipboard.writeText(address);
        }}
        className="px-4 py-2 bg-gradient-to-r from-[#1A1F2A] to-[#252B38] text-white rounded-lg hover:from-[#252B38] hover:to-[#303844] transition-all"
      >
        {shortenAddress(address)}
      </button>
    </div>
  );
};

const ModernUI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi! I can help you analyze any location. Send me an image or type your question.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        content: inputText.trim(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);

      setTimeout(() => {
        const assistantMessage: Message = {
          id: Date.now() + 1,
          type: 'assistant',
          content: 'I can help you analyze that location. Would you like to send an image?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const userMessage: Message = {
          id: Date.now(),
          type: 'user',
          content: 'Analyzing this location:',
          image: event.target?.result as string,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
          // Create form data
          const formData = new FormData();
          formData.append('image', file);

          // Send image to analysis endpoint
          const response = await fetch('/api/analyze-image', {
            method: 'POST',
            body: formData
          });

          const data = await response.json();

          if (data.locationInfo) {
            const assistantMessage: Message = {
              id: Date.now() + 1,
              type: 'assistant',
              content: `I found this location: ${data.locationInfo.name}. The location has been marked on the map below.`,
              location: {
                name: data.locationInfo.name,
                latitude: data.locationInfo.location.latitude,
                longitude: data.locationInfo.location.longitude
              },
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            setLocationInfo(data.locationInfo);
          } else {
            const assistantMessage: Message = {
              id: Date.now() + 1,
              type: 'assistant',
              content: 'I couldn\'t identify a specific location in this image. Could you provide more details?',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }
        } catch (error) {
          console.error('Error analyzing image:', error);
          const errorMessage: Message = {
            id: Date.now() + 1,
            type: 'assistant',
            content: 'Sorry, there was an error analyzing the image. Please try again.',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
        setIsTyping(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (locationInfo) {
      showLocationOnMap(locationInfo);
    }
  }, [locationInfo]);

  const showLocationOnMap = async (locationInfo: LocationInfo)  => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key is not defined');
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: 'weekly'
    });

    try {
      const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary;
      
      const map = new Map(document.getElementById('map')!, {
        center: { 
          lat: locationInfo.location.latitude, 
          lng: locationInfo.location.longitude 
        },
        zoom: 15,
        styles: [
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [
              { saturation: -100 },
              { gamma: 0.5 }
            ]
          }
        ]
      });

      new google.maps.Marker({
        position: { 
          lat: locationInfo.location.latitude, 
          lng: locationInfo.location.longitude 
        },
        map: map,
        title: locationInfo.name,
        animation: google.maps.Animation.DROP
      });
    } catch (error) {
      console.error('Error loading map:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1117] via-[#161B22] to-[#0D1117] text-white relative overflow-hidden">
      {/* Purple gradient orb effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1117]/50 to-[#0D1117] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-semibold">Geo AI</span>
          </div>
          <div className="flex items-center gap-8">
            <a 
              href="https://x.com/GEOAiSol"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://t.me/GEOaiportal"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Telegram
            </a>
            <a 
              href="https://pump.fun/coin/6BvUM3ephxUg19W7Fk6bDmdfouM2htb35V7NGj6Qpump?coin_sort=market_cap&origin=search_bar"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pump.fun
            </a>
            <a 
              href="/how-it-works" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <AddressButton address="6BvUM3ephxUg19W7Fk6bDmdfouM2htb35V7NGj6Qpump" />
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center pt-24 pb-16 px-4">
          <div className="inline-block text-sm text-purple-400 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm" />
            <a href="#" className="relative flex items-center gap-2 hover:text-purple-300 transition-colors">
              Built for cyberpunk detectives <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-200">
            Surveillance Tech of <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">the future</span><br />
            
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Advanced geolocation technology powered by AI. Process and analyze location data with unprecedented accuracy and speed.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg transition-all">
              Locate it
            </button>
            <a 
              href="/how-it-works"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-[#1A1F2A] to-[#252B38] hover:from-[#252B38] hover:to-[#303844] rounded-lg transition-all cursor-pointer"
            >
              Phase 2
            </a>
          </div>
          <div className="text-gray-400 flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            <span>Upload your image to know the location</span>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="relative group">
            {/* Double-layer glow effect for chat interface */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[5px] opacity-30 group-hover:opacity-70 transition duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-gradient-to-b from-[#1A1F2A] to-[#1E242E] rounded-xl shadow-xl overflow-hidden border border-purple-500/20">
              {/* Window Controls */}
              <div className="flex gap-2 p-4 border-b border-gray-800/50">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              {/* Messages Area */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                          : 'bg-gradient-to-r from-[#252B38] to-[#2C3444] text-gray-100'
                      }`}
                    >
                      {message.image && (
                        <Image
                        src={message.image}
                        alt="Uploaded location"
                        width={400}
                        height={300}
                        className="max-w-full rounded-lg mb-2"
                      />
                      )}
                      <p>{message.content}</p>
                      {message.location && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span>{message.location.name}</span>
                        </div>
                      )}
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-[#252B38] to-[#2C3444] rounded-2xl p-4">
                      <div className="flex gap-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-800/50">
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-300`}
                >
                  <label className="p-2 hover:bg-[#2C3444] rounded-lg transition-colors cursor-pointer">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className={`p-2 rounded-lg transition-all ${
                      inputText.trim() 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-gray-700 to-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!inputText.trim()}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 px-4 mb-24">
          {[
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Location Security',
              description: 'Enterprise-grade security for your location data'
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: 'Easy Integration',
              description: 'Simple API integration with your existing stack'
            },
            {
              icon: <Database className="w-6 h-6" />,
              title: 'Data Processing',
              description: 'Process millions of locations in real-time'
            }
          ].map((feature) => (
            <div key={feature.title} className="relative">
              <div className="relative bg-gradient-to-br from-[#1A1F2A] to-[#252B38] p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-800/50">
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By Section */}
        

        {locationInfo && (
          <div className="max-w-4xl mx-auto mb-24 rounded-xl overflow-hidden">
            <div id="map" className="h-[400px] w-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernUI;