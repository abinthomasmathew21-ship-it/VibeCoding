import React, { useState, useEffect, useRef } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

interface PitchTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHASES = [
  { id: 1, title: "1. Explain the Problem", duration: 30, color: "blue", tip: "Target users & core friction" },
  { id: 2, title: "2. Proposed Solution", duration: 30, color: "amber", tip: "How your prototype solves it" },
  { id: 3, title: "3. Live Prototype Walkthrough", duration: 60, color: "emerald", tip: "Show 1 complete workflow live" },
  { id: 4, title: "4. Technologies & AI Tools", duration: 30, color: "indigo", tip: "Stack & responsible AI usage" },
  { id: 5, title: "5. Real-World Impact", duration: 30, color: "purple", tip: "Practical value & Golden Rule" },
];

const TOTAL_TIME = 180; // 3 minutes = 180 seconds

export const PitchTimerModal: React.FC<PitchTimerModalProps> = ({ isOpen, onClose }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const lastPhaseRef = useRef<number>(1);

  // Play synthesized web audio chime on phase transition or finish
  const playBeep = (freq = 880, duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            playBeep(1200, 0.4);
            setIsRunning(false);
            return 0;
          }

          const elapsed = TOTAL_TIME - (prev - 1);
          // Check phase switch points
          if (elapsed === 30 || elapsed === 60 || elapsed === 120 || elapsed === 150) {
            playBeep(880, 0.2);
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, soundEnabled]);

  if (!isOpen) return null;

  const elapsed = TOTAL_TIME - secondsRemaining;
  let currentPhaseIndex = 0;
  let accumulated = 0;
  for (let i = 0; i < PHASES.length; i++) {
    accumulated += PHASES[i].duration;
    if (elapsed < accumulated) {
      currentPhaseIndex = i;
      break;
    }
  }
  if (elapsed >= TOTAL_TIME) {
    currentPhaseIndex = PHASES.length - 1;
  }

  const currentPhase = PHASES[currentPhaseIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(TOTAL_TIME);
  };

  const jumpToPhase = (phaseIndex: number) => {
    let targetElapsed = 0;
    for (let i = 0; i < phaseIndex; i++) {
      targetElapsed += PHASES[i].duration;
    }
    setSecondsRemaining(TOTAL_TIME - targetElapsed);
  };

  const progressPercent = Math.min(100, Math.round((elapsed / TOTAL_TIME) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-scaleUp text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">
                Official 3-Minute Demo Pitch Timer
              </h3>
              <p className="text-xs text-slate-400">
                Synchronized for the 5 mandatory final demo points in CCF Lab
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title={soundEnabled ? "Mute audio beeps" : "Enable audio beeps"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-lg font-bold px-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Master Big Timer Display */}
        <div className="text-center space-y-2 py-2">
          <div className="text-6xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200">
            {formatTime(secondsRemaining)}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {secondsRemaining === 0 ? (
              <span className="text-rose-400 font-bold uppercase animate-pulse">
                ⏰ TIME'S UP! (Conclude Demo)
              </span>
            ) : (
              <span>Elapsed: {formatTime(elapsed)} / 3:00</span>
            )}
          </div>
        </div>

        {/* Active Phase Callout */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5 text-center">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Current Phase {currentPhaseIndex + 1} of 5
          </span>
          <div className="text-base font-bold text-slate-100">
            {currentPhase.title}
          </div>
          <div className="text-xs text-amber-300/90 font-medium">
            💡 Focus: {currentPhase.tip} ({currentPhase.duration}s target)
          </div>
        </div>

        {/* 5 Phase Progress Ribbon */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700 flex">
            {PHASES.map((p, idx) => {
              const phaseElapsed = Math.max(
                0,
                Math.min(
                  p.duration,
                  elapsed - PHASES.slice(0, idx).reduce((a, b) => a + b.duration, 0)
                )
              );
              const fillPct = (phaseElapsed / p.duration) * 100;
              const widthPct = (p.duration / TOTAL_TIME) * 100;

              return (
                <div
                  key={p.id}
                  style={{ width: `${widthPct}%` }}
                  className="h-full border-r border-slate-900 bg-slate-800 relative"
                >
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-5 gap-1 text-[10px] text-slate-400 font-mono">
            {PHASES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => jumpToPhase(idx)}
                className={`truncate text-center p-1 rounded hover:bg-slate-800 transition-colors ${
                  currentPhaseIndex === idx ? "text-purple-300 font-bold bg-purple-950/40" : ""
                }`}
              >
                P{idx + 1} ({p.duration}s)
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 ${
              isRunning
                ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause Timer
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> {secondsRemaining === TOTAL_TIME ? "Start 3-Min Pitch" : "Resume"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
