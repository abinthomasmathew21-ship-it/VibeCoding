import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Trash2,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  Layout,
  Presentation,
  CheckSquare,
  Plus,
} from "lucide-react";
import { TaskItem, TeamMember, TeamProfile } from "../types";

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
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberYear, setNewMemberYear] = useState<"1st Year" | "2nd Year">("1st Year");
  const [newMemberRole, setNewMemberRole] = useState<TeamMember["role"]>("Development");
  const [showAddMember, setShowAddMember] = useState(false);
  const [activeTaskTab, setActiveTaskTab] = useState<"all" | "morning" | "afternoon">("all");

  const avatarColors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
  ];

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    if (teamProfile.members.length >= 4) {
      alert("Maximum team size is 4 members as per Challenge Guidelines.");
      return;
    }

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: newMemberName.trim(),
      year: newMemberYear,
      role: newMemberRole,
      avatarColor: avatarColors[teamProfile.members.length % avatarColors.length],
    };

    setTeamProfile((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));

    setNewMemberName("");
    setShowAddMember(false);
  };

  const handleRemoveMember = (id: string) => {
    if (teamProfile.members.length <= 2) {
      alert("A team must have at least 2 members as per Section 2 Guidelines (2-4 members).");
      return;
    }
    setTeamProfile((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }));
  };

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

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "UI/UX Design":
        return <Layout className="w-3.5 h-3.5 text-pink-400" />;
      case "Development":
        return <Code2 className="w-3.5 h-3.5 text-blue-400" />;
      case "AI-Assisted Dev":
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case "Testing & Debugging":
        return <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />;
      case "Presentation":
        return <Presentation className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Briefcase className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1 font-mono uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Section 2: Team Structure (2–4 Members)
          </div>
          <h2 className="text-xl font-black text-slate-100">
            Team Roster & Hackathon Task Sprint
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Divide core responsibilities across problem analysis, UI/UX, dev, testing, and presentation for high evaluation marks.
          </p>
        </div>

        {/* Team Name Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={teamProfile.teamName}
            onChange={(e) => setTeamProfile((prev) => ({ ...prev, teamName: e.target.value }))}
            placeholder="Team Name (e.g. VibeCrafters)"
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-bold"
          />
        </div>
      </div>

      {/* Members Grid (2 - 4) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            Team Members ({teamProfile.members.length}/4)
            <span className="text-xs text-slate-400 font-normal">
              (Eligibility: First & Second Year Students)
            </span>
          </h3>

          {teamProfile.members.length < 4 && (
            <button
              onClick={() => setShowAddMember(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-xs font-bold flex items-center gap-1 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Add Member
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {teamProfile.members.map((member) => (
            <div
              key={member.id}
              className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between space-y-3 relative hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-black text-sm shadow-md`}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-slate-100 text-xs">{member.name}</div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {member.year}
                    </span>
                  </div>
                </div>

                {teamProfile.members.length > 2 && (
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Remove member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Primary Role:</span>
                <span className="font-semibold text-slate-200 flex items-center gap-1 text-[11px]">
                  {getRoleIcon(member.role)}
                  {member.role}
                </span>
              </div>
            </div>
          ))}
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
              Track progress through Morning (Plan & Build MVP) and Afternoon (Improve & Demo) sessions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              {completedCount}/{tasks.length} Completed ({progressPercent}%)
            </span>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTaskTab("all")}
                className={`px-2 py-0.5 rounded ${
                  activeTaskTab === "all" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTaskTab("morning")}
                className={`px-2 py-0.5 rounded ${
                  activeTaskTab === "morning"
                    ? "bg-amber-600 text-white font-bold"
                    : "text-slate-400"
                }`}
              >
                Morning
              </button>
              <button
                onClick={() => setActiveTaskTab("afternoon")}
                className={`px-2 py-0.5 rounded ${
                  activeTaskTab === "afternoon"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400"
                }`}
              >
                Afternoon
              </button>
            </div>
          </div>
        </div>

        {/* Task Items List */}
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                task.completed
                  ? "bg-emerald-950/20 border-emerald-500/30 text-slate-300"
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

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-sm w-full p-5 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" />
                Add Team Member (2–4 Max)
              </h3>
              <button
                onClick={() => setShowAddMember(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Member Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Academic Year
                </label>
                <select
                  value={newMemberYear}
                  onChange={(e) => setNewMemberYear(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="1st Year">1st Year Student</option>
                  <option value="2nd Year">2nd Year Student</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Designated Responsibility
                </label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Problem Analysis">Problem Analysis</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Development">Development</option>
                  <option value="AI-Assisted Dev">AI-Assisted Development</option>
                  <option value="Testing & Debugging">Testing & Debugging</option>
                  <option value="Presentation">Final Presentation</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >
                  Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
