import React, { useState } from "react";
import {
  Award,
  Trophy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { EVALUATION_CRITERIA } from "../data/challengeData";

interface EvaluationRubricProps {
  onOpenAiMentor: (query?: string) => void;
}

export const EvaluationRubric: React.FC<EvaluationRubricProps> = ({ onOpenAiMentor }) => {
  const [scores, setScores] = useState<{ [key: string]: number }>({
    c1: 8,
    c2: 8,
    c3: 9,
    c4: 8,
    c5: 8,
    c6: 9,
    c7: 9,
    c8: 8,
    c9: 8,
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleScoreChange = (id: string, value: number) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const resetScores = () => {
    const defaultScores: { [key: string]: number } = {};
    EVALUATION_CRITERIA.forEach((c) => {
      defaultScores[c.id] = 8;
    });
    setScores(defaultScores);
  };

  const totalScore = (Object.values(scores) as number[]).reduce((acc, curr) => acc + curr, 0);
  const maxPossible = EVALUATION_CRITERIA.length * 10;
  const percentage = Math.round((totalScore / maxPossible) * 100);

  const getTier = () => {
    if (totalScore >= 80) return { label: "Top Contender / Winner Tier 🏆", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
    if (totalScore >= 68) return { label: "Strong Finalist Grade 🚀", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
    if (totalScore >= 50) return { label: "Competitive Prototype ⚡", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" };
    return { label: "Needs Scope Adjustment ⚠️", color: "text-rose-400 bg-rose-500/10 border-rose-500/30" };
  };

  const tier = getTier();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1 font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Section 6: Evaluation Criteria (9 Pillars)
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Interactive Judge & Self-Evaluation Rubric
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate your team's score across all 9 official judging criteria before presenting in CCF Lab.
          </p>
        </div>

        <button
          onClick={resetScores}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Rubric
        </button>
      </div>

      {/* Score Summary Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800/90 to-slate-900 border border-slate-700/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-block ${tier.color}`}>
              {tier.label}
            </span>
            <div className="text-xs text-slate-300 max-w-sm">
              Judges in CCF Lab look for practical execution, working workflows, clean UI, and responsible AI usage.
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 px-6 py-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-3xl font-black text-slate-100 font-mono">
                {totalScore}<span className="text-lg text-slate-500 font-normal">/{maxPossible}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Overall Self Score ({percentage}%)
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-bold text-amber-400">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-purple-950/30 border border-purple-500/30 p-5 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Score Maximizer AI
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Ask AI how your team can maximize scores in technical quality and final presentation.
            </p>
          </div>
          <button
            onClick={() => onOpenAiMentor("How can our team maximize our score in UI/UX, AI Utilization, and Technical Implementation in the CCF Lab Vibe Coding Challenge?")}
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
          >
            Get Score Improvement Tips
          </button>
        </div>
      </div>

      {/* 9 Criteria Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          The 9 Evaluation Criteria (10 Points Each)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {EVALUATION_CRITERIA.map((criterion, idx) => {
            const score = scores[criterion.id] ?? 8;
            const isExpanded = expandedId === criterion.id;

            return (
              <div
                key={criterion.id}
                className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-100 text-sm">{criterion.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-base text-amber-400">
                        {score}
                      </span>
                      <span className="text-xs text-slate-500">/10</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">{criterion.focus}</p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {criterion.weightDescription}
                  </p>
                </div>

                {/* Score Slider */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>1 (Weak)</span>
                    <span>10 (Flawless)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={score}
                    onChange={(e) => handleScoreChange(criterion.id, parseInt(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Collapsible Guiding Questions */}
                <div className="pt-1">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : criterion.id)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                  >
                    <HelpCircle className="w-3 h-3" />
                    {isExpanded ? "Hide Judge Checklist" : "Show Judge Checklist"}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-2.5 rounded bg-slate-800/80 text-[11px] text-slate-300 space-y-1 border border-slate-700 animate-fadeIn">
                      <div className="font-bold text-slate-200">Judges will ask:</div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                        {criterion.guidingQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
