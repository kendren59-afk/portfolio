import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">Nagesh Kendre</h3>
          <p className="text-zinc-400">Digital Marketer & SEO Specialist</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            href="mailto:kendren59@gmail.com"
            className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors p-3 bg-white/5 rounded-xl hover:bg-white/10"
          >
            <Mail className="w-5 h-5" />
            <span>kendren59@gmail.com</span>
          </a>
          
          <a
            href="https://wa.me/917262051070?text=Hello%20Nagesh%2C%20I%20want%20digital%20marketing%20%2F%20SEO%20services"
            target="_blank"
            rel="noopener noreferrer"
            data-interactive="true"
            className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors p-3 bg-white/5 rounded-xl hover:bg-[#25D366]/20 border border-transparent hover:border-[#25D366]/50 shadow-sm hover:shadow-[#25D366]/20 duration-300"
          >
            <Phone className="w-5 h-5 text-[#25D366]" />
            <span>+91 7262051070</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
