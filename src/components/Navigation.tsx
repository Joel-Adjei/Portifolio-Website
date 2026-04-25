import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, PhoneCall, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/", path: "/" },
    { label: "Projects", href: "/projects", path: "/projects" },
    { label: "Achievements", href: "/achievements", path: "/achievements" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl hero-text hover:text-primary smooth-transition"
          >
            Joel.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.path === "/achievements" || item.path === "/projects") {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-muted-foreground hover:text-foreground smooth-transition relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full smooth-transition" />
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={`${item.path}`}
                  className="text-muted-foreground hover:text-foreground smooth-transition relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full smooth-transition" />
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              className="smooth-transition hover:glow-effect"
              onClick={() => setIsContactModalOpen(true)}
            >
              <PhoneCall />
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-muted-foreground hover:text-foreground smooth-transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                className="w-full mt-4"
                onClick={() => {
                  setIsOpen(false);
                  setIsContactModalOpen(true);
                }}
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onOpenChange={setIsContactModalOpen} 
      />
    </nav>
  );
};

export default Navigation;
