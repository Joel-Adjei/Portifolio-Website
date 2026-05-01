import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HiMenu, HiPhone, HiFolder, HiX } from "react-icons/hi";
import { Link, NavLink, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";
import { mylogos, objects } from "@/assets/assets";

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
    {
      label: "Projects",
      href: "/projects",
      path: "/projects",
      icon: HiFolder,
    },
    // { label: "Blog", href: "/blog", path: "/blog", icon: BookOpen },
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
            <div className="flex items-center gap-3">
              <img src={mylogos.logo} alt="Logo" className="w-10 " />

              <img
                src={mylogos.logoText}
                alt="Logo"
                className="object-contain h-4"
              />
            </div>
          </Link>

          {/* CTA Button */}
          <div className="flex gap-8">
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground smooth-transition relative group"
                >
                  <item.icon className="w-4 h-4" />
                  <p className="hidden md:block">{item.label}</p>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full smooth-transition" />
                </Link>
              ))}

              {/* <NavLink
                to={"/projects"}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground smooth-transition relative group"
              >
                <img src={objects.folder} alt="Projects" className="w-5 h-5" />
                <p className="hidden md:block">Projects</p>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full smooth-transition" />
              </NavLink> */}
            </div>
            <Button
              variant="outline"
              className="smooth-transition hover:glow-effect"
              onClick={() => setIsContactModalOpen(true)}
            >
              <HiPhone />
              <p className="hidden md:block">Contact</p>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button> */}
        </div>

        {/* Mobile Navigation */}
        {/* {isOpen && (
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
        )} */}
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </nav>
  );
};

export default Navigation;
