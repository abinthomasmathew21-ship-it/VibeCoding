import React, { useState } from "react";
import {
  Brain,
  Compass,
  Hammer,
  ShieldCheck,
  Sparkles,
  Presentation,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  Flame,
  AlertTriangle,
  Lightbulb,
  PlayCircle,
  Wand2,
  Terminal,
} from "lucide-react";
import { TeamProfile } from "../types";

interface WorkflowGuideProps {
  teamProfile: TeamProfile;
  setTeamProfile: React.Dispatch<React.SetStateAction<TeamProfile>>;
  onOpenPitchTimer: () => void;
  onOpenAiMentor: (initialQuery?: string) => void;
}

export const WorkflowGuide: React.FC<WorkflowGuideProps> = ({
  teamProfile,
  setTeamProfile,
  onOpenPitchTimer,
  onOpenAiMentor,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const steps = [
    {
      num: 1,
      id: "think",
      title: "Think & Understand",
      subtitle: "Define user & core problem",
      icon: Brain,
      color: "blue",
    },
    {
      num: 2,
      id: "plan",
      title: "Plan & Scope MVP",
      subtitle: "Ruthlessly cut bloat (Golden Rule)",
      icon: Compass,
      color: "amber",
    },
    {
      num: 3,
      id: "build",
      title: "Build with AI",
      subtitle: "High-leverage prompt engineering",
      icon: Hammer,
      color: "indigo",
    },
    {
      num: 4,
      id: "test",
      title: "Test & Debug",
      subtitle: "Edge cases & code comprehension",
      icon: ShieldCheck,
      color: "rose",
    },
    {
      num: 5,
      id: "improve",
      title: "Improve & Polish",
      subtitle: "UI/UX & micro-interactions",
      icon: Sparkles,
      color: "emerald",
    },
    {
      num: 6,
      id: "present",
      title: "Present & Pitch",
      subtitle: "5-Point final demo structure",
      icon: Presentation,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Vibe Coding Execution Engine
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Think → Plan → Build → Test → Improve → Present
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Follow this 6-step interactive workflow during the challenge at CCF Lab to ship a working prototype on time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAiMentor(`I am currently at Step ${activeStep} (${steps[activeStep - 1].title}). Help our team with project "${teamProfile.projectTitle || "our project"}"`)}
            className="px-3.5 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Wand2 className="w-4 h-4 text-indigo-400" />
            AI Advice for Step {activeStep}
          </button>
        </div>
      </div>

      {/* 6 Step Progress Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isCurrent = activeStep === s.num;
          const isPassed = activeStep > s.num;

          return (
            <button
              key={s.num}
              id={`step-tab-${s.num}`}
              onClick={() => setActiveStep(s.num)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? "bg-slate-800 border-blue-500 shadow-md shadow-blue-500/20 ring-1 ring-blue-500/50"
                  : isPassed
                  ? "bg-slate-900/60 border-slate-700/80 hover:bg-slate-800/60 text-slate-300"
                  : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/60 text-slate-500"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? "bg-blue-600 text-white"
                      : isPassed
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : s.num}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isCurrent ? "text-blue-400" : isPassed ? "text-emerald-400" : "text-slate-600"
                  }`}
                />
              </div>

              <div>
                <div
                  className={`text-xs font-bold leading-tight ${
                    isCurrent ? "text-white" : isPassed ? "text-slate-200" : "text-slate-400"
                  }`}
                >
                  {s.title}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {s.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Interactive Body */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-6">
        {/* STEP 1: THINK & UNDERSTAND */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Step 1: Think & Understand
                    </h3>
                    <p className="text-xs text-slate-400">
                      Rule 1: Think about the problem first, code second. Clarify target users and real root causes.
                    </p>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 text-xs font-mono font-semibold border border-blue-500/20">
                Morning Task 1
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Project Working Title
                  </label>
                  <input
                    type="text"
                    value={teamProfile.projectTitle}
                    onChange={(e) =>
                      setTeamProfile((prev) => ({ ...prev, projectTitle: e.target.value }))
                    }
                    placeholder="e.g. LabPulse: CCF Seat Radar"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Target Users (Be specific!)
                  </label>
                  <input
                    type="text"
                    value={teamProfile.targetUsers}
                    onChange={(e) =>
                      setTeamProfile((prev) => ({ ...prev, targetUsers: e.target.value }))
                    }
                    placeholder="e.g. 1st & 2nd Year CSE students needing lab systems during free hours"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Core Problem / Pain Point (1-2 sentences)
                  </label>
                  <textarea
                    rows={3}
                    value={teamProfile.problemStatement}
                    onChange={(e) =>
                      setTeamProfile((prev) => ({ ...prev, problemStatement: e.target.value }))
                    }
                    placeholder="Explain the actual daily frustration..."
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Guiding Framework Card */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60 space-y-3">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Judges' Empathy Checklist
                </h4>
                <div className="text-xs text-slate-300 space-y-2">
                  <p className="leading-relaxed">
                    <strong>1. Is the problem real?</strong> Do not invent a theoretical problem. Focus on issues in <em>Finance, Campus Life, or Real-World services</em>.
                  </p>
                  <p className="leading-relaxed">
                    <strong>2. Who suffers the most?</strong> Mention the specific frequency (e.g., "every single day during lab changes").
                  </p>
                  <p className="leading-relaxed">
                    <strong>3. Why do existing alternatives fail?</strong> (e.g., "WhatsApp groups are too noisy; spreadsheets don't update in real time").
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Ready to plan features?</span>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1"
                  >
                    Proceed to Step 2 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PLAN & SCOPE MVP */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Step 2: Plan & Scope MVP
                    </h3>
                    <p className="text-xs text-slate-400">
                      Golden Rule: Don't try to build everything. Build something useful that actually works.
                    </p>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold border border-amber-500/20">
                Morning Task 1 & 2
              </span>
            </div>

            {/* Scope Pruner Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" />
                  MUST-HAVE MVP SCOPE (Focus Here)
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>1 Primary Interactive Screen:</strong> Clean, responsive UI with zero clutter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>1 Core Action/Workflow:</strong> The single most valuable task (e.g. log expense, reserve seat, calculate attendance).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Pre-populated Sample Data:</strong> Real-looking demo state so judges see immediate results.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-950/30 rounded-xl p-4 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  CUT / DEFER (Avoid Hackathon Pitfalls)
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span><strong>User Auth / Signup / Login:</strong> Wastes 1-2 hours. Use simulated pre-logged-in user.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span><strong>Complex Multi-tier Databases:</strong> Use structured local storage + JSON export.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span><strong>10 Half-Finished Tabs:</strong> 1 fully functional feature is worth 10 broken tabs.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Proposed Solution & Tech Stack */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Proposed Solution & Core Flow
                </label>
                <textarea
                  rows={3}
                  value={teamProfile.proposedSolution}
                  onChange={(e) =>
                    setTeamProfile((prev) => ({ ...prev, proposedSolution: e.target.value }))
                  }
                  placeholder="Describe your MVP solution simply..."
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  Proceed to Step 3 (Build with AI) <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BUILD WITH AI */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Hammer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Step 3: Build the MVP with AI Assistance
                    </h3>
                    <p className="text-xs text-slate-400">
                      Rule 2 & 4: Use AI tools effectively for speed, but do not blindly copy code.
                    </p>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 text-xs font-mono font-semibold border border-indigo-500/20">
                Morning Task 2
              </span>
            </div>

            {/* Prompt Engineering Formula for Hackathons */}
            <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  Recommended Vibe Coding Prompt Template
                </h4>
                <button
                  onClick={() =>
                    handleCopy(
                      `Build a single-screen responsive web app for "${teamProfile.projectTitle || "our project"}" in React and Tailwind CSS.
Problem: ${teamProfile.problemStatement || "students need a fast, reliable tool"}
Target User: ${teamProfile.targetUsers || "college students"}
Core MVP Features:
1. Interactive dashboard with clear metrics
2. Action input form/buttons with instant state updates
3. Sample demo dataset preloaded (5 realistic items)
Requirements: Clean typography, Lucide icons, accessible contrast, error boundaries, no broken buttons.`,
                      "prompt-template"
                    )
                  }
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs flex items-center gap-1"
                >
                  {copiedKey === "prompt-template" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Prompt
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-indigo-200/90 leading-relaxed border border-slate-800 overflow-x-auto">
                <p className="text-slate-400">// Prompt Formula:</p>
                <p>
                  "Build a single-screen responsive web app for <span className="text-amber-300">[{teamProfile.projectTitle || "Project Title"}]</span> in React and Tailwind CSS.
                </p>
                <p>
                  Target User: <span className="text-emerald-300">{teamProfile.targetUsers || "Students / Lab Users"}</span>
                </p>
                <p>
                  Problem to solve: <span className="text-blue-300">{teamProfile.problemStatement || "Core friction"}</span>
                </p>
                <p>
                  Requirements: Clean modular components, TypeScript types, instant state updates, preloaded sample data for live demo."
                </p>
              </div>
            </div>

            {/* Vibe Coding Rules Adherence Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Vibe Coding Rule Verification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Understand the Code:</strong> Ensure every team member can explain component state, props, and functions.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Save Backups Regularly:</strong> Commit code to GitHub / keep local zip backup before lunch.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                Proceed to Step 4 (Test & Debug) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TEST & DEBUG */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Step 4: Test & Debug
                    </h3>
                    <p className="text-xs text-slate-400">
                      Rule 5: Teams must test and debug their applications with sample inputs before judges arrive.
                    </p>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 text-xs font-mono font-semibold border border-rose-500/20">
                Afternoon Task 3
              </span>
            </div>

            {/* Edge Case QA Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  title: "1. Empty State Test",
                  desc: "What happens when lists are empty or user hasn't typed anything?",
                  fix: "Render a friendly empty placeholder message with an action button.",
                },
                {
                  title: "2. Extreme Values Test",
                  desc: "Test with negative numbers, 0, very large sums, or 100+ character strings.",
                  fix: "Add validation clamps and CSS text truncation / line breaks.",
                },
                {
                  title: "3. Mobile Viewport Test",
                  desc: "Does the UI break or overflow on small mobile widths (375px)?",
                  fix: "Check flex-wrap, grid-cols-1 on small screens, and touch target sizes.",
                },
                {
                  title: "4. Rapid Clicks / Double Submit",
                  desc: "Does clicking 'Submit' or 'Add' 5 times create duplicate entries?",
                  fix: "Disable button or reset input immediately after valid submit.",
                },
                {
                  title: "5. Browser Refresh Test",
                  desc: "If the judge refreshes the tab, does the app crash completely?",
                  fix: "Guard JSON.parse with try/catch and provide safe default states.",
                },
                {
                  title: "6. Console Error Audit",
                  desc: "Open F12 DevTools Console. Are there red error messages or key warnings?",
                  fix: "Add unique keys to mapped elements and fix undefined property accesses.",
                },
              ].map((test, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5"
                >
                  <div className="font-bold text-xs text-rose-300">{test.title}</div>
                  <p className="text-[11px] text-slate-300">{test.desc}</p>
                  <div className="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                    <strong className="text-emerald-400">Fix:</strong> {test.fix}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(5)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                Proceed to Step 5 (Improve & Polish) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: IMPROVE & POLISH */}
        {activeStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Step 5: Improve & Polish UI/UX
                    </h3>
                    <p className="text-xs text-slate-400">
                      Task 3: Improve UI/UX, typography hierarchy, responsive touch targets, and visual elegance.
                    </p>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 text-xs font-mono font-semibold border border-emerald-500/20">
                Afternoon Task 3
              </span>
            </div>

            {/* Design Polish Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Visual Polish Checklist
                </h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>Use subtle border outlines (<code className="text-indigo-300">border-slate-800</code>) for containers.</li>
                  <li>Ensure generous negative space between cards and sections.</li>
                  <li>Single-line button labels (no awkward text wrapping).</li>
                  <li>Clear status badges (Green: Active/Safe, Amber: Pending, Red: Alert).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <h4 className="font-bold text-blue-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  User Interaction Polish
                </h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  <li>Hover transitions on buttons (<code className="text-indigo-300">hover:scale-105 active:scale-95</code>).</li>
                  <li>Instant feedback toast or visual confirmation on successful action.</li>
                  <li>Keyboard shortcut (e.g. Enter to submit search/form).</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(6)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                Proceed to Step 6 (Final Presentation) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: PRESENT & PITCH */}
        {activeStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Step 6: Final Demo Pitch (The 5 Mandatory Points)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Section 4, Task 4: Every team must present these 5 exact points concisely within 3 minutes.
                    </p>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 text-xs font-mono font-semibold border border-purple-500/20">
                Afternoon Task 4
              </span>
            </div>

            {/* 5 Demo Points Breakdown */}
            <div className="space-y-3">
              {[
                {
                  num: 1,
                  title: "1. Explain the Problem (30 seconds)",
                  prompt: "Who is the user, and what is their painful bottleneck?",
                  speakerTip: "Start with an relatable hook: 'How many of us have walked to the CCF Lab only to find...'",
                },
                {
                  num: 2,
                  title: "2. Explain the Proposed Solution (30 seconds)",
                  prompt: "What is your prototype and how does it solve the problem simply?",
                  speakerTip: "Keep it simple: 'We built [Project], a lightweight tool that gives instant visibility...'",
                },
                {
                  num: 3,
                  title: "3. Demonstrate the Working Prototype (60 seconds)",
                  prompt: "Walk through 1 core workflow end-to-end without reloading.",
                  speakerTip: "Don't click random buttons. Show User Action -> Instant Result -> Value delivered.",
                },
                {
                  num: 4,
                  title: "4. Explain Technologies & AI Tools Used (30 seconds)",
                  prompt: "Stack: React, Tailwind, Vite, Gemini AI for scaffolding and test generation.",
                  speakerTip: "Show technical comprehension. Highlight that you verified and adapted the AI output.",
                },
                {
                  num: 5,
                  title: "5. Highlight Real-World Impact (30 seconds)",
                  prompt: "What changes tomorrow if students and faculty use this?",
                  speakerTip: "End with the Golden Rule: 'We built something practical that actually works.'",
                },
              ].map((point) => (
                <div
                  key={point.num}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs text-purple-300">{point.title}</div>
                    <div className="text-xs text-slate-300">{point.prompt}</div>
                    <div className="text-[11px] text-slate-400 italic">💡 Tip: {point.speakerTip}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pitch Rehearsal Controls */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs text-purple-200">
                  Ready to practice your 3-Minute Demo?
                </div>
                <div className="text-[11px] text-slate-400">
                  Launch the built-in demo timer with synchronized 30s/60s phase alerts.
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-rehearse-pitch"
                  onClick={onOpenPitchTimer}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/30 active:scale-95"
                >
                  <PlayCircle className="w-4 h-4" />
                  Launch 3-Min Pitch Timer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
