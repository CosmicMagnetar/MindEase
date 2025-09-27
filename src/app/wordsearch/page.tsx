"use client";
import React, { useState, useEffect } from "react";

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

export default function WordSearchDemo() {
  const size = 8;
  const [grid, setGrid] = useState([]);
  const [found, setFound] = useState([]);
  const [lastAffirm, setLastAffirm] = useState("");

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
  }

  function markFound(word) {
    if (!found.includes(word)) {
      setFound([...found, word]);
      setLastAffirm(AFFIRM[word]);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md text-gray-800">
      <h2 className="text-xl font-bold text-center text-cyan-600">
        🔤 Positive Word Search
      </h2>

      {/* Grid */}
      <div
        className="mt-4 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => (
            <div
              key={`${r}-${c}`}
              className="h-10 flex items-center justify-center border border-cyan-200 rounded bg-cyan-50 text-sm font-semibold text-cyan-700 shadow-sm hover:bg-cyan-100 transition"
            >
              {letter}
            </div>
          ))
        )}
      </div>

      {/* Word List */}
      <div className="mt-4">
        <p className="text-sm font-semibold text-cyan-700">Words to Find:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {WORDS.map((w) => (
            <button
              key={w}
              onClick={() => markFound(w)}
              disabled={found.includes(w)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                found.includes(w)
                  ? "bg-green-100 text-green-700 line-through"
                  : "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Affirmation */}
      {lastAffirm && (
        <div className="mt-4 p-3 rounded-lg bg-cyan-50 border border-cyan-200 text-sm text-cyan-700 shadow-sm animate-fadeIn">
          {lastAffirm}
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Found {found.length} / {WORDS.length}
        </p>
        <button
          onClick={generateGrid}
          className="px-4 py-1 bg-cyan-500 text-white rounded-md text-xs shadow hover:bg-cyan-600 transition"
        >
          🔄 New Puzzle
        </button>
      </div>
    </div>
  );
}