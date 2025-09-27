"use client"
import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Users, 
  Shield, 
  Clock,
  ArrowRight,
  Star,
  Brain,
  Smile,
  Moon,
  Sun,
  Target,
  ChevronRight,
  Play,
  Award,
  Calendar,
  Headphones
} from 'lucide-react';

const MoodMateHomepage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: MessageCircle,
      title: "AI Wellness Companion",
      description: "Chat with your compassionate AI buddy anytime, anywhere. Get personalized support and guidance.",
      color: "from-cyan-400/90 to-teal-500/90",
      image: "🤖"
    },
    {
      icon: BookOpen,
      title: "Digital Wellness Journal",
      description: "Track your mood, thoughts, and progress with guided journaling prompts and insights.",
      color: "from-emerald-400/90 to-cyan-500/90",
      image: "📔"
    },
    {
      icon: Gamepad2,
      title: "Mindfulness Games",
      description: "Engage in fun, therapeutic games designed to reduce stress and improve mental wellness.",
      color: "from-sky-400/90 to-cyan-500/90",
      image: "🎮"
    },
    {
      icon: Target,
      title: "Wellness Goals",
      description: "Set and track personal wellness goals with our guided framework and progress tracking.",
      color: "from-teal-400/90 to-emerald-500/90",
      image: "🎯"
    }
  ];

  const wellnessStats = [
    { icon: Users, number: "50K+", label: "Students Supported" },
    { icon: MessageCircle, number: "2M+", label: "Conversations" },
    { icon: Heart, number: "98%", label: "Satisfaction Rate" },
    { icon: Clock, number: "24/7", label: "Available Support" }
  ];

  const wellnessGames = [
    {
      title: "Breathing Garden",
      description: "Guided breathing exercises in a peaceful virtual garden",
      icon: "🌸",
      color: "from-pink-400/90 to-rose-500/90",
      category: "Relaxation"
    },
    {
      title: "Mindful Maze",
      description: "Navigate through calming mazes while practicing mindfulness",
      icon: "🧩",
      color: "from-purple-400/90 to-indigo-500/90",
      category: "Focus"
    },
    {
      title: "Emotion Explorer",
      description: "Interactive game to identify and understand your emotions",
      icon: "🎭",
      color: "from-amber-400/90 to-orange-500/90",
      category: "Emotional Intelligence"
    },
    {
      title: "Gratitude Galaxy",
      description: "Collect stars by practicing daily gratitude exercises",
      icon: "⭐",
      color: "from-blue-400/90 to-cyan-500/90",
      category: "Positivity"
    }
  ];

  const journalPrompts = [
    "What made you smile today?",
    "Describe a moment you felt proud of yourself",
    "What are three things you're grateful for right now?",
    "How did you show kindness to yourself or others today?",
    "What's one thing you learned about yourself recently?"
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Inter", sans-serif' }}>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50/50 via-cyan-50/30 to-sky-50/50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-teal-50/80 border border-teal-200/60 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-700 font-light">Your Personal Wellness Companion</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-teal-800 mb-6 leading-tight">
              Mental Wellness
              <br />
              <span className="bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-teal-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Connect with your AI wellness companion, play mindful games, and journal your journey to better mental health. 
              Anonymous, confidential, and always here for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white px-8 py-4 rounded-2xl hover:from-teal-500/90 hover:to-cyan-600/90 transition-all duration-300 shadow-xl hover:shadow-2xl font-light text-lg flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Start Chatting</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-teal-300/60 text-teal-700 px-8 py-4 rounded-2xl hover:bg-teal-50/80 transition-all duration-300 font-light text-lg flex items-center space-x-2 bg-white/60 backdrop-blur-sm">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {wellnessStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400/90 to-cyan-500/90 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-light text-teal-800 mb-2">{stat.number}</div>
                  <div className="text-sm text-teal-600 font-light">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-teal-50/30 to-cyan-50/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-teal-800 mb-4">
              Everything You Need for
              <span className="block bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                Better Mental Health
              </span>
            </h2>
            <p className="text-lg text-teal-600 font-light max-w-2xl mx-auto">
              Comprehensive tools and support designed specifically for students and young adults
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-teal-800 mb-4">{feature.title}</h3>
                  <p className="text-teal-600 font-light leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex items-center text-teal-500 hover:text-teal-600 transition-colors">
                    <span className="text-sm font-light">Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wellness Games Section */}
      <section id="games" className="py-20 bg-white/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-teal-800 mb-4">
              Mindful Games &
              <span className="block bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                Interactive Activities
              </span>
            </h2>
            <p className="text-lg text-teal-600 font-light max-w-2xl mx-auto">
              Engaging games designed by wellness experts to reduce stress and build emotional intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wellnessGames.map((game, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-teal-200/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg text-2xl`}>
                    {game.icon}
                  </div>
                  <div className="text-xs text-teal-500 font-light mb-2 bg-teal-50/80 px-2 py-1 rounded-full inline-block">
                    {game.category}
                  </div>
                  <h3 className="text-lg font-light text-teal-800 mb-3">{game.title}</h3>
                  <p className="text-sm text-teal-600 font-light leading-relaxed mb-4">{game.description}</p>
                  <button className="text-sm text-teal-500 hover:text-teal-600 font-light flex items-center group-hover:text-teal-700 transition-colors">
                    Play Now <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-20 bg-gradient-to-br from-cyan-50/30 to-teal-50/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-teal-800 mb-6">
                Digital Wellness
                <span className="block bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                  Journal
                </span>
              </h2>
              <p className="text-lg text-teal-600 font-light mb-8 leading-relaxed">
                Track your thoughts, feelings, and growth with our guided journaling experience. 
                Discover patterns, celebrate progress, and build self-awareness.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: Calendar, text: "Daily mood tracking and reflection" },
                  { icon: Brain, text: "AI-powered insights and patterns" },
                  { icon: Award, text: "Achievement badges for consistency" },
                  { icon: Shield, text: "Private and encrypted entries" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400/90 to-cyan-500/90 rounded-xl flex items-center justify-center shadow-sm">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-teal-700 font-light">{item.text}</span>
                    </div>
                  );
                })}
              </div>
              
              <button className="bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white px-8 py-3 rounded-2xl hover:from-teal-500/90 hover:to-cyan-600/90 transition-all duration-300 shadow-lg font-light flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Start Journaling</span>
              </button>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40">
              <div className="text-lg font-light text-teal-800 mb-6">Today's Reflection Prompts</div>
              <div className="space-y-4">
                {journalPrompts.slice(0, 3).map((prompt, index) => (
                  <div key={index} className="bg-teal-50/80 rounded-2xl p-4 border border-teal-200/40">
                    <div className="text-sm text-teal-700 font-light">{prompt}</div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-teal-500 hover:text-teal-600 font-light text-sm flex items-center">
                See all prompts <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 bg-white/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-teal-800 mb-4">
              Always Here
              <span className="block bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                When You Need Us
              </span>
            </h2>
            <p className="text-lg text-teal-600 font-light max-w-2xl mx-auto">
              24/7 support, crisis resources, and a community that understands
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-rose-50/80 to-pink-50/60 border border-rose-200/60 rounded-3xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400/90 to-pink-500/90 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-rose-700 mb-4">Crisis Support</h3>
              <p className="text-sm text-rose-600 font-light mb-4">
                Immediate help when you need it most
              </p>
              <div className="text-lg font-medium text-rose-700">Call 988</div>
              <div className="text-sm text-rose-600 font-light">Suicide & Crisis Lifeline</div>
            </div>
            
            <div className="bg-gradient-to-br from-sky-50/80 to-cyan-50/60 border border-sky-200/60 rounded-3xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400/90 to-cyan-500/90 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-sky-700 mb-4">Peer Support</h3>
              <p className="text-sm text-sky-600 font-light mb-4">
                Connect with others who understand your journey
              </p>
              <button className="text-sky-600 hover:text-sky-700 font-light">Join Community</button>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/60 border border-emerald-200/60 rounded-3xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/90 to-teal-500/90 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-emerald-700 mb-4">Professional Help</h3>
              <p className="text-sm text-emerald-600 font-light mb-4">
                Find licensed therapists and counselors
              </p>
              <button className="text-emerald-600 hover:text-emerald-700 font-light">Find Therapist</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800/50 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/90 to-cyan-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-light">MoodMate</h3>
              </div>
              <p className="text-teal-200 font-light leading-relaxed mb-6">
                Empowering students and young adults with accessible mental wellness tools, 
                compassionate AI support, and a safe space to grow and heal.
              </p>
              <div className="text-sm text-teal-300 font-light">
                Your conversations are private and anonymous • Crisis support available 24/7
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-light mb-6">Resources</h4>
              <div className="space-y-3 text-teal-200 font-light">
                <div>Crisis Support</div>
                <div>Mental Health Tips</div>
                <div>Student Resources</div>
                <div>Professional Help</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-light mb-6">Support</h4>
              <div className="space-y-3 text-teal-200 font-light">
                <div>Help Center</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Contact Us</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-teal-700 mt-12 pt-8 text-center">
            <p className="text-teal-300 font-light">
              © 2025 MoodMate. Made with 💙 for mental wellness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoodMateHomepage;