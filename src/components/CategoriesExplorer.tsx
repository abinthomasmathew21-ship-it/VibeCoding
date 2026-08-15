import React, { useState } from "react";
import {
  Wallet,
  Building2,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Plus,
  Wand2,
  Zap,
  Target,
  Terminal,
} from "lucide-react";
import { CATEGORIES_CONFIG, PRESET_PROBLEMS } from "../data/challengeData";
import { ChallengeCategory, ProblemPreset, TeamProfile } from "../types";

interface CategoriesExplorerProps {
  teamProfile: TeamProfile;
  setTeamProfile: React.Dispatch<React.SetStateAction<TeamProfile>>;
  onAdoptProblem: (problem: ProblemPreset) => void;
  onOpenAiMentor: (query?: string) => void;
}

export const CategoriesExplorer: React.FC<CategoriesExplorerProps> = ({
  teamProfile,
  setTeamProfile,
  onAdoptProblem,
  onOpenAiMentor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | "All">("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [customPain, setCustomPain] = useState("");
  const [customCategory, setCustomCategory] = useState<ChallengeCategory>("Campus Problems");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedProblems, setAiGeneratedProblems] = useState<ProblemPreset[]>([]);

  const handleCopyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateAiIdeas = async (cat: ChallengeCategory) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/vibe-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "brainstorm_ideas",
          payload: { category: cat },
        }),
      });
      const data = await res.json();
      if (data.result?.ideas) {
        const mapped: ProblemPreset[] = data.result.ideas.map((item: any, idx: number) => ({
          id: `ai-${Date.now()}-${idx}`,
          category: cat,
          title: item.title,
          targetUsers: item.targetUsers,
          painPoint: item.coreProblem,
          mvpScope: item.mvpFeatures || ["Core interactive dashboard", "Action form", "Instant result"],
          impactMetric: "High practical utility in CCF Lab & collegiate environment",
          suggestedStack: [item.techStackSuggestion || "React + Tailwind"],
          aiPromptStarter: item.vibeCodingPromptTip || `Build ${item.title} with React and Tailwind`,
        }));
        setAiGeneratedProblems((prev) => [...mapped, ...prev]);
      }
    } catch (e) {
      console.warn("AI generation error:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const allProblems = [...aiGeneratedProblems, ...PRESET_PROBLEMS];

  const filteredProblems =
    selectedCategory === "All"
      ? allProblems
      : allProblems.filter((p) => p.category === selectedCategory);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customPain.trim()) return;

    const newPreset: ProblemPreset = {
      id: `custom-${Date.now()}`,
      category: customCategory,
      title: customTitle,
      targetUsers: "Campus / Community Stakeholders",
      painPoint: customPain,
      mvpScope: ["Core prototype workflow", "Clean responsive layout", "Sample demo records"],
      impactMetric: "Direct practical resolution for target users",
      suggestedStack: ["React", "Tailwind CSS", "LocalStorage"],
      aiPromptStarter: `Build a prototype for ${customTitle} solving: ${customPain}`,
    };

    onAdoptProblem(newPreset);
    setShowCustomModal(false);
    setCustomTitle("");
    setCustomPain("");
  };

  return (
    <div className="space-y-6">
      {/* Category Section Header */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1 font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Section 3: Challenge Categories
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Problem Explorer & Idea Launcher
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Teams will receive problems from one of 3 primary domains. Pick a verified preset, brainstorm with AI, or formulate your own.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Define Custom Problem
          </button>
        </div>
      </div>

      {/* 3 Main Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              className={`rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? "bg-slate-800/90 border-blue-500 shadow-md shadow-blue-500/10"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
              onClick={() => setSelectedCategory(isSelected ? "All" : cat.name)}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${cat.badgeBg}`}>
                    {cat.name}
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>
                <div className="pt-2 border-t border-slate-800/60 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Subdomains:
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-0.5">
                    {cat.subdomains.slice(0, 3).map((sub, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerateAiIdeas(cat.name);
                  }}
                  disabled={isGenerating}
                  className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <Wand2 className="w-3 h-3" />
                  {isGenerating ? "Brainstorming..." : "Generate AI Ideas"}
                </button>
                <span className="text-[11px] text-blue-400 font-bold flex items-center gap-0.5">
                  {isSelected ? "Showing only this" : "Filter"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs text-slate-400 font-semibold mr-1">Filter:</span>
          {["All", "Finance & Arrangements", "Campus Problems", "Real-World Problems"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Showing <strong className="text-slate-200">{filteredProblems.length}</strong> problem statements
        </div>
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProblems.map((problem) => {
          const isAdopted = teamProfile.projectTitle === problem.title;

          return (
            <div
              key={problem.id}
              className={`rounded-xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                isAdopted
                  ? "bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 mb-1">
                      {problem.category}
                    </span>
                    <h3 className="font-bold text-slate-100 text-base">{problem.title}</h3>
                  </div>

                  {isAdopted && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Selected MVP
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Target Users:</strong> {problem.targetUsers}
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed pl-5">{problem.painPoint}</p>
                </div>

                {/* MVP Features Scope */}
                <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Recommended MVP Scope:
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {problem.mvpScope.map((scope, idx) => (
                      <li key={idx}>{scope}</li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Tech Stack */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-slate-400 font-semibold">Suggested Stack:</span>
                  {problem.suggestedStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyPrompt(problem.aiPromptStarter, problem.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
                  title="Copy ready-to-use AI Prompt"
                >
                  {copiedId === problem.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-3 h-3 text-indigo-400" />
                      <span>AI Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onAdoptProblem(problem)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    isAdopted
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {isAdopted ? "Active Project" : "Adopt for Team"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Problem Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                Define Custom Problem Statement
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Category Domain
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as ChallengeCategory)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Finance & Arrangements">💰 Finance & Arrangements</option>
                  <option value="Campus Problems">🏫 Campus Problems</option>
                  <option value="Real-World Problems">🌍 Real-World Problems</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. MessFoodie: Real-Time Hostel Mess Menu & Feedback"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Core Pain Point / Bottleneck
                </label>
                <textarea
                  required
                  rows={3}
                  value={customPain}
                  onChange={(e) => setCustomPain(e.target.value)}
                  placeholder="Explain why this problem exists and why students need a solution..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >
                  Save & Adopt Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
