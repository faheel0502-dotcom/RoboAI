import { Bot, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-white/70 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="flex flex-col items-start md:col-span-2 text-left">
          <div className="flex items-center gap-2.5 mb-5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-primary p-2 rounded-xl text-white">
              <Bot size={20} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Robo<span className="text-secondary-container">AI</span>
            </span>
          </div>
          <p className="text-sm text-white/50 mb-6 max-w-sm leading-relaxed">
            Connecting families with high-quality educational programs, creative workshops, and technology camps across India.
          </p>
        </div>

        {/* Contact info column */}
        <div className="flex flex-col items-start text-left">
          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-5">
            Support
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
              <Mail size={16} className="text-secondary-container shrink-0" />
              <a href="mailto:support@roboai.in">support@roboai.in</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-secondary-container shrink-0 mt-0.5" />
              <span className="text-white/50 text-xs sm:text-sm">
                RoboAI Technologies, Tech Park, Bangalore, India
              </span>
            </li>
          </ul>
        </div>

        {/* Legal links column */}
        <div className="flex flex-col items-start text-left">
          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-5">
            Platform
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>© {currentYear} RoboAI. All rights reserved.</p>
        <p>FutureMinds STEM Academy Partner</p>
      </div>
    </footer>
  );
}
