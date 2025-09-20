import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Shield, Brain, Globe } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Code,
      title: "Programming Skills",
      description: "Proficient in Java, Python, C."
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Passionate about ethical hacking and network security"
    },
    {
      icon: Brain,
      title: "AI/ML Enthusiast",
      description: "Specializing in Artificial Intelligence and Machine Learning"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "Modern web development with responsive design using React and Next.js, HTML/CSS, JavaScript, and Databases."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hello! I'm <span className="text-primary font-semibold">Aathishwar V</span>, 
              currently a Final-year college student pursuing CSE(AIML) at KPRIET. 
              From a young age, I've been captivated by the world of hacking and cybersecurity.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              My passion for coding has driven me to explore various programming languages 
              and technologies. I'm particularly interested in artificial intelligence, 
              machine learning, and their applications in solving real-world problems.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With a strong foundation in multiple programming languages and a growing 
              portfolio of projects, I'm constantly learning and pushing the boundaries 
              of what's possible in technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
