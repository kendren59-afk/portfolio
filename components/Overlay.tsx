"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure the scroll over this 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Opacities mapped to scroll percentage (0 to 1)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 1], [0, 1, 1, 0]);

  // Y translates (Parallax effect)
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.6], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0.6, 1], [100, -100]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-xl mb-4">
            Nagesh Kendre
          </h1>
          <p className="text-xl md:text-3xl font-medium text-zinc-300 drop-shadow-md">
            Digital Marketer & SEO Specialist.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-start text-left p-12 md:p-24 pointer-events-auto max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl leading-tight">
            I help businesses grow online with SEO and digital marketing strategies.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end text-right p-12 md:p-24 pointer-events-auto max-w-full"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl leading-tight max-w-4xl">
            4 years of experience in ranking websites, increasing traffic, and driving conversions.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
