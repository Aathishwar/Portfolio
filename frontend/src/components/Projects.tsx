import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ClickSpark from "@/components/ui/ClickSpark";
import { useSparkColor } from "@/hooks/use-spark-color";

export default function Projects() {
  const sparkColor = useSparkColor();
  
  const projects = [
    {
      title: "TaskFlow - Multi-User Task Management System",
      description: "A production-ready task management app with multi-user support, secure authentication, and real-time collaboration. Designed for productivity with smart reminders, task sharing, and complete data isolation.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "Firebase Authentication"],
      category: "Web Application",
      githubUrl: "https://github.com/Aathishwar/TaskFlow",
    },
    {
      title: "AI Image Enhancer Using Real-ESRGAN",
      description: "An AI-powered image enhancement tool that transforms low-quality images into high-resolution visuals with face enhancement, deblurring, and artifact removal. Built with Real-ESRGAN and optimized using Intel OpenVINO for GPU acceleration.",
      technologies: ["Python", "Real-ESRGAN", "OpenVINO", "Computer Vision", "React", "Tailwind CSS"],
      category: "AI/ML",
      githubUrl: "https://github.com/Aathishwar/Image_Enhancer",
    },
    {
      title: "URL Video Downloader GUI",
      description: "A feature-rich desktop video downloader built with yt-dlp and tkinter, offering subtitle support, full download controls, smart queuing, and real-time progress tracking with a modern ttkbootstrap interface.",
      technologies: ["Python", "yt-dlp", "tkinter", "ttkbootstrap", "FFmpeg"],
      category: "Desktop Application",
      githubUrl: "https://github.com/Aathishwar/Url_Downloader",
    },
    {
      title: "Luggage Detection with YOLO",
      description: "A computer vision system for automated luggage detection and tracking using the YOLO object detection model. Designed for applications in surveillance, security, and smart transport hubs.",
      technologies: ["Python", "YOLO", "OpenCV", "AI/ML"],
      category: "Computer Vision",
      githubUrl: "https://github.com/Aathishwar/Luggage_Detector",
    },
    {
      title: "Car Price Prediction Model",
      description: "A machine learning model that predicts car prices based on features such as brand, model, year, mileage, and fuel type. Built using regression algorithms and real-world datasets to deliver accurate and data-driven price estimates.",
      technologies: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "XGBoost"],
      category: "AI/ML",
      githubUrl: "https://github.com/Aathishwar/Car_Price_Prediction",
    },
    {
      title: "E-Commerce & Blogging Website",
      description: "Two full-stack web applications: an E-Commerce platform for browsing, shopping, and checkout, and a Blogging platform for creating, editing, and managing posts. Built for scalability and smooth user experience.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "Firebase"],
      category: "Web Development",
      githubUrl: "https://github.com/Aathishwar/Internship/tree/main/Blogging_Website",
    },
    {
      title: "Encrypted Multi-Client TCP Chat Room",
      description: "A Linux terminal-based chat application in C supporting multiple clients, real-time messaging, XOR encryption, and color-coded usernames for clarity. Demonstrates TCP socket programming and concurrency using select() and threads.",
      technologies: ["C", "TCP Sockets", "Linux", "XOR Encryption", "Concurrency"],
      category: "Networking",
      githubUrl: "https://github.com/Aathishwar/C_Projects/tree/main/Tcp_Chatroom",
    },
    {
      title: "Raspberry Pi Projects",
      description: "Various IoT and embedded systems projects using Raspberry Pi for automation and hardware interfacing.",
      technologies: ["Raspberry Pi", "Python", "IoT", "Hardware"],
      category: "IoT/Hardware",
    }
  ];

  const categoryColors = {
    "Web Application": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "AI/ML": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "Desktop Application": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Computer Vision": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Web Development": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    "Networking": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "IoT/Hardware": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge 
                        variant="secondary" 
                        className={categoryColors[project.category as keyof typeof categoryColors]}
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex  gap-2 pt-2">
                      <Button size="sm" variant="outline" className="cursor-pointer" asChild>
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    </div>
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
