import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { TextTrail } from "./ui/text-trail";
import { TextPressure } from "./ui/text-pressure";
import { TextShimmer } from "./ui/text-shimmer";
import { FloatingElements } from "./ui/floating-elements";

const ModernHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Dynamic background with mouse parallax */}
      <div
        className="absolute inset-0 transition-transform duration-75"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px) translateX(${mousePosition.x * 0.005}px)` 
        }}
      >
        <div className="relative w-full h-[120%]">
          <img
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Core X Sportswear"
            className="w-full h-full object-cover brightness-50"
          />
          
          {/* Animated gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-corex-red/30 via-transparent to-corex-blue/30 animate-gradient bg-300%"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,56,76,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6">
        <div className="text-center max-w-6xl">
          {/* Animated Logo with TextTrail Effect */}
          <div className="mb-8">
            <TextTrail
              text="CORE X"
              className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-wider text-white drop-shadow-2xl"
              delay={500}
              duration={150}
            />
          </div>

          {/* Main Tagline with Trail Effect */}
          <div className="mb-8">
            <TextTrail
              text="Gear That Moves With You."
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              delay={2000}
              duration={100}
            />
          </div>

          {/* Subtitle with Shimmer */}
          <div className="mb-16">
            <TextShimmer
              text="Experience the perfect fusion of cutting-edge technology and athletic performance"
              className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto text-gray-300"
              duration={3000}
            />
          </div>

          {/* CTA Buttons with Modern Design */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '4s' }}>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-corex-red to-corex-blue hover:from-corex-blue hover:to-corex-red px-8 py-4 text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg transition-all duration-500 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    Watch Story
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-black/90 border-gray-800">
                <div className="aspect-video w-full bg-black rounded-lg flex items-center justify-center">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/NW2Sibk4u1U"
                    title="Core X Brand Story"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in" style={{ animationDelay: '5s' }}>
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-xs text-white/70 font-medium">Scroll</span>
          </div>
        </div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernHero;