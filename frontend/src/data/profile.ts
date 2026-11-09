// Every piece of content on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Aathishwar V",
  fullName: "Aathishwar Varatharaj",
  role: "AI & Security Engineer",
  location: "Coimbatore, India",
  email: "aathishwar885@gmail.com",
  intro:
    "I deploy LLMs on private infrastructure, build AI agents that chat, call and send email for real businesses, and lock them down before they ship.",
  current: "Technology & Security Lead · since Oct 2026",
  education: "B.E. CSE (AI & ML) · KPRIET ’26",
  cvUrl: "https://drive.google.com/file/d/1MDcMfuPs8ZP1BzYDEqxekt4Av3q9Hk7T/view?usp=drive_link",
  links: {
    linkedin: "https://www.linkedin.com/in/aathishwar-v/",
    github: "https://github.com/Aathishwar",
  },
} as const;

export type Capability = { tag: string; title: string; body: string };

export const capabilities: Capability[] = [
  {
    tag: "llm infra",
    title: "Models on our own metal",
    body: "vLLM, SGLang, llama.cpp and Ollama, tuned and benchmarked for latency and throughput on CPU and GPU.",
  },
  {
    tag: "agents",
    title: "Chat, voice and email agents",
    body: "LangGraph backends, RAG, MCP tools, WhatsApp and phone channels, and n8n automation wired into real business systems.",
  },
  {
    tag: "security",
    title: "Shipped, then locked down",
    body: "Tenant isolation, rate limits and abuse caps, server hardening, CI test gates and GDPR-aware data handling.",
  },
];

export type Role = {
  title: string;
  org: string;
  period: string;
  place?: string;
  current?: boolean;
  points: string[];
  skills: string[];
};

