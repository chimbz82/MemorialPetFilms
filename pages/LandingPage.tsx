
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
    <div className="min-h-screen bg-brand-main">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 bg-gradient-to-b from-brand-section to-brand-main relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-serif text-brand-heading mb-8 leading-tight">
            A Dignified Farewell for<br />
            <span className="italic opacity-60">Your Dearest Friend</span>
          </h1>
          <p className="text-xl text-brand-body mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Preserve their legacy with a high-definition video memorial.<br className="hidden md:block" />
            Designed for reflection, delivered with care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Button onClick={onStart} className="text-lg px-12 py-5 shadow-sm">Create a Memorial</Button>
            <Button variant="outline" onClick={() => templatesRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-lg px-12 py-5">View Styles</Button>
          </div>
          <p className="text-[10px] text-brand-body/50 font-bold uppercase tracking-[0.2em] mb-12">
            No accounts • One-time payment • Private delivery link
          </p>

          {/* Preview Strip */}
          <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 p-2 bg-white/30 backdrop-blur rounded-2xl border border-brand-section/50 shadow-sm opacity-80 group hover:opacity-100 transition-opacity">
            <div className="aspect-video bg-brand-section/50 rounded-lg overflow-hidden flex items-center justify-center border border-brand-section">
               <div className="w-full h-full bg-gradient-to-br from-brand-section to-brand-emotion"></div>
            </div>
            <div className="aspect-video bg-brand-section/50 rounded-lg overflow-hidden flex items-center justify-center border border-brand-section">
               <div className="w-full h-full bg-gradient-to-br from-brand-emotion to-brand-section"></div>
            </div>
            <div className="aspect-video bg-brand-section/50 rounded-lg overflow-hidden flex items-center justify-center border border-brand-section">
               <div className="w-full h-full bg-gradient-to-br from-brand-section to-brand-emotion"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               <span className="bg-brand-body/10 backdrop-blur-sm text-[10px] font-bold text-brand-heading px-3 py-1 rounded-full uppercase tracking-widest">Preview Frame Strip</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] translate-x-1/2"></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={howItWorksRef} className="py-32 px-6 bg-brand-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-heading mb-6">Refined Creation</h2>
            <p className="text-brand-body/70 max-w-xl mx-auto leading-relaxed">A seamless, respectful journey to a lasting tribute.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: '📷', title: 'Gather Memories', desc: 'Select up to 30 photos or video clips of your companion.' },
              { icon: '🎨', title: 'Tell Their Story', desc: 'Choose a respectful template and gentle background music.' },
              { icon: '💝', title: 'Private Delivery', desc: 'Your HD video is rendered and delivered securely via email.' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center md:text-left">
                <div className="text-brand-emotion/40 text-[120px] font-serif absolute -top-16 -left-4 leading-none select-none">0{idx+1}</div>
                <div className="relative z-10 pt-4">
                  <div className="text-4xl mb-8 grayscale opacity-60">{item.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-heading mb-4">{item.title}</h3>
                  <p className="text-brand-body leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" ref={templatesRef} className="py-32 px-6 bg-brand-main">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-heading mb-6">Tasteful Styles</h2>
            <p className="text-brand-body/70 max-w-xl mx-auto">Nine carefully designed templates for every unique personality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 3).map((template) => (
              <button 
                key={template.id} 
                onClick={() => setSelectedPreview(template)}
                className="bg-brand-section rounded-[2.5rem] overflow-hidden border border-brand-emotion shadow-sm hover:shadow-xl transition-all duration-500 group text-left focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <div className={`${template.previewColor} aspect-video relative overflow-hidden flex items-center justify-center`}>
                  <div className="w-3/4 h-3/4 border border-brand-heading/10 rounded flex items-center justify-center text-[10px] font-bold text-brand-body/40 uppercase tracking-widest group-hover:scale-105 transition-transform duration-700">
                    Click to Preview
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-serif font-bold text-brand-heading">{template.name}</h3>
                    <span className="text-brand-primary group-hover:text-brand-heading transition-colors">→</span>
                  </div>
                  <p className="text-sm text-brand-body/70 leading-relaxed font-light">
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
      <section id="pricing" ref={pricingRef} className="py-32 px-6 bg-brand-emotion/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-heading mb-6">Simple Pricing</h2>
            <p className="text-brand-body/70">One-time payment for a lifetime of memories.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(PACKAGES).map(([key, pkg]) => (
              <div key={key} className={`border border-brand-section rounded-[3rem] p-12 flex flex-col transition-all duration-500 ${key === 'premium' ? 'bg-white border-brand-primary shadow-2xl scale-105 z-10' : 'bg-brand-section/50 hover:border-brand-primary'}`}>
                {key === 'premium' && <span className="bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-5 rounded-full self-start mb-8 shadow-sm">Most Chosen</span>}
                <h4 className="text-xl font-bold text-brand-heading mb-2">{pkg.name}</h4>
                <div className="text-5xl font-serif text-brand-body mb-10">£{pkg.price}</div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-brand-body/70">
                      <span className="text-brand-heading mr-4 font-bold">✓</span>
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
      <section className="py-32 px-6 bg-brand-main border-y border-brand-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: '🔒', title: 'Private & Secure', desc: 'Encrypted storage and private links.', color: 'var(--accent-secondary)' },
              { icon: '👤', title: 'No Accounts', desc: 'We don\'t require sign-ups or passwords.', color: 'var(--accent-primary)' },
              { icon: '🔄', title: 'No Subscriptions', desc: 'One simple, upfront payment.', color: 'var(--accent-soft)' },
              { icon: '🧹', title: 'Auto-Cleanup', desc: 'All files deleted after 30 days.', color: 'var(--accent-decorative)' },
            ].map((card, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">{card.icon}</div>
                <h5 className="font-serif font-bold text-brand-heading mb-2">{card.title}</h5>
                <p className="text-xs text-brand-body/50 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog Modal */}
      {showAllTemplates && (
        <div className="fixed inset-0 z-[100] bg-brand-main overflow-y-auto p-8 animate-in fade-in zoom-in duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-brand-heading">Our Style Catalog</h2>
              <button onClick={() => setShowAllTemplates(false)} className="text-brand-heading/50 hover:text-brand-heading transition-colors uppercase tracking-widest text-xs font-bold">Close ×</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {TEMPLATES.map((template) => (
                <button 
                  key={template.id} 
                  className="group text-left focus:outline-none"
                  onClick={() => setSelectedPreview(template)}
                >
                  <div className={`${template.previewColor} aspect-video rounded-3xl mb-6 flex items-center justify-center border border-brand-section shadow-sm transition-all group-hover:shadow-md`}>
                     <span className="text-[10px] font-bold text-brand-body/20 uppercase tracking-widest group-hover:scale-110 transition-transform">Preview {template.name}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-brand-heading mb-2">{template.name}</h3>
                  <p className="text-sm text-brand-body/70 leading-relaxed">{template.description}</p>
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
