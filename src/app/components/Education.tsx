import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";

const education = [
  {
    school: "University of Illinois Urbana-Champaign",
    degree: "Master of Science, Information Management",
    location: "Champaign, IL",
    date: "May 2026",
    coursework: "Software Engineering, Distributed Systems, Data Structures, Algorithms",
  },
  {
    school: "MIT World Peace University",
    degree: "Bachelor of Technology, Computer Science",
    location: "Pune, India",
    date: "May 2024",
    coursework: null,
  },
];

export function Education() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section id="education" className="py-20 px-6 bg-transparent relative overflow-hidden">
      {/* Decorative background */}
      <motion.div
        style={{ scale }}
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30 -z-0"
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
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
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shrink-0 shadow-lg"
                  >
                    <GraduationCap className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {edu.school}
                    </h3>
                    <motion.p 
                      className="text-lg text-slate-300 mb-4 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Award className="w-4 h-4 text-blue-400" />
                      {edu.degree}
                    </motion.p>

                    <div className="flex flex-wrap gap-4 text-slate-400 mb-3">
                      <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{edu.location}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{edu.date}</span>
                      </motion.div>
                    </div>

                    {edu.coursework && (
                      <motion.div 
                        className="mt-4 pt-4 border-t border-zinc-800"
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-sm text-slate-400">
                          <span className="text-white">Coursework:</span> {edu.coursework}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
