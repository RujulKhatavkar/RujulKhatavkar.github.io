import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";
import kohlerLogo from "../../assets/kohler.png";
import omiLogo from "../../assets/OMI.png";
import veritasLogo from "../../assets/Veritas_Logo.png";
import aioneersLogo from "../../assets/aioneers.png";

const experiences = [
  {
    company: "Kohler Co.",
    role: "Software / Data Engineering Intern",
    location: "Champaign, IL",
    date: "May 2025 - Present",
    color: "from-blue-500 to-blue-700",
    logo: kohlerLogo,
  },
  {
    company: "Office of Medicaid Innovation",
    role: "Graduate Assistant (Python/Backend)",
    location: "Champaign, IL",
    date: "Aug 2024 - Apr 2025",
    color: "from-blue-400 to-blue-600",
    logo: omiLogo,
  },
  {
    company: "VERITAS (Sponsored Project)",
    role: "Data Engineer (Student Volunteer)",
    location: "Champaign, IL",
    date: "Jan 2024 - May 2024",
    color: "from-blue-600 to-blue-800",
    logo: veritasLogo,
  },
  {
    company: "Aioneers Technologies",
    role: "Software Engineer Intern",
    location: "Pune, India",
    date: "Aug 2023 - Dec 2023",
    color: "from-blue-500 to-blue-700",
    logo: aioneersLogo,
  },
];


export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: 'absolute',
          top: '5rem',
          right: '2.5rem',
          width: '16rem',
          height: '16rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(96px)',
        }}
      />

      <div ref={containerRef} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl mb-12 text-center text-white"
            whileInView={{ scale: [0.9, 1.05, 1] }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>

          <div className="relative">
            {/* Animated timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-zinc-800 hidden md:block overflow-hidden rounded-full">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
              />
            </div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                  className="relative"
                >
                  {/* Animated timeline dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.5 }}
                    className={`absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br ${exp.color} border-4 border-black shadow-lg hidden md:block z-10`}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '9999px',
                        background: 'linear-gradient(to bottom right, rgb(59, 130, 246), rgb(29, 78, 216))',
                      }}
                    />
                  </motion.div>

                  <motion.div 
                    className="md:ml-20 bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Gradient overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
  whileHover={{ rotate: 360, scale: 1.08 }}
  transition={{ duration: 0.6 }}
  className="p-3 bg-zinc-950/40 rounded-lg shrink-0 shadow-lg border border-white/10"
>
  <img
    src={exp.logo}
    alt={`${exp.company} logo`}
    className="w-20 h-20 object-contain"
    draggable={false}
  />
</motion.div>


                      <div className="flex-1">
                        <motion.h3 
                          className="text-2xl text-white mb-1 group-hover:text-blue-400 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {exp.company}
                        </motion.h3>
                        <p className="text-lg text-slate-300 mb-3">{exp.role}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span>{exp.date}</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>{exp.location}</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}