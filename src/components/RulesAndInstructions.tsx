import React, { useState } from "react";
import {
  CheckSquare,
  ShieldCheck,
  AlertTriangle,
  Flame,
  FileCheck2,
  Laptop,
  Save,
  Clock,
  Sparkles,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { VIBE_RULES, EVENT_DETAILS } from "../data/challengeData";

export const RulesAndInstructions: React.FC = () => {
  const [checkedRules, setCheckedRules] = useState<{ [key: string]: boolean }>({});

  const toggleRuleCheck = (id: string) => {
    setCheckedRules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalRules = VIBE_RULES.length;
  const checkedCount = Object.values(checkedRules).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Golden Rule Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 border-2 border-amber-500/40 p-6 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          The Golden Rule of Vibe Coding
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-100">
          “{EVENT_DETAILS.goldenRule}”
        </h2>
        <div className="text-sm md:text-base font-bold text-amber-300 font-mono">
          {EVENT_DETAILS.mantra}
        </div>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          {EVENT_DETAILS.motto}
        </p>
      </div>

      {/* Section 5: The 8 Vibe Coding Rules */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-400" />
              Section 5: Vibe Coding Rules
            </h3>
            <p className="text-xs text-slate-400">
              Interactive compliance checklist for participants in CCF Lab.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 self-start sm:self-auto">
            {checkedCount}/{totalRules} Rules Acknowledged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {VIBE_RULES.map((rule, idx) => {
            const isChecked = !!checkedRules[rule.id];
            return (
              <div
                key={rule.id}
                onClick={() => toggleRuleCheck(rule.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isChecked
                    ? "bg-slate-800/90 border-emerald-500/40 text-slate-200 shadow-sm"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                    isChecked
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "border-slate-600 bg-slate-800"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      Rule #{idx + 1}
                    </span>
                    <h4 className="font-bold text-xs text-slate-100">{rule.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rule.description}</p>
                  <div className="text-[11px] text-amber-300/90 font-medium pt-1">
                    💡 Pro Tip: {rule.tip}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 7: Important Instructions */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-indigo-400" />
          Section 7: Important Instructions (CCF Lab Conduct)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              icon: Clock,
              title: "Report on Time",
              desc: "Arrive at CCF Lab before the challenge begins (09:00 AM on Wednesday, August 19, 2026).",
            },
            {
              icon: Laptop,
              title: "Laptop & Charger",
              desc: "Ensure your laptop, power adapter, and essential dev tools (Node.js, VS Code/editor) are set up beforehand.",
            },
            {
              icon: ShieldCheck,
              title: "Maintain Lab Discipline",
              desc: "Follow the instructions of coordinators and faculty. Maintain quiet environment inside CCF Lab.",
            },
            {
              icon: AlertTriangle,
              title: "Respect Other Teams",
              desc: "Do not disturb or look at other teams' workspaces during the active build sprint.",
            },
            {
              icon: Save,
              title: "Regular Backups",
              desc: "Save your project regularly and keep a git repository / local zip backup to prevent accidental loss.",
            },
            {
              icon: FileCheck2,
              title: "Submit Before Deadline",
              desc: "All submissions must be logged before the announced deadline for judging to commence.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 8: Final Submission Checklist */}
      <div className="rounded-xl bg-slate-900/90 border border-emerald-500/30 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            Section 8: Final Submission Deliverables
          </h3>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/20">
            Mandatory
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Each team must submit the following artifacts to the CCF Lab coordinators:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {[
            "1. Working project / prototype (Live running app)",
            "2. Source code or repository link (GitHub/GitLab/ZIP)",
            "3. Short project description & target users",
            "4. List of technologies & tools used",
            "5. Brief explanation of AI tools used",
            "6. Final demonstration / presentation (5-point pitch)",
          ].map((deliv, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{deliv}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
