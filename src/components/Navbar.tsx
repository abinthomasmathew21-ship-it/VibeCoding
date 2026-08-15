import React, { useState, useEffect } from "react";
import {
  Code2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Timer,
  LayoutDashboard,
  Award,
  Layers,
  ListTodo,
  CheckSquare,
} from "lucide-react";
import { EVENT_DETAILS } from "../data/challengeData";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiMentor: () => void;
  onOpenPitchTimer: () => void;
  progressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiMentor,
  onOpenPitchTimer,
  progressPercent,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-08-19T09:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "overview", label: "Overview & Schedule", icon: LayoutDashboard },
    { id: "workflow", label: "6-Step Vibe Workflow", icon: Layers },
    { id: "categories", label: "Problem Categories", icon: Code2 },
    { id: "team", label: "Task Sprint", icon: ListTodo },
    { id: "rubric", label: "Evaluation Rubric", icon: Award },
    { id: "rules", label: "Rules & Guidelines", icon: CheckSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      {/* Top Banner / Event Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {EVENT_DETAILS.title}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {EVENT_DETAILS.date}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {EVENT_DETAILS.venue}
            </span>
            <span className="hidden sm:inline-flex items-center text-slate-400">
              Eligibility: <strong className="text-slate-200 ml-1">{EVENT_DETAILS.eligibility}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Countdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-0.5 rounded border border-slate-700/60 font-mono text-[11px] text-amber-200">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Event Countdown:</span>
              <span className="font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>

            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-300">
              <span>Readiness:</span>
              <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-semibold text-emerald-400">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab("overview")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                VIBE CODING
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
              CCF Lab Hackathon Companion & Portal
            </p>
          </div>
        </div>

        {/* Action Quick Tools */}
        <div className="flex items-center gap-2">
          <button
            id="btn-nav-ai-mentor"
            onClick={onOpenAiMentor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/50 hover:to-indigo-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Ask AI Hackathon Mentor"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="hidden sm:inline">AI Vibe Mentor</span>
          </button>

          <button
            id="btn-nav-pitch-timer"
            onClick={onOpenPitchTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Open 3-Minute Demo Pitch Timer"
          >
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">3-Min Pitch Timer</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/60 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
