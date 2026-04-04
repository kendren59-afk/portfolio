"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Trophy, Globe, Briefcase, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Experience", value: "4 Years", icon: Briefcase },
  { label: "Websites Ranked", value: "20+", icon: Trophy },
  { label: "SEO Specialization", value: "3 Years", icon: TrendingUp },
  { label: "Global Clients", value: "USA Market", icon: Globe }
];

function StatCard({ stat, index }: { stat: typeof STATS[number], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
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
        className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg hover:bg-white/[0.08] transition-colors cursor-pointer shadow-lg"
      >
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="p-2.5 rounded-lg bg-gradient-to-br from-[#7F5AF0]/20 to-[#00C2FF]/20 border border-white/10 text-white shadow-xl"
        >
          <stat.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div style={{ transform: "translateZ(30px)" }}>
          <h4 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{stat.value}</h4>
          <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
        </div>
        {/* Glow hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#7F5AF0]/5 to-[#00C2FF]/5 pointer-events-none transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect for Image
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeaveImage = () => {
    x.set(0);
    y.set(0);
  };

  // Section global parallax mouse states
  const sectionMouseX = useMotionValue(0);
  const sectionMouseY = useMotionValue(0);

  // Softer spring for parallax backgrounds
  const pxSpringConfig = { stiffness: 100, damping: 30 };
  const parallaxX = useSpring(sectionMouseX, pxSpringConfig);
  const parallaxY = useSpring(sectionMouseY, pxSpringConfig);

  const bgX1 = useTransform(parallaxX, [-0.5, 0.5], [50, -50]);
  const bgY1 = useTransform(parallaxY, [-0.5, 0.5], [50, -50]);
  
  const bgX2 = useTransform(parallaxX, [-0.5, 0.5], [-50, 50]);
  const bgY2 = useTransform(parallaxY, [-0.5, 0.5], [-50, 50]);

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
        <motion.div 
          style={{ x: bgX1, y: bgY1 }}
          className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00C2FF]/10 blur-[120px]" 
        />
        <motion.div 
          style={{ x: bgX2, y: bgY2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7F5AF0]/10 blur-[120px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Content Area */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex flex-col space-y-8"
        >
          <div data-interactive="true" className="w-fit cursor-default">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium tracking-wide uppercase shadow-xl backdrop-blur-md">
              About Me
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6 mb-6">
              Nagesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] via-[#2CB67D] to-[#00C2FF]">Kendre</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#A1A1AA] font-medium leading-relaxed">
              I bring <span className="text-white font-bold inline-block hover:scale-105 transition-transform">4 years</span> of experience in Digital Marketing, with a fierce focus on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] to-[#00C2FF] font-bold">SEO & website ranking</span> over the last 3 years.
            </p>
          </div>

          <p data-interactive="true" className="text-lg text-zinc-400 leading-relaxed max-w-xl cursor-default">
            I've collaborated on <span className="text-white font-semibold shadow-purple-500/50 hover:text-[#00C2FF] transition-colors">20+ websites</span> to secure proven, data-driven ranking results. Having worked exclusively alongside USA-based clients like <span className="text-white">"Exeleon Magazine"</span>, I possess strong expertise in comprehensive digital strategy, keyword integration, and scaling organic traffic growth entirely from scratch.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* Right 3D Visual Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2"
          style={{ perspective: 1000 }}
        >
          <motion.div
            ref={imageRef}
            onMouseMove={handleMouseMoveImage}
            onMouseLeave={handleMouseLeaveImage}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            // Framer motion continuous floating sequence
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            data-interactive="true"
            className="relative lg:ml-12 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl shadow-2xl xl:aspect-square aspect-[4/3] group origin-center cursor-pointer"
          >
            {/* Soft backdrop glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7F5AF0]/40 via-transparent to-[#00C2FF]/40 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
            
            {/* The 3D Render Image (Using a futuristic dashboard / SEO visualization placeholder) */}
            <div
              style={{ transform: "translateZ(60px)" }}
              className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3" 
                alt="SEO Analytics Dashboard" 
                className="object-cover w-full h-full transform scale-[1.02] group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/90 via-transparent to-transparent mix-blend-multiply pointer-events-none" />
            </div>

            {/* Overlapping Glass Analytics Card */}
            <div 
              style={{ transform: "translateZ(90px)" }}
              className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 p-6 rounded-2xl bg-[#121212]/90 border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex items-center gap-4 group-hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="p-3 bg-gradient-to-br from-[#2CB67D] to-emerald-500 rounded-full shadow-[0_0_15px_rgba(44,182,125,0.5)]">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-medium">Traffic Growth</p>
                <p className="text-2xl font-bold text-white tracking-widest">+340%</p>
              </div>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
