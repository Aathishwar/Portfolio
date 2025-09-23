import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";
import ClickSpark from "@/components/ui/ClickSpark";
import { useSparkColor } from "@/hooks/use-spark-color";

export default function Certifications() {
  const sparkColor = useSparkColor();
  
  const certifications = [
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      year: "2025",
      description: "Foundational concepts of networking including network architecture, protocols, models, IP addressing, Ethernet, and basic network configuration and troubleshooting.",
      category: "Networking"
    },
    {
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco",
      year: "2025",
      description: "Switching technologies, VLANs, inter-VLAN routing, static and dynamic routing protocols, wireless LANs, and security concepts.",
      category: "Networking"
    },
    {
      title: "CCNA: Enterprise Networking, Security, and Automation",
      issuer: "Cisco",
      year: "2025",
      description: "Advanced networking topics such as OSPF, access control lists (ACLs), WAN technologies, network security, virtualization, and automation.",
      category: "Security"
    },
    {
      title: "GitHub Foundations Certification",
      issuer: "GitHub",
      year: "2023",
      description: "Version control using Git and GitHub, including repository creation, commits, branches, pull requests, and collaboration workflows.",
      category: "Development"
    },
    {
      title: "Web Development with HTML, CSS and JavaScript",
      issuer: "Coursera",
      year: "2023",
      description: "Comprehensive web development fundamentals and responsive design techniques.",
      category: "Web Development"
    },
    {
      title: "Introduction to Artificial Intelligence (AI)",
      issuer: "Coursera",
      year: "2023",
      description: "Fundamentals of AI, machine learning, and their applications.",
      category: "AI/ML"
    },
    {
      title: "Responsible & Safe AI Systems",
      issuer: "NPTEL",
      year: "2024",
      description: "Ethics, safety, and responsible development of AI systems.",
      category: "AI/ML"
    }
  ];

  const categoryColors = {
    "Networking": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Security": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Development": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Web Development": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "AI/ML": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  };

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ClickSpark
                sparkColor={sparkColor}
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
                extraScale={1}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <Badge 
                        variant="secondary" 
                        className={categoryColors[cert.category as keyof typeof categoryColors]}
                      >
                        {cert.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.issuer} - {cert.year}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </ClickSpark>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
