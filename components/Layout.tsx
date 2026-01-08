
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
    // If it's a link to a section on the same page, we handle it via state/scroll
    e.preventDefault();
    onNavigate(step, section);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!hideNav && (
        <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-[60] pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a 
                href="/"
                className="flex items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-lg px-2 py-1 z-[70] pointer-events-auto"
                onClick={(e) => handleNavClick(e, AppStep.LANDING)}
              >
                <span className="text-xl mr-2 grayscale group-hover:grayscale-0 transition-all duration-300">🐾</span>
                <span className="text-lg font-serif font-bold text-stone-800 tracking-tight">Eternal Paws</span>
              </a>
              <div className="hidden md:flex space-x-8 text-sm font-medium items-center z-[70] pointer-events-auto">
                <a 
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, AppStep.LANDING, 'how-it-works')} 
                  className="text-stone-500 hover:text-stone-900 relative py-1 transition-colors cursor-pointer"
                >
                  How it works
                </a>
                <a 
                  href="#templates"
                  onClick={(e) => handleNavClick(e, AppStep.LANDING, 'templates')} 
                  className="text-stone-500 hover:text-stone-900 relative py-1 transition-colors cursor-pointer"
                >
                  Templates
                </a>
                <a 
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, AppStep.LANDING, 'pricing')} 
                  className="text-stone-500 hover:text-stone-900 relative py-1 transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <a 
                  href="/create"
                  onClick={(e) => handleNavClick(e, AppStep.UPLOAD)}
                  className="bg-stone-900 text-white px-5 py-2 rounded-full hover:bg-stone-800 transition-all shadow-sm active:scale-95 cursor-pointer ml-4"
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
        <footer className="bg-stone-50 border-t border-stone-200 py-16 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <span className="text-xl mr-2 opacity-60">🐾</span>
                  <span className="text-xl font-serif font-bold text-stone-800">Eternal Paws</span>
                </div>
                <p className="text-stone-500 max-w-sm leading-relaxed text-sm">
                  Helping families honor their beloved companions with dignified, beautiful video memorials since 2024.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-6 uppercase tracking-widest text-[10px]">Support</h4>
                <ul className="space-y-4 text-stone-500 text-sm">
                  <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900 transition-colors">Privacy Policy</button></li>
                  <li><button onClick={() => onNavigate(AppStep.TERMS)} className="hover:text-stone-900 transition-colors">Terms of Service</button></li>
                  <li><button onClick={() => onNavigate(AppStep.REFUNDS)} className="hover:text-stone-900 transition-colors">Refund Policy</button></li>
                  <li><button onClick={() => onNavigate(AppStep.FAQ)} className="hover:text-stone-900 transition-colors">FAQs</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-6 uppercase tracking-widest text-[10px]">Company</h4>
                <ul className="space-y-4 text-stone-500 text-sm">
                  <li><button onClick={() => onNavigate(AppStep.CONTACT)} className="hover:text-stone-900 transition-colors">Contact Us</button></li>
                  <li><button onClick={() => onNavigate(AppStep.MISSION)} className="hover:text-stone-900 transition-colors">Our Mission</button></li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-stone-200 text-center text-stone-400 text-xs uppercase tracking-widest">
              © 2024 Eternal Paws. All memories kept safe.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
