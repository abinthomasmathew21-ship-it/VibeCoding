import { ChallengeCategory, EvaluationCriterion, ProblemPreset, TaskItem, VibeRuleItem } from "../types";

export const EVENT_DETAILS = {
  title: "VIBE CODING CHALLENGE 2026",
  subtitle: "Official Participant Portal & Rapid Prototyping Companion",
  date: "Wednesday, August 19, 2026",
  eventDateISO: "2026-08-19T09:00:00",
  venue: "CCF Lab (Central Computing Facility)",
  eligibility: "First & Second Year Students",
  teamSize: "2–4 members",
  goldenRule: "Don't try to build everything. Build something useful that actually works.",
  mantra: "Think → Plan → Build → Test → Improve → Present",
  motto: "Make it practical. Make it useful. Make it work.",
};

export const CATEGORIES_CONFIG: {
  name: ChallengeCategory;
  emoji: string;
  iconName: string;
  description: string;
  subdomains: string[];
  color: string;
  badgeBg: string;
}[] = [
  {
    name: "Finance & Arrangements",
    emoji: "💰",
    iconName: "Wallet",
    description: "Real-world problems related to monetary management, budgeting, and event logistics.",
    subdomains: [
      "Personal finance for students",
      "Expense management & split bills",
      "Budget planning & runway forecasting",
      "College fest / event finance & sponsorships",
      "Payment & transaction tracking",
    ],
    color: "emerald",
    badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  {
    name: "Campus Problems",
    emoji: "🏫",
    iconName: "Building2",
    description: "Everyday bottlenecks experienced by students and faculty within collegiate life.",
    subdomains: [
      "Attendance tracking & shortage alerts",
      "CCF Lab & hardware resource booking",
      "Hostel room & mess grievance resolution",
      "College club / department event management",
      "Campus Lost & Found verification",
      "Peer-to-peer student announcements & notes",
    ],
    color: "blue",
    badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  },
  {
    name: "Real-World Problems",
    emoji: "🌍",
    iconName: "Globe",
    description: "Practical societal issues inspired by local communities, public services, and daily life.",
    subdomains: [
      "Urban & college bus transit tracking",
      "Civic & public service complaint queues",
      "Small-business inventory & local delivery",
      "Eco-footprint & campus waste reduction",
      "Micro-tutoring & accessible education",
      "Neighborhood blood donor & volunteer matching",
    ],
    color: "purple",
    badgeBg: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  },
];

export const PRESET_PROBLEMS: ProblemPreset[] = [
  {
    id: "fin-1",
    category: "Finance & Arrangements",
    title: "FestVault: College Club & Event Budgeter",
    targetUsers: "Student Club Treasurers, Department Fest Heads, Student Council",
    painPoint: "Student fest teams manage pooled funds and vendor advances on messy chat groups, leading to missing receipts and budget deficits.",
    mvpScope: [
      "Event category budget ceiling allocation",
      "1-Click receipt expense logger with participant split",
      "Real-time remaining funds gauge with over-budget warning",
      "Exportable balance sheet for faculty approval",
    ],
    impactMetric: "Saves 10+ hours of manual reconciliation per campus fest",
    suggestedStack: ["React", "Tailwind CSS", "LocalStorage", "Lucide Icons"],
    aiPromptStarter: "Build a responsive college fest budget tracker in React with category percentage breakdown, receipt entry form, and instant remaining balance calculation.",
  },
  {
    id: "fin-2",
    category: "Finance & Arrangements",
    title: "PocketVibe: Student Daily Allowance Guard",
    targetUsers: "Hostelers & commuting undergrads on tight monthly allowances",
    painPoint: "Students run out of money in the first 10 days of the month because canteen, coffee, and printout micro-expenses go unmonitored.",
    mvpScope: [
      "Daily 'Safe-to-Spend' dynamic limit calculated from remaining days",
      "Quick 3-button expense logger (Food, Travel, Print/Academic)",
      "Visual runway bar: Days remaining in month vs Cash in hand",
    ],
    impactMetric: "Prevents end-of-month financial emergencies for hostel students",
    suggestedStack: ["React", "CSS Animation", "LocalStorage"],
    aiPromptStarter: "Create a minimalist student pocket money tracker featuring a 'Daily Safe-to-Spend' calculation and rapid tap logging.",
  },
  {
    id: "camp-1",
    category: "Campus Problems",
    title: "LabPulse: CCF Lab Seat & Rig Availability Radar",
    targetUsers: "1st & 2nd Year students needing systems for practicals and projects",
    painPoint: "Students walk across college to CCF Lab only to find all systems occupied or batches in session.",
    mvpScope: [
      "Interactive 2D Lab floorplan grid showing Free vs Occupied PCs",
      "Filter by OS/Specs (Linux, Windows, GPU, Python preloaded)",
      "Instant 45-minute quick slot reservation token",
    ],
    impactMetric: "Eliminates wasted trips and improves lab hardware utilization",
    suggestedStack: ["React Canvas/Grid", "Tailwind", "State Machine"],
    aiPromptStarter: "Generate an interactive 30-system CCF Lab seat availability grid in React with status filters and booking token modal.",
  },
  {
    id: "camp-2",
    category: "Campus Problems",
    title: "FindMyStuff: Verified Campus Lost & Found",
    targetUsers: "Students who misplace ID cards, lab records, calculators, and keys",
    painPoint: "Lost items get buried across noisy batch groups or sit forgotten at campus security desks.",
    mvpScope: [
      "Visual Lost / Found pinboard with location tags (CCF Lab, Canteen, Library)",
      "Instant keyword & date filter",
      "Secret question verification flow to claim items safely",
    ],
    impactMetric: "Reunites 80% of misplaced campus essentials within 24 hours",
    suggestedStack: ["React", "Tailwind UI", "Mock Image Placeholders"],
    aiPromptStarter: "Build a campus lost & found feed with category filters, image placeholders, and a verification claim modal.",
  },
  {
    id: "camp-3",
    category: "Campus Problems",
    title: "BunkWise: Smart Attendance Safety Net",
    targetUsers: "Undergrad students managing mandatory 75% attendance threshold",
    painPoint: "Students calculate safe leaves blindly, leading to unexpected exam hall ticket detentions.",
    mvpScope: [
      "Subject-wise attendance tracker (Attended / Total conducted)",
      "Automatic calculation of 'Safe Bunks Remaining' or 'Must-Attend Classes to reach 75%'",
      "Color-coded danger warning when below 75%",
    ],
    impactMetric: "Protects students from attendance shortages with mathematical clarity",
    suggestedStack: ["React", "Progress Rings", "State Calculations"],
    aiPromptStarter: "Create a clean 75% attendance calculator with subject cards, safe-to-miss numbers, and visual warning badges.",
  },
  {
    id: "real-1",
    category: "Real-World Problems",
    title: "RouteMate: College & Local Transit Crowd Radar",
    targetUsers: "Daily bus and train commuters facing overcrowded routes",
    painPoint: "Commuters wait at stops without knowing whether the upcoming bus is full or delayed.",
    mvpScope: [
      "Search by route / destination with live ETA simulation",
      "Crowd density indicators (Green: Seats Available, Yellow: Standing, Red: Packed)",
      "Alternative route suggestion if primary is delayed",
    ],
    impactMetric: "Reduces transit anxiety and saves 20 minutes per commute",
    suggestedStack: ["React", "Lucide Icons", "Simulated Timetable"],
    aiPromptStarter: "Design a responsive transit timetable app in React with live ETA counters and crowd level badges.",
  },
  {
    id: "real-2",
    category: "Real-World Problems",
    title: "LocalKiran: Small Business Instant Digital Catalog",
    targetUsers: "Neighborhood mom-and-pop grocery stores and small food stalls",
    painPoint: "Small vendors lose customer orders to big apps because setting up e-commerce apps is too complicated.",
    mvpScope: [
      "3-minute inventory builder with price & in-stock switch",
      "1-Click 'Generate WhatsApp Order' formatting for customers",
      "Simple pickup order manager for the shopkeeper",
    ],
    impactMetric: "Empowers local small merchants to receive digital orders with zero commission",
    suggestedStack: ["React", "Web Share / WhatsApp URL", "Tailwind"],
    aiPromptStarter: "Build a lightweight store catalog in React that lets customers pick items and formats a structured WhatsApp order message.",
  },
];

export const VIBE_RULES: VibeRuleItem[] = [
  {
    id: "r1",
    title: "Think Problem First, Code Second",
    description: "Spend time clearly understanding the user and their exact pain before firing up the code editor.",
    tip: "A brilliant solution to the wrong problem gets zero points.",
  },
  {
    id: "r2",
    title: "AI Tools for Coding Assistance",
    description: "Use AI coding tools (Gemini, Copilot, etc.) to accelerate scaffolding, UI components, and logic.",
    tip: "Let AI write the boilerplate so you can focus on core logic and user flow.",
  },
  {
    id: "r3",
    title: "Understand the Code You Submit",
    description: "Every team member should be able to explain the core components, data flow, and architecture.",
    tip: "Judges in CCF Lab will probe how your code works during the demo.",
  },
  {
    id: "r4",
    title: "Do Not Blindly Copy AI Code",
    description: "Review, adapt, test, and integrate generated code with intentional architecture.",
    tip: "Catch edge cases, hallucinations, and unnecessary bloat early.",
  },
  {
    id: "r5",
    title: "Test & Debug Rigorously",
    description: "Validate your prototype with edge case inputs, boundary numbers, and empty states.",
    tip: "A working prototype with 2 features beats a broken prototype with 10 features.",
  },
  {
    id: "r6",
    title: "Use Only Permitted Resources",
    description: "Stick to permitted development environments, open-source libraries, and modern web tools.",
    tip: "Keep dependencies lightweight and fast to boot.",
  },
  {
    id: "r7",
    title: "Practical & Achievable Scope",
    description: "Respect the challenge time window. Cut nice-to-have features ruthlessly in the morning session.",
    tip: "Ship a functional MVP by midday, polish and enhance in the afternoon.",
  },
  {
    id: "r8",
    title: "Meaningful Team Contribution",
    description: "Divide work clearly across Problem Analysis, UI/UX, Dev, AI Prompting, QA, and Pitching.",
    tip: "All 2-4 members should play an active role during development and presentation.",
  },
];

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    id: "c1",
    name: "Problem Understanding",
    focus: "How clearly the problem is identified",
    maxScore: 10,
    weightDescription: "Clarity of target user, core pain point, and why the problem matters.",
    guidingQuestions: [
      "Is the target user sharply defined?",
      "Does the team explain the real root cause of the issue?",
      "Is the problem statement scoped realistically?",
    ],
  },
  {
    id: "c2",
    name: "Innovation",
    focus: "Creativity and uniqueness of the solution",
    maxScore: 10,
    weightDescription: "Novel approach, fresh angle, or smart twist compared to existing manual workflows.",
    guidingQuestions: [
      "Is the solution approach clever or uniquely suited for the user?",
      "Does it avoid being a generic clone?",
    ],
  },
  {
    id: "c3",
    name: "Functionality",
    focus: "How well the prototype works",
    maxScore: 10,
    weightDescription: "Core features execute smoothly without crashes, dead ends, or broken buttons.",
    guidingQuestions: [
      "Does the prototype perform its promised core workflow end-to-end?",
      "Are all interactive elements responsive and functional?",
    ],
  },
  {
    id: "c4",
    name: "UI/UX",
    focus: "Usability and presentation",
    maxScore: 10,
    weightDescription: "Clean layout, clear visual hierarchy, accessible contrast, and intuitive controls.",
    guidingQuestions: [
      "Can a first-time user figure out what to do in 5 seconds?",
      "Is the typography, spacing, and mobile/desktop responsiveness polished?",
    ],
  },
  {
    id: "c5",
    name: "Technical Implementation",
    focus: "Quality of development",
    maxScore: 10,
    weightDescription: "Solid architecture, clean code structure, sensible state management, and error handling.",
    guidingQuestions: [
      "Is the codebase well-structured and maintainable?",
      "Does it handle invalid inputs and edge cases cleanly?",
    ],
  },
  {
    id: "c6",
    name: "AI Utilization",
    focus: "Effective and responsible use of AI",
    maxScore: 10,
    weightDescription: "Smart prompt engineering, rapid velocity, and high developer comprehension.",
    guidingQuestions: [
      "Did the team leverage AI strategically to speed up development?",
      "Can they explain how they guided the AI rather than blind copy-pasting?",
    ],
  },
  {
    id: "c7",
    name: "Teamwork",
    focus: "Collaboration and contribution",
    maxScore: 10,
    weightDescription: "Balanced workload distribution, clear roles, and mutual support across members.",
    guidingQuestions: [
      "Did each member contribute meaningfully to their designated role?",
      "Was collaboration smooth during the build and demo?",
    ],
  },
  {
    id: "c8",
    name: "Presentation",
    focus: "Quality of final demonstration",
    maxScore: 10,
    weightDescription: "Engaging 5-point pitch, strict adherence to time, clear live prototype walkthrough.",
    guidingQuestions: [
      "Did the team cover Problem, Solution, Demo, Tech/AI, and Impact concisely?",
      "Was the live demonstration crisp, confident, and persuasive?",
    ],
  },
  {
    id: "c9",
    name: "Real-World Impact",
    focus: "Practical usefulness of the solution",
    maxScore: 10,
    weightDescription: "Genuine potential to solve real problems for students, colleges, or communities.",
    guidingQuestions: [
      "Would target users actually use this tool tomorrow?",
      "Does it create tangible value or time savings?",
    ],
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  // Morning Session
  {
    id: "m1",
    phase: "morning_plan",
    title: "1. Understand the Assigned Problem",
    description: "Discuss within your team (2-4 members) to pinpoint the exact problem scope and target user persona.",
    completed: false,
  },
  {
    id: "m2",
    phase: "morning_plan",
    title: "2. Identify Target Users & Core Pain",
    description: "Write down 1 crisp sentence explaining who suffers from this and why existing tools fail.",
    completed: false,
  },
  {
    id: "m3",
    phase: "morning_plan",
    title: "3. Scope MVP Features (Golden Rule)",
    description: "List max 3 core features. Cut all complex auth, multi-level databases, and unneeded screens.",
    completed: false,
  },
  {
    id: "m4",
    phase: "morning_mvp",
    title: "4. Scaffolding & AI-Assisted UI Setup",
    description: "Generate the core layout, navigation, and mock state using modern AI coding prompts.",
    completed: false,
  },
  {
    id: "m5",
    phase: "morning_mvp",
    title: "5. Implement Core Working Workflow",
    description: "Make the central interactive action work smoothly with sample data before the lunch break.",
    completed: false,
  },

  // Afternoon Session
  {
    id: "a1",
    phase: "afternoon_enhance",
    title: "6. Feature Enhancement & UI Polish",
    description: "Refine typography, spacing, micro-interactions, badges, and empty/loading states.",
    completed: false,
  },
  {
    id: "a2",
    phase: "afternoon_enhance",
    title: "7. Edge Case Testing & Debugging",
    description: "Test with unexpected inputs, long strings, zero values, and mobile viewport sizes.",
    completed: false,
  },
  {
    id: "a3",
    phase: "afternoon_demo",
    title: "8. Prepare 5-Point Demo Pitch",
    description: "Rehearse: 1) Problem (30s), 2) Solution (30s), 3) Live Demo (60s), 4) Tech/AI Tools (30s), 5) Real-World Impact (30s).",
    completed: false,
  },
  {
    id: "a4",
    phase: "afternoon_demo",
    title: "9. Final Submission Verification",
    description: "Ensure repo link, working demo, project summary, and AI tool explanation are ready for CCF Lab judges.",
    completed: false,
  },
];

