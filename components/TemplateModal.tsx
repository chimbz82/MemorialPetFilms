
import React, { useEffect, useRef } from 'react';
import { Template } from '../types';
import Button from './Button';

interface TemplateModalProps {
  template: Template;
  onClose: () => void;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ template, onClose, onSelect, isSelected }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    modalRef.current?.focus();
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-brand-main rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl focus:outline-none relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-800 hover:bg-white transition-all text-2xl shadow-sm"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
          {/* Preview Area */}
          <div className={`${template.previewColor} lg:col-span-3 aspect-video lg:aspect-auto flex items-center justify-center relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
            <div className="text-center p-12 relative z-10">
              <span className="text-brand-heading/30 font-serif italic text-2xl block mb-2">Artisan Template</span>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-brand-heading">{template.name}</h3>
              <div className="mt-12 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-xl max-w-sm mx-auto animate-pulse">
                <p className="text-brand-heading/60 text-[10px] uppercase tracking-widest font-bold">HD Video Preview Rendering...</p>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8 flex gap-2">
              <div className="w-1.5 h-1.5 bg-brand-heading/20 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-brand-heading/20 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-brand-heading/20 rounded-full"></div>
            </div>
          </div>

          {/* Details Area */}
          <div className="lg:col-span-2 p-10 lg:p-16 flex flex-col justify-between bg-white">
            <div>
              <div className="mb-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 block">Visual Specification</span>
                <h2 id="modal-title" className="text-4xl font-serif font-bold text-brand-heading mb-6">{template.name}</h2>
                <div className="w-12 h-1 bg-brand-section rounded-full mb-8"></div>
              </div>
              
              <p className="text-brand-body leading-relaxed mb-10 text-lg font-light">
                {template.longDescription || template.description}
              </p>
              
              <div className="space-y-6 mb-12">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-body/40">Artistic Features</h4>
                <ul className="space-y-4">
                  {[
                    'Mastered in High-Definition (1080p)',
                    'Harmonised Colour Grading',
                    'Artistic Narrative Pacing',
                    template.id === 'life-well-lived' ? 'Chronological Media Flow' : 'Emotionally Balanced Transitions'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-brand-body/70">
                      <span className="w-5 h-5 rounded-full bg-brand-section flex items-center justify-center mr-4 shrink-0">
                        <svg className="w-3 h-3 text-brand-heading" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                className={`py-5 text-lg shadow-lg ${isSelected ? 'opacity-80' : 'hover:scale-[1.02]'}`}
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                variant={isSelected ? "outline" : "primary"}
              >
                {isSelected ? "Currently Selected" : "Use this template"}
              </Button>
              <button 
                onClick={onClose}
                className="text-brand-body/40 hover:text-brand-body transition-colors text-xs font-bold uppercase tracking-widest py-2"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
