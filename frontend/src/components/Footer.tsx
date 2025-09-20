import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: "bxl-linkedin", href: "https://www.linkedin.com/in/aathishwar-v/", label: "LinkedIn" },
    { icon: "bxl-instagram", href: "https://instagram.com/aathi._.13?igshid=NzZlODBkYWE4Ng==", label: "Instagram" },
    { icon: "bxl-github", href: "https://github.com/Aathishwar", label: "GitHub" },
    { icon: "bxl-whatsapp", href: "http://Wa.me/+918072222395", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              AATHISHWAR <span className="text-2xl font-bold text-primary mb-4">V</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Computer Science Engineering student passionate about AI/ML, 
              cybersecurity, and creating innovative solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Connect With Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
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
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t mt-8 pt-8 text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> by Aathishwar Varatharaj
          </p>
          
        </motion.div>
      </div>
    </footer>
  );
}
