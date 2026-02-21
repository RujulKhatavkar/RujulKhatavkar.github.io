import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 bg-transparent text-white relative overflow-hidden border-t border-zinc-800">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '24rem',
          height: '24rem',
          background: 'rgb(59, 130, 246)',
          borderRadius: '9999px',
          filter: 'blur(96px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '24rem',
          height: '24rem',
          background: 'rgb(37, 99, 235)',
          borderRadius: '9999px',
          filter: 'blur(96px)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
        >
          <div className="text-center md:text-left">
            <motion.h3 
              className="text-2xl mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Rujul
            </motion.h3>
            <p className="text-slate-400">Software Developer</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/rujul", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/rujul", label: "LinkedIn" },
              { icon: Mail, href: "mailto:rujul@example.com", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.icon !== Mail ? "_blank" : undefined}
                rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:border-blue-500 transition-all duration-300 shadow-lg"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.p 
            className="text-slate-400 text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} Rujul. Made with{" "}
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
            </motion.span>
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            <span className="text-sm">Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}