import React from "react";
import {
  Sparkles,
  Zap,
  Target,
  Users2,
  Trophy,
  ArrowRight,
  Sun,
  Sunset,
  Flame,
  CheckCircle2,
  Layers,
  HelpCircle,
} from "lucide-react";
import { EVENT_DETAILS, SCHEDULE_TIMELINE } from "../data/challengeData";

interface OverviewHeroProps {
  onNavigate: (tab: string) => void;
  onOpenAiMentor: () => void;
  onOpenPitchTimer: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  onNavigate,
  onOpenAiMentor,
  onOpenPitchTimer,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Golden Rule Master Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/30 p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            Hackathon Golden Rule
          </div>

          <blockquote className="text-2xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-amber-200 leading-tight">
            “{EVENT_DETAILS.goldenRule}”
          </blockquote>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-sm md:text-base font-mono font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {EVENT_DETAILS.mantra}
            </span>
            <span className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              {EVENT_DETAILS.motto}
            </span>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            The <strong>Vibe Coding Challenge</strong> is a practical coding event where teams identify a problem, design a solution, and build a working prototype using modern development tools and AI-assisted coding. The focus is on <strong>problem-solving, creativity, teamwork, rapid development, and practical implementation</strong> rather than only writing code.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              id="btn-hero-workflow"
              onClick={() => onNavigate("workflow")}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-transform active:scale-95"
            >
              <Layers className="w-4 h-4" />
              Open 6-Step Workflow Guide
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-hero-categories"
              onClick={() => onNavigate("categories")}
              className="px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              Explore 3 Problem Categories
            </button>
            <button
              id="btn-hero-ai-mentor"
              onClick={onOpenAiMentor}
              className="px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Copilot Mentor
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillar Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-base">1. Challenge Objective</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Move rapidly from problem identification to functional prototype using AI tools responsibly. Prioritize usability, clean UX, and tangible impact over bloat.
          </p>
          <div className="text-[11px] text-blue-300 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Problem first, Code second
          </div>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-base">2. Challenge Task Sprint</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Execute in focused phases: Problem Analysis, UI/UX Design, Development, AI-assisted Scaffolding, Testing, and Final 5-Point Demo.
          </p>
          <div className="text-[11px] text-purple-300 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tasks 1 to 4 Roadmap
          </div>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-base">3. 9 Evaluation Criteria</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluated on Problem Understanding, Innovation, Functionality, UI/UX, Technical Quality, AI Utilization, Teamwork, Presentation, and Real Impact.
          </p>
          <div className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Max 90 Points total
          </div>
        </div>
      </div>

      {/* Challenge Structure: Morning vs Afternoon Sessions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Event Structure & Timeline (CCF Lab)
            </h2>
            <p className="text-xs text-slate-400">
              Structured into two focused sessions for maximum velocity and polished execution.
            </p>
          </div>
          <button
            onClick={() => onNavigate("rules")}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Important Lab Instructions
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Morning Session Card */}
          <div className="rounded-xl bg-slate-900/90 border border-amber-500/30 p-5 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm md:text-base">
                    🌅 Morning Session: Problem to Prototype
                  </h3>
                  <span className="text-[11px] text-amber-400 font-mono font-medium">
                    09:00 AM – 01:00 PM (CCF Lab)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/60">
                <div className="font-semibold text-xs text-amber-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Task 1: Understand & Plan
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Understand the assigned problem & identify target users</li>
                  <li>Define the core problem & decide required features</li>
                  <li>Create a basic solution plan and architecture</li>
                </ul>
              </div>

              <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/60">
                <div className="font-semibold text-xs text-amber-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Task 2: Build the MVP
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Start developing the solution focusing on core features</li>
                  <li>Use AI coding tools where appropriate for speed</li>
                  <li>Create a functional Minimum Viable Product before lunch</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Afternoon Session Card */}
          <div className="rounded-xl bg-slate-900/90 border border-indigo-500/30 p-5 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sunset className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm md:text-base">
                    🌇 Afternoon Session: Improve & Present
                  </h3>
                  <span className="text-[11px] text-indigo-400 font-mono font-medium">
                    02:00 PM – 04:30 PM (CCF Lab)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/60">
                <div className="font-semibold text-xs text-indigo-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Task 3: Feature Enhancement
                </div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Improve existing prototype & add useful polish</li>
                  <li>Fix bugs, improve UI/UX styling and mobile responsiveness</li>
                  <li>Test the application thoroughly with sample inputs</li>
                </ul>
              </div>

              <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/60">
                <div className="font-semibold text-xs text-indigo-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Task 4: Final Demo (5 Mandatory Points)
                </div>
                <ol className="text-xs text-slate-300 space-y-0.5 list-decimal list-inside font-medium">
                  <li>Explain the problem</li>
                  <li>Explain the proposed solution</li>
                  <li>Demonstrate the working prototype</li>
                  <li>Explain technologies/tools used</li>
                  <li>Highlight the impact of the solution</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Schedule Timeline */}
      <div className="bg-slate-900/70 rounded-xl p-5 border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          Full Day Schedule Breakdown (Wednesday, August 19, 2026)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCHEDULE_TIMELINE.map((slot, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-1 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-semibold text-blue-300">{slot.time}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-200">
                  {slot.badge}
                </span>
              </div>
              <div className="font-bold text-xs text-slate-100">{slot.title}</div>
              <p className="text-[11px] text-slate-400 leading-snug">{slot.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
