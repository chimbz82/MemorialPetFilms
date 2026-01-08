
import React from 'react';
import { AppStep } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (step: AppStep) => void;
  hideNav?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, hideNav, hideFooter }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && (
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => onNavigate(AppStep.LANDING)}
              >
                <span className="text-2xl mr-2 group-hover:scale-110 transition-transform">🐾</span>
                <span className="text-xl font-serif font-bold text-stone-800 tracking-tight">Eternal Paws</span>
              </div>
              <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-500">
                <button onClick={() => onNavigate(AppStep.LANDING)} className="hover:text-stone-900 transition-colors">How it works</button>
                <button onClick={() => onNavigate(AppStep.LANDING)} className="hover:text-stone-900 transition-colors">Pricing</button>
                <button 
                  onClick={() => onNavigate(AppStep.UPLOAD)}
                  className="bg-stone-800 text-white px-4 py-2 rounded-full hover:bg-stone-700 transition-all shadow-sm"
                >
                  Create Tribute
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {!hideFooter && (
        <footer className="bg-stone-50 border-t border-stone-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">🐾</span>
                  <span className="text-xl font-serif font-bold text-stone-800">Eternal Paws</span>
                </div>
                <p className="text-stone-500 max-w-sm">
                  Helping families honor their beloved companions with dignified, beautiful video memorials since 2024.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-4">Support</h4>
                <ul className="space-y-2 text-stone-500 text-sm">
                  <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900">Privacy Policy</button></li>
                  <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900">Terms of Service</button></li>
                  <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900">Refund Policy</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-4">Company</h4>
                <ul className="space-y-2 text-stone-500 text-sm">
                  <li><button className="hover:text-stone-900">Contact Us</button></li>
                  <li><button className="hover:text-stone-900">Our Mission</button></li>
                  <li><button className="hover:text-stone-900">FAQs</button></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-200 text-center text-stone-400 text-sm">
              © 2024 Eternal Paws. All memories kept safe.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
