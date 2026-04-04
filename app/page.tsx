import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Services from "@/components/Services";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      {/* 500vh Scroll Section */}
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* Following Content */}
      <Services />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}
