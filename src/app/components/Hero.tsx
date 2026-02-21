import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import mePhoto from "../../assets/me1.jpeg";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function useTypewriter(text: string, start: boolean, speedMs = 70) {
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!start) return;
    let i = 0;

    const id = window.setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speedMs);

    return () => window.clearInterval(id);
  }, [text, start, speedMs]);

  return out;
}


function useScrambleText(finalText: string, start: boolean, speedMs = 26) {
  const [text, setText] = useState(finalText);

  useEffect(() => {
    if (!start) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*";
    let revealed = 0;
    let frame = 0;

    const id = window.setInterval(() => {
      frame++;
      if (frame % 2 === 0 && revealed < finalText.length) revealed++;

      const out = finalText
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "-" || ch === "." || ch === "&") return ch;
          if (i < revealed) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setText(out);

      if (revealed >= finalText.length) {
        setText(finalText);
        window.clearInterval(id);
      }
    }, speedMs);

    return () => window.clearInterval(id);
  }, [finalText, start, speedMs]);

  return text;
}

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const [startIntro, setStartIntro] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setStartIntro(true), 250);
    return () => window.clearTimeout(t);
  }, []);

  const nameText = useScrambleText("Hi! I'm Rujul", startIntro, 55);
  const titleText = useTypewriter("Software Developer", startIntro, 65);


  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setPointer({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToNext = () => {
    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
  };

  const layers = useMemo(
    () => [
      { id: "stars", depth: 10, opacity: 0.55 },
      { id: "blobA", depth: 24, opacity: 0.85 },
      { id: "blobB", depth: 34, opacity: 0.75 },
      { id: "ringA", depth: 44, opacity: 0.55 },
      { id: "ringB", depth: 54, opacity: 0.5 },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen relative flex items-center justify-center px-6 py-24"
    >
      {/* Base blue glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.35),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(37,99,235,0.28),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(96,165,250,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Parallax layers */}
      <div className="pointer-events-none absolute inset-0">
        {layers.map((l) => {
          const tx = pointer.x * l.depth;
          const ty = pointer.y * l.depth;
          return (
            <div
              key={l.id}
              className="absolute inset-0 will-change-transform"
              style={{
                opacity: l.opacity,
                transform: `translate3d(${tx}px, ${ty}px, 0)`,
              }}
            >
              {l.id === "stars" && <Stars />}
              {l.id === "blobA" && <Blob className="left-[-160px] top-[-160px]" />}
              {l.id === "blobB" && <Blob className="right-[-220px] top-[40px]" flip />}
              {l.id === "ringA" && <Ring className="left-[18%] top-[70%]" />}
              {l.id === "ringB" && <Ring className="left-[78%] top-[58%]" />}
            </div>
          );
        })}
      </div>

      {/* Foreground card */}
      <motion.div style={{ opacity, scale }} className="relative z-10 w-full max-w-5xl">
        {/* Glow behind the card */}
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-indigo-500/20 blur-3xl" />

        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-[0_0_90px_rgba(59,130,246,0.18)] px-8 py-12 md:px-12 md:py-14 overflow-hidden">
          {/* Animated shine blobs */}
          <motion.div
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/12 blur-3xl"
            animate={{ x: [0, 90, 0], y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-44 -right-44 h-[28rem] w-[28rem] rounded-full bg-cyan-400/12 blur-3xl"
            animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* One-time glow sweep */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: "260%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.15, delay: 0.25, ease: "easeInOut" }}
          />

          <div className="text-center relative">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="mb-7"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative mx-auto h-28 w-28 md:h-40 md:w-40 rounded-full overflow-hidden"
              >
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500/45 via-cyan-300/30 to-indigo-500/45 blur-2xl" />
                <img
                  src={mePhoto}
                  alt="Profile"
                  className="relative h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-full ring-2 ring-white/10" />
              </motion.div>
            </motion.div>

            {/* Matrix reveal title */}
            <motion.h1 className="text-5xl md:text-7xl font-semibold leading-tight">
              <span className="bg-gradient-to-r from-blue-200 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                {nameText}
              </span>
              <motion.span
                className="text-blue-300"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h1>

            {/* Matrix reveal subtitle */}
            <motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.9, duration: 0.5 }}
  className="mt-3 text-xl md:text-2xl text-white/90 font-medium min-h-[2rem]"
>
  {titleText}
  {titleText.length < "Software Developer".length && (
    <motion.span
      className="text-white/70"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >
      |
    </motion.span>
  )}
</motion.p>


            {/* Description */}
            <p className="mt-6 text-base md:text-lg text-slate-200/80 max-w-2xl mx-auto leading-relaxed">
              Master's student specializing in backend development, data engineering, and distributed systems.
              Passionate about building scalable solutions and optimizing performance.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/RujulKhatavkar" },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/rujul-khatavkar-b19253206/",
                },
                { icon: Mail, label: "Contact", href: "mailto:rujul@example.com" },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label !== "Contact" ? "_blank" : undefined}
                  rel={item.label !== "Contact" ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90 group-hover:opacity-100 transition" />
                  <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/40 to-cyan-400/30 blur-md opacity-0 group-hover:opacity-100 transition" />
                  <span className="relative flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="mt-14 text-center">
              <motion.button
                onClick={scrollToNext}
                whileHover={{ y: 4 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-sm tracking-wide">Explore My Journey</span>
                <ChevronDown className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stars() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0 1px, transparent 2px),
          radial-gradient(circle at 70% 20%, rgba(255,255,255,0.18) 0 1px, transparent 2px),
          radial-gradient(circle at 40% 80%, rgba(255,255,255,0.18) 0 1px, transparent 2px),
          radial-gradient(circle at 85% 70%, rgba(255,255,255,0.22) 0 1px, transparent 2px),
          radial-gradient(circle at 10% 75%, rgba(255,255,255,0.14) 0 1px, transparent 2px),
          radial-gradient(circle at 92% 40%, rgba(255,255,255,0.14) 0 1px, transparent 2px)
        `,
        filter: "blur(0.2px)",
      }}
    />
  );
}

function Blob({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <div
      className={`absolute ${className} h-[420px] w-[420px] md:h-[560px] md:w-[560px] rounded-full blur-3xl`}
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        background:
          "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.55), transparent 60%), radial-gradient(circle at 70% 60%, rgba(37,99,235,0.45), transparent 55%)",
      }}
    />
  );
}

function Ring({ className }: { className: string }) {
  return (
    <div
      className={`absolute ${className} h-[360px] w-[360px] md:h-[460px] md:w-[460px] rounded-full`}
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 0 140px rgba(59,130,246,0.12)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
