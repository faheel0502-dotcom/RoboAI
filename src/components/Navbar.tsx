import { useState, useEffect } from 'react';
import { Bot, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-background/80 backdrop-blur-md border-b border-neutral-border/20 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl text-white shadow-md shadow-primary/20">
            <Bot size={22} className="animate-pulse" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-neutral-dark">
            Robo<span className="text-secondary">AI</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleScrollTo('details')} className="text-sm font-medium text-neutral-muted hover:text-primary transition-colors">
            Details
          </button>
          <button onClick={() => handleScrollTo('outcomes')} className="text-sm font-medium text-neutral-muted hover:text-primary transition-colors">
            Outcomes
          </button>
          <button onClick={() => handleScrollTo('curriculum')} className="text-sm font-medium text-neutral-muted hover:text-primary transition-colors">
            Curriculum
          </button>
          <button onClick={() => handleScrollTo('faq')} className="text-sm font-medium text-neutral-muted hover:text-primary transition-colors">
            FAQs
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleScrollTo('register')}
            className="bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-full text-sm font-semibold hover-lift shadow-lg shadow-primary/15"
          >
            Enroll Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-neutral-dark hover:text-primary p-1.5 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-border/10 shadow-xl px-6 py-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-5 duration-200">
          <button
            onClick={() => handleScrollTo('details')}
            className="text-left font-medium text-neutral-muted hover:text-primary py-1 transition-colors"
          >
            Workshop Details
          </button>
          <button
            onClick={() => handleScrollTo('outcomes')}
            className="text-left font-medium text-neutral-muted hover:text-primary py-1 transition-colors"
          >
            Learning Outcomes
          </button>
          <button
            onClick={() => handleScrollTo('curriculum')}
            className="text-left font-medium text-neutral-muted hover:text-primary py-1 transition-colors"
          >
            Workshop Curriculum
          </button>
          <button
            onClick={() => handleScrollTo('faq')}
            className="text-left font-medium text-neutral-muted hover:text-primary py-1 transition-colors"
          >
            FAQs
          </button>
          <button
            onClick={() => handleScrollTo('register')}
            className="bg-primary text-white text-center py-3 rounded-xl font-semibold shadow-lg shadow-primary/15"
          >
            Enroll Now
          </button>
        </div>
      )}
    </nav>
  );
}
