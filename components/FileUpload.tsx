
import React, { useRef, useState } from 'react';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      // Cast the result of Array.from to File[] to fix type errors on 'file' parameter properties
      const newFiles = Array.from(e.target.files) as File[];
      const filteredFiles = newFiles.filter(file => {
        const isImage = file.type.startsWith('image/') && !file.type.includes('gif');
        const isVideo = file.type.startsWith('video/');
        const isSmallEnough = file.size <= 50 * 1024 * 1024;
        
        if (!isImage && !isVideo) {
          setError("Some files were skipped. Only photos and videos are supported.");
          return false;
        }
        if (!isSmallEnough) {
          setError("Some files were too large (max 50MB per file).");
          return false;
        }
        return true;
      });

      const totalFiles = [...files, ...filteredFiles].slice(0, 30);
      onChange(totalFiles);
      
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const updated = [...files];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    onChange(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-stone-200 rounded-[2rem] p-16 text-center hover:border-stone-400 hover:bg-stone-50/50 transition-all cursor-pointer group relative overflow-hidden"
      >
        <input 
          ref={inputRef}
          type="file" 
          multiple 
          accept="image/jpeg,image/png,video/mp4,video/quicktime" 
          className="hidden" 
          onChange={handleFileChange}
        />
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">🎞️</div>
        <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">Select their memories</h3>
        <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
          Upload 5 to 30 photos or short video clips.<br className="hidden sm:block" />
          Final order can be adjusted below.
        </p>
        <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-6 font-bold">
          JPEG, PNG, MP4 (Max 50MB per file)
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs p-4 rounded-xl border border-red-100 flex items-center justify-center animate-in slide-in-from-top-2">
          <span className="mr-2">⚠️</span> {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h4 className="font-serif text-2xl font-bold text-stone-800">
                The Storyline
              </h4>
              <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mt-1">
                {files.length} of 30 items uploaded
              </p>
            </div>
            <button 
              onClick={() => onChange([])}
              className="text-stone-400 hover:text-stone-900 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {files.map((file, idx) => (
              <div key={`${file.name}-${idx}`} className="relative group aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                {file.type.startsWith('image/') ? (
                   <img 
                    src={URL.createObjectURL(file)} 
                    alt="preview" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                    <span className="text-3xl opacity-40">🎥</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => removeFile(idx)}
                    className="bg-white/90 text-stone-900 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                    title="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-stone-800 shadow-sm">
                  {idx + 1}
                </div>
              </div>
            ))}
            
            {files.length < 30 && (
               <button 
                onClick={() => inputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dotted border-stone-200 flex flex-col items-center justify-center text-stone-300 hover:border-stone-400 hover:text-stone-500 transition-all bg-stone-50/30"
              >
                <span className="text-2xl mb-1">+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Add more</span>
              </button>
            )}
          </div>
          
          <p className="text-[10px] text-stone-400 mt-8 text-center uppercase tracking-widest font-bold">
            All files are deleted 30 days after your memorial is created.
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
