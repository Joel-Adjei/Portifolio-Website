import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, Ghost } from "lucide-react";
import { error } from "@/assets/assets";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 mosaic-scroll" />
      </div>

      <div className="relative z-10 container max-w-4xl px-6 py-12 flex flex-col items-center text-center">
        {/* Animated Illustration */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-75 group-hover:scale-100 transition-transform duration-700" />
          <img
            src={error.notFoundIllustration}
            alt="404 Illustration"
            className="w-64 md:w-80 h-auto relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Error Code */}
        <div className="relative mb-2">
          <h1 className="text-8xl md:text-9xl font-black hero-text tracking-tighter select-none">
            404
          </h1>
          <div className="absolute -top-4 -right-4">
            <Ghost className="w-12 h-12 text-primary/40 animate-bounce" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Lost in the Digital Void?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The page you're looking for seems to have drifted away. Don't worry,
            even the best explorers lose their way sometimes.
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold glow-effect hover:scale-105 transition-all"
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Safety
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-semibold border-white/10 hover:bg-white/5 transition-all"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Path Info */}
        <div className="mt-16 pt-8 border-t border-white/5 w-full max-w-md">
          <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
            Attempted to reach:{" "}
            <span className="text-primary/60">{location.pathname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
