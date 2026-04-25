import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackNavigation = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex-row-reverse flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="font-bold text-xl hero-text"
            >
              Joel.dev
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="smooth-transition hover:glow-effect"
            >
              <ArrowLeft />
              Back
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BackNavigation;
