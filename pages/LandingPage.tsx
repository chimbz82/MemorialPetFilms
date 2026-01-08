
import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import TemplateModal from '../components/TemplateModal';
import { AppStep, Template } from '../types';
import { PACKAGES, TEMPLATES } from '../constants';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (step: AppStep, section?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigate }) => {
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<Template | null>(null);
  
  const heroRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const templatesRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-8 leading-tight">
            A Dignified Farewell for<br />
            <span className="italic text-stone-400">Your Dearest Friend</span>
          </h1>
          <p className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Preserve their legacy with a high-definition video memorial.<br className="hidden md:block" />
            Designed for reflection, delivered with care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Button onClick={onStart} className="text-lg px-12 py-5 shadow-xl">Create a Memorial</Button>
            <Button variant="outline" onClick={() => templatesRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-lg px-12 py-5">View Styles</Button>
          </div>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mb-12">
            No accounts • One-time payment • Private delivery link
          </p>

          {/* Preview Strip */}
          <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 p-2 bg-white/50 backdrop-blur rounded-2xl border border-stone-100 shadow-sm opacity-80 group hover:opacity-100 transition-opacity">
            <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden flex items-center justify-center border border-stone-100">
               <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200"></div>
            </div>
            <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden flex items-center justify-center border border-stone-100">
               <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-100"></div>
            </div>
            <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden flex items-center justify-center border border-stone-100">
               <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               <span className="bg-stone-900/10 backdrop-blur-sm text-[10px] font-bold text-stone-800 px-3 py-1 rounded-full uppercase tracking-widest">Preview Frame Strip</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-0 w-96 h-96 bg-stone-200/30 rounded-full blur-[100px] -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-stone-100/50 rounded-full blur-[100px] translate-x-1/2"></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={howItWorksRef} className="py-32 px-6 bg-white border-y border-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Refined Creation</h2>
            <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">A seamless, respectful journey to a lasting tribute.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: '📷', title: 'Gather Memories', desc: 'Select up to 30 photos or video clips of your companion.' },
              { icon: '🎨', title: 'Tell Their Story', desc: 'Choose a respectful template and gentle background music.' },
              { icon: '💝', title: 'Private Delivery', desc: 'Your HD video is rendered and delivered securely via email.' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center md:text-left">
                <div className="text-stone-50 text-[120px] font-serif absolute -top-16 -left-4 leading-none select-none">0{idx+1}</div>
                <div className="relative z-10 pt-4">
                  <div className="text-4xl mb-8 grayscale opacity-60">{item.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" ref={templatesRef} className="py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Tasteful Styles</h2>
            <p className="text-stone-400 max-w-xl mx-auto">Nine carefully designed templates for every unique personality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 3).map((template) => (
              <button 
                key={template.id} 
                onClick={() => setSelectedPreview(template)}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group text-left focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <div className={`${template.previewColor} aspect-video relative overflow-hidden flex items-center justify-center`}>
                  <div className="w-3/4 h-3/4 border border-stone-900/10 rounded flex items-center justify-center text-[10px] font-bold text-stone-400 uppercase tracking-widest group-hover:scale-105 transition-transform duration-700">
                    Click to Preview
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-serif font-bold text-stone-800">{template.name}</h3>
                    <span className="text-stone-300 group-hover:text-stone-900 transition-colors">→</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed font-light">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button variant="outline" onClick={() => setShowAllTemplates(true)} className="px-10">View all 9 styles</Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Simple Pricing</h2>
            <p className="text-stone-400">One-time payment for a lifetime of memories.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(PACKAGES).map(([key, pkg]) => (
              <div key={key} className={`border border-stone-100 rounded-[3rem] p-12 flex flex-col transition-all duration-500 ${key === 'premium' ? 'bg-stone-50 border-stone-800/20 shadow-2xl scale-105 z-10' : 'hover:border-stone-300'}`}>
                {key === 'premium' && <span className="bg-stone-800 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-5 rounded-full self-start mb-8">Most Chosen</span>}
                <h4 className="text-xl font-bold text-stone-800 mb-2">{pkg.name}</h4>
                <div className="text-5xl font-serif text-stone-900 mb-10">£{pkg.price}</div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-stone-500">
                      <span className="text-stone-800 mr-4 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={key === 'premium' ? 'primary' : 'outline'} className="w-full" onClick={onStart}>Select {key}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 px-6 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: '🔒', title: 'Private & Secure', desc: 'Encrypted storage and private links.' },
              { icon: '👤', title: 'No Accounts', desc: 'We don\'t require sign-ups or passwords.' },
              { icon: '🔄', title: 'No Subscriptions', desc: 'One simple, upfront payment.' },
              { icon: '🧹', title: 'Auto-Cleanup', desc: 'All files deleted after 30 days.' },
            ].map((card, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-6 grayscale">{card.icon}</div>
                <h5 className="font-serif font-bold text-stone-800 mb-2">{card.title}</h5>
                <p className="text-xs text-stone-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog Modal */}
      {showAllTemplates && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-8 animate-in fade-in zoom-in duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-stone-800">Our Style Catalog</h2>
              <button onClick={() => setShowAllTemplates(false)} className="text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest text-xs font-bold">Close ×</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {TEMPLATES.map((template) => (
                <button 
                  key={template.id} 
                  className="group text-left focus:outline-none"
                  onClick={() => setSelectedPreview(template)}
                >
                  <div className={`${template.previewColor} aspect-video rounded-3xl mb-6 flex items-center justify-center border border-stone-50 shadow-sm transition-all group-hover:shadow-md`}>
                     <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest group-hover:scale-110 transition-transform">Preview {template.name}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-800 mb-2">{template.name}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{template.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-20 text-center pb-20">
               <Button onClick={onStart} className="px-12">Start Your Tribute</Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedPreview && (
        <TemplateModal 
          template={selectedPreview} 
          onClose={() => setSelectedPreview(null)}
          onSelect={() => onStart()}
        />
      )}
    </div>
  );
};

export default LandingPage;