export const experience: Role[] = [
  {
    title: "Technology & Security Lead",
    org: "IT services & AI solutions firm",
    period: "Oct 2026 — Present",
    place: "Coimbatore",
    current: true,
    points: [
      "Own security across the company’s AI products: tenant isolation, origin allow-lists, and per-IP and per-tenant rate limits on public chat widgets.",
      "Build multi-tenant chat, WhatsApp, email and voice agents on LangGraph and FastAPI for businesses in Europe and India.",
      "Set up CI gates with network-guarded test suites so untested changes cannot reach production.",
      "Design GDPR- and EU AI Act–aware handling for automated email and customer data, plus data pipelines that let teams query live sales data from AI assistants.",
    ],
    skills: ["LangGraph", "FastAPI", "MCP", "n8n", "GitHub Actions", "Linux", "Cloudflare"],
  },
  {
    title: "AIML Engineer Intern",
    org: "Coventus",
    period: "Oct 2025 — Sep 2026",
    place: "Coimbatore",
    points: [
      "Deployed and served LLMs on local infrastructure with vLLM, SGLang, llama.cpp and Ollama.",
      "Benchmarked inference engines for latency and throughput, and tuned resource use on CPU and GPU.",
      "Built LLM pipelines, model-serving endpoints and an agentic browser-automation stack (LangGraph, Playwright MCP, local Qwen 3.5 122B).",
      "Prompt engineering and response tuning for task-specific use cases.",
    ],
    skills: ["vLLM", "SGLang", "llama.cpp", "Ollama", "LangGraph", "Playwright"],
  },
  {
    title: "Software Developer Intern",
    org: "Coventus",
    period: "Aug 2025 — Oct 2025",
    place: "Coimbatore",
    points: ["Browser automation and robotic process automation with Selenium WebDriver."],
    skills: ["Selenium", "RPA", "Python"],
  },
  {
    title: "Full Stack Development Intern",
    org: "Coding Raja Technologies",
    period: "May 2024 — Jun 2024",
    points: ["Built complete web applications, including a blogging platform, with JavaScript, Node.js and Python back ends."],
    skills: ["JavaScript", "Node.js", "Python", "Firebase"],
  },
  {
    title: "Web Development Intern",
    org: "Litz Tech India",
    period: "Jan 2024 — Feb 2024",
    points: ["Responsive pages in HTML, CSS and JavaScript, working in a Git-based team workflow."],
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

export const projectFilters = ["All", "AI & Agents", "Automation", "Web & mobile"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  title: string;
  summary: string;
  year: string;
  tags: string[];
  groups: Exclude<ProjectFilter, "All">[];
  status: "live" | "private" | "open source";
  live?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    title: "Agent Tunnel",
    summary:
      "An MCP relay that lets Claude Code agents in different projects and on different machines work together. Pair once with a code, then connect by name; run many sessions per agent over LAN, servers or the internet, with exactly-once delivery, file transfer and full transcripts.",
    year: "2026",
    tags: ["Python", "FastMCP", "MCP", "Cloudflare Tunnel"],
    groups: ["AI & Agents"],
    status: "private",
  },
  {
    title: "KPRIET Campus Assistant",
    summary:
      "Final-year project. A campus chatbot that mixes FAQ matching with vector retrieval, streams answers, reads images and documents, and pulls live events through a Cloudflare Worker.",
    year: "2026",
    tags: ["FastAPI", "ChromaDB", "BGE-M3", "React 19", "Firebase"],
    groups: ["AI & Agents", "Web & mobile"],
    status: "live",
    live: "https://kpriet-chatbot.aathi.online/",
  },
  {
    title: "Spendo",
    summary:
      "An offline-first expense tracker: an installable PWA plus a native Android app. Log a spend in two taps or say “200 auto, 150 lunch” to add several at once; both sync to the same Postgres ledger.",
    year: "2026",
    tags: ["PWA", "React Native (Expo)", "Android APK", "PostgreSQL", "GitHub Actions"],
    groups: ["Web & mobile"],
    status: "live",
    live: "https://spendo.aathi.online",
  },
  {
    title: "Local web-automation agent",
    summary:
      "An agent that browses and acts on websites on its own, running fully on local hardware: LangGraph for control flow, Playwright through MCP for the browser, and Qwen 3.5 122B served by vLLM.",
    year: "2026",
    tags: ["LangGraph", "Playwright MCP", "vLLM", "Qwen"],
    groups: ["AI & Agents", "Automation"],
    status: "private",
  },
  {
    title: "Smart media downloader bot",
    summary:
      "A Telegram bot built entirely in n8n. It detects video or image posts, offers quality menus, fixes Instagram audio with ffmpeg, and serves repeat requests instantly from a Cloudflare R2 cache.",
    year: "2026",
    tags: ["n8n", "yt-dlp", "ffmpeg", "Cloudflare R2"],
    groups: ["Automation"],
    status: "private",
  },
  {
    title: "TaskFlow",
    summary:
      "A real-time, multi-user task manager built for the Katomaran Hackathon 2025: Firebase sign-in, live sync over Socket.io, task sharing by email and due-date reminders.",
    year: "2025",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    groups: ["Web & mobile"],
    status: "live",
    live: "https://task-flow-frontend-azure.vercel.app/",
    code: "https://github.com/Aathishwar/TaskFlow",
  },
];

export type ArchiveItem = { title: string; year: string; stack: string; code?: string };

export const archive: ArchiveItem[] = [
  { title: "Expense tracker Telegram bot", year: "2026", stack: "n8n · Google Sheets · Calendar" },
  { title: "AI image enhancer (Real-ESRGAN)", year: "2025", stack: "Python · OpenVINO · React", code: "https://github.com/Aathishwar/Image_Enhancer" },
  { title: "URL video downloader GUI", year: "2025", stack: "Python · yt-dlp · ttkbootstrap", code: "https://github.com/Aathishwar/Url_Downloader" },
  { title: "Luggage detection with YOLO", year: "2025", stack: "Python · YOLO · OpenCV", code: "https://github.com/Aathishwar/Luggage_Detector" },
  { title: "Encrypted multi-client TCP chat room", year: "2025", stack: "C · sockets · Linux", code: "https://github.com/Aathishwar/C_Projects/tree/main/Tcp_Chatroom" },
  { title: "Car price prediction", year: "2025", stack: "scikit-learn · XGBoost", code: "https://github.com/Aathishwar/Car_Price_Prediction" },
  { title: "Blogging platform", year: "2024", stack: "Node.js · Firebase", code: "https://github.com/Aathishwar/Internship/tree/main/Blogging_Website" },
];

export type StackGroup = { key: string; label: string; items: string[] };

export const stack: StackGroup[] = [
  {
    key: "ai",
    label: "AI & LLMs",
    items: ["vLLM", "SGLang", "llama.cpp", "Ollama", "LangGraph", "RAG", "MCP", "Prompt engineering", "Computer vision (YOLO, OpenCV)", "scikit-learn"],
  },
  {
    key: "security",
    label: "Security",
    items: [
      "Linux hardening",
      "Networking (CCNA)",
      "Rate limiting & abuse controls",
      "Tenant isolation",
      "CSP & security headers",
      "Pen-testing basics (Hack The Box)",
      "GDPR-aware data handling",
    ],
  },
  {
    key: "backend",
    label: "Backend & automation",
    items: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "WebSockets", "n8n", "Playwright", "Selenium"],
  },
  {
    key: "data",
    label: "Databases",
    items: ["SQL", "PostgreSQL", "MongoDB", "Firebase / Firestore", "ChromaDB (vector)", "Cloudflare R2"],
  },
  {
    key: "devops",
    label: "DevOps & CI/CD",
    items: ["GitHub Actions", "CI test gates", "Docker", "Linux servers", "Cloudflare Workers & Pages", "Git"],
  },
  {
    key: "web",
    label: "Web & mobile",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "PWA (offline-first)", "React Native (Expo)", "Android APK builds"],
  },
];

export type Cert = { title: string; issuer: string; date: string };

export const certifications: Cert[] = [
  { title: "Claude Code in Action", issuer: "Anthropic", date: "Mar 2026" },
  { title: "CCNA: Enterprise Networking, Security, and Automation", issuer: "Cisco", date: "Jun 2025" },
  { title: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco", date: "May 2025" },
  { title: "CCNA: Introduction to Networks", issuer: "Cisco", date: "May 2025" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco", date: "May 2025" },
  { title: "Linux Fundamentals", issuer: "Hack The Box Academy", date: "2025" },
  { title: "GitHub Foundations", issuer: "GitHub", date: "May 2025" },
  { title: "Python Essentials 1 & 2", issuer: "Cisco", date: "May 2025" },
  { title: "Responsible & Safe AI Systems", issuer: "NPTEL", date: "2024" },
  { title: "Machine Learning Introduction for Everyone", issuer: "IBM", date: "Jul 2023" },
];

export const educationEntry = {
  degree: "B.E. Computer Science and Engineering (AI & ML)",
  school: "KPR Institute of Engineering and Technology",
  period: "2022 — 2026",
  grade: "CGPA 8.12",
};

export const highlights = [
  "Katomaran Hackathon 2025 — built TaskFlow",
  "Smart India Hackathon — solar improvement software, MediBot",
];
