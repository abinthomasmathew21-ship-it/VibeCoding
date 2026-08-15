import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      event: "Vibe Coding Challenge 2026",
      venue: "CCF Lab",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Copilot Endpoint for Vibe Coding Hackathon Assistance
  app.post("/api/ai/vibe-assistant", async (req, res) => {
    const { action, payload } = req.body;
    const ai = getGemini();

    // Fallback logic if API key is not configured or fails
    if (!ai) {
      return res.json({
        success: true,
        source: "offline_engine",
        result: generateOfflineFallback(action, payload),
      });
    }

    try {
      let prompt = "";
      if (action === "brainstorm_ideas") {
        prompt = `You are the Head Mentor for the "VIBE CODING CHALLENGE 2026" at CCF Lab for 1st and 2nd year college students.
Category requested: "${payload.category || "Campus Problems"}".
User interests/keywords: "${payload.keywords || "college students, automation, simplicity"}".

Provide 3 distinct, realistic, high-impact problem statements with actionable MVP scopes that can be built in a 4-hour hackathon session using modern AI-assisted tools.
Adhere to the Golden Rule: "Don't try to build everything. Build something useful that actually works."

Format your response as clean JSON:
{
  "ideas": [
    {
      "title": "Short catchy title",
      "category": "${payload.category}",
      "targetUsers": "Specific target group",
      "coreProblem": "1-2 sentence core pain point",
      "mvpFeatures": ["Feature 1", "Feature 2", "Feature 3"],
      "techStackSuggestion": "e.g. React + Tailwind + LocalStorage / Node API",
      "vibeCodingPromptTip": "A specific AI prompt the team can use to bootstrap the project rapidly"
    }
  ]
}`;
      } else if (action === "scope_mvp") {
        prompt = `You are a Vibe Coding Hackathon judge and technical mentor.
The team wants to build:
Project Name: "${payload.title}"
Category: "${payload.category}"
Current Idea / Description: "${payload.description}"
Proposed features: ${JSON.stringify(payload.features || [])}

Analyze their scope against the 4-hour hackathon limit and the Golden Rule ("Don't try to build everything. Build something useful that actually works").
Respond in JSON:
{
  "feedback": "Encouraging concise critique on scope feasibility",
  "mustHaveFeatures": ["Essential MVP feature 1", "Essential MVP feature 2"],
  "cutOrDeferFeatures": ["Feature to drop or defer to pitch as future roadmap"],
  "aiPromptShortcuts": ["2 high-leverage prompts to generate boilerplate or logic quickly"],
  "demoTip": "Tip to impress judges in the 3-minute final demo"
}`;
      } else if (action === "generate_pitch") {
        prompt = `You are preparing a 5-point Final Demo Pitch script for the VIBE CODING CHALLENGE 2026 (CCF Lab).
The team's project:
- Title: "${payload.title}"
- Category: "${payload.category}"
- Target Users: "${payload.targetUsers}"
- Problem: "${payload.problem}"
- Solution: "${payload.solution}"
- Tech & AI Tools used: "${payload.techStack}" / "${payload.aiTools}"

Generate a crisp, compelling 3-minute demo script divided strictly into the 5 mandatory final demo points:
1. Explain the problem (30 sec)
2. Explain the proposed solution (30 sec)
3. Live prototype walkthrough guide (60 sec)
4. Technologies & AI tools used (30 sec)
5. Practical real-world impact & takeaways (30 sec)

Return JSON:
{
  "hook": "1-liner opening hook",
  "step1_problem": "Spoken pitch for Problem",
  "step2_solution": "Spoken pitch for Solution",
  "step3_demoFlow": ["Step 1 to show", "Step 2 to show", "Step 3 to show"],
  "step4_techAndAI": "Explanation of architecture and ethical AI acceleration",
  "step5_impact": "Closing statement on real-world impact",
  "anticipatedJudgeQuestions": ["Judge Q1 with suggested answer", "Judge Q2 with suggested answer"]
}`;
      } else if (action === "mentor_chat") {
        prompt = `You are the friendly, sharp AI Hackathon Mentor at the CCF Lab Vibe Coding Challenge 2026.
Rules to uphold:
1. Think problem first, code second.
2. Build practical, working MVPs.
3. Help 1st and 2nd year students debug, refine architecture, craft better prompts, or prepare for judging.

Student asks: "${payload.question}"
Project context: ${JSON.stringify(payload.context || {})}

Provide a direct, practical, encouraging answer with code/prompt examples if relevant. Keep it concise.`;
      } else {
        prompt = `Provide helpful guidance for hackathon participants: ${JSON.stringify(payload)}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: action === "mentor_chat" ? "text/plain" : "application/json",
        },
      });

      const responseText = response.text || "";
      let parsed = null;
      if (action !== "mentor_chat") {
        try {
          parsed = JSON.parse(responseText);
        } catch {
          parsed = responseText;
        }
      } else {
        parsed = responseText;
      }

      res.json({
        success: true,
        source: "gemini_3.7_flash",
        result: parsed,
      });
    } catch (err: any) {
      console.warn("Gemini call fallback:", err?.message);
      res.json({
        success: true,
        source: "offline_engine_fallback",
        result: generateOfflineFallback(action, payload),
        warning: "Ran in offline fallback mode",
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Vibe Coding Challenge 2026] Server running on http://localhost:${PORT}`);
  });
}

