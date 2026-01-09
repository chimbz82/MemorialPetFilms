
import React from 'react';
import { AppStep } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (step: AppStep, section?: string) => void;
  hideNav?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, hideNav, hideFooter }) => {
  const handleNavClick = (e: React.MouseEvent, step: AppStep, section?: string) => {
    e.preventDefault();
    onNavigate(step, section);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-main text-brand-body">
      {!hideNav && (
        <nav className="bg-brand-main/80 backdrop-blur-md border-b border-brand-section sticky top-0 z-[60] pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a 
                href="/"
                className="flex items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg px-2 py-1 z-[70] pointer-events-auto"
                onClick={(e) => handleNavClick(e, AppStep.LANDING)}
              >
                <span className="text-xl mr-2 grayscale group-hover:grayscale-0 transition-all duration-300">🐾</span>
                <span className="text-lg font-serif font-bold text-brand-heading tracking-tight">Memorial Pet Films</span>
              </a>
              <div className="hidden md:flex space-x-8 text-sm font-semibold items-center z-[70] pointer-events-auto">
                <a 
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, AppStep.LANDING, 'how-it-works')} 
                  className="text-brand-body/70 hover:text-brand-heading relative py-1 transition-colors cursor-pointer"
                >
                  How it works
                </a>
                <a 
                  href="#templates"
                  onClick={(e) => handleNavClick(e, AppStep.LANDING, 'templates')} 
                  className="text-brand-body/70 hover:text-brand-heading relative py-1 transition-colors cursor-pointer"
                >
                  Templates
                </a>
                <a 
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, AppStep.LANDING, 'pricing')} 
                  className="text-brand-body/70 hover:text-brand-heading relative py-1 transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <a 
                  href="/create"
                  onClick={(e) => handleNavClick(e, AppStep.UPLOAD)}
                  className="bg-brand-primary text-brand-body px-5 py-2 rounded-full hover:bg-[#FFB861] transition-all shadow-sm active:scale-95 cursor-pointer ml-4"
                >
                  Create Tribute
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-grow relative z-10">
        {children}
      </main>

      {!hideFooter && (
        <footer className="bg-brand-section border-t border-brand-section py-16 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <span className="text-xl mr-2 opacity-60">🐾</span>
                  <span className="text-xl font-serif font-bold text-brand-heading">Memorial Pet Films</span>
                </div>
                <p className="text-brand-body/70 max-w-sm leading-relaxed text-sm">
                  Memorial Pet Films helps families create private, respectful video tributes to honour the memory of a beloved pet.
                </p>
                <div className="mt-6">
                  <a href="mailto:MemorialPetFilms@protonmail.com" className="text-xs font-bold text-brand-heading/60 hover:text-brand-heading transition-colors flex items-center">
                    <span className="mr-2">✉</span> MemorialPetFilms@protonmail.com
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-brand-heading mb-6 uppercase tracking-widest text-[10px]">Support</h4>
                <ul className="space-y-4 text-brand-body/60 text-sm">
                  <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-brand-heading transition-colors">Privacy Policy</button></li>
                  <li><button onClick={() => onNavigate(AppStep.TERMS)} className="hover:text-brand-heading transition-colors">Terms of Service</button></li>
                  <li><button onClick={() => onNavigate(AppStep.REFUNDS)} className="hover:text-brand-heading transition-colors">Refund Policy</button></li>
                  <li><button onClick={() => onNavigate(AppStep.FAQ)} className="hover:text-brand-heading transition-colors">FAQs</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-brand-heading mb-6 uppercase tracking-widest text-[10px]">Company</h4>
                <ul className="space-y-4 text-brand-body/60 text-sm">
                  <li><button onClick={() => onNavigate(AppStep.CONTACT)} className="hover:text-brand-heading transition-colors">Contact Us</button></li>
                  <li><button onClick={() => onNavigate(AppStep.MISSION)} className="hover:text-brand-heading transition-colors">Our Mission</button></li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-brand-emotion/50 text-center text-brand-body/40 text-xs uppercase tracking-widest">
              © 2026 Memorial Pet Films. All memories kept safe.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
