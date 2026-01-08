
import React, { useState } from 'react';
import { generateTribute } from '../services/geminiService';
import Button from './Button';

interface AIDescriptionHelperProps {
  petName: string;
  onTributeGenerated: (tribute: string) => void;
}

const AIDescriptionHelper: React.FC<AIDescriptionHelperProps> = ({ petName, onTributeGenerated }) => {
  const [traits, setTraits] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!traits.trim()) return;
    setLoading(true);
    const result = await generateTribute(petName || 'my best friend', traits);
    onTributeGenerated(result);
    setLoading(false);
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mt-4">
      <div className="flex items-center mb-3">
        <span className="text-lg mr-2">✨</span>
        <h5 className="font-semibold text-stone-800">Help me write a tribute</h5>
      </div>
      <p className="text-sm text-stone-500 mb-3">
        Tell us a few things about {petName || 'your pet'} (e.g., "always playful", "loves sunbathing", "gentle soul").
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text"
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
          placeholder="Friendly, energetic, loved peanut butter..."
          className="flex-grow px-4 py-2 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 text-sm"
        />
        <Button 
          variant="secondary" 
          onClick={handleGenerate} 
          loading={loading}
          disabled={!traits.trim()}
          className="py-2 text-sm"
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default AIDescriptionHelper;