export const SCHEDULE_TIMELINE = [
  {
    time: "09:00 AM – 09:30 AM",
    title: "Reporting & Setup",
    phase: "Morning",
    desc: "Arrival at CCF Lab, workspace allocation, tool check, and problem announcement.",
    badge: "Check-in",
  },
  {
    time: "09:30 AM – 11:00 AM",
    title: "Task 1: Understand & Plan",
    phase: "Morning",
    desc: "Problem analysis, target user empathy, MVP feature pruning, and architecture planning.",
    badge: "Planning",
  },
  {
    time: "11:00 AM – 01:00 PM",
    title: "Task 2: Build the MVP",
    phase: "Morning",
    desc: "Rapid development with AI coding tools. Focus on the core working prototype.",
    badge: "Core Build",
  },
  {
    time: "01:00 PM – 02:00 PM",
    title: "Lunch & Prototype Review",
    phase: "Break",
    desc: "Internal team review, scope sanity check, and recharge.",
    badge: "Milestone",
  },
  {
    time: "02:00 PM – 03:30 PM",
    title: "Task 3: Feature Enhancement & Testing",
    phase: "Afternoon",
    desc: "Fix bugs, polish UI/UX, test sample inputs, and harden the application flow.",
    badge: "Polish",
  },
  {
    time: "03:30 PM – 04:30 PM",
    title: "Task 4: Submission & Final Demo",
    phase: "Afternoon",
    desc: "5-point demonstration to faculty and judges in CCF Lab. Evaluation & awards.",
    badge: "Final Pitch",
  },
];
