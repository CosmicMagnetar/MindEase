"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Heart,
  Home,
  BookOpen,
  Sparkles,
  Star,
  Youtube,
  Music,
  Activity,
  Film,
  Gamepad2,
  Headphones,
  ArrowLeft,
  Volume2,
  RotateCcw,
  ChevronRight,
  Filter,
} from "lucide-react";

const TherapyWellnessHub = () => {
  const [currentView, setCurrentView] = useState("home");
  const [activeContent, setActiveContent] = useState<{
    id?: number;
    title?: string;
    description?: string;
    duration?: string;
    type?: string;
    category?: string;
    spotifyUrl?: string;
    videoId?: string;
    component?: string;
    genre?: string;
    therapeuticValue?: string;
  } | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("inhale");
  const [breathCount, setBreathCount] = useState(0);
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Breathing exercise logic
  useEffect(() => {
    if (breathingActive) {
      const phases = [
        { name: "inhale", duration: 4000, next: "hold" },
        { name: "hold", duration: 2000, next: "exhale" },
        { name: "exhale", duration: 4000, next: "inhale" },
      ];

      const currentPhaseData = phases.find((p) => p.name === breathPhase);

      breathingTimerRef.current = setTimeout(() => {
        if (!currentPhaseData) return;
        setBreathPhase(currentPhaseData.next);
        if (currentPhaseData.next === "inhale") {
          setBreathCount((prev) => prev + 1);
        }
      }, currentPhaseData?.duration || 4000);
    }

    return () => {
      if (breathingTimerRef.current) {
        clearTimeout(breathingTimerRef.current);
      }
    };
  }, [breathingActive, breathPhase]);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathPhase("inhale");
    setBreathCount(0);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setBreathPhase("inhale");
    if (breathingTimerRef.current) {
      clearTimeout(breathingTimerRef.current);
    }
  };

  // Content data
  const musicContent = [
    {
      id: 1,
      title: "Peaceful Ocean Waves",
      description: "Calming ocean sounds with gentle wave visuals for deep relaxation",
      duration: "10 min",
      type: "calming",
      category: "nature",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa",
    },
    {
      id: 2,
      title: "Healing Piano Melodies",
      description: "Soft piano compositions designed to soothe anxiety and promote peace",
      duration: "25 min",
      type: "peaceful",
      category: "instrumental",
    },
    {
      id: 3,
      title: "Meditation Bowls",
      description: "Tibetan singing bowls for mindfulness and centering",
      duration: "15 min",
      type: "meditative",
      category: "spiritual",
    },
    {
      id: 4,
      title: "Forest Sounds",
      description: "Birds chirping and rustling leaves for natural calm",
      duration: "20 min",
      type: "nature",
      category: "ambient",
    },
  ];

  const videoContent = [
    {
      id: 1,
      title: "5-Minute Breathing Exercise",
      description: "Guided breathing technique to center yourself and reduce stress",
      duration: "5 min",
      type: "breathing",
      thumbnail: "https://img.youtube.com/vi/YRPh_GaiL8s/maxresdefault.jpg",
      videoId: "YRPh_GaiL8s",
    },
    {
      id: 2,
      title: "Mindfulness Meditation",
      description: "Gentle guided meditation for present-moment awareness",
      duration: "15 min",
      type: "meditation",
      videoId: "inpok4MKVLM",
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      description: "Full body relaxation technique for stress relief",
      duration: "20 min",
      type: "relaxation",
      videoId: "1nZEdqcGVzo",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "4-7-8 Breathing",
      description: "Deep breathing exercise for anxiety relief",
      duration: "5 min",
      type: "breathing",
      component: "breathing-exercise",
    },
    {
      id: 2,
      title: "Gratitude Walking",
      description: "A mindful walk focusing on appreciation and present-moment awareness",
      duration: "20 min",
      type: "mindfulness",
    },
    {
      id: 3,
      title: "Color Focus Game",
      description: "Concentration exercise using colors for mindfulness",
      duration: "10 min",
      type: "game",
      component: "color-game",
    },
  ];

  const movies = [
    {
      id: 1,
      title: "The Pursuit of Happyness",
      description: "Inspiring story about resilience and never giving up",
      genre: "Drama",
      therapeuticValue: "Hope and perseverance",
    },
    {
      id: 2,
      title: "Inside Out",
      description: "Understanding emotions and mental health through animation",
      genre: "Animation",
      therapeuticValue: "Emotional awareness",
    },
    {
      id: 3,
      title: "Good Will Hunting",
      description: "Therapy and healing from trauma",
      genre: "Drama",
      therapeuticValue: "Therapy process",
    },
    {
      id: 4,
      title: "A Beautiful Mind",
      description: "Mental health awareness and support",
      genre: "Biography",
      therapeuticValue: "Mental health understanding",
    },
  ];

  const playlists = [
    {
      name: "Morning Calm",
      tracks: 12,
      description: "Gentle start to your day",
    },
    {
      name: "Focus Flow",
      tracks: 18,
      description: "Concentration and clarity",
    },
    {
      name: "Evening Unwind",
      tracks: 15,
      description: "Peaceful end to your day",
    },
    {
      name: "Anxiety Relief",
      tracks: 20,
      description: "Soothing sounds for calm",
    },
  ];

  const filters = [
    { id: "all", label: "All Content" },
    { id: "music", label: "Music & Sounds" },
    { id: "videos", label: "Guided Videos" },
    { id: "activities", label: "Activities" },
    { id: "games", label: "Games" },
  ];

  const ContentCard = ({ 
    item, 
    onClick, 
    icon: Icon, 
    buttonText = "Start" 
  }: { 
    item: any; 
    onClick: (item: any) => void; 
    icon: any; 
    buttonText?: string; 
  }) => (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 bg-gradient-to-br from-cyan-400/90 to-teal-500/90 rounded-2xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-light bg-teal-50/80 text-teal-700 border border-teal-200/40">
            {item.type}
          </span>
          {item.duration && (
            <span className="text-teal-600 text-sm ml-2 font-light">{item.duration}</span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-light text-teal-800 mb-4">{item.title}</h3>
      <p className="text-teal-600 font-light leading-relaxed mb-6">{item.description}</p>

      <button className="w-full bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white py-3 rounded-2xl font-light hover:from-teal-500/90 hover:to-cyan-600/90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
        <Play className="w-4 h-4" />
        {buttonText}
      </button>
    </div>
  );

  const BreathingExercise = () => {
    const getBreathingText = () => {
      switch (breathPhase) {
        case "inhale":
          return "Breathe In...";
        case "hold":
          return "Hold...";
        case "exhale":
          return "Breathe Out...";
        default:
          return "Ready to start?";
      }
    };

    const getBreathingColor = () => {
      switch (breathPhase) {
        case "inhale":
          return "from-cyan-400/90 to-teal-400/90";
        case "hold":
          return "from-amber-400/90 to-orange-400/90";
        case "exhale":
          return "from-emerald-400/90 to-green-400/90";
        default:
          return "from-teal-400/90 to-cyan-400/90";
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50/30 to-cyan-50/30 flex flex-col items-center justify-center p-4">
        <Link href="/wellness">
          <button className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-teal-200/40 hover:border-teal-300/60 transition-all">
            <ArrowLeft className="w-6 h-6 text-teal-700" />
          </button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-teal-900 mb-2">
            4-7-8 Breathing Exercise
          </h1>
          <p className="text-teal-700/80 font-light">
            Follow the circle and breathe with the rhythm
          </p>
        </div>

        <div className="relative mb-8">
          <div
            className={`w-64 h-64 rounded-full bg-gradient-to-br ${getBreathingColor()} flex items-center justify-center shadow-2xl transition-all duration-1000 border-8 border-white/20 backdrop-blur-sm ${
              breathingActive
                ? breathPhase === "inhale"
                  ? "scale-125"
                  : breathPhase === "exhale"
                  ? "scale-75"
                  : "scale-100"
                : "scale-100"
            }`}
          >
            <div className="text-center">
              <div className="text-white text-2xl font-light mb-2">
                {getBreathingText()}
              </div>
              <div className="text-white text-lg font-light">Cycle: {breathCount}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {!breathingActive ? (
            <button
              onClick={startBreathing}
              className="px-8 py-4 bg-gradient-to-br from-emerald-400/90 to-green-500/90 text-white rounded-2xl font-light hover:shadow-lg transition-all flex items-center gap-2 border border-white/20 backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              Start Breathing
            </button>
          ) : (
            <button
              onClick={stopBreathing}
              className="px-8 py-4 bg-gradient-to-br from-rose-400/90 to-pink-500/90 text-white rounded-2xl font-light hover:shadow-lg transition-all flex items-center gap-2 border border-white/20 backdrop-blur-sm"
            >
              <Pause className="w-5 h-5" />
              Stop
            </button>
          )}

          <button
            onClick={() => {
              stopBreathing();
              setTimeout(startBreathing, 100);
            }}
            className="px-8 py-4 bg-teal-100/50 text-teal-700 rounded-2xl font-light hover:bg-teal-200/50 transition-all flex items-center gap-2 border border-teal-200/40"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md border border-teal-200/40">
          <h3 className="font-light text-teal-900 mb-3">How it works:</h3>
          <ul className="text-sm text-teal-700/80 space-y-2 font-light">
            <li>• Inhale for 4 seconds (circle expands)</li>
            <li>• Hold for 7 seconds (circle stays)</li>
            <li>• Exhale for 8 seconds (circle contracts)</li>
            <li>• Repeat for 4-8 cycles for best results</li>
          </ul>
        </div>
      </div>
    );
  };

  const CookingChallengeGame = () => {
    const CHALLENGES = [
      "Make a dish with 3 colors",
      "Cook something in 15 minutes",
      "Use only 5 ingredients",
      "No-heat recipe",
      "Breakfast-for-dinner",
    ];

    const INGREDIENTS = [
      "Tomato", "Spinach", "Yogurt", "Paneer", "Chickpeas",
      "Lemon", "Cilantro", "Onion", "Carrot", "Rice"
    ];

    const [challenge, setChallenge] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [points, setPoints] = useState(0);
    const [entries, setEntries] = useState<{
      challenge: string;
      desc: string;
      photo: string | null;
      points: number;
      date: string;
    }[]>([]);

    // Timer countdown
    useEffect(() => {
  if (timeLeft === null || timeLeft <= 0) return;
  const t = setTimeout(() => setTimeLeft((t) => (t !== null ? t - 1 : 0)), 1000);
  return () => clearTimeout(t);
}, [timeLeft])



    function newChallenge() {
      const c = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
      const rolls = Array.from({ length: 3 }, () =>
        INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)]
      );
      setChallenge(c);
      setIngredients(rolls);
      setTimeLeft(c.includes("15") ? 15 * 60 : null);
      setDesc("");
      setPhoto(null);
    }

    function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }

    function completeChallenge() {
      if (!challenge) return;
      const earned = 50 + (timeLeft && timeLeft > 0 ? 20 : 0);
      setPoints(points + earned);
      setEntries([
        { challenge, desc, photo, points: earned, date: new Date().toLocaleString() },
        ...entries,
      ]);
      setChallenge("");
      setIngredients([]);
      setTimeLeft(null);
      setDesc("");
      setPhoto(null);
    }

    const badge =
      points >= 500 ? "🥇 Gold Chef" :
      points >= 250 ? "🥈 Silver Chef" :
      points >= 100 ? "🥉 Bronze Chef" : "👩‍🍳 Newbie";

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100/40 via-amber-50/30 to-yellow-50/40 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-300/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-300/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-300/10 to-orange-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <Link href="/wellness">
          <button className="absolute top-8 left-8 z-10 p-4 bg-white/95 backdrop-blur-md rounded-3xl border border-orange-200/60 hover:border-orange-300/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <ArrowLeft className="w-6 h-6 text-orange-700" />
          </button>
        </Link>

        <div className="relative z-10 max-w-4xl w-full mx-auto p-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl shadow-2xl mb-6 animate-bounce">
              <span className="text-4xl">🍳</span>
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-4">
              Cooking Challenge
            </h1>
            <p className="text-xl text-orange-700/80 font-medium max-w-2xl mx-auto">
              Master the art of cooking with creative challenges and earn your chef badges!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl border border-orange-200/60">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{points}</div>
                <div className="text-sm text-orange-700 font-medium">Points</div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl border border-amber-200/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{badge}</div>
                <div className="text-sm text-amber-700 font-medium">Badge</div>
              </div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-orange-200/60">
            {!challenge ? (
              <div className="text-center py-12">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <span className="text-6xl">🎲</span>
                </div>
                <h2 className="text-3xl font-bold text-orange-800 mb-4">Ready for a Challenge?</h2>
                <p className="text-lg text-orange-700/80 mb-8 max-w-md mx-auto">
                  Get a random cooking challenge with surprise ingredients and start creating!
                </p>
                <button
                  onClick={newChallenge}
                  className="px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  Start New Challenge
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Challenge Card */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border-2 border-orange-200/60 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-800">Your Challenge</h3>
                  </div>
                  <p className="text-2xl font-bold text-orange-900 mb-6">{challenge}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-orange-800 mb-3">🎲 Random Ingredients:</h4>
                    <div className="flex flex-wrap gap-3">
                      {ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {timeLeft !== null && (
                    <div className="text-center bg-white/80 rounded-2xl p-4">
                      <p className="text-lg font-bold text-orange-700 mb-2">⏱️ Time Remaining</p>
                      <p className="text-4xl font-mono font-bold text-orange-600">
                        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                        {String(timeLeft % 60).padStart(2, "0")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Submission Form */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 border-2 border-teal-200/60 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">📸</span>
                    </div>
                    <h3 className="text-2xl font-bold text-teal-800">Submit Your Creation</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-bold text-teal-800 mb-3">Upload Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onPhotoChange}
                        className="block w-full text-lg file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0
                                   file:text-lg file:font-bold file:bg-teal-500 file:text-white hover:file:bg-teal-600
                                   file:shadow-lg file:hover:shadow-xl file:transition-all"
                      />
                      {photo && (
                        <div className="mt-4">
                          <img src={photo} alt="Dish" className="rounded-2xl shadow-xl w-full max-w-md mx-auto border-4 border-teal-200" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-teal-800 mb-3">Describe Your Dish</label>
                      <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Tell us about your amazing creation..."
                        className="w-full p-6 rounded-2xl bg-white border-2 border-teal-300 focus:ring-4 focus:ring-teal-400 text-lg font-medium resize-none"
                        rows={4}
                      />
                    </div>

                    <button
                      onClick={completeChallenge}
                      className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <span className="text-2xl">✅</span>
                      Complete Challenge
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {entries.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📂</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800">Your Gallery</h3>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {entries.map((e, i) => (
                    <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="text-xs text-purple-500 font-bold mb-2">{e.date}</div>
                      <div className="text-lg font-bold text-purple-800 mb-3">{e.challenge}</div>
                      {e.photo && <img src={e.photo} alt="" className="mb-3 rounded-xl w-full h-32 object-cover" />}
                      {e.desc && <p className="text-sm text-purple-600 mb-3">{e.desc}</p>}
                      <div className="text-sm font-bold text-emerald-600 bg-emerald-100 rounded-full px-3 py-1 inline-block">
                        +{e.points} points
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const GroundingGame = () => {
    const STEPS = [
      { count: 5, sense: "things you can see", icon: "👁️", color: "from-blue-400 to-cyan-500" },
      { count: 4, sense: "things you can touch", icon: "✋", color: "from-green-400 to-emerald-500" },
      { count: 3, sense: "things you can hear", icon: "👂", color: "from-purple-400 to-violet-500" },
      { count: 2, sense: "things you can smell", icon: "👃", color: "from-orange-400 to-amber-500" },
      { count: 1, sense: "thing you can taste", icon: "👅", color: "from-pink-400 to-rose-500" },
    ];

    const [idx, setIdx] = useState(0);
    const [inputs, setInputs] = useState<string[][]>(STEPS.map(s => Array(s.count).fill("")));
    const [moodBefore, setMoodBefore] = useState(5);
    const [moodAfter, setMoodAfter] = useState(5);
    const [logs, setLogs] = useState<{
      date: string;
      moodBefore: number;
      moodAfter: number;
    }[]>([]);

    function setInput(step: number, i: number, val: string) {
      setInputs(prev => {
        const copy = prev.map(arr => arr.slice());
        copy[step][i] = val;
        return copy;
      });
    }

    function next() {
      if (idx < STEPS.length - 1) setIdx(idx + 1);
      else finish();
    }

    function finish() {
      const entry = {
        date: new Date().toLocaleString(),
        moodBefore,
        moodAfter,
      };
      setLogs([entry, ...logs]);
      setIdx(0);
      setInputs(STEPS.map(s => Array(s.count).fill("")));
    }

    const improvement = moodAfter - moodBefore;
    const progress = ((idx + 1) / STEPS.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100/50 via-green-50/40 to-teal-50/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-300/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-300/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-300/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <Link href="/wellness">
          <button className="absolute top-8 left-8 z-10 p-4 bg-white/95 backdrop-blur-md rounded-3xl border border-emerald-200/60 hover:border-emerald-300/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <ArrowLeft className="w-6 h-6 text-emerald-700" />
          </button>
        </Link>

        <div className="relative z-10 max-w-5xl w-full mx-auto p-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl shadow-2xl mb-6 animate-bounce">
              <span className="text-4xl">🌱</span>
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 mb-4">
              Grounding Exercise
            </h1>
            <p className="text-xl text-emerald-700/80 font-medium max-w-2xl mx-auto">
              A powerful mindfulness technique using your 5 senses to help you feel centered and calm
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-emerald-200/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-emerald-800">Progress</span>
                <span className="text-lg font-bold text-emerald-600">{idx + 1} / {STEPS.length}</span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Mood Tracker */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-200/60">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">😊</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-800">Mood Check-in</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-bold text-emerald-800 mb-4">How are you feeling now?</label>
                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={moodBefore}
                      onChange={e => setMoodBefore(+e.target.value)}
                      className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-sm text-emerald-600 font-medium mt-2">
                      <span>Stressed</span>
                      <span className="text-2xl font-bold text-emerald-700">{moodBefore}</span>
                      <span>Calm</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-emerald-800 mb-4">How do you feel after?</label>
                  <div className="bg-green-50 rounded-2xl p-6">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={moodAfter}
                      onChange={e => setMoodAfter(+e.target.value)}
                      className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between text-sm text-green-600 font-medium mt-2">
                      <span>Stressed</span>
                      <span className="text-2xl font-bold text-green-700">{moodAfter}</span>
                      <span>Calm</span>
                    </div>
                    {improvement !== 0 && (
                      <div className="text-center mt-4">
                        <span className={`text-lg font-bold ${improvement > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement)} point{Math.abs(improvement) !== 1 ? 's' : ''} {improvement > 0 ? 'improvement' : 'change'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Input */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-green-200/60">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 bg-gradient-to-br ${STEPS[idx].color} rounded-2xl flex items-center justify-center`}>
                  <span className="text-2xl">{STEPS[idx].icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-800">
                    Step {idx + 1} of {STEPS.length}
                  </h3>
                  <p className="text-emerald-600 font-medium">
                    {STEPS[idx].count} {STEPS[idx].sense}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {inputs[idx].map((val, i) => (
                  <div key={i} className="relative">
                    <input
                      value={val}
                      onChange={e => setInput(idx, i, e.target.value)}
                      placeholder={`Item ${i + 1}`}
                      className="w-full p-4 rounded-2xl bg-white border-2 border-emerald-300 focus:ring-4 focus:ring-emerald-400 text-lg font-medium placeholder-emerald-400 transition-all duration-300"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 font-bold">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={next}
                className={`w-full px-8 py-4 bg-gradient-to-r ${STEPS[idx].color} text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3`}
              >
                <span className="text-2xl">{idx < STEPS.length - 1 ? '➡️' : '✅'}</span>
                {idx < STEPS.length - 1 ? 'Next Step' : 'Complete Exercise'}
              </button>
            </div>
          </div>

          {/* History Section */}
          {logs.length > 0 && (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-200/60">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-800">Your Progress History</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {logs.map((l, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-sm text-emerald-500 font-bold mb-3">{l.date}</div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-emerald-800">Mood Change</span>
                      <span className={`text-2xl font-bold ${l.moodAfter - l.moodBefore > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {l.moodAfter - l.moodBefore > 0 ? '+' : ''}{l.moodAfter - l.moodBefore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-emerald-600 font-medium">
                      <span>{l.moodBefore} → {l.moodAfter}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        l.moodAfter - l.moodBefore > 0 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {l.moodAfter - l.moodBefore > 0 ? 'Improved' : 'Changed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const WordSearchGame = () => {
    const WORDS = ["JOY", "HOPE", "CALM", "LOVE", "PEACE", "KIND"];
    const AFFIRM = {
      JOY: "Joy is welcome here 🌸",
      HOPE: "Hope is always within reach 🌟",
      CALM: "Calm flows through you 🌊",
      LOVE: "You are loved and loving ❤️",
      PEACE: "Peace begins with one breath 🕊️",
      KIND: "Kindness multiplies 🤝",
    };

    const DIRECTIONS = [
      { dr: 0, dc: 1 },   // right
      { dr: 0, dc: -1 },  // left
      { dr: 1, dc: 0 },   // down
      { dr: -1, dc: 0 },  // up
      { dr: 1, dc: 1 },   // down-right
      { dr: -1, dc: -1 }, // up-left
      { dr: 1, dc: -1 },  // down-left
      { dr: -1, dc: 1 },  // up-right
    ];

    const size = 8;
    const [grid, setGrid] = useState<string[][]>([]);
    const [found, setFound] = useState<string[]>([]);
    const [lastAffirm, setLastAffirm] = useState("");
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
      generateGrid();
    }, []);

    function generateGrid() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const newGrid = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => "")
      );

      // Place words randomly
      WORDS.forEach((word) => {
        let placed = false;
        for (let attempt = 0; attempt < 100 && !placed; attempt++) {
          const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
          const row = Math.floor(Math.random() * size);
          const col = Math.floor(Math.random() * size);

          let r = row, c = col;
          let fits = true;
          for (let i = 0; i < word.length; i++) {
            if (
              r < 0 || c < 0 || r >= size || c >= size ||
              (newGrid[r][c] && newGrid[r][c] !== word[i])
            ) {
              fits = false;
              break;
            }
            r += dir.dr;
            c += dir.dc;
          }

          if (fits) {
            r = row; c = col;
            for (let i = 0; i < word.length; i++) {
              newGrid[r][c] = word[i];
              r += dir.dr;
              c += dir.dc;
            }
            placed = true;
          }
        }
      });

      // Fill empty cells
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!newGrid[r][c]) {
            newGrid[r][c] = letters[Math.floor(Math.random() * letters.length)];
          }
        }
      }

      setGrid(newGrid);
      setFound([]);
      setLastAffirm("");
      setShowCelebration(false);
    }

    function markFound(word: string) {
      if (!found.includes(word)) {
        setFound([...found, word]);
        setLastAffirm(AFFIRM[word as keyof typeof AFFIRM]);
        
        // Show celebration if all words found
        if (found.length + 1 === WORDS.length) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    }

    const progress = (found.length / WORDS.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100/50 via-violet-50/40 to-indigo-50/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-300/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-purple-200/60 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Congratulations!</h2>
              <p className="text-lg text-purple-600">You found all the positive words!</p>
            </div>
          </div>
        )}

        <Link href="/wellness">
          <button className="absolute top-8 left-8 z-10 p-4 bg-white/95 backdrop-blur-md rounded-3xl border border-purple-200/60 hover:border-purple-300/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <ArrowLeft className="w-6 h-6 text-purple-700" />
          </button>
        </Link>

        <div className="relative z-10 max-w-6xl w-full mx-auto p-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-3xl shadow-2xl mb-6 animate-bounce">
              <span className="text-4xl">🔤</span>
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600 mb-4">
              Positive Word Search
            </h1>
            <p className="text-xl text-purple-700/80 font-medium max-w-2xl mx-auto">
              Find uplifting words and receive beautiful affirmations to brighten your day
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-200/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-purple-800">Progress</span>
                <span className="text-lg font-bold text-purple-600">{found.length} / {WORDS.length}</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-violet-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Word Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-purple-200/60">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800">Find the Words</h3>
                </div>
                
                <div
                  className="grid gap-2 max-w-lg mx-auto"
                  style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
                >
                  {grid.map((row, r) =>
                    row.map((letter, c) => (
                      <div
                        key={`${r}-${c}`}
                        className="h-16 flex items-center justify-center border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 text-lg font-bold text-purple-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-100 hover:to-violet-100"
                      >
                        {letter}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Word List & Affirmations */}
            <div className="space-y-8">
              {/* Word List */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-purple-200/60">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800">Words to Find</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {WORDS.map((w) => (
                    <button
                      key={w}
                      onClick={() => markFound(w)}
                      disabled={found.includes(w)}
                      className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                        found.includes(w)
                          ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white line-through shadow-lg scale-95"
                          : "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 hover:from-purple-200 hover:to-violet-200 hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Affirmation Display */}
              {lastAffirm && (
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-8 shadow-2xl border border-cyan-200/60">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-xl font-bold text-cyan-800">Affirmation</h3>
                  </div>
                  <p className="text-lg text-cyan-700 font-medium leading-relaxed animate-pulse">
                    {lastAffirm}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <button
              onClick={generateGrid}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <span className="text-2xl">🔄</span>
              New Puzzle
            </button>
            
            {found.length > 0 && (
              <button
                onClick={() => {
                  setFound([]);
                  setLastAffirm("");
                }}
                className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <span className="text-2xl">🔄</span>
                Reset Progress
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ColorFocusGame = () => {
    const colors = [
      { name: "red", bg: "bg-gradient-to-br from-rose-400 to-red-500", text: "Red", emoji: "🔴" },
      { name: "blue", bg: "bg-gradient-to-br from-sky-400 to-blue-500", text: "Blue", emoji: "🔵" },
      { name: "green", bg: "bg-gradient-to-br from-emerald-400 to-green-500", text: "Green", emoji: "🟢" },
      { name: "yellow", bg: "bg-gradient-to-br from-amber-400 to-yellow-500", text: "Yellow", emoji: "🟡" },
      { name: "purple", bg: "bg-gradient-to-br from-violet-400 to-purple-500", text: "Purple", emoji: "🟣" },
      { name: "orange", bg: "bg-gradient-to-br from-orange-400 to-orange-500", text: "Orange", emoji: "🟠" },
    ];

    const [targetColor, setTargetColor] = useState(colors[0]);
    const [displayedColors, setDisplayedColors] = useState<{ name: string; bg: string; text: string; emoji: string }[]>([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [localScore, setLocalScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(null);
    const [gameFinished, setGameFinished] = useState(false);

    useEffect(() => {
      if (gameActive && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 && gameActive) {
        setGameActive(false);
        setGameFinished(true);
      }
    }, [gameActive, timeLeft]);

    useEffect(() => {
      if (gameActive && !gameFinished) {
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        setDisplayedColors(shuffled.slice(0, 4));
        setTargetColor(shuffled[Math.floor(Math.random() * 4)]);
      }
    }, [gameActive, localScore, gameFinished]);

    const handleColorClick = (color: { name: string; bg: string; text: string; emoji: string }) => {
      if (!gameActive || gameFinished) return;
      
      if (color.name === targetColor.name) {
        setLocalScore((prev) => prev + 10);
        setGameScore((prev) => prev + 10);
        setShowFeedback("correct");
        setTimeout(() => setShowFeedback(null), 1000);
        // Generate new colors after correct answer
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        setDisplayedColors(shuffled.slice(0, 4));
        setTargetColor(shuffled[Math.floor(Math.random() * 4)]);
      } else {
        setLocalScore((prev) => Math.max(0, prev - 5));
        setShowFeedback("wrong");
        setTimeout(() => setShowFeedback(null), 1000);
      }
    };

    const startGame = () => {
      setGameActive(true);
      setTimeLeft(60);
      setLocalScore(0);
      setGameFinished(false);
    };

    const stopGame = () => {
      setGameActive(false);
      setGameFinished(true);
    };

    const resetGame = () => {
      setGameActive(false);
      setTimeLeft(60);
      setLocalScore(0);
      setGameFinished(false);
      setShowFeedback(null);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100/50 via-violet-50/40 to-purple-50/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-300/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-300/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <Link href="/wellness">
          <button className="absolute top-8 left-8 z-10 p-4 bg-white/95 backdrop-blur-md rounded-3xl border border-indigo-200/60 hover:border-indigo-300/80 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <ArrowLeft className="w-6 h-6 text-indigo-700" />
          </button>
        </Link>

        <div className="relative z-10 max-w-4xl w-full mx-auto p-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-3xl shadow-2xl mb-6 animate-bounce">
              <span className="text-4xl">🎯</span>
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-4">
              Color Focus Game
            </h1>
            <p className="text-xl text-indigo-700/80 font-medium max-w-2xl mx-auto">
              Test your focus and concentration by matching colors with words in this mindfulness exercise
            </p>
          </div>

          {/* Main Game Area */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-indigo-200/60">
            {!gameActive && !gameFinished ? (
              <div className="text-center py-12">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <span className="text-6xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-indigo-800 mb-4">Ready to Focus?</h2>
                <p className="text-lg text-indigo-700/80 mb-8 max-w-md mx-auto">
                  This mindfulness game helps improve focus and concentration. 
                  Click the colored square that matches the word shown.
                </p>
                <button
                  onClick={startGame}
                  className="px-12 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  Start Game
                </button>
              </div>
            ) : gameFinished ? (
              <div className="text-center py-12">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <span className="text-6xl">🏆</span>
                </div>
                <h2 className="text-3xl font-bold text-emerald-800 mb-4">Time's Up!</h2>
                <p className="text-lg text-emerald-700/80 mb-8 max-w-md mx-auto">
                  Great job! You've completed the focus training session.
                </p>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 mb-8 border border-emerald-200/60">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{localScore}</div>
                  <div className="text-lg text-emerald-700 font-medium">Final Score</div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <Play className="w-6 h-6" />
                    Play Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Game Stats */}
                <div className="flex justify-center gap-8 mb-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl px-8 py-4 shadow-xl border border-indigo-200/60">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">{localScore}</div>
                      <div className="text-sm text-indigo-700 font-medium">Score</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl px-8 py-4 shadow-xl border border-violet-200/60">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-violet-600">{timeLeft}s</div>
                      <div className="text-sm text-violet-700 font-medium">Time Left</div>
                    </div>
                  </div>
                </div>

                {/* Target Color Display */}
                <div className="text-center mb-8">
                  <div className="text-lg text-indigo-600 mb-4 font-bold">
                    Find the color:
                  </div>
                  <div className="text-6xl font-bold text-indigo-800 mb-2">
                    {targetColor.text}
                  </div>
                  <div className="text-4xl">{targetColor.emoji}</div>
                </div>

                {/* Color Grid */}
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
                  {displayedColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorClick(color)}
                      className={`${color.bg} h-32 rounded-3xl hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-white/50 backdrop-blur-sm flex items-center justify-center group`}
                    >
                      <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                        {color.emoji}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${
                      showFeedback === "correct" ? "text-emerald-600" : "text-red-500"
                    } animate-bounce`}>
                      {showFeedback === "correct" ? "✅ Correct!" : "❌ Try Again!"}
                    </div>
                  </div>
                )}

                {/* Game Controls */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={stopGame}
                    className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <Pause className="w-6 h-6" />
                    Stop Game
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <RotateCcw className="w-6 h-6" />
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const VideoPlayer = ({ video }: { video: any }) => (
    <div className="min-h-screen bg-teal-50/30 p-4">
      <button
        onClick={() => setCurrentView("videos")}
        className="mb-6 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-teal-200/40 hover:border-teal-300/60 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-teal-700" />
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-teal-200/40">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-t-2xl"
            />
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-light text-teal-900 mb-2">
              {video.title}
            </h1>
            <p className="text-teal-700/80 mb-4 font-light">{video.description}</p>
            <div className="flex items-center gap-4 text-sm text-teal-600 font-light">
              <span>{video.duration}</span>
              <span className="capitalize">{video.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (activeContent?.component === "breathing-exercise") {
    return <BreathingExercise />;
  }

  if (activeContent?.component === "color-game") {
    return <ColorFocusGame />;
  }

  if (activeContent?.component === "cooking-game") {
    return <CookingChallengeGame />;
  }

  if (activeContent?.component === "grounding-game") {
    return <GroundingGame />;
  }

  if (activeContent?.component === "wordsearch-game") {
    return <WordSearchGame />;
  }

  if (activeContent?.videoId) {
    return <VideoPlayer video={activeContent} />;
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Inter", sans-serif' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50/50 via-cyan-50/30 to-sky-50/50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-teal-50/80 border border-teal-200/60 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-700 font-light">Your Personal Wellness Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-teal-800 mb-6 leading-tight">
              Wellness
              <br />
              <span className="bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-teal-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Discover soothing content, uplifting activities, and personalized recommendations 
              tailored for your wellness journey.
            </p>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
              <Filter className="w-4 h-4 text-teal-600 mr-2" />
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    if (filter.id !== "all") setCurrentView(filter.id);
                  }}
                  className={`px-4 py-2 rounded-2xl text-sm font-light transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white shadow-lg"
                      : "text-teal-600 hover:bg-teal-50/80 border border-teal-200/40 bg-white/60 backdrop-blur-sm"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50/30 to-cyan-50/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-teal-800 mb-4">
              {currentView === "home" && "Everything You Need for"}
              {currentView === "music" && "Therapeutic Music &"}
              {currentView === "videos" && "Guided Videos &"}
              {currentView === "activities" && "Mindful Activities &"}
              {currentView === "movies" && "Therapeutic Movies &"}
              {currentView === "games" && "Wellness Games &"}
              <span className="block bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent font-normal">
                {currentView === "home" && "Better Mental Health"}
                {currentView === "music" && "Calming Sounds"}
                {currentView === "videos" && "Mindfulness Practices"}
                {currentView === "activities" && "Stress Relief"}
                {currentView === "movies" && "Emotional Healing"}
                {currentView === "games" && "Focus Training"}
              </span>
            </h2>
            <p className="text-lg text-teal-600 font-light max-w-2xl mx-auto">
              {currentView === "home" &&
                "Comprehensive tools and support designed specifically for your wellness journey"}
              {currentView === "music" &&
                "Curated playlists and calming sounds designed to support your mental health and relaxation"}
              {currentView === "videos" &&
                "Professional guided sessions for meditation, breathing, and mindfulness practices"}
              {currentView === "activities" &&
                "Interactive exercises and mindful practices to reduce stress and improve wellbeing"}
              {currentView === "movies" &&
                "Inspiring films that promote healing, hope, and emotional understanding"}
              {currentView === "games" &&
                "Engaging activities designed to improve focus, reduce anxiety, and promote mindfulness"}
            </p>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1">
            {/* Music Content */}
            {(currentView === "home" || currentView === "music") && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {musicContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    icon={item.spotifyUrl ? Music : Volume2}
                    onClick={(item: any) => {
                      if (item.spotifyUrl) {
                        window.open(item.spotifyUrl, "_blank");
                      } else {
                        setActiveContent(item);
                      }
                    }}
                    buttonText={item.spotifyUrl ? "Open Spotify" : "Listen"}
                  />
                ))}
              </div>
            )}

            {/* Video Content */}
            {(currentView === "home" || currentView === "videos") && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {videoContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    icon={Youtube}
                    onClick={setActiveContent}
                    buttonText="Watch"
                  />
                ))}
              </div>
            )}

            {/* Activities */}
            {(currentView === "home" || currentView === "activities") && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {activities.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    icon={Activity}
                    onClick={setActiveContent}
                    buttonText="Begin"
                  />
                ))}
              </div>
            )}

            {/* Movies */}
            {currentView === "movies" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {movies.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400/90 to-purple-500/90 flex items-center justify-center shadow-lg">
                        <Film className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-light bg-teal-50/80 text-teal-700 border border-teal-200/40">
                          {item.genre}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-light text-teal-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-teal-600 font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <p className="text-emerald-600 text-sm font-light mb-6">
                      Therapeutic Value: {item.therapeuticValue}
                    </p>

                    <button className="w-full bg-gradient-to-r from-violet-400/90 to-purple-500/90 text-white py-3 rounded-2xl font-light hover:shadow-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                      <Film className="w-4 h-4" />
                      Find to Watch
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Games */}
            {currentView === "games" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
                <div
                  className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-orange-200/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveContent({ component: "cooking-game" } as any)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl group-hover:animate-bounce">🍳</span>
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-orange-100 text-orange-700 border border-orange-200/60">
                          Cooking
                        </span>
                        <span className="text-orange-600 text-sm ml-2 font-bold">15 min</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-orange-800 mb-4 group-hover:text-orange-900 transition-colors">
                      Cooking Challenge
                    </h3>
                    <p className="text-orange-600 font-medium leading-relaxed mb-6">
                      Complete cooking challenges with random ingredients and earn points
                    </p>

                    <button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg group-hover:from-orange-600 group-hover:to-amber-700">
                      <Play className="w-5 h-5" />
                      Start Cooking
                    </button>
                  </div>
                </div>

                <div
                  className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-emerald-200/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveContent({ component: "grounding-game" } as any)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl group-hover:animate-bounce">🌱</span>
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-emerald-100 text-emerald-700 border border-emerald-200/60">
                          Mindfulness
                        </span>
                        <span className="text-emerald-600 text-sm ml-2 font-bold">10 min</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-emerald-800 mb-4 group-hover:text-emerald-900 transition-colors">
                      Grounding Exercise
                    </h3>
                    <p className="text-emerald-600 font-medium leading-relaxed mb-6">
                      A mindfulness technique using your 5 senses to feel centered and calm
                    </p>

                    <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg group-hover:from-emerald-600 group-hover:to-green-700">
                      <Play className="w-5 h-5" />
                      Start Exercise
                    </button>
                  </div>
                </div>

                <div
                  className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-purple-200/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveContent({ component: "wordsearch-game" } as any)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-violet-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl group-hover:animate-bounce">🔤</span>
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-100 text-purple-700 border border-purple-200/60">
                          Word Game
                        </span>
                        <span className="text-purple-600 text-sm ml-2 font-bold">15 min</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-purple-800 mb-4 group-hover:text-purple-900 transition-colors">
                      Positive Word Search
                    </h3>
                    <p className="text-purple-600 font-medium leading-relaxed mb-6">
                      Find positive words in a puzzle and receive uplifting affirmations
                    </p>

                    <button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg group-hover:from-purple-600 group-hover:to-violet-700">
                      <Play className="w-5 h-5" />
                      Play Now
                    </button>
                  </div>
                </div>

                <div
                  className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-indigo-200/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveContent({ component: "color-game" } as any)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-violet-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl group-hover:animate-bounce">🎯</span>
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-indigo-100 text-indigo-700 border border-indigo-200/60">
                          Focus Game
                        </span>
                        <span className="text-indigo-600 text-sm ml-2 font-bold">10 min</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-indigo-800 mb-4 group-hover:text-indigo-900 transition-colors">
                      Color Focus Game
                    </h3>
                    <p className="text-indigo-600 font-medium leading-relaxed mb-6">
                      Improve concentration by matching colors with words in this mindfulness exercise
                    </p>

                    <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg group-hover:from-indigo-600 group-hover:to-violet-700">
                      <Play className="w-5 h-5" />
                      Play Now
                    </button>
                  </div>
                </div>

                <div
                  className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-cyan-200/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveContent({ component: "breathing-exercise" } as any)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Activity className="w-8 h-8 text-white group-hover:animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-cyan-100 text-cyan-700 border border-cyan-200/60">
                          Breathing
                        </span>
                        <span className="text-cyan-600 text-sm ml-2 font-bold">5 min</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-cyan-800 mb-4 group-hover:text-cyan-900 transition-colors">
                      4-7-8 Breathing Exercise
                    </h3>
                    <p className="text-cyan-600 font-medium leading-relaxed mb-6">
                      Guided breathing technique to reduce anxiety and promote relaxation
                    </p>

                    <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg group-hover:from-cyan-600 group-hover:to-teal-700">
                      <Play className="w-5 h-5" />
                      Start Breathing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-80 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40">
              <h3 className="text-lg font-light text-teal-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                Quick Actions
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => setActiveContent({ component: "breathing-exercise" } as any)}
                  className="w-full p-4 bg-teal-50/80 text-teal-700 rounded-2xl font-light hover:bg-teal-100/80 transition-all flex items-center justify-between border border-teal-200/40 hover:shadow-lg"
                >
                  <span>5-Minute Breathing</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full p-4 bg-teal-50/80 text-teal-700 rounded-2xl font-light hover:bg-teal-100/80 transition-all flex items-center justify-between border border-teal-200/40 hover:shadow-lg">
                  <span>Quick Meditation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full p-4 bg-teal-50/80 text-teal-700 rounded-2xl font-light hover:bg-teal-100/80 transition-all flex items-center justify-between border border-teal-200/40 hover:shadow-lg">
                  <span>Calming Sounds</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recommended Playlists */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40">
              <h3 className="text-lg font-light text-teal-800 mb-6 flex items-center gap-2">
                <Music className="w-5 h-5 text-teal-600" />
                Your Playlists
              </h3>
              <div className="space-y-4">
                {playlists.map((playlist, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 hover:bg-teal-50/30 rounded-2xl cursor-pointer transition-all hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400/90 to-cyan-400/90 rounded-2xl flex items-center justify-center shadow-lg">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-light text-teal-800">{playlist.name}</div>
                      <div className="text-xs text-teal-600 font-light">
                        {playlist.tracks} tracks • {playlist.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-200/40">
              <h3 className="text-lg font-light text-teal-800 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-600" />
                This Week's Progress
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-light">
                    <span className="text-teal-600">Mindfulness Minutes</span>
                    <span className="text-teal-700">45/60 min</span>
                  </div>
                  <div className="w-full bg-teal-100/50 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-400/90 to-green-400/90 h-3 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-light">
                    <span className="text-teal-600">Activities Completed</span>
                    <span className="text-teal-700">3/5</span>
                  </div>
                  <div className="w-full bg-teal-100/50 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-400/90 to-sky-400/90 h-3 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-light">
                    <span className="text-teal-600">Current Streak</span>
                    <span className="text-teal-700">7 days</span>
                  </div>
                  <div className="w-full bg-teal-100/50 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-violet-400/90 to-purple-400/90 h-3 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Tip */}
            <div className="bg-gradient-to-br from-teal-400/90 to-cyan-500/90 rounded-3xl p-8 text-white shadow-xl border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6" fill="currentColor" />
                <h3 className="text-lg font-light">Daily Wellness Tip</h3>
              </div>
              <p className="text-sm opacity-90 font-light leading-relaxed">
                Take 3 deep breaths before starting your next task. This simple practice can help center your mind and reduce stress.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default TherapyWellnessHub;