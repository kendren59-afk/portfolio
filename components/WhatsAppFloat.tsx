"use client";

import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  const phoneNumber = "917262051070";
  const message = "Hello Nagesh, I want digital marketing / SEO services";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-8 right-8 z-[90] pointer-events-auto"
    >
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        data-interactive="true"
        className="relative group flex items-center justify-center p-4 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] transition-all duration-300 transform hover:scale-110"
      >
        {/* Pulsing Behind Glow */}
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#25D366] blur-xl opacity-50 z-[-1]"
        />
        
        {/* Actual WhatsApp SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 w-8 h-8 text-white drop-shadow-md"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>

        {/* Hover Tooltip Dropdown/Popup overlay */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#121212] border border-white/10 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          <p className="text-white text-sm font-medium">Chat on WhatsApp</p>
        </div>
      </a>
    </motion.div>
  );
}
