import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  Presentation,
  CheckSquare,
  Sun,
  Sunset,
  ListTodo,
} from "lucide-react";
import { TaskItem, TeamProfile } from "../types";

interface TeamWorkspaceProps {
  teamProfile: TeamProfile;
  setTeamProfile: React.Dispatch<React.SetStateAction<TeamProfile>>;
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

export const TeamWorkspace: React.FC<TeamWorkspaceProps> = ({
  teamProfile,
  setTeamProfile,
  tasks,
  setTasks,
}) => {
  const [activeTaskTab, setActiveTaskTab] = useState<"all" | "morning" | "afternoon">("all");

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (activeTaskTab === "morning") {
      return t.phase.startsWith("morning");
    }
    if (activeTaskTab === "afternoon") {
      return t.phase.startsWith("afternoon");
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1 font-mono uppercase tracking-wider">
            <ListTodo className="w-3.5 h-3.5" />
            Hackathon Task Sprint & Milestones
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Challenge Task Tracker (Tasks 1–4)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track and complete deliverables across Morning (Plan & Build MVP) and Afternoon (Improve & Demo) sessions.
          </p>
        </div>

        {/* Team/Project Name Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={teamProfile.teamName}
            onChange={(e) => setTeamProfile((prev) => ({ ...prev, teamName: e.target.value }))}
            placeholder="Team Name (e.g. CCF Innovators)"
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-bold"
          />
        </div>
      </div>

      {/* Sprint Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Sprint Completion</span>
            <div className="text-2xl font-black text-emerald-400">{progressPercent}%</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-4 border border-amber-500/30 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-amber-300 font-medium">Morning Session</span>
            <div className="text-xs text-slate-300 font-bold">Tasks 1 & 2 (09:00 AM - 01:00 PM)</div>
            <div className="text-[11px] text-slate-400">Problem & Core MVP</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Sun className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-4 border border-indigo-500/30 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-indigo-300 font-medium">Afternoon Session</span>
            <div className="text-xs text-slate-300 font-bold">Tasks 3 & 4 (02:00 PM - 04:30 PM)</div>
            <div className="text-[11px] text-slate-400">Polish, Test & 5-Point Demo</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sunset className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Task Checklist Section */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              Challenge Task Board (Tasks 1–4)
            </h3>
            <p className="text-xs text-slate-400">
              Click any task below to toggle completion status in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              {completedCount}/{tasks.length} Completed ({progressPercent}%)
            </span>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTaskTab("all")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTaskTab === "all" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTaskTab("morning")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTaskTab === "morning"
                    ? "bg-amber-600 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Morning
              </button>
              <button
                onClick={() => setActiveTaskTab("afternoon")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTaskTab === "afternoon"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Afternoon
              </button>
            </div>
          </div>
        </div>

        {/* Task Items List */}
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                task.completed
                  ? "bg-emerald-950/20 border-emerald-500/30 text-slate-300 shadow-sm"
                  : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 text-slate-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                    task.completed
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "border-slate-600 bg-slate-800"
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-0.5">
                  <div
                    className={`text-xs font-bold ${
                      task.completed ? "line-through text-slate-400" : "text-slate-100"
                    }`}
                  >
                    {task.title}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap ${
                  task.phase.startsWith("morning")
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                }`}
              >
                {task.phase.startsWith("morning") ? "Morning" : "Afternoon"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
