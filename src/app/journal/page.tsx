"use client"
import React, { useState } from 'react';
import { Calendar, Heart, Star, Plus, Edit3, Clock, TrendingUp } from 'lucide-react';

const TherapyJournalApp = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntry, setJournalEntry] = useState('');
  const [mood, setMood] = useState('');
  const [entries, setEntries] = useState<{ [key: string]: { text: string; mood: string; date: string } }>({});
  const [gratitude, setGratitude] = useState('');
  const [gratitudeList, setGratitudeList] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const [showGratitudeInput, setShowGratitudeInput] = useState(false);

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null): boolean => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasEntry = (date: Date | null): boolean => {
    if (!date) return false;
    return !!entries[formatDate(date)];
  };

  const saveEntry = () => {
    if (!journalEntry.trim() && !mood) return;

    const dateKey = formatDate(selectedDate);
    const newEntry = {
      text: journalEntry,
      mood: mood,
      date: selectedDate.toDateString()
    };

    setEntries(prev => ({
      ...prev,
      [dateKey]: newEntry
    }));

    // Update streak
    const newStreak = streak + 1;
    setStreak(newStreak);
    setShowStreakPopup(true);

    // Clear form
    setJournalEntry('');
    setMood('');

    // Hide popup after 3 seconds
    setTimeout(() => setShowStreakPopup(false), 3000);
  };

  const addGratitude = () => {
    if (!gratitude.trim()) return;
    
    setGratitudeList(prev => [...prev, gratitude]);
    setGratitude('');
    setShowGratitudeInput(false);
  };

  const moods = [
    { emoji: '😊', label: 'Great', value: 'great' },
    { emoji: '🙂', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😔', label: 'Low', value: 'low' }
  ];

  const reflectionPrompts = [
    { time: 'Morning', icon: '🌅', question: 'What am I grateful for today?' },
    { time: 'Midday', icon: '☀️', question: 'How do I want to feel today?' },
    { time: 'Evening', icon: '🌙', question: 'What did I learn about myself?' }
  ];

  const recentEntries = Object.values(entries).slice(-3).reverse();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Inter", sans-serif' }}>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-teal-700 mb-3 tracking-wide">Your Journey</h1>
          <p className="text-teal-600 font-light">Capture your thoughts, express gratitude, and track your emotional wellness journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-400/90 to-cyan-500/90 px-6 py-5 text-white">
              <h2 className="text-lg font-light flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                Calendar Journey
              </h2>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-light text-teal-700">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-light text-teal-600 p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((date, index) => (
                  <button
                    key={index}
                    onClick={() => date && setSelectedDate(date)}
                    className={`
                      p-3 text-sm rounded-xl transition-all duration-300 relative font-light
                      ${!date ? 'invisible' : ''}
                      ${isSelected(date) ? 'bg-gradient-to-br from-teal-400/90 to-cyan-500/90 text-white shadow-lg' : ''}
                      ${isToday(date) && !isSelected(date) ? 'bg-teal-50/80 text-teal-600 border border-teal-200/60' : ''}
                      ${!isSelected(date) && !isToday(date) ? 'hover:bg-teal-50/60 text-teal-700' : ''}
                    `}
                  >
                    {date && date.getDate()}
                    {date && hasEntry(date) && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="text-center text-sm text-teal-600 mt-6 font-light bg-teal-50/30 rounded-xl p-3">
                Selected: {selectedDate.toDateString()}
              </div>
            </div>
          </div>

          {/* Daily Entry */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400/90 to-sky-500/90 px-6 py-5 text-white">
              <h2 className="text-lg font-light flex items-center">
                <Edit3 className="w-5 h-5 mr-3" />
                Today's Entry
              </h2>
            </div>

            <div className="p-6">
              {/* Mood Selection */}
              <div className="mb-8">
                <p className="text-teal-700 mb-4 font-light">How are you feeling?</p>
                <div className="grid grid-cols-2 gap-3">
                  {moods.map(moodOption => (
                    <button
                      key={moodOption.value}
                      onClick={() => setMood(moodOption.value)}
                      className={`
                        p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center
                        ${mood === moodOption.value 
                          ? 'border-teal-400 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 shadow-lg' 
                          : 'border-teal-200/60 hover:border-teal-300/80 bg-white/70'
                        }
                      `}
                    >
                      <span className="text-2xl mb-2">{moodOption.emoji}</span>
                      <span className="text-sm font-light text-teal-700">{moodOption.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Journal Entry */}
              <div className="mb-4">
                <p className="text-teal-700 mb-4 font-light">What's on your mind today? Write freely about your thoughts, feelings, or experiences...</p>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Start writing... I'm here to listen 💙"
                  className="w-full h-32 p-4 border-2 border-teal-200/50 rounded-2xl focus:border-teal-400 focus:outline-none resize-none font-light text-teal-800 placeholder-teal-400 bg-white/70 backdrop-blur-sm transition-all duration-300"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-teal-600 font-light">{journalEntry.length} characters</span>
                  <button
                    onClick={saveEntry}
                    disabled={!journalEntry.trim() && !mood}
                    className="bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white px-8 py-3 rounded-2xl hover:from-teal-500/90 hover:to-cyan-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-light shadow-lg hover:shadow-xl"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400/90 to-teal-500/90 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-light flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3" />
                    Streak
                  </h2>
                  <div className="text-3xl font-light">{streak}</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-teal-600 font-light text-center">Days of consistent journaling</p>
              </div>
            </div>

            {/* Gratitude List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-400/90 to-cyan-400/90 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-light flex items-center">
                    <Star className="w-5 h-5 mr-3" />
                    Gratitude List
                  </h2>
                  <button
                    onClick={() => setShowGratitudeInput(true)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm text-white rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {showGratitudeInput && (
                  <div className="mb-6">
                    <input
                      value={gratitude}
                      onChange={(e) => setGratitude(e.target.value)}
                      placeholder="Add what you're grateful for today"
                      className="w-full p-3 border-2 border-teal-200/50 rounded-2xl focus:border-teal-400 focus:outline-none mb-3 font-light text-teal-800 placeholder-teal-400 bg-white/70 backdrop-blur-sm"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={addGratitude}
                        className="bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white px-4 py-2 rounded-xl text-sm hover:from-teal-500/90 hover:to-cyan-600/90 transition-all duration-300 font-light"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowGratitudeInput(false);
                          setGratitude('');
                        }}
                        className="bg-teal-100/80 text-teal-700 px-4 py-2 rounded-xl text-sm hover:bg-teal-200/80 transition-all duration-300 font-light"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {gratitudeList.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 rounded-2xl border border-teal-200/40">
                      <Star className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-teal-700 font-light">{item}</span>
                    </div>
                  ))}
                  {gratitudeList.length === 0 && !showGratitudeInput && (
                    <p className="text-teal-500 text-sm text-center py-6 font-light">Add what you're grateful for today</p>
                  )}
                </div>
              </div>
            </div>

            {/* Reflection Prompts */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/90 to-sky-400/90 px-6 py-5 text-white">
                <h2 className="text-lg font-light">Reflection Prompts</h2>
              </div>
              <div className="p-6 space-y-4">
                {reflectionPrompts.map((prompt, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 rounded-2xl border border-teal-200/40">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-3">{prompt.icon}</span>
                      <span className="text-sm font-light text-teal-600">{prompt.time}</span>
                    </div>
                    <p className="text-sm text-teal-700 font-light">{prompt.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/40 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500/90 to-cyan-400/90 px-6 py-5 text-white">
            <h2 className="text-lg font-light flex items-center">
              <Clock className="w-5 h-5 mr-3" />
              Recent Entries
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {recentEntries.map((entry: { text: string; mood: string; date: string }, index: number) => (
              <div key={index} className="p-5 border-2 border-teal-200/40 rounded-2xl hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-cyan-50/80 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-light text-teal-600">{entry.date}</span>
                  {entry.mood && (
                    <span className="text-lg">
                      {moods.find(m => m.value === entry.mood)?.emoji}
                    </span>
                  )}
                </div>
                <p className="text-teal-700 text-sm font-light line-clamp-2">{entry.text}</p>
              </div>
            ))}
            {recentEntries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-teal-500 font-light text-lg">No entries yet. Start your journey today!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Streak Celebration Popup */}
      {showStreakPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md mx-4 text-center shadow-2xl border border-teal-200/40">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-light text-teal-700 mb-3">Amazing!</h2>
            <p className="text-teal-600 mb-6 font-light">
              You've completed {streak} days of journaling! Keep up the great work on your wellness journey.
            </p>
            <div className="text-5xl font-light text-teal-500 mb-6">{streak} Days</div>
            <button
              onClick={() => setShowStreakPopup(false)}
              className="bg-gradient-to-r from-teal-400/90 to-cyan-500/90 text-white px-8 py-4 rounded-2xl hover:from-teal-500/90 hover:to-cyan-600/90 transition-all duration-300 font-light shadow-lg hover:shadow-xl"
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}

      {/* Crisis Support Info */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-rose-50/80 border-2 border-rose-200/60 rounded-3xl p-6 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-sm font-light text-rose-700 mb-2">Crisis Support Available</div>
            <div className="text-xs text-rose-600 font-light">
              If you're in crisis: <strong className="font-medium">Call 988</strong> (Suicide & Crisis Lifeline) or <strong className="font-medium">Text HOME to 741741</strong> (Crisis Text Line)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyJournalApp;