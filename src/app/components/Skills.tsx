import { motion } from "motion/react";
import { Code2, Database, Cloud, Wrench, Sparkles } from "lucide-react";
import { useState } from "react";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: Code2,
    skills: ["Python", "Node.js", "FastAPI", "JavaScript", "TypeScript", "R"],
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "SQL", "NoSQL"],
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["Docker", "GitHub Actions", "CI/CD", "REST APIs", "Microservices"],
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "Tools & Methodologies",
    icon: Wrench,
    skills: ["Agile", "Git", "Unit Testing", "Integration Testing", "Lean-Sigma"],
    color: "from-blue-500 to-blue-700",
  },
];

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-6 bg-transparent relative overflow-hidden">
      {/* Animated background particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            position: 'absolute',
            width: '0.5rem',
            height: '0.5rem',
            background: 'rgb(59, 130, 246)',
            borderRadius: '9999px',
            filter: 'blur(2px)',
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl mb-12 text-center text-white flex items-center justify-center gap-3"
            whileInView={{ scale: [0.9, 1.05, 1] }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-blue-400" />
            Technical Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateZ: 1,
                  }}
                  className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-2 bg-gradient-to-br ${category.color} rounded-lg shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="text-xl text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -5,
                          backgroundColor: "rgb(24, 24, 27)",
                          boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredSkill(skill)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        className={`px-3 py-1.5 bg-zinc-800 text-slate-300 rounded-lg text-sm border border-zinc-700 cursor-pointer transition-all relative ${
                          hoveredSkill === skill ? 'ring-2 ring-blue-500 text-white' : ''
                        }`}
                      >
                        {skill}
                        {hoveredSkill === skill && (
                          <motion.div
                            layoutId="skillHighlight"
                            className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-10 rounded-lg`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Floating skill badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg"
            >

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}