import { motion } from "framer-motion";
import { BrainCircuit, BarChart3, Code2, ExternalLink, Github } from "lucide-react";

const GH = "https://github.com/RujulKhatavkar";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  repoUrl: string;
  // optional live link if you ever add it
  demoUrl?: string;
  
};

const dataScience: Project[] = [
  {
    title: "Credit-Risk-Analysis",
    desc: "Credit risk modeling workflow with exploration, feature work, and evaluation in notebooks.",
    tech: ["ML", "Risk", "Jupyter"],
    repoUrl: `${GH}/Credit-Risk-Analysis`,
    
  },
  {
    title: "MediScanAI",
    desc: "AI-assisted medicine scanning concept with OCR/LLM-style structured outputs.",
    tech: ["OCR", "LLM", "Python"],
    repoUrl: `${GH}/MediScanAI`,
    
  },
  {
    title: "Stock_prediction",
    desc: "Time-series stock prediction experiments with baseline models and evaluation.",
    tech: ["Time Series", "Modeling", "Python"],
    repoUrl: `${GH}/Stock_prediction`,
    
  },
  {
    title: "speech-to-text-Analysis",
    desc: "Speech-to-text pipeline + sentiment/analysis experiments and notebooks.",
    tech: ["ASR", "NLP", "Python"],
    repoUrl: `${GH}/speech-to-text-Analysis`,
    demoUrl: `https://rujulkhatavkar.github.io/speech-to-text-Analysis/`
  },
  {
    title: "healthcare-chatbot-billing-insurance",
    desc: "Healthcare chatbot focused on billing & insurance Q/A flows and automation.",
    tech: ["Chatbot", "NLP", "Python"],
    repoUrl: `${GH}/healthcare-chatbot-billing-insurance`,
  },
];

const dataAnalytics: Project[] = [
  {
    title: "HR-Analytics-Dashboard",
    desc: "HR analytics dashboard project for workforce insights and reporting.",
    tech: ["Analytics", "Dashboard", "BI"],
    repoUrl: `${GH}/HR-Analytics-Dashboard`,
    demoUrl: `https://app.powerbi.com/groups/me/reports/bd762496-07de-499e-a8dd-891c85ecc0fd/ReportSection928634d4d829a814e126?experience=power-bi`
  },
  {
    title: "Sales-Analysis-Insights-for-Strategic-Business-Decisions",
    desc: "Sales insights analysis for strategic decisions using KPI and trend breakdowns.",
    tech: ["KPIs", "Insights", "Analysis"],
    repoUrl: `${GH}/Sales-Analysis-Insights-for-Strategic-Business-Decisions`,
    demoUrl: `https://app.powerbi.com/groups/me/reports/eacbb10a-eb51-498f-af66-977e46697276/e449fb8b970237ab673d?experience=power-bi`
  },
  {
    title: "Statistical-Analysis-of-Telemarketing-Campaign",
    desc: "Statistical evaluation of a telemarketing campaign with hypothesis-style analysis.",
    tech: ["Statistics", "R", "Inference"],
    repoUrl: `${GH}/Statistical-Analysis-of-Telemarketing-Campaign`,
    demoUrl: `${GH}/Statistical-Analysis-of-Telemarketing-Campaign`
  },
];

const software: Project[] = [
  {
    title: "cluedogame",
    desc: "Interactive Clue-do style game project with a modern TypeScript codebase.",
    tech: ["TypeScript", "Web", "UI"],
    repoUrl: `${GH}/cluedogame`,
        demoUrl: `https://cluedogame.onrender.com/`
  },
  {
    title: "PetConnect-App",
    desc: "Full-stack pet adoption/care app with authentication and feature-rich flows.",
    tech: ["React", "Node", "Full-stack"],
    repoUrl: `${GH}/PetConnect-App`,
    demoUrl: `https://petconnect-app-1.onrender.com/`
  },
  {
    title: "StickyNotes",
    desc: "Sticky notes web app for quick capture, edits, and lightweight organization.",
    tech: ["JavaScript", "CRUD", "UI"],
    repoUrl: `${GH}/StickyNotes`,
    demoUrl: `https://stickynotes-3y3w.onrender.com/`
  }
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.04 }}
      className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{p.desc}</p>
        </div>

       {p.demoUrl ? (
  <a
    href={p.demoUrl}
    target="_blank"
    rel="noreferrer"
    className="group/icon grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 hover:bg-white/10 transition"
    aria-label={`Open demo for ${p.title}`}
    title="Open demo"
  >
    <ExternalLink className="h-4 w-4 text-white/70 group-hover/icon:text-white/95 transition" />
  </a>
) : (
  <div className="h-10 w-10 shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0" />
)}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
        >
          <Github className="h-4 w-4" />
          GitHub
          <ExternalLink className="h-4 w-4" />
        </a>

        {p.liveUrl ? (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 transition"
          >
            Live <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

function CategorySection({
  title,
  subtitle,
  icon,
  items,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: Project[];
}) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-white/60">{subtitle}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, idx) => (
          <ProjectCard key={p.repoUrl} p={p} index={idx} />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 px-6 overflow-hidden">
        
  <div className="pointer-events-none absolute inset-0 -z-10 bg-black/45" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">
            Selected repos grouped by focus area — each with a quick summary and stack tags.
          </p>
        </div>

        <CategorySection
          title="Data Science"
          subtitle="ML, time series, NLP, applied AI"
          icon={<BrainCircuit className="w-7 h-7 text-blue-400" />}
          items={dataScience}
        />

        <CategorySection
          title="Data Analytics"
          subtitle="Dashboards, statistical analysis, business insights"
          icon={<BarChart3 className="w-7 h-7 text-blue-400" />}
          items={dataAnalytics}
        />

        <CategorySection
          title="Software"
          subtitle="Apps, web projects, and portfolio engineering"
          icon={<Code2 className="w-7 h-7 text-blue-400" />}
          items={software}
        />
      </div>
     
    </section>
  );
}