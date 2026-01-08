
import React, { useRef } from 'react';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onChange([...files, ...newFiles].slice(0, 30));
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-stone-300 rounded-3xl p-12 text-center hover:border-stone-400 hover:bg-stone-50 transition-all cursor-pointer group"
      >
        <input 
          ref={inputRef}
          type="file" 
          multiple 
          accept="image/*,video/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</div>
        <h3 className="text-xl font-medium text-stone-800 mb-2">Click to select memories</h3>
        <p className="text-stone-500">
          Upload 5 to 30 photos or short clips of your pet.
        </p>
        <p className="text-stone-400 text-sm mt-2">
          Supports JPG, PNG, GIF, MP4 (Max 50MB per file)
        </p>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-serif text-lg font-bold text-stone-800">
              Selected Files ({files.length}/30)
            </h4>
            <button 
              onClick={() => onChange([])}
              className="text-stone-400 hover:text-red-500 text-sm font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file, idx) => (
              <div key={idx} className="relative group aspect-square">
                {file.type.startsWith('image/') ? (
                   <img 
                    src={URL.createObjectURL(file)} 
                    alt="preview" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center rounded-xl">
                    <span className="text-2xl">🎥</span>
                  </div>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                  className="absolute -top-2 -right-2 bg-stone-800 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-500 transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
