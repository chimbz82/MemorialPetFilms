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

  // Public preview assets (square GIFs)
  const HERO_PREVIEWS = [
    { src: '/previews/calmdog.gif', title: 'Gentle Farewell' },
    { src: '/previews/cutecat.gif', title: 'Soft Memory' },
    { src: '/previews/jumpdog.gif', title: 'Golden Hour' },
  ];

  return (
    <div className="min-h-screen bg-brand-main">
      {/* HERO */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 bg-gradient-to-b from-brand-section to-brand-main relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-brand-heading mb-8 leading-tight">
            A dignified farewell for
            <br />
            <span className="italic opacity-60">a beloved pet</span>
          </h1>

          <p className="text-xl text-brand-body mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Create a beautiful memorial film using photos, music, and memories you love.
            <br className="hidden md:block" />
            Designed for reflection, delivered with care.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Button onClick={onStart} className="text-lg px-12 py-5">
              Create a Memorial
            </Button>
            <Button
              variant="outline"
              onClick={() => templatesRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-12 py-5"
            >
              View Styles
            </Button>
          </div>

          <p className="text-[10px] text-brand-body/50 font-bold uppercase tracking-[0.2em] mb-12">
            No accounts • One-time payment • Private delivery link
          </p>

          {/* PREVIEW STRIP — SQUARE, CALM, FINAL */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white/30 backdrop-blur p-8 rounded-[2rem] border border-brand-section">
              {HERO_PREVIEWS.map((item) => (
                <div
                  key={item.src}
                  className="bg-brand-section rounded-2xl p-4 flex flex-col items-center"
                >
                  <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] overflow-hidden rounded-xl border border-brand-section bg-white">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs font-bold tracking-widest uppercase text-brand-heading">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-brand-body/60 mt-1">
                      Click to view styles
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howItWorksRef} className="py-32 px-6 bg-brand-section">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-heading mb-6">
            Refined Creation
          </h2>
          <p className="text-brand-body/70 max-w-xl mx-auto">
            A seamless, respectful journey to a lasting film tribute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
          {[
            { icon: '📷', title: 'Gather Memories', desc: 'Select photos and short clips.' },
            { icon: '🎨', title: 'Tell Their Story', desc: 'Choose a gentle visual style.' },
            { icon: '💝', title: 'Private Delivery', desc: 'Secure HD film delivered by email.' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-6 opacity-60">{item.icon}</div>
              <h3 className="text-xl font-serif font-bold text-brand-heading mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-brand-body/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section ref={templatesRef} className="py-32 px-6 bg-brand-main">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-heading mb-6">
            Tasteful Styles
          </h2>
          <p className="text-brand-body/70 max-w-xl mx-auto">
            Carefully designed templates for every memory.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TEMPLATES.slice(0, 3).map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedPreview(template)}
              className="bg-brand-section rounded-[2.5rem] overflow-hidden border border-brand-emotion hover:shadow-xl transition-all text-left"
            >
              <div className={`${template.previewColor} aspect-square`} />
              <div className="p-8">
                <h3 className="text-lg font-serif font-bold text-brand-heading mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-brand-body/70">{template.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="outline" onClick={() => setShowAllTemplates(true)}>
            View all styles
          </Button>
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} className="py-32 px-6 bg-brand-emotion/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {Object.entries(PACKAGES).map(([key, pkg]) => (
            <div
              key={key}
              className={`rounded-[3rem] p-12 border ${
                key === 'premium'
                  ? 'bg-white border-brand-primary shadow-2xl scale-105'
                  : 'bg-brand-section/50 border-brand-section'
              }`}
            >
              <h4 className="text-xl font-bold text-brand-heading mb-2">{pkg.name}</h4>
              <div className="text-5xl font-serif mb-8">£{pkg.price}</div>
              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, i) => (
                  <li key={i} className="text-sm text-brand-body/70">
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={onStart}>
                Select
              </Button>
            </div>
          ))}
        </div>
      </section>

      {showAllTemplates && (
        <TemplateModal
          template={selectedPreview}
          onClose={() => setShowAllTemplates(false)}
          onSelect={onStart}
        />
      )}
    </div>
  );
};

export default LandingPage;
