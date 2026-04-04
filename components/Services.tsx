"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, TrendingUp, Presentation, Target } from "lucide-react";

const SERVICES = [
  {
    title: "SEO Optimization",
    description: "Data-driven strategies to rank higher and increase organic visibility.",
    icon: Search,
    // Accent shadow color mapping
    glow: "shadow-purple-500/20"
  },
  {
    title: "Website Ranking & Growth",
    description: "Accelerate your online growth with proven traffic multiplication techniques.",
    icon: TrendingUp,
    glow: "shadow-blue-500/20"
  },
  {
    title: "Social Media Marketing",
    description: "Build a loyal audience and turn social platforms into growth engines.",
    icon: Presentation,
    glow: "shadow-cyan-500/20"
  },
  {
    title: "Performance Marketing / Ads",
    description: "High-converting paid campaigns that maximize your ROI.",
    icon: Target,
    glow: "shadow-pink-500/20"
  }
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        data-interactive="true"
        className={`relative group h-full flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:bg-white/[0.05] shadow-lg hover:${service.glow} cursor-pointer`}
      >
        {/* Animated Gradient Border Glow */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none p-[1px] bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-purple-500/50 group-hover:via-blue-500/50 group-hover:to-cyan-500/50 transition-colors duration-500" style={{WebkitMask:"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite:"xor", maskComposite:"exclude"}} />
        
        {/* Inner Soft Light */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white to-transparent" />
        
        {/* Inner Glow Center */}
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />

        {/* Icon with 3D Pop effect */}
        <div 
          className="relative mb-8 p-4 rounded-2xl bg-[#121212]/50 w-fit border border-white/10 shadow-xl overflow-hidden"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7F5AF0]/20 to-[#00C2FF]/20 backdrop-blur-xl" />
          <Icon className="relative z-10 w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        </div>

        <div style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {service.title}
          </h3>
          <p className="text-[#A1A1AA] font-medium leading-relaxed">
            {service.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Section global parallax mouse states
  const sectionMouseX = useMotionValue(0);
  const sectionMouseY = useMotionValue(0);

  // Softer spring for parallax backgrounds
  const pxSpringConfig = { stiffness: 100, damping: 30 };
  const parallaxX = useSpring(sectionMouseX, pxSpringConfig);
  const parallaxY = useSpring(sectionMouseY, pxSpringConfig);

  const bgX1 = useTransform(parallaxX, [-0.5, 0.5], [60, -60]);
  const bgY1 = useTransform(parallaxY, [-0.5, 0.5], [60, -60]);
  
  const bgX2 = useTransform(parallaxX, [-0.5, 0.5], [-60, 60]);
  const bgY2 = useTransform(parallaxY, [-0.5, 0.5], [-60, 60]);
  
  const bgX3 = useTransform(parallaxX, [-0.5, 0.5], [40, -40]);
  const bgY3 = useTransform(parallaxY, [-0.5, 0.5], [-40, 40]);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    sectionMouseX.set(mX / rect.width - 0.5);
    sectionMouseY.set(mY / rect.height - 0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleSectionMouseMove}
      className="relative z-20 bg-[#0B0B0F] py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Soft Mesh Gradients with Parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ x: bgX1, y: bgY1 }} className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7F5AF0]/10 blur-[120px]" />
        <motion.div style={{ x: bgX2, y: bgY2 }} className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00C2FF]/10 blur-[120px]" />
        <motion.div style={{ x: bgX3, y: bgY3 }} className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-[#2CB67D]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24 flex flex-col items-center relative"
        >
          <div className="absolute -top-10 -z-10 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
          
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium tracking-wide uppercase mb-6 shadow-xl backdrop-blur-md">
            Expertise
          </span>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] via-[#2CB67D] to-[#00C2FF]">
            My Services
          </h2>
          
          <p className="text-xl md:text-2xl text-[#A1A1AA] font-medium max-w-2xl text-balance">
            Helping businesses grow digitally with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] to-[#00C2FF] font-semibold">proven strategies</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pl-2 pr-2 pb-12 pt-12 -mx-2 -my-12">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
