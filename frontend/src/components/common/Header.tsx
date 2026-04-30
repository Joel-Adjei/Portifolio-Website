import { objects } from "@/assets/assets";
import React from "react";

interface Header {
  mainHeader: string;
  description: string;
  label?: string;
}

const Header = ({ mainHeader, description, label }: Header) => {
  return (
    <div className="text-center mb-4 slide-up">
      <span className="text-primary text-xs mb-2 font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-400/30  bg-blue-500/10">
        {label}
      </span>
      <div className="flex items-center justify-center gap-1.5 mt-2 mb-4">
        <img src={objects.obj5} className="size-7" />
        <h2 className="text-4xl font-bold  hero-text">{mainHeader}</h2>
      </div>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default Header;
