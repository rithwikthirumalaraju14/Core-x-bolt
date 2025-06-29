import { useState, useEffect, useRef } from 'react';
import { Award, Target, Users, Zap } from 'lucide-react';
import { TextReveal } from './ui/text-reveal';
import { TextShimmer } from './ui/text-shimmer';

const ModernAboutSection = () => {
  const [counters, setCounters] = useState({ athletes: 0, countries: 0, years: 0, products: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { athletes: 50000, countries: 120, years: 8, products: 500 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        athletes: Math.floor(targets.athletes * progress),
        countries: Math.floor(targets.countries * progress),
        years: Math.floor(targets.years * progress),
        products: Math.floor(targets.products * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  const features = [
    {
      icon: Target,
      title: "Performance Driven",
      description: "Every product is designed with one goal: to enhance your athletic performance and push your limits.",
      color: "from-corex-red to-red-600"
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Premium materials and rigorous testing ensure our gear meets the highest standards of durability and comfort.",
      color: "from-corex-blue to-blue-600"
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "We're more than a brand - we're a community of athletes supporting each other's journey to excellence.",
      color: "from-corex-green to-green-600"
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Cutting-edge technology and innovative design drive every piece of Core X gear we create.",
      color: "from-corex-orange to-orange-600"
    }
  ];

  const stats = [
    { value: counters.athletes, label: "Athletes Trust Us", color: "text-corex-red", suffix: "+" },
    { value: counters.countries, label: "Countries Worldwide", color: "text-corex-blue", suffix: "" },
    { value: counters.years, label: "Years of Excellence", color: "text-corex-green", suffix: "" },
    { value: counters.products, label: "Performance Products", color: "text-corex-orange", suffix: "+" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <TextReveal
            text="Our Mission"
            className="text-5xl md:text-6xl mb-6 font-bebas text-black"
            delay={200}
          />
          <TextShimmer
            text="Core X was born from a simple belief: every athlete deserves gear that moves with them, not against them. We engineer performance into every fiber, every seam, every detail."
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            duration={2500}
          />
        </div>

        {/* Stats Section with Modern Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 relative`}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50 overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section with Modern Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in-left">
            <TextReveal
              text="The Core X Story"
              className="text-4xl font-bold text-gray-900"
              delay={500}
            />
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div className="relative pl-6 border-l-4 border-corex-red/30">
                <p className="text-lg">
                  Founded in 2016 by former professional athletes, Core X emerged from frustration with 
                  sportswear that looked good but failed when it mattered most.
                </p>
              </div>
              
              <div className="relative pl-6 border-l-4 border-corex-blue/30">
                <p className="text-lg">
                  Our founding team spent two years in research and development, working with textile 
                  engineers, biomechanics experts, and hundreds of athletes.
                </p>
              </div>
              
              <div className="relative pl-6 border-l-4 border-corex-green/30">
                <p className="text-lg">
                  Today, Core X is trusted by professional athletes, weekend warriors, and everyone in 
                  between. Our commitment remains unchanged: to create gear that moves with you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative group animate-slide-in-right">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Core X Athletes"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold mb-2">Performance Tested</div>
                <div className="text-sm opacity-90">By Real Athletes, For Real Athletes</div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute top-4 right-12 w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAboutSection;