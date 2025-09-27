"use client";
import React, { useState, useEffect } from "react";

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

export default function CookingChallengeDemo() {
  const [challenge, setChallenge] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [points, setPoints] = useState(0);
  const [entries, setEntries] = useState([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

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

  function onPhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
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
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md text-gray-800">
      <h2 className="text-xl font-bold text-center text-cyan-600">
        🍳 Cooking Mini Challenge
      </h2>

      <div className="flex justify-between mt-3 text-xs font-medium">
        <span className="px-2 py-1 rounded bg-cyan-100 text-cyan-700">
          Points: {points}
        </span>
        <span className="px-2 py-1 rounded bg-cyan-200 text-cyan-800">
          Badge: {badge}
        </span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={newChallenge}
          className="mt-5 px-5 py-2 bg-cyan-500 text-white rounded-lg shadow hover:bg-cyan-600 transition text-sm"
        >
          🎲 New Challenge
        </button>
      </div>

      {challenge && (
        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
            <p className="text-sm font-semibold text-cyan-700">Challenge</p>
            <p className="mt-1 text-base">{challenge}</p>
            <p className="mt-3 text-xs text-gray-600">🎯 Ingredient Spinner:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
            {timeLeft !== null && (
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">⏱️ Time left</p>
                <p className="text-lg font-mono text-cyan-600">
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </p>
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
            <p className="text-sm font-semibold text-cyan-700">Submit Your Dish</p>
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoChange}
              className="mt-2 block text-xs file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0
                         file:text-xs file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
            />
            {photo && <img src={photo} alt="Dish" className="mt-2 rounded-lg shadow" />}
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe your dish..."
              className="mt-3 w-full p-2 rounded-md bg-white border border-cyan-300 focus:ring-2 focus:ring-cyan-400 text-sm"
            />
            <button
              onClick={completeChallenge}
              className="mt-3 px-5 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition text-sm"
            >
              ✅ Complete
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-base font-semibold text-cyan-700">📂 Gallery</h3>
        {entries.length === 0 ? (
          <p className="mt-2 text-xs text-gray-500">No entries yet. Start cooking!</p>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {entries.map((e, i) => (
              <div key={i} className="p-3 rounded-lg bg-white border border-cyan-200 shadow-sm">
                <div className="text-[10px] text-gray-400">{e.date}</div>
                <div className="mt-1 text-sm font-medium">{e.challenge}</div>
                {e.photo && <img src={e.photo} alt="" className="mt-2 rounded-md" />}
                {e.desc && <p className="mt-2 text-xs">{e.desc}</p>}
                <div className="mt-1 text-xs text-green-600">+{e.points} points</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}