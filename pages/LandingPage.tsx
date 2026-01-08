
import React, { useRef } from 'react';
import Button from '../components/Button';
import { AppStep } from '../types';
import { PACKAGES, TEMPLATES } from '../constants';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (step: AppStep) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigate }) => {
  // Create refs for scroll sections
  const heroRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const templatesRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  // Scroll handler
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar for Landing Page */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-stone-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection(heroRef)}
            >
              <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white text-xl">🐾</span>
              </div>
              <span className="text-xl font-serif font-bold text-stone-800">Eternal Paws</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection(howItWorksRef)}
                className="text-stone-500 hover:text-stone-900 font-medium transition-colors"
              >
                How it works
              </button>
              <button 
                onClick={() => scrollToSection(templatesRef)}
                className="text-stone-500 hover:text-stone-900 font-medium transition-colors"
              >
                Templates
              </button>
              <button 
                onClick={() => scrollToSection(pricingRef)}
                className="text-stone-500 hover:text-stone-900 font-medium transition-colors"
              >
                Pricing
              </button>
              <Button 
                onClick={onStart}
                className="px-6 py-2 text-sm"
              >
                Create Tribute
              </Button>
            </div>

            {/* Mobile Menu Placeholder (Simplified for single-page feel) */}
            <button className="md:hidden text-stone-600" onClick={onStart}>
               <span className="text-sm font-bold uppercase tracking-widest">Start</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-16 bg-gradient-to-b from-stone-50 to-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-8 leading-tight">
            A Dignified Farewell for<br />
            <span className="italic text-stone-400">Your Dearest Friend</span>
          </h1>
          <p className="text-xl text-stone-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Preserve their legacy with a beautiful, high-definition video memorial.<br className="hidden md:block" />
            Simple to create, profound to keep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={onStart}
              className="text-lg px-10 py-4 w-full sm:w-auto"
            >
              Create a Memorial
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection(templatesRef)}
              className="text-lg px-10 py-4 w-full sm:w-auto"
            >
              View Templates
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-stone-100 rounded-full blur-3xl opacity-50 -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-stone-50 rounded-full blur-3xl opacity-50 translate-x-1/2"></div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-32 px-6 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
              The Journey to Memory
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              We've refined the creation process to be as respectful and seamless as possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: '01', icon: '📷', title: 'Gather Memories', desc: 'Select up to 30 photos or short video clips of your companion.' },
              { step: '02', icon: '🎨', title: 'Tell Their Story', desc: 'Choose a respectful template and gentle background music.' },
              { step: '03', icon: '💝', title: 'Receive Your Tribute', desc: 'Get a professionally rendered video delivered to your inbox.' },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-serif text-stone-50 absolute -top-10 left-0 group-hover:text-stone-100 transition-colors duration-500 select-none">
                  {item.step}
                </div>
                <div className="relative z-10 pt-6">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Slider Section */}
      <section ref={templatesRef} className="py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
              Tasteful Templates
            </h2>
            <p className="text-lg text-stone-500">
              Each style is carefully designed to honor a unique personality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <div key={template.id} className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`${template.previewColor} aspect-video flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-stone-300 font-serif italic group-hover:scale-110 transition-transform duration-700">Preview Frame</span>
                  <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">{template.name}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" onClick={onStart}>
              Explore all 9 styles
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
              Honoring Them Should Be Simple
            </h2>
            <p className="text-lg text-stone-500">
              One-time payment. No subscriptions. Dignified support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Standard */}
            <div className="border border-stone-200 rounded-[2.5rem] p-10 flex flex-col hover:border-stone-400 transition-colors">
              <h3 className="text-xl font-bold text-stone-800 mb-2">{PACKAGES.standard.name}</h3>
              <div className="text-4xl font-serif text-stone-900 mb-8">£{PACKAGES.standard.price}</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {PACKAGES.standard.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm text-stone-500">
                    <span className="text-stone-800 mr-3">✓</span>
                    {f}
                  </li>
                ))}
                <li className="flex items-start text-sm text-stone-500">
                  <span className="text-stone-800 mr-3">✓</span>
                  {PACKAGES.standard.delivery} delivery
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onStart}>
                Select standard
              </Button>
            </div>

            {/* Premium */}
            <div className="border-2 border-stone-800 rounded-[2.5rem] p-10 flex flex-col bg-stone-50 shadow-2xl relative transform md:scale-105 z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-stone-800 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  MOST LOVED
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">{PACKAGES.premium.name}</h3>
              <div className="text-4xl font-serif text-stone-900 mb-8">£{PACKAGES.premium.price}</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {PACKAGES.premium.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm text-stone-700">
                    <span className="text-stone-900 mr-3">✓</span>
                    {f}
                  </li>
                ))}
                <li className="flex items-start text-sm text-stone-700">
                  <span className="text-stone-900 mr-3">✓</span>
                  {PACKAGES.premium.delivery} delivery
                </li>
              </ul>
              <Button className="w-full" onClick={onStart}>
                Select premium
              </Button>
            </div>

            {/* Rush */}
            <div className="border border-stone-200 rounded-[2.5rem] p-10 flex flex-col hover:border-stone-400 transition-colors">
              <h3 className="text-xl font-bold text-stone-800 mb-2">{PACKAGES.rush.name}</h3>
              <div className="text-4xl font-serif text-stone-900 mb-8">£{PACKAGES.rush.price}</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {PACKAGES.rush.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm text-stone-500">
                    <span className="text-stone-800 mr-3">✓</span>
                    {f}
                  </li>
                ))}
                <li className="flex items-start text-sm text-stone-500">
                  <span className="text-stone-800 mr-3">✓</span>
                  {PACKAGES.rush.delivery} priority
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onStart}>
                Select rush
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-6 bg-stone-900 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-5xl text-stone-700 font-serif mb-12 opacity-50 select-none">“</div>
          <p className="text-2xl md:text-4xl font-serif italic mb-10 leading-relaxed text-stone-100">
            We were so touched by the video. It captured our Bella's spirit perfectly and gave us a beautiful way to share our memories with the family.
          </p>
          <div className="text-stone-400 uppercase tracking-widest text-sm font-bold">
            — Sarah T., London
          </div>
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-stone-800 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-800 rounded-full blur-[120px] opacity-20"></div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🐾</span>
                </div>
                <span className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Eternal Paws</span>
              </div>
              <p className="text-stone-500 max-w-sm leading-relaxed">
                Helping families honor their beloved companions with dignified, beautiful video memorials since 2024.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-stone-900 mb-6 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-stone-500 text-sm">
                <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => onNavigate(AppStep.LEGAL)} className="hover:text-stone-900 transition-colors">Refund Policy</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-stone-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-stone-500 text-sm">
                <li><button className="hover:text-stone-900 transition-colors">Contact Us</button></li>
                <li><button className="hover:text-stone-900 transition-colors">Our Mission</button></li>
                <li><button className="hover:text-stone-900 transition-colors">FAQs</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-stone-400 text-xs uppercase tracking-widest font-medium">
              © 2024 Eternal Paws. All memories kept safe.
            </p>
            <div className="flex space-x-6">
               {/* Minimal social icons could go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
