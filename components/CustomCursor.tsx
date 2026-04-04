"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Position trackers
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot (fast tracking)
  const dotSpringConfig = { damping: 28, stiffness: 700, mass: 0.5 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  // Outer circle (lagging smooth tracking)
  const ringSpringConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Disable on mobile/touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsDesktop(false);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Find closest interactive element
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a, button, [data-interactive='true']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor across entire body if desktop
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer Glow Ring (Lags behind) */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[100]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div 
          className={`rounded-full transition-all duration-300 flex items-center justify-center
            ${isHovering 
              ? "w-24 h-24 border border-transparent bg-gradient-to-r from-[#7F5AF0]/20 via-[#2CB67D]/20 to-[#00C2FF]/20 backdrop-blur-sm shadow-[0_0_30px_rgba(0,194,255,0.4)]" 
              : "w-12 h-12 border border-[#00C2FF]/50 bg-transparent shadow-[0_0_15px_rgba(127,90,240,0.3)]"}
          `}
        />
      </motion.div>

      {/* Inner Dot (Tracks tightly) */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div 
          className={`rounded-full transition-all duration-300
            ${isHovering 
              ? "w-2 h-2 bg-white" 
              : "w-2 h-2 bg-gradient-to-r from-[#7F5AF0] to-[#00C2FF]"}
          `}
        />
      </motion.div>
    </>
  );
}
