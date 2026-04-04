"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CASE_STUDIES = [
  {
    title: "Ethereal Echoes",
    category: "Immersive Web App",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564&ixlib=rb-4.0.3",
    link: "#"
  },
  {
    title: "Neon Architect",
    category: "SaaS Dashboard",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    link: "#"
  },
  {
    title: "Quantum Nexus",
    category: "DeFi Platform",
    image: "https://images.unsplash.com/photo-1634596950666-ac1df0fecbc6?auto=format&fit=crop&q=80&w=2648&ixlib=rb-4.0.3",
    link: "#"
  }
];

export default function Projects() {
  return (
    <section className="relative z-20 min-h-screen bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl text-white font-bold tracking-tight mb-6">
            Selected Work
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-zinc-700 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="flex justify-between items-end flex-grow">
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wider">{project.category}</p>
                  <h3 className="text-2xl text-white font-semibold">{project.title}</h3>
                </div>
                <Link prefetch={false} href={project.link} className="p-3 bg-white/10 rounded-full hover:bg-white text-white hover:text-black transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
