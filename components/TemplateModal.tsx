
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
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Preview Area */}
          <div className={`${template.previewColor} aspect-video md:aspect-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-100`}>
            <div className="text-center p-12">
              <span className="text-stone-300 font-serif italic text-xl">Previewing</span>
              <h3 className="text-3xl font-serif font-bold text-stone-800 mt-2">{template.name}</h3>
              <p className="text-stone-400 text-xs uppercase tracking-widest mt-4 font-bold">MP4 Preview Coming Soon</p>
              {/* TODO: Swap for <video src={`/previews/${template.id}.mp4`} muted loop autoPlay /> once assets are ready */}
            </div>
          </div>

          {/* Details Area */}
          <div className="p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 id="modal-title" className="text-3xl font-serif font-bold text-stone-800">{template.name}</h2>
                <button 
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-900 transition-colors text-2xl"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <p className="text-stone-600 leading-relaxed mb-8">
                {template.longDescription || template.description}
              </p>
              
              <div className="space-y-4 mb-12">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Template Features</h4>
                <ul className="grid grid-cols-2 gap-3 text-xs text-stone-500">
                  <li className="flex items-center"><span className="mr-2">✓</span> High-res output</li>
                  <li className="flex items-center"><span className="mr-2">✓</span> Muted backgrounds</li>
                  <li className="flex items-center"><span className="mr-2">✓</span> Custom messaging</li>
                  <li className="flex items-center"><span className="mr-2">✓</span> {template.id === 'life-well-lived' ? 'Chronological flow' : 'Artistic pacing'}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-grow"
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                variant={isSelected ? "outline" : "primary"}
              >
                {isSelected ? "Currently Selected" : "Use this template"}
              </Button>
              <Button variant="ghost" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
