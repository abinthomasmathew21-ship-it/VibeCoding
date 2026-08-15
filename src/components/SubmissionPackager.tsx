import React, { useState } from "react";
import {
  FileCheck2,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ExternalLink,
  Github,
  Wand2,
  Share2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { TeamProfile } from "../types";
import { EVENT_DETAILS } from "../data/challengeData";

interface SubmissionPackagerProps {
  teamProfile: TeamProfile;
  setTeamProfile: React.Dispatch<React.SetStateAction<TeamProfile>>;
  onOpenPitchTimer: () => void;
}

export const SubmissionPackager: React.FC<SubmissionPackagerProps> = ({
  teamProfile,
  setTeamProfile,
  onOpenPitchTimer,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const generateMarkdown = () => {
    return `# VIBE CODING CHALLENGE 2026 - FINAL SUBMISSION

**Event:** ${EVENT_DETAILS.title}
**Date:** ${EVENT_DETAILS.date}
**Venue:** ${EVENT_DETAILS.venue}
**Team Name:** ${teamProfile.teamName || "Untitled Team"}
**Category:** ${teamProfile.selectedCategory}

---

## 1. Project Information
* **Project Title:** ${teamProfile.projectTitle || "Not specified"}
* **Target Users:** ${teamProfile.targetUsers || "Not specified"}
* **Short Description:** ${teamProfile.problemStatement || "Not specified"}
* **Proposed Solution:** ${teamProfile.proposedSolution || "Not specified"}

---

## 2. Team Members & Responsibilities (2–4 Members)
${teamProfile.members
  .map((m, idx) => `${idx + 1}. **${m.name}** (${m.year}) - Role: *${m.role}*`)
  .join("\n")}

---

## 3. Technologies & Development Tools Used
* **Framework / Libraries:** ${teamProfile.techStack.join(", ") || "React, Tailwind CSS, Vite, Lucide Icons"}
* **Runtime & Tooling:** TypeScript, Node.js, Express, tsx, esbuild

---

## 4. Explanation of AI Tools Used (Section 8 Requirement)
* **AI Tools:** ${teamProfile.aiToolsUsed.join(", ") || "Gemini 3.7 Flash, AI Assisted Code Scaffolding"}
* **Ethical & Practical Utilization:**
  * Used AI for rapid prototype scaffolding, UI component structuring, and mock dataset generation.
  * Verified all generated logic manually and eliminated boilerplate hallucinations.
  * Adhered strictly to Vibe Coding Rule 3 ("Understand the code you submit") and Rule 4 ("Do not blindly copy AI code").

---

## 5. Prototype & Source Code Links
* **Repository URL:** ${teamProfile.repoUrl || "https://github.com/..."}
* **Live Demo URL:** ${teamProfile.demoUrl || "http://localhost:3000"}

---

## 6. Golden Rule Compliance
> *"${EVENT_DETAILS.goldenRule}"*
> *${EVENT_DETAILS.mantra}*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const text = generateMarkdown();
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `VIBE_2026_Submission_${teamProfile.teamName.replace(/\s+/g, "_") || "Team"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const data = JSON.stringify(teamProfile, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `VIBE_2026_Profile_${teamProfile.teamName.replace(/\s+/g, "_") || "Team"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFinalSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setSubmitted(true);
  };

  const handleAiPolishPitch = async () => {
    setIsPolishing(true);
    try {
      const res = await fetch("/api/ai/vibe-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_pitch",
          payload: {
            title: teamProfile.projectTitle,
            category: teamProfile.selectedCategory,
            targetUsers: teamProfile.targetUsers,
            problem: teamProfile.problemStatement,
            solution: teamProfile.proposedSolution,
            techStack: teamProfile.techStack.join(", "),
            aiTools: teamProfile.aiToolsUsed.join(", "),
          },
        }),
      });
      const data = await res.json();
      if (data.result?.step1_problem) {
        const r = data.result;
        const notes = `--- 5-POINT DEMO SCRIPT ---
1. PROBLEM (30s): ${r.step1_problem}
2. SOLUTION (30s): ${r.step2_solution}
3. LIVE DEMO (60s):
${r.step3_demoFlow?.map((s: string) => `   - ${s}`).join("\n")}
4. TECH & AI (30s): ${r.step4_techAndAI}
5. IMPACT (30s): ${r.step5_impact}

Anticipated Judge Q&A:
${r.anticipatedJudgeQuestions?.map((q: string) => `• ${q}`).join("\n")}`;

        setTeamProfile((prev) => ({ ...prev, presentationNotes: notes }));
      }
    } catch (e) {
      console.warn("Error polishing pitch:", e);
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1 font-mono uppercase tracking-wider">
            <FileCheck2 className="w-3.5 h-3.5" />
            Section 8: Final Submission Packager
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Final Project Submission & Presentation Dossier
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Package and export all required deliverables for evaluation by CCF Lab coordinators.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Markdown
              </>
            )}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download .md
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Dossier
          </button>
        </div>
      </div>

      {submitted && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/50 flex items-center justify-between gap-4 animate-scaleUp">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-100 text-sm">
                Project Dossier Prepared & Ready for CCF Lab Demo!
              </div>
              <div className="text-xs text-slate-300">
                You are ready for the afternoon 5-point presentation. Good luck, team!
              </div>
            </div>
          </div>
          <button
            onClick={onOpenPitchTimer}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0"
          >
            Start 3-Min Pitch Timer
          </button>
        </div>
      )}

      {/* Submission Form Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2">
              Deliverable Details (Edit / Verify)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={teamProfile.projectTitle}
                  onChange={(e) =>
                    setTeamProfile((prev) => ({ ...prev, projectTitle: e.target.value }))
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Selected Category
                </label>
                <select
                  value={teamProfile.selectedCategory}
                  onChange={(e) =>
                    setTeamProfile((prev) => ({
                      ...prev,
                      selectedCategory: e.target.value as any,
                    }))
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Finance & Arrangements">💰 Finance & Arrangements</option>
                  <option value="Campus Problems">🏫 Campus Problems</option>
                  <option value="Real-World Problems">🌍 Real-World Problems</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Short Project Description (Problem & Target Users)
              </label>
              <textarea
                rows={2}
                value={teamProfile.problemStatement}
                onChange={(e) =>
                  setTeamProfile((prev) => ({ ...prev, problemStatement: e.target.value }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Proposed Solution & Practical Working Features
              </label>
              <textarea
                rows={2}
                value={teamProfile.proposedSolution}
                onChange={(e) =>
                  setTeamProfile((prev) => ({ ...prev, proposedSolution: e.target.value }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Source Code / Repo Link
                </label>
                <input
                  type="text"
                  value={teamProfile.repoUrl}
                  onChange={(e) =>
                    setTeamProfile((prev) => ({ ...prev, repoUrl: e.target.value }))
                  }
                  placeholder="https://github.com/myteam/vibe-prototype"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Live Prototype Demo URL
                </label>
                <input
                  type="text"
                  value={teamProfile.demoUrl}
                  onChange={(e) =>
                    setTeamProfile((prev) => ({ ...prev, demoUrl: e.target.value }))
                  }
                  placeholder="https://ais-dev-...run.app or http://localhost:3000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* AI Explanation Field */}
            <div>
              <label className="block text-xs font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Explanation of AI Tools Used (Required by Section 8)
              </label>
              <textarea
                rows={2}
                value={teamProfile.aiToolsUsed.join("\n")}
                onChange={(e) =>
                  setTeamProfile((prev) => ({
                    ...prev,
                    aiToolsUsed: e.target.value.split("\n").filter(Boolean),
                  }))
                }
                placeholder="List AI tools and how your team guided them responsibly..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* 5-Point Demo Pitch Script Box */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                5-Point Final Demo Script & Speaking Notes
              </h3>

              <button
                onClick={handleAiPolishPitch}
                disabled={isPolishing}
                className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Wand2 className="w-3.5 h-3.5" />
                {isPolishing ? "Structuring Script..." : "Generate 5-Point Pitch"}
              </button>
            </div>

            <textarea
              rows={8}
              value={teamProfile.presentationNotes}
              onChange={(e) =>
                setTeamProfile((prev) => ({ ...prev, presentationNotes: e.target.value }))
              }
              placeholder="Click 'Generate 5-Point Pitch' or write your speaking points for Problem, Solution, Demo, Tech/AI, and Impact..."
              className="w-full bg-slate-950 font-mono text-xs text-purple-200/90 border border-slate-800 rounded-lg p-3 leading-relaxed focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Live Submission Summary Preview */}
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-slate-200 text-xs uppercase tracking-wider font-mono">
                Official Dossier Summary
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                CCF Lab 2026
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 text-[11px] block">Team Name:</span>
                <strong className="text-slate-100 text-sm">
                  {teamProfile.teamName || "Pending Name"}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Project:</span>
                <span className="font-semibold text-slate-100">
                  {teamProfile.projectTitle || "Untitled Prototype"}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Category:</span>
                <span className="font-semibold text-amber-300">
                  {teamProfile.selectedCategory}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">
                  Team Members ({teamProfile.members.length}):
                </span>
                <div className="space-y-1 mt-1">
                  {teamProfile.members.map((m) => (
                    <div
                      key={m.id}
                      className="text-[11px] text-slate-300 flex items-center justify-between bg-slate-800/50 px-2 py-1 rounded"
                    >
                      <span>{m.name}</span>
                      <span className="text-slate-400 text-[10px] font-mono">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={handleFinalSubmit}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Finalize & Ready Submission
              </button>

              <button
                onClick={handleDownloadJson}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 border border-slate-700"
              >
                Export JSON State
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
