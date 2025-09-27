"use client";
import React, { useState, useEffect } from "react";

const STEPS = [
  { count: 5, sense: "things you can see" },
  { count: 4, sense: "things you can touch" },
  { count: 3, sense: "things you can hear" },
  { count: 2, sense: "things you can smell" },
  { count: 1, sense: "thing you can taste" },
];

export default function GroundingGameDemo() {
  const [idx, setIdx] = useState(0);
  const [inputs, setInputs] = useState(STEPS.map(s => Array(s.count).fill("")));
  const [moodBefore, setMoodBefore] = useState(5);
  const [moodAfter, setMoodAfter] = useState(5);
  const [logs, setLogs] = useState([]);

  function setInput(step, i, val) {
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

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md text-gray-800">
      <h2 className="text-xl font-bold text-center text-cyan-600">
        🌱 Grounding Exercise
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Mood Tracker */}
        <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
          <p className="text-sm font-semibold text-cyan-700">Mood Check‑in</p>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-xs text-gray-600">Before</label>
              <input
                type="range"
                min={1}
                max={10}
                value={moodBefore}
                onChange={e => setMoodBefore(+e.target.value)}
                className="w-full accent-cyan-500"
              />
              <div className="text-xs">Value: {moodBefore}</div>
            </div>
            <div>
              <label className="text-xs text-gray-600">After</label>
              <input
                type="range"
                min={1}
                max={10}
                value={moodAfter}
                onChange={e => setMoodAfter(+e.target.value)}
                className="w-full accent-cyan-500"
              />
              <div className="text-xs">
                Value: {moodAfter}{" "}
                {improvement !== 0 && (
                  <span className="text-cyan-600">
                    (Δ {improvement > 0 ? "+" : ""}
                    {improvement})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Step Input */}
        <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
          <p className="text-sm font-semibold text-cyan-700">
            Step {idx + 1} of {STEPS.length}
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Identify {STEPS[idx].count} {STEPS[idx].sense}.
          </p>
          <div className="mt-2 space-y-2">
            {inputs[idx].map((val, i) => (
              <input
                key={i}
                value={val}
                onChange={e => setInput(idx, i, e.target.value)}
                placeholder={`Item ${i + 1}`}
                className="w-full p-2 rounded-md bg-white border border-cyan-300 focus:ring-2 focus:ring-cyan-400 text-sm"
              />
            ))}
          </div>
          <button
            onClick={next}
            className="mt-3 px-4 py-2 bg-cyan-500 text-white rounded-md shadow hover:bg-cyan-600 transition text-sm"
          >
            {idx < STEPS.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>

      {/* History */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-cyan-700">📖 History</h3>
        {logs.length === 0 ? (
          <p className="mt-2 text-xs text-gray-500">No sessions yet.</p>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {logs.map((l, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-white border border-cyan-200 shadow-sm"
              >
                <div className="text-[10px] text-gray-400">{l.date}</div>
                <div className="mt-1 text-xs">
                  Mood: {l.moodBefore} → {l.moodAfter} (Δ{" "}
                  {l.moodAfter - l.moodBefore})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}