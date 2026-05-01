import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HiArrowDown, HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import myImg from "@/assets/my-img.png";
import bgImag from "@/assets/bg-01.jpg";
import { mylogos, objects } from "@/assets/assets";

const Hero = () => {
  return (
    <section className="min-h-dvh md:min-h-[670px] flex items-center lg:items-end justify-center relative overflow-hidden ">
      {/* Background gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-secondary/85" /> */}
      <img
        src={bgImag}
        className="absolute object-cover w-full h-full rotate-180 lg:rotate-0"
      />

      <img
        src={mylogos.logo}
        className="absolute w-[800px] md:w-[800px] lg:w-[800px] object-contain -bottom-3 right-0 md:-right-56 lg:right-[5%] opacity-10"
      />

      <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center md:pt-[80px] lg:pt-0 ">
          {/* Content */}
          <div className="space-y-8 md:self-center slide-up md:pl-10 text-center lg:text-left ">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span>Hello, I'm </span>
                <span className="hero-text">Joel Adjei</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground font-light">
                Software Engineer & Graphic Designer
              </h2>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mx-auto lg:mx-0">
                Passionate about creating innovative solutions, building
                exceptional digital experiences, and crafting compelling visual
                designs that make a difference.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/*<Button size="lg" className="glow-effect animate-pulse-glow group">*/}
              {/*  View My Work*/}
              {/*  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 smooth-transition" />*/}
              {/*</Button>*/}
              <Button
                variant="outline"
                size="lg"
                className="smooth-transition hover:glow-effect"
              >
                Download CV
              </Button>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open("https://github.com/Joel-Adjei", "_blank")
                }
                className="hover:accent-glow smooth-transition"
              >
                <FaGithub className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open("https://linkedin.com/in/joeladjei", "_blank")
                }
                className="hover:accent-glow smooth-transition"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  (window.location.href = "mailto: joeladjei01@gmail.com ")
                }
                className="hover:accent-glow smooth-transition"
              >
                <HiMail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full  md:w-1/2 fade-in ">
            <div className=" ">
              <img
                src={myImg}
                alt="Joel Adjei - Software Engineer"
                className="object-cover smooth-transition"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
