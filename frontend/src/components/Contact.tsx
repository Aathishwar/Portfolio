import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import ClickSpark from "@/components/ui/ClickSpark";
import { useSparkColor } from "@/hooks/use-spark-color";

export default function Contact() {
  const sparkColor = useSparkColor();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_bxusdmd';
      const templateId = 'template_xdg1c6k'; // Template for email to you
      const autoReplyTemplateId = 'template_93a6bsg'; // Template for auto-response (you need to create this)
      const publicKey = 'fupMbIv62n8CAmb_T';

      // Template params for email to you
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Aathishwar',
      };

      // Template params for auto-response to user
      const autoReplyParams = {
        to_name: formData.name,
        to_email: formData.email,
        from_name: 'Aathishwar Varatharaj',
        reply_message: `Hi ${formData.name},

Thank you for reaching out! I've received your message and really appreciate you taking the time to contact me.

Here's a summary of what you sent:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Message: ${formData.message}
${formData.phone ? `Phone: ${formData.phone}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'll review your message carefully and get back to you within 24-48 hours. In the meantime, feel free to check out my latest projects on GitHub or connect with me on LinkedIn.

🔗 GitHub: https://github.com/Aathishwar
🔗 LinkedIn: https://www.linkedin.com/in/aathishwar-v/

Thanks again for your interest, and I look forward to our conversation!

Best regards,
Aathishwar Varatharaj
Computer Science Engineering (AIML) Student
KPRIET

---
This is an automated response. Please do not reply to this email directly.`
      };

      // Send both emails
      await Promise.all([
        emailjs.send(serviceId, templateId, templateParams, publicKey),
        emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey)
      ]);
      
      toast.success("Message sent successfully! Check your email for confirmation. I'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error("Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "aathishwar885@gmail.com",
      href: "mailto:aathishwar885@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 807XXXX395",
      href: "tel:+918072222395"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Coimbatore, Tamil Nadu, India",
      href: "https://maps.app.goo.gl/wMoMMmE9uK8wdnzX7"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ClickSpark
              sparkColor={sparkColor}
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
              extraScale={1}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <Input
                      name="phone"
                      placeholder="Contact Number (Optional)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full cursor-pointer" 
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ClickSpark>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
