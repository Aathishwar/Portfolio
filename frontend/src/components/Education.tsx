import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award } from "lucide-react";
import ClickSpark from "@/components/ui/ClickSpark";
import { useSparkColor } from "@/hooks/use-spark-color";

export default function Education() {
  const sparkColor = useSparkColor();
  
  const education = [
    {
      degree: "B.E Computer Science and Engineering (AIML)",
      institution: "KPR Institute of Engineering and Technology",
      period: "2022 - Current",
      grade: "CGPA: 8.07",
      status: "current",
      description: "Specializing in Artificial Intelligence and Machine Learning with strong foundation in computer science fundamentals."
    },
    {
      degree: "12th Standard",
      institution: "Government Higher Secondary School, Tamil Nadu",
      period: "2020 - 2022",
      grade: "Percentage: 88.17%",
      status: "completed",
      description: "Completed higher secondary education with focus on science and mathematics."
    },
    {
      degree: "10th Standard",
      institution: "Government Higher Secondary School, Tamil Nadu",
      period: "2020",
      grade: "Percentage: 92.80%",
      status: "completed",
      description: "Completed secondary education with excellent academic performance."
    }
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                  
                  <div className="md:ml-20">
                    <ClickSpark
                      sparkColor={sparkColor}
                      sparkSize={10}
                      sparkRadius={15}
                      sparkCount={8}
                      duration={400}
                      extraScale={1}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-6 w-6 text-primary" />
                              <Badge 
                                variant={edu.status === 'current' ? 'default' : 'secondary'}
                                className="cursor-pointer"
                              >
                                {edu.status === 'current' ? 'Current' : 'Completed'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{edu.period}</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl">{edu.degree}</CardTitle>
                          <p className="text-primary font-medium">{edu.institution}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="font-medium text-primary">{edu.grade}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {edu.description}
                          </p>
                        </CardContent>
                      </Card>
                    </ClickSpark>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
