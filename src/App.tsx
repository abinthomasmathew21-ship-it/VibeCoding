import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { OverviewHero } from "./components/OverviewHero";
import { WorkflowGuide } from "./components/WorkflowGuide";
import { CategoriesExplorer } from "./components/CategoriesExplorer";
import { TeamWorkspace } from "./components/TeamWorkspace";
import { EvaluationRubric } from "./components/EvaluationRubric";
import { RulesAndInstructions } from "./components/RulesAndInstructions";
import { SubmissionPackager } from "./components/SubmissionPackager";
import { PitchTimerModal } from "./components/PitchTimerModal";
import { AiMentorModal } from "./components/AiMentorModal";
import { ProblemPreset, TaskItem, TeamProfile } from "./types";
import { INITIAL_TASKS, PRESET_PROBLEMS, EVENT_DETAILS } from "./data/challengeData";
import { Sparkles, Timer, FileCheck2, ArrowUp } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showPitchTimer, setShowPitchTimer] = useState<boolean>(false);
  const [showAiMentor, setShowAiMentor] = useState<boolean>(false);
  const [aiMentorQuery, setAiMentorQuery] = useState<string>("");

  // Persistent team state
  const [teamProfile, setTeamProfile] = useState<TeamProfile>(() => {
    try {
      const saved = localStorage.getItem("vibe_coding_team_2026");
      if (saved) return JSON.parse(saved);
    } catch {}

    const defaultPreset = PRESET_PROBLEMS[2]; // LabPulse (Campus Problems)
    return {
      teamName: "CCF Innovators",
      teamNumber: "T-01",
      members: [
        {
          id: "m-1",
          name: "Alex Rivera",
          year: "2nd Year",
          role: "Problem Analysis",
          avatarColor: "from-blue-500 to-indigo-600",
        },
        {
          id: "m-2",
          name: "Priya Sharma",
          year: "2nd Year",
          role: "UI/UX Design",
          avatarColor: "from-purple-500 to-pink-600",
        },
        {
          id: "m-3",
          name: "Kevin Chen",
          year: "1st Year",
          role: "Development",
          avatarColor: "from-emerald-500 to-teal-600",
        },
        {
          id: "m-4",
          name: "Ananya Das",
          year: "1st Year",
          role: "AI-Assisted Dev",
          avatarColor: "from-amber-500 to-orange-600",
        },
      ],
      selectedCategory: defaultPreset.category,
      projectTitle: defaultPreset.title,
      tagline: "Making campus labs friction-free with real-time seat availability",
      problemStatement: defaultPreset.painPoint,
      targetUsers: defaultPreset.targetUsers,
      proposedSolution:
        "An interactive 2D CCF Lab floorplan grid showing Free vs Occupied PCs with instant 45-minute reservation tokens.",
      techStack: ["React 19", "Tailwind CSS", "TypeScript", "Vite", "Lucide Icons"],
      aiToolsUsed: [
        "Gemini 3.7 Flash for UI component scaffolding",
        "AI Prompts for generating sample lab seat states",
      ],
      repoUrl: "https://github.com/vibe-coding-2026/lab-pulse",
      demoUrl: "http://localhost:3000",
      presentationNotes: `1. Problem (30s): Students walk across college to CCF Lab only to find all PCs busy.\n2. Solution (30s): LabPulse provides a live 2D seat map with 1-click token reservations.\n3. Live Demo (60s): Show seat status grid -> Filter by Linux/GPU -> Reserve PC-14 -> Instant confirmation badge.\n4. Tech & AI (30s): React + Tailwind, designed with responsible AI scaffolding.\n5. Impact (30s): Zero wasted trips for 1st & 2nd year students.`,
    };
  });

  // Persistent task state
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem("vibe_coding_tasks_2026");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TASKS;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("vibe_coding_team_2026", JSON.stringify(teamProfile));
    } catch {}
  }, [teamProfile]);

  useEffect(() => {
    try {
      localStorage.setItem("vibe_coding_tasks_2026", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleAdoptProblem = (problem: ProblemPreset) => {
    setTeamProfile((prev) => ({
      ...prev,
      selectedCategory: problem.category,
      projectTitle: problem.title,
      problemStatement: problem.painPoint,
      targetUsers: problem.targetUsers,
      proposedSolution: `MVP designed to resolve: ${problem.painPoint}`,
      techStack: problem.suggestedStack.length ? problem.suggestedStack : prev.techStack,
    }));
    setActiveTab("workflow");
  };

  const handleOpenAiMentor = (query = "") => {
    setAiMentorQuery(query);
    setShowAiMentor(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiMentor={() => handleOpenAiMentor()}
        onOpenPitchTimer={() => setShowPitchTimer(true)}
        progressPercent={progressPercent}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-8">
        {activeTab === "overview" && (
          <OverviewHero
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAiMentor={() => handleOpenAiMentor()}
            onOpenPitchTimer={() => setShowPitchTimer(true)}
          />
        )}

        {activeTab === "workflow" && (
          <WorkflowGuide
            teamProfile={teamProfile}
            setTeamProfile={setTeamProfile}
            onOpenPitchTimer={() => setShowPitchTimer(true)}
            onOpenAiMentor={handleOpenAiMentor}
          />
        )}

        {activeTab === "categories" && (
          <CategoriesExplorer
            teamProfile={teamProfile}
            setTeamProfile={setTeamProfile}
            onAdoptProblem={handleAdoptProblem}
            onOpenAiMentor={handleOpenAiMentor}
          />
        )}

        {activeTab === "team" && (
          <TeamWorkspace
            teamProfile={teamProfile}
            setTeamProfile={setTeamProfile}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}

        {activeTab === "rubric" && (
          <EvaluationRubric onOpenAiMentor={handleOpenAiMentor} />
        )}

        {activeTab === "rules" && <RulesAndInstructions />}

        {activeTab === "submit" && (
          <SubmissionPackager
            teamProfile={teamProfile}
            setTeamProfile={setTeamProfile}
            onOpenPitchTimer={() => setShowPitchTimer(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">{EVENT_DETAILS.title}</span>
            <span>•</span>
            <span>{EVENT_DETAILS.venue}</span>
            <span>•</span>
            <span>{EVENT_DETAILS.date}</span>
          </div>

          <div className="italic text-slate-400 font-mono text-[11px]">
            “{EVENT_DETAILS.goldenRule}”
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        <button
          onClick={() => setShowAiMentor(true)}
          className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105 active:scale-95"
          title="Open AI Hackathon Mentor"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">AI Mentor</span>
        </button>

        <button
          onClick={() => setShowPitchTimer(true)}
          className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 shadow-lg flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105 active:scale-95"
          title="Open 3-Minute Demo Pitch Timer"
        >
          <Timer className="w-5 h-5" />
          <span className="hidden sm:inline">Pitch Timer</span>
        </button>
      </div>

      {/* Modals */}
      <PitchTimerModal
        isOpen={showPitchTimer}
        onClose={() => setShowPitchTimer(false)}
      />

      <AiMentorModal
        isOpen={showAiMentor}
        onClose={() => setShowAiMentor(false)}
        teamProfile={teamProfile}
        initialQuery={aiMentorQuery}
      />
    </div>
  );
}
