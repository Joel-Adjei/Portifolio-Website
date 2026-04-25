import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "joeladjei01@gmail.com",
      href: "mailto:joeladjei01@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+233 531 547-562",
      href: "tel:+233531547562"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Accra, Ghana",
      href: "#"
    }
  ];

  return (
    <section ref={elementRef} className={`py-20 bg-secondary/30 section-fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="container mx-auto px-6 lg:px-[76px]">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl font-bold mb-4 hero-text">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project and bring your ideas to life.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 slide-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's start a conversation</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, 
                exciting projects, and collaborations. Whether you have a 
                specific project in mind or just want to connect, I'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <Card key={item.label} className="skill-card">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <a 
                        href={item.href}
                        className="font-medium hover:text-primary smooth-transition"
                      >
                        {item.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
              <h4 className="font-semibold mb-2">Available for Opportunities</h4>
              <p className="text-sm text-muted-foreground">
                Currently open to full-time positions, freelance projects, 
                and interesting collaborations.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="skill-card" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Send me a message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John"
                    className="smooth-transition focus:glow-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe"
                    className="smooth-transition focus:glow-effect"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  className="smooth-transition focus:glow-effect"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Project collaboration"
                  className="smooth-transition focus:glow-effect"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="smooth-transition focus:glow-effect"
                />
              </div>
              
              <Button className="w-full glow-effect group">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;