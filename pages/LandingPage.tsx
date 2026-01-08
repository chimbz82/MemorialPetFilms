
import React from 'react';
import Button from '../components/Button';
import { AppStep } from '../types';
import { PACKAGES, TEMPLATES } from '../constants';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (step: AppStep) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-8 leading-tight">
              A Dignified Farewell for <br />
              <span className="italic text-stone-500">Your Dearest Friend</span>
            </h1>
            <p className="text-xl text-stone-500 mb-10 max-w-2xl mx-auto">
              Preserve their legacy with a beautiful, high-definition video memorial. Simple to create, profound to keep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={onStart} className="text-lg px-10">Create a Memorial</Button>
              <Button variant="outline" className="text-lg px-10">View Templates</Button>
            </div>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full -z-0 pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-stone-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-100 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-stone-800 mb-16">The Journey to Memory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Gather Memories', desc: 'Select up to 30 photos or short video clips of your companion.' },
              { step: '02', title: 'Tell Their Story', desc: 'Choose a respectful template and gentle background music.' },
              { step: '03', title: 'Receive Your Tribute', desc: 'Get a professionally rendered video delivered to your inbox.' },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-serif text-stone-50 absolute -top-10 left-0 group-hover:text-stone-100 transition-colors -z-0">
                  {item.step}
                </div>
                <div className="relative z-10 pt-6">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{item.title}</h3>
                  <p className="text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Slider Mock */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4">Tasteful Templates</h2>
            <p className="text-stone-500">Carefully designed for every unique personality.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 3).map((template) => (
              <div key={template.id} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                <div className={`${template.previewColor} h-48 flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}>
                   <span className="text-stone-400 font-serif italic">Preview Frame</span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-stone-800 mb-2">{template.name}</h4>
                  <p className="text-stone-500 text-sm">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4">Honoring Them Should Be Simple</h2>
            <p className="text-stone-500">One-time payment. No subscriptions. Respectful support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(PACKAGES).map(([key, pkg]) => (
              <div key={key} className={`border-2 rounded-3xl p-8 flex flex-col ${key === 'premium' ? 'border-stone-800 bg-stone-50 shadow-xl scale-105' : 'border-stone-100 bg-white'}`}>
                {key === 'premium' && <span className="bg-stone-800 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full self-start mb-4">Most Loved</span>}
                <h4 className="text-xl font-bold text-stone-800 mb-2">{pkg.name}</h4>
                <div className="text-4xl font-serif text-stone-900 mb-6">£{pkg.price}</div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-stone-600">
                      <span className="mr-3 text-stone-800">✓</span>
                      {f}
                    </li>
                  ))}
                  <li className="flex items-center text-sm text-stone-600">
                    <span className="mr-3 text-stone-800">✓</span>
                    {pkg.delivery} delivery
                  </li>
                </ul>
                <Button variant={key === 'premium' ? 'primary' : 'outline'} onClick={onStart}>Select {key}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-32 bg-stone-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-3xl font-serif italic mb-8">
            "We were so touched by the video. It captured our Bella's spirit perfectly and gave us a beautiful way to share our memories with the family."
          </p>
          <div className="text-stone-400 uppercase tracking-widest text-sm font-bold">— Sarah T., London</div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
