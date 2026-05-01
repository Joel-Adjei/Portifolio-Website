import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiPaperAirplane,
} from "react-icons/hi";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { backgrounds } from "@/assets/assets";
import { useSendMessage } from "@/hooks/queries";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const sendMessage = useSendMessage();
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    sendMessage.mutate(form, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to send message",
          description:
            error instanceof Error ? error.message : "Please try again later.",
          variant: "destructive",
        });
      },
    });
  };
  const contactInfo = [
    {
      icon: HiMail,
      label: "Email",
      value: "joeladjei01@gmail.com",
      href: "mailto:joeladjei01@gmail.com",
    },
    {
      icon: HiPhone,
      label: "Phone",
      value: "+233 531 547-562",
      href: "tel:+233531547562",
    },
    {
      icon: HiLocationMarker,
      label: "Location",
      value: "Accra, Ghana",
      href: "#",
    },
  ];

  return (
    <section
      ref={elementRef}
      className={`py-20 bg-secondary/30 section-fade-in ${isVisible ? "visible" : ""}`}
    >
      <img
        src={backgrounds.bg04}
        className="absolute object-cover w-full h-full opacity-5 top-0 left-0 z-0"
        alt=""
      />

      <div className="container mx-auto px-6 lg:px-[76px]">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl font-bold mb-4 hero-text">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project and bring your
            ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div
            className="space-y-8 slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Let's start a conversation
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities,
                exciting projects, and collaborations. Whether you have a
                specific project in mind or just want to connect, I'd love to
                hear from you.
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
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
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
              <h4 className="font-semibold mb-2">
                Available for Opportunities
              </h4>
              <p className="text-sm text-muted-foreground">
                Currently open to full-time positions, freelance projects, and
                interesting collaborations.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="skill-card z-10" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="z-20">
              <CardTitle className="flex items-center gap-2">
                <HiPaperAirplane className="h-5 w-5 text-primary" />
                Send me a message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4 ">
                  <div className="space-y-2 z-10">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="smooth-transition focus:glow-effect"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="smooth-transition focus:glow-effect"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="smooth-transition focus:glow-effect"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 z-10">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Project collaboration"
                    className="smooth-transition focus:glow-effect"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="smooth-transition focus:glow-effect"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full glow-effect group"
                  disabled={sendMessage.isPending}
                >
                  {sendMessage.isPending ? "Sending..." : "Send Message"}
                  <HiPaperAirplane className="ml-2 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
