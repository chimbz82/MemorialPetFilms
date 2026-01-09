
import React, { useState } from 'react';
import { AppStep, MemorialData, PackageType, Template } from '../types';
import FileUpload from '../components/FileUpload';
import AIDescriptionHelper from '../components/AIDescriptionHelper';
import Button from '../components/Button';
import TemplateModal from '../components/TemplateModal';
import { TEMPLATES, LIBRARY_TRACKS, PACKAGES } from '../constants';

interface CreatorPageProps {
  onSuccess: () => void;
  onNavigate: (step: AppStep, section?: string) => void;
}

const CreatorPage: React.FC<CreatorPageProps> = ({ onSuccess, onNavigate }) => {
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<Template | null>(null);
  const [data, setData] = useState<MemorialData>({
    petName: '',
    birthDate: '',
    passedDate: '',
    message: '',
    template: 'forever-loved',
    music: {
      source: 'library',
      libraryTrackId: 'gentle-piano',
      uploadedAudio: null,
    },
    package: PackageType.PREMIUM,
    files: [],
  });

  const nextStep = () => setCurrentSubStep(prev => prev + 1);
  const prevStep = () => setCurrentSubStep(prev => prev - 1);

  const handleDataChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleMusicChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, music: { ...prev.music, [field]: value } }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onSuccess();
  };

  const renderStep = () => {
    switch (currentSubStep) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">Gather Your Memories</h2>
            <p className="text-brand-body/70 mb-8">Choose the photos and videos that capture their spirit.</p>
            <FileUpload 
              files={data.files} 
              onChange={(files) => handleDataChange('files', files)} 
            />
            <div className="mt-12 flex justify-end">
              <Button 
                disabled={data.files.length < 5} 
                onClick={nextStep}
              >
                Continue to Details
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">Tell Their Story</h2>
            <p className="text-brand-body/70 mb-8">Add the personal details that make their tribute unique.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-brand-body mb-2">Pet's Name</label>
                <input 
                  type="text" 
                  value={data.petName}
                  onChange={(e) => handleDataChange('petName', e.target.value)}
                  placeholder="e.g. Bella"
                  className="w-full px-5 py-3 rounded-2xl border border-brand-section bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-body mb-2">Birth Date (Optional)</label>
                  <input 
                    type="date" 
                    value={data.birthDate}
                    onChange={(e) => handleDataChange('birthDate', e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border border-brand-section bg-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-body mb-2">Passed Date (Optional)</label>
                  <input 
                    type="date" 
                    value={data.passedDate}
                    onChange={(e) => handleDataChange('passedDate', e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border border-brand-section bg-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-body mb-2">Tribute Message</label>
                <textarea 
                  value={data.message}
                  onChange={(e) => handleDataChange('message', e.target.value)}
                  rows={4}
                  placeholder="Forever in our hearts..."
                  className="w-full px-5 py-3 rounded-2xl border border-brand-section bg-white focus:outline-none focus:border-brand-primary resize-none"
                />
                <AIDescriptionHelper 
                  petName={data.petName} 
                  onTributeGenerated={(text) => handleDataChange('message', text)} 
                />
              </div>
            </div>

            <div className="mt-12 flex justify-between">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button disabled={!data.petName} onClick={nextStep}>Style & Music</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">Refine the Atmosphere</h2>
            <p className="text-brand-body/70 mb-8">Choose the visual style and sound for their memorial.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="font-serif text-xl font-bold text-brand-heading mb-4">Template Selection</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEMPLATES.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => handleDataChange('template', t.id)}
                      className={`relative group cursor-pointer rounded-2xl border-2 p-4 transition-all text-left ${data.template === t.id ? 'border-brand-primary bg-brand-section/30' : 'border-brand-section hover:border-brand-primary/50'}`}
                    >
                      <div className={`${t.previewColor} h-24 rounded-lg mb-3 flex items-center justify-center`}>
                        <span 
                          className="opacity-0 group-hover:opacity-100 text-[10px] uppercase font-bold tracking-widest bg-white/80 px-2 py-1 rounded transition-opacity text-brand-heading"
                          onClick={(e) => { e.stopPropagation(); setSelectedPreview(t); }}
                        >
                          Preview
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-brand-heading">{t.name}</h5>
                      <p className="text-[10px] text-brand-body/60 leading-tight">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-brand-heading mb-4">Background Music</h4>
                <div className="space-y-4">
                  {LIBRARY_TRACKS.map(track => (
                    <div 
                      key={track.id}
                      onClick={() => {
                        handleMusicChange('libraryTrackId', track.id);
                        handleMusicChange('source', 'library');
                      }}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.music.source === 'library' && data.music.libraryTrackId === track.id ? 'border-brand-primary bg-brand-section/30' : 'border-brand-section hover:border-brand-primary/50'}`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">🎵</span>
                        <div className="font-medium text-brand-body">{track.title}</div>
                      </div>
                      <div className="text-brand-body/40 text-sm">{track.duration}</div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-brand-section">
                    <p className="text-sm text-brand-body/70 mb-2 font-semibold">Or upload your own song</p>
                    <input 
                      type="file" 
                      accept="audio/*" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleMusicChange('uploadedAudio', e.target.files[0]);
                          handleMusicChange('source', 'upload');
                        }
                      }}
                      className="text-xs text-brand-body/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-section file:text-brand-body hover:file:bg-brand-primary/20"
                    />
                    <p className="text-[10px] text-brand-body/40 mt-3 italic leading-relaxed">
                      When uploading your own music, please ensure you have the necessary rights or permission to use the track in your memorial.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button onClick={nextStep}>Review & Checkout</Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">One Final Look</h2>
            <p className="text-brand-body/70 mb-8">Review your choices and complete your order.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white border border-brand-section rounded-3xl p-8 shadow-sm">
                  <h4 className="font-serif text-xl font-bold text-brand-heading mb-6 flex items-center">
                    <span className="mr-2">📋</span> Summary
                  </h4>
                  <dl className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-brand-section/30 pb-2">
                      <dt className="text-brand-body/50">Pet Name</dt>
                      <dd className="font-semibold text-brand-body">{data.petName}</dd>
                    </div>
                    <div className="flex justify-between border-b border-brand-section/30 pb-2">
                      <dt className="text-brand-body/50">Files</dt>
                      <dd className="font-semibold text-brand-body">{data.files.length} items</dd>
                    </div>
                    <div className="flex justify-between border-b border-brand-section/30 pb-2">
                      <dt className="text-brand-body/50">Style</dt>
                      <dd className="font-semibold text-brand-body capitalize">{data.template.replace('-', ' ')}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-brand-body/50">Sound</dt>
                      <dd className="font-semibold text-brand-body capitalize">
                        {data.music.source === 'library' 
                          ? (LIBRARY_TRACKS.find(t => t.id === data.music.libraryTrackId)?.title || 'Selected Track')
                          : (data.music.uploadedAudio?.name || 'Custom Upload')
                        }
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-brand-emotion/40 border border-brand-emotion rounded-3xl p-6 text-brand-body">
                  <div className="flex items-start">
                    <span className="text-xl mr-3">💡</span>
                    <p className="text-sm">
                      Our artisans will review your photos to ensure the best possible rendering quality. You'll receive a download link via email once it's complete.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-brand-heading mb-4">Choose Package</h4>
                <div className="space-y-3">
                  {Object.entries(PACKAGES).map(([key, pkg]) => (
                    <button 
                      key={key}
                      onClick={() => handleDataChange('package', key)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${data.package === key ? 'border-brand-primary bg-brand-section/30' : 'border-brand-section bg-white hover:border-brand-primary/50'}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-brand-heading">{pkg.name}</span>
                        <span className="font-serif font-bold text-brand-body">£{pkg.price}</span>
                      </div>
                      <div className="text-[10px] text-brand-body/50">{pkg.delivery} delivery</div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-brand-section">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-brand-body/50">Order Total</span>
                    <span className="text-2xl font-serif font-bold text-brand-body">£{PACKAGES[data.package].price}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleSubmit} 
                    loading={loading}
                  >
                    Complete Order
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <Button variant="ghost" onClick={prevStep} disabled={loading}>Back</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-main min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
             {[1, 2, 3, 4].map(s => (
               <div key={s} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all ${currentSubStep >= s ? 'bg-brand-primary text-brand-body' : 'bg-brand-section text-brand-body/30'}`}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`absolute top-5 left-[60%] w-[80%] h-[2px] -z-0 ${currentSubStep > s ? 'bg-brand-primary' : 'bg-brand-section'}`}></div>
                  )}
                  <span className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${currentSubStep >= s ? 'text-brand-heading' : 'text-brand-body/30'}`}>
                    {['Upload', 'Details', 'Style', 'Finish'][s-1]}
                  </span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="card bg-brand-section/20 p-8 md:p-12 rounded-[2rem] shadow-sm border border-brand-section">
          {renderStep()}
        </div>

        {selectedPreview && (
          <TemplateModal 
            template={selectedPreview} 
            onClose={() => setSelectedPreview(null)}
            onSelect={(id) => handleDataChange('template', id)}
            isSelected={data.template === selectedPreview.id}
          />
        )}
      </div>
    </div>
  );
};

export default CreatorPage;
