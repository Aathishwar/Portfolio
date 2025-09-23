import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ClickSpark from "@/components/ui/ClickSpark";
import { useSparkColor } from "@/hooks/use-spark-color";
import { SplitText } from "@/components/ui/SplitText";
import { TextType } from "@/components/ui/TextType";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const sparkColor = useSparkColor();
  
  const socialLinks = [
    { icon: "bxl-linkedin", href: "https://www.linkedin.com/in/aathishwar-v/", label: "LinkedIn" },
    { icon: "bxl-instagram", href: "https://instagram.com/aathi._.13?igshid=NzZlODBkYWE4Ng==", label: "Instagram" },
    { icon: "bxl-github", href: "https://github.com/Aathishwar", label: "GitHub" },
    { icon: "bxl-whatsapp", href: "http://Wa.me/+918072222395", label: "WhatsApp" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-2xl font-semibold"
            >
              <SplitText 
                text="Hi, I'm" 
                delay={0.5}
                duration={0.8}
                stagger={0.08}
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              {/* Simple fade-in for the stylized name layout */}
              <span className="block">AATHISHWAR </span>
              <span className="block text-primary ml-6">VARATHARAJ</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-xl text-muted-foreground max-w-lg"
            >
              <TextType
                text="Undergraduate student specializing in Artificial Intelligence and Machine Learning, with practical experience in Docker, Databases, and Linux. Currently expanding expertise in Cybersecurity while pursuing a B.E. in Computer Science and Engineering (AIML) at KPRIET."
                delay={2.5}
                typeSpeed={0.03}
                showCursor={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 8.0 }}
              className="flex flex-row gap-4 items-center"
            >
              <ClickSpark
                sparkColor={sparkColor}
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
                extraScale={1}
              >
                <Button onClick={onContactClick} size="lg" className="cursor-pointer">
                  Get In Touch
                </Button>
              </ClickSpark>
              
              <ClickSpark
                sparkColor={sparkColor}
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
                extraScale={1}
              >
                <Button variant="outline" size="lg" className="cursor-pointer" asChild>
                  <a 
                    href="https://drive.google.com/file/d/1MDcMfuPs8ZP1BzYDEqxekt4Av3q9Hk7T/view?usp=drive_link" 
                    download="Aathishwar_V_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </ClickSpark>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8.5 }}
              className="flex gap-4 pt-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-icon p-3 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  aria-label={social.label}
                >
                  <i className={`bx ${social.icon} text-xl`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <img
                  src="./photo1.jpg"
                  alt="Aathishwar Varatharaj"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}