function generateOfflineFallback(action: string, payload: any) {
  if (action === "brainstorm_ideas") {
    const cat = payload?.category || "Campus Problems";
    if (cat.includes("Finance")) {
      return {
        ideas: [
          {
            title: "CampusSplit & Event Vault",
            category: "Finance & Arrangements",
            targetUsers: "College Club Treasurers & Student Event Organizers",
            coreProblem: "Managing pooled funds, reimbursing receipts, and tracking shared booth expenses at college fests is messy with spreadsheets.",
            mvpFeatures: ["Interactive Fest Budget Estimator", "Split-Bill Receipt Ledger with CSV import", "Live Expense Variance Alert"],
            techStackSuggestion: "React + LocalStorage + Tailwind UI",
            vibeCodingPromptTip: "Build a single-screen college event budget dashboard with category caps, instant split calculations, and PDF export."
          },
          {
            title: "PocketVibe Student Micro-Budgeter",
            category: "Finance & Arrangements",
            targetUsers: "Hostelers & Commuting Undergrads",
            coreProblem: "Students run out of monthly allowances in the first 2 weeks due to untracked daily food/canteen micro-transactions.",
            mvpFeatures: ["Daily Safe-to-Spend visual meter", "Quick 1-tap food/travel expense logging", "End-of-month runway predictor"],
            techStackSuggestion: "React + Canvas Gauge + Quick Actions",
            vibeCodingPromptTip: "Create a 1-tap mobile-responsive expense logger with a dynamic 'Daily Allowance Burn Rate' gauge."
          }
        ]
      };
    } else if (cat.includes("Real-World")) {
      return {
        ideas: [
          {
            title: "TransitPulse - Local Bus Route & Crowd Radar",
            category: "Real-World Problems",
            targetUsers: "Daily bus commuters and student travellers",
            coreProblem: "Commuters wait blindly at stops without knowing ETA, route variations, or seat availability.",
            mvpFeatures: ["Stop ETA timetable search", "Crowd level color-coded badges", "Interactive route map visualizer"],
            techStackSuggestion: "React + Lucide icons + Mock Live Route Timetable",
            vibeCodingPromptTip: "Design a clean route tracker showing simulated bus locations and crowd density metrics."
          },
          {
            title: "LocalMart QuickOrder & Stock Beacon",
            category: "Real-World Problems",
            targetUsers: "Neighborhood mom-and-pop grocery stores",
            coreProblem: "Small shopkeepers lose orders to quick-commerce apps because they lack digital item lists and pickup alerts.",
            mvpFeatures: ["Instant WhatsApp order formatter", "Live inventory low-stock flagger", "Customer pickup queue"],
            techStackSuggestion: "React + Web Share API + Local State",
            vibeCodingPromptTip: "Generate a lightweight grocery inventory manager with one-click WhatsApp order generation."
          }
        ]
      };
    } else {
      return {
        ideas: [
          {
            title: "CCF Lab Space & PC Availability Tracker",
            category: "Campus Problems",
            targetUsers: "Students needing lab systems for projects/practicals",
            coreProblem: "Students walk across campus to find all lab PCs occupied or reserved for batches.",
            mvpFeatures: ["Live Lab Grid map with real-time seat occupancy", "Time-slot quick reservation", "Hardware spec filter (GPU/Linux/Core i7)"],
            techStackSuggestion: "React + Interactive Grid Canvas + Time Slot Picker",
            vibeCodingPromptTip: "Build an interactive 40-seat lab layout visualizer with color-coded status (Free, Busy, Reserved) and 1-click booking."
          },
          {
            title: "Campus Lost & Found Matchmaker",
            category: "Campus Problems",
            targetUsers: "Hostelers and students who misplace IDs, keys, or calculators",
            coreProblem: "Lost items sit uncollected at security desks or scattered across random WhatsApp groups.",
            mvpFeatures: ["Visual Lost/Found item cards with tags", "Keyword & date filter", "Direct claim verification badge"],
            techStackSuggestion: "React + Tag filtering + Image upload preview",
            vibeCodingPromptTip: "Create a Lost and Found pinboard with image previews, category filters, and claim buttons."
          }
        ]
      };
    }
  }

  if (action === "scope_mvp") {
    return {
      feedback: "Great direction! Keep the core focus narrow so you finish with 100% polish before the final demo.",
      mustHaveFeatures: [
        "1 central interactive dashboard with simulated sample data",
        "Clear input mechanism (form or action buttons) with instant UI feedback",
        "Visual output / results state showing solved problem"
      ],
      cutOrDeferFeatures: [
        "Authentication / Login screen (Skip for demo, use pre-filled user state)",
        "Complex multi-tier backend database (Use robust local state + JSON export)",
        "Overly complex third-party API keys setup"
      ],
      aiPromptShortcuts: [
        "Generate a complete mock data dataset for 10 realistic campus scenarios",
        "Create responsive Tailwind card components with hover states and filter pills"
      ],
      demoTip: "Start your demo with the student pain point, show 1 key workflow live without reloading, and show the result."
    };
  }

  if (action === "generate_pitch") {
    return {
      hook: `Every single day, thousands of students face this exact bottleneck. Today, our team solved it.`,
      step1_problem: `Problem: In campus life, ${payload?.problem || "inefficient manual processes create frustration and waste precious study hours"}.`,
      step2_solution: `Solution: We built ${payload?.title || "our prototype"}, a lightweight, practical tool designed specifically for ${payload?.targetUsers || "students and coordinators"}.`,
      step3_demoFlow: [
        "1. Open the dashboard showing current status overview",
        "2. Perform the main action: log a request or trigger the core calculation",
        "3. Show the instant visual confirmation and data output"
      ],
      step4_techAndAI: `Tech & AI: Built with React, Tailwind CSS, and powered by Gemini-assisted rapid prototyping, adhering strictly to clean code comprehension.`,
      step5_impact: `Impact: Zero setup friction, immediate practical utility in CCF Lab and beyond. Remember: Don't build everything, build what works!`,
      anticipatedJudgeQuestions: [
        "Q: How will you handle data persistence across sessions? -> A: We structured a clean JSON schema that integrates with local storage and can sync to cloud endpoints.",
        "Q: How did you leverage AI effectively without copy-pasting? -> A: We used AI for rapid ideation and edge-case testing, while manually orchestrating the state machine and UX."
      ]
    };
  }

  if (action === "mentor_chat") {
    return `Mentor Tip: Remember the Golden Rule: "Don't try to build everything. Build something useful that actually works." Focus on making your single core flow robust, bug-free, and visually clear for the CCF Lab judges!`;
  }

  return { message: "Ready to assist your Vibe Coding hackathon team!" };
}

startServer();
