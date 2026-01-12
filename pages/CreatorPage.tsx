
import React, { useState } from 'react';
import { AppStep, MemorialData, PackageType, Template } from '../types';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import TemplateModal from '../components/TemplateModal';
import { TEMPLATES, LIBRARY_TRACKS, PACKAGES } from '../constants';

interface CreatorPageProps {
  onSuccess: () => void;
  onNavigate: (step: AppStep, section?: string) => void;
}

const MAX_AUDIO_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_AUDIO_EXTENSIONS = ['.mp3', '.m4a', '.wav'];
const API_BASE_URL = ''; // Assume relative path for proxy/monorepo or adjust as needed

const CreatorPage: React.FC<CreatorPageProps> = ({ onSuccess, onNavigate }) => {
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<Template | null>(null);
  const [data, setData] = useState<MemorialData>({
    petName: '',
    email: '',
    birthDate: '',
    passedDate: '',
    message: '',
    template: 'forever-loved',
    music: {
      source: 'library',
      libraryTrackId: 'gentle-piano-01',
      uploadedAudio: null,
    },
    package: PackageType.PREMIUM,
    files: [],
  });

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSubStep(prev => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSubStep(prev => prev - 1);
  };

  const handleDataChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleMusicChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, music: { ...prev.music, [field]: value } }));
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AUDIO_SIZE) {
      alert('Audio file too large. Maximum size is 20MB.');
      e.target.value = "";
      return;
    }

    const ext = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
    if (!ext || !ALLOWED_AUDIO_EXTENSIONS.includes(ext)) {
      alert(`Invalid file type. Only ${ALLOWED_AUDIO_EXTENSIONS.join(', ')} are allowed.`);
      e.target.value = "";
      return;
    }

    handleMusicChange('uploadedAudio', file);
    handleMusicChange('source', 'upload');
  };

  const handleSubmit = async () => {
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      alert("Please enter a valid email address for delivery.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create the order in the backend
      const orderResponse = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petName: data.petName,
          template: data.template,
          music: {
            source: data.music.source,
            libraryTrackId: data.music.libraryTrackId
          },
          package: data.package,
          files: data.files.map(f => f.name) // Metadata only for now, files would be uploaded to S3 separately
        })
      });

      const orderResult = await orderResponse.json();
      if (!orderResult.success) throw new Error(orderResult.error || 'Failed to create order');

      // 2. Initiate Stripe Checkout
      const checkoutResponse = await fetch(`${API_BASE_URL}/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderResult.order.orderId,
          packageType: data.package,
          email: data.email
        })
      });

      const checkoutResult = await checkoutResponse.json();
      if (checkoutResult.success && checkoutResult.url) {
        // Redirect to Stripe Checkout page
        window.location.href = checkoutResult.url;
      } else {
        throw new Error(checkoutResult.error || 'Payment gateway initialization failed');
      }

    } catch (error) {
      console.error("Submission Error:", error);
      alert("There was an error processing your request. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentSubStep) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">Gather Your Memories</h2>
            <p className="text-brand-body/70 mb-8 max-w-lg">Choose the photos and videos that capture their spirit. We recommend between 10 and 20 items for the best flow.</p>
            <FileUpload 
              files={data.files} 
              onChange={(files) => handleDataChange('files', files)} 
            />
            <div className="mt-12 flex justify-end">
              <Button 
                disabled={data.files.length < 5} 
                onClick={nextStep}
                className="px-10"
              >
                {data.files.length < 5 ? `Add ${5 - data.files.length} more to continue` : 'Continue to Details'}
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">Tell Their Story</h2>
            <p className="text-brand-body/70 mb-10">Add the personal details that make their tribute unique. These will be used for the opening and closing titles.</p>
            
            <div className="space-y-8">
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-widest text-brand-heading/60 mb-3">Pet's Name</label>
                <input 
                  type="text" 
                  value={data.petName}
                  onChange={(e) => handleDataChange('petName', e.target.value)}
                  placeholder="e.g. Bella"
                  className="w-full px-6 py-4 rounded-2xl border border-brand-section bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-lg font-serif"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-brand-heading/60 mb-3">Birth Date (Optional)</label>
                  <input 
                    type="date" 
                    value={data.birthDate}
                    onChange={(e) => handleDataChange('birthDate', e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-brand-section bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-brand-heading/60 mb-3">Passed Date (Optional)</label>
                  <input 
                    type="date" 
                    value={data.passedDate}
                    onChange={(e) => handleDataChange('passedDate', e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-brand-section bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-brand-heading/60 mb-3">Tribute Message</label>
                <textarea 
                  value={data.message}
                  onChange={(e) => handleDataChange('message', e.target.value)}
                  rows={4}
                  placeholder="Forever in our hearts..."
                  className="w-full px-6 py-4 rounded-2xl border border-brand-section bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none italic"
                />
                <AIDescriptionHelper 
                  petName={data.petName} 
                  onTributeGenerated={(text) => handleDataChange('message', text)} 
                />
              </div>
            </div>

            <div className="mt-16 flex justify-between gap-4">
              <Button variant="ghost" onClick={prevStep} className="px-8">Back</Button>
              <Button disabled={!data.petName} onClick={nextStep} className="px-10">Style & Music</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">Refine the Atmosphere</h2>
            <p className="text-brand-body/70 mb-10">Choose the visual style and sound for their memorial. Each template is crafted for a specific mood.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h4 className="font-serif text-xl font-bold text-brand-heading mb-6 flex items-center">
                  <span className="mr-3">🎨</span> Template Selection
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEMPLATES.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => handleDataChange('template', t.id)}
                      className={`relative group cursor-pointer rounded-3xl border-2 p-5 transition-all text-left ${data.template === t.id ? 'border-brand-primary bg-white shadow-lg scale-[1.02]' : 'border-brand-section hover:border-brand-primary/50'}`}
                    >
                      <div className={`${t.previewColor} h-28 rounded-2xl mb-4 flex items-center justify-center border border-brand-section/50 relative overflow-hidden`}>
                         <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
                        <span 
                          className="opacity-0 group-hover:opacity-100 text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full transition-opacity text-brand-heading shadow-sm z-10"
                          onClick={(e) => { e.stopPropagation(); setSelectedPreview(t); }}
                        >
                          Preview Style
                        </span>
                        {data.template === t.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                            <svg className="w-4 h-4 text-brand-body" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        )}
                      </div>
                      <h5 className="font-bold text-sm text-brand-heading mb-1">{t.name}</h5>
                      <p className="text-[11px] text-brand-body/60 leading-relaxed line-clamp-2">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-brand-heading mb-6 flex items-center">
                  <span className="mr-3">🎵</span> Background Music
                </h4>
                <div className="space-y-4">
                  {LIBRARY_TRACKS.map(track => (
                    <div 
                      key={track.id}
                      onClick={() => {
                        handleMusicChange('libraryTrackId', track.id);
                        handleMusicChange('source', 'library');
                      }}
                      className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.music.source === 'library' && data.music.libraryTrackId === track.id ? 'border-brand-primary bg-white shadow-sm scale-[1.01]' : 'border-brand-section hover:border-brand-primary/50'}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${data.music.source === 'library' && data.music.libraryTrackId === track.id ? 'bg-brand-primary text-brand-body' : 'bg-brand-section text-brand-body/40'}`}>
                          {data.music.source === 'library' && data.music.libraryTrackId === track.id ? '▶' : '♫'}
                        </div>
                        <div className="font-semibold text-brand-body">{track.title}</div>
                      </div>
                      <div className="text-brand-body/40 text-[10px] font-bold tracking-widest">{track.duration}</div>
                    </div>
                  ))}
                  
                  <div className="pt-8 border-t border-brand-section mt-8">
                    <p className="text-sm text-brand-heading mb-4 font-bold flex items-center">
                      <span className="mr-2">📤</span> Or upload your own song
                    </p>
                    <div className="relative group">
                      <input 
                        type="file" 
                        id="audio-upload"
                        accept=".mp3,.m4a,.wav" 
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                      <label 
                        htmlFor="audio-upload"
                        className="flex items-center justify-between w-full px-6 py-4 rounded-2xl border-2 border-dashed border-brand-section hover:border-brand-primary bg-brand-main/50 cursor-pointer transition-all"
                      >
                        <span className="text-sm text-brand-body/60 italic">
                          {data.music.uploadedAudio ? data.music.uploadedAudio.name : "Select MP3, M4A, or WAV..."}
                        </span>
                        <span className="bg-brand-section px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-heading">Browse</span>
                      </label>
                    </div>
                    <p className="text-[10px] text-brand-body/40 mt-4 italic leading-relaxed">
                      Please ensure you have permission to use any music you upload. For personal memorials, most instrumental tracks are suitable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 flex justify-between gap-4">
              <Button variant="ghost" onClick={prevStep} className="px-8">Back</Button>
              <Button onClick={nextStep} className="px-12">Review & Checkout</Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-brand-heading mb-2">One Final Look</h2>
            <p className="text-brand-body/70 mb-12">Review your choices and provide your delivery email. We'll begin crafting your film as soon as payment is confirmed.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="md:col-span-2 space-y-8">
                <div className="bg-white border border-brand-section rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <h4 className="font-serif text-xl font-bold text-brand-heading mb-8 flex items-center">
                    <span className="mr-3">📋</span> Summary
                  </h4>
                  <dl className="space-y-6 text-sm">
                    <div className="flex justify-between items-center border-b border-brand-section pb-4">
                      <dt className="text-brand-body/40 uppercase tracking-widest font-bold text-[10px]">Pet Name</dt>
                      <dd className="font-bold text-brand-heading text-lg">{data.petName}</dd>
                    </div>
                    <div className="flex justify-between items-center border-b border-brand-section pb-4">
                      <dt className="text-brand-body/40 uppercase tracking-widest font-bold text-[10px]">Memories</dt>
                      <dd className="font-semibold text-brand-body">{data.files.length} items uploaded</dd>
                    </div>
                    <div className="flex justify-between items-center border-b border-brand-section pb-4">
                      <dt className="text-brand-body/40 uppercase tracking-widest font-bold text-[10px]">Style</dt>
                      <dd className="font-semibold text-brand-body capitalize">{data.template.replace('-', ' ')}</dd>
                    </div>
                    <div className="flex justify-between items-center border-b border-brand-section pb-4">
                      <dt className="text-brand-body/40 uppercase tracking-widest font-bold text-[10px]">Sound</dt>
                      <dd className="font-semibold text-brand-body truncate max-w-[200px]">
                        {data.music.source === 'library' 
                          ? (LIBRARY_TRACKS.find(t => t.id === data.music.libraryTrackId)?.title || 'Selected Track')
                          : (data.music.uploadedAudio?.name || 'Custom Upload')
                        }
                      </dd>
                    </div>
                  </dl>
                  
                  <div className="mt-8 pt-8 border-t border-brand-section">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 mb-3">Delivery Email Address</label>
                    <input 
                      type="email" 
                      value={data.email}
                      onChange={(e) => handleDataChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-6 py-4 rounded-2xl border border-brand-section bg-brand-main/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
                    />
                    <p className="text-[9px] text-brand-body/40 mt-3 uppercase tracking-wider">Your private download link will be sent here.</p>
                  </div>
                </div>

                <div className="bg-brand-emotion/30 border border-brand-emotion rounded-3xl p-8 text-brand-body">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">🕊️</span>
                    <div>
                      <p className="font-bold text-brand-heading mb-1">Gentle Process</p>
                      <p className="text-sm leading-relaxed opacity-80">
                        Our artisans will review your media to ensure smooth transitions and high render quality. You'll receive your private download link via email once it's complete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="font-serif text-xl font-bold text-brand-heading mb-6">Choose Package</h4>
                <div className="space-y-4 flex-grow">
                  {Object.entries(PACKAGES).map(([key, pkg]) => (
                    <button 
                      key={key}
                      onClick={() => handleDataChange('package', key)}
                      className={`w-full p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden ${data.package === key ? 'border-brand-primary bg-white shadow-md scale-[1.02]' : 'border-brand-section bg-brand-main/30 hover:border-brand-primary/50'}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-brand-heading uppercase tracking-widest">{pkg.name}</span>
                        <span className="font-serif font-bold text-brand-body text-xl">£{pkg.price}</span>
                      </div>
                      <div className="text-[10px] text-brand-body/40 font-bold tracking-widest">{pkg.delivery} delivery</div>
                      {data.package === key && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="mt-12 pt-10 border-t border-brand-section">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-brand-body/40 font-bold uppercase tracking-widest text-[10px]">Order Total</span>
                    <span className="text-3xl font-serif font-bold text-brand-heading">£{PACKAGES[data.package].price}</span>
                  </div>
                  <Button 
                    className="w-full py-5 text-lg shadow-xl" 
                    onClick={handleSubmit} 
                    loading={loading}
                    disabled={!data.email || !/^\S+@\S+\.\S+$/.test(data.email)}
                  >
                    Complete & Pay
                  </Button>
                  <p className="text-[10px] text-brand-body/30 text-center mt-6 uppercase tracking-[0.2em] font-bold">Secure Stripe Payment</p>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <Button variant="ghost" onClick={prevStep} disabled={loading} className="px-8">Back</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-main min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
             {[1, 2, 3, 4].map(s => (
               <div key={s} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500 border-2 ${currentSubStep >= s ? 'bg-brand-primary border-brand-primary text-brand-body shadow-lg' : 'bg-white border-brand-section text-brand-body/20'}`}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`absolute top-6 left-[50%] w-full h-[2px] -z-0 transition-colors duration-700 ${currentSubStep > s ? 'bg-brand-primary' : 'bg-brand-section'}`}></div>
                  )}
                  <span className={`text-[10px] mt-4 font-bold uppercase tracking-widest transition-colors duration-500 ${currentSubStep >= s ? 'text-brand-heading' : 'text-brand-body/20'}`}>
                    {['Upload', 'Details', 'Style', 'Finish'][s-1]}
                  </span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-brand-section/10 backdrop-blur-sm p-8 md:p-16 rounded-[4rem] shadow-sm border border-brand-section/50 relative overflow-hidden min-h-[600px]">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
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
