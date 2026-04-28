import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Achievements", href: "/achievements" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Joel-Adjei", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/joel-adjei",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com/joel_adjei", label: "Twitter" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      value: "joeladjei01@gmail.com",
      href: "mailto:joeladjei01@gmail.com",
    },
    { icon: Phone, value: "+233 531 547-562", href: "tel:+233531547562" },
    { icon: MapPin, value: "Accra, Ghana", href: "#" },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary/20 border-t border-border pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-[76px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              to="/"
              className="font-bold text-2xl hero-text hover:text-primary smooth-transition inline-block"
            >
              Joel.dev
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Software Engineer & Graphic Designer dedicated to building
              exceptional digital experiences with a focus on clean code and
              stunning aesthetics.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white smooth-transition group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 smooth-transition" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleScrollTo(link.href.substring(2))}
                      className="text-muted-foreground hover:text-primary smooth-transition flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 smooth-transition" />
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary smooth-transition flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 smooth-transition" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Details</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, idx) => (
                <li key={idx}>
                  <a
                    href={info.href}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary smooth-transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <info.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{info.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <p>© {currentYear} Joel Adjei.</p>
            <span className="hidden md:inline">•</span>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              in Accra
            </p>
          </div>
          <div className="flex gap-8">
            <Link
              to="#"
              className="hover:text-primary smooth-transition flex items-center gap-1"
            >
              Privacy Policy
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              to="#"
              className="hover:text-primary smooth-transition flex items-center gap-1"
            >
              Terms of Service
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
