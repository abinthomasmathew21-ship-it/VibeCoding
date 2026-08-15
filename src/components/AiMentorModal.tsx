import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Wand2,
  Bot,
  User,
  Lightbulb,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import { TeamProfile } from "../types";

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamProfile: TeamProfile;
  initialQuery?: string;
}

interface Message {
  id: string;
  sender: "user" | "mentor";
  text: string;
  timestamp: string;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  isOpen,
  onClose,
  teamProfile,
  initialQuery = "",
}) => {
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      sender: "mentor",
      text: `Hello Team ${teamProfile.teamName || "! Welcome to the VIBE CODING CHALLENGE 2026 at CCF Lab"}. I'm your AI Hackathon Mentor. I can help you scope your MVP (Rule: "Don't build everything, build what works"), troubleshoot React logic, craft prompt templates, or practice your 3-minute pitch! What are you working on right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    "Audit our MVP scope against the 4-hour hackathon limit",
    "Suggest 3 high-impact features for our selected category",
    "What edge cases should we test before the demo?",
    "How should we structure our 30-second problem statement pitch?",
    "Give us 2 good AI prompt templates for rapid React component generation",
  ];

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/vibe-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "mentor_chat",
          payload: {
            question: q,
            context: {
              teamName: teamProfile.teamName,
              projectTitle: teamProfile.projectTitle,
              category: teamProfile.selectedCategory,
              problem: teamProfile.problemStatement,
              solution: teamProfile.proposedSolution,
              techStack: teamProfile.techStack,
            },
          },
        }),
      });

      const data = await res.json();
      let reply = typeof data.result === "string" ? data.result : JSON.stringify(data.result, null, 2);

      const mentorMsg: Message = {
        id: `m-${Date.now()}`,
        sender: "mentor",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: "mentor",
          text: `Mentor Tip: Remember the Golden Rule: "Don't try to build everything. Build something useful that actually works." Focus on testing your core flow with sample inputs for the judges!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl animate-scaleUp text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                AI Hackathon Mentor & Vibe Copilot
              </h3>
              <span className="text-[10px] text-purple-300 font-mono">
                CCF Lab 2026 Companion • Powered by Gemini
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold px-2"
          >
            ✕
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap border border-slate-700 transition-colors flex items-center gap-1"
            >
              <Lightbulb className="w-3 h-3 text-amber-400" />
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-purple-600 text-white"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] text-right flex items-center justify-end gap-1 ${
                    msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === "mentor" && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="hover:text-slate-200 ml-1"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-400 p-2 bg-slate-800/40 rounded-lg w-fit border border-slate-700/50">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Mentor is analyzing your request...</span>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask mentor about scoping, prompts, bug fixes, or demo tips..."
              className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
