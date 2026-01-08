
import React from 'react';
import Button from '../components/Button';
import { AppStep } from '../types';

interface SuccessPageProps {
  onNavigate: (step: AppStep) => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-32 px-4 text-center max-w-3xl mx-auto animate-in fade-in zoom-in duration-700">
      <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
        ✓
      </div>
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">A Tribute in Motion</h1>
      <p className="text-xl text-stone-500 mb-12">
        Thank you for trusting us with your precious memories. Our team has received your order and we are beginning to craft your memorial video.
      </p>

      <div className="bg-stone-50 border border-stone-100 rounded-3xl p-8 mb-12 text-left">
        <h4 className="font-bold text-stone-800 mb-6">What Happens Next?</h4>
        <ul className="space-y-6">
          <li className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center mr-4 mt-0.5 text-xs font-bold shrink-0">1</div>
            <div>
              <p className="font-semibold text-stone-800">Email Confirmation</p>
              <p className="text-sm text-stone-500">We've sent a receipt and summary to your email address.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center mr-4 mt-0.5 text-xs font-bold shrink-0">2</div>
            <div>
              <p className="font-semibold text-stone-800">Artisan Review</p>
              <p className="text-sm text-stone-500">A human designer will review your photos for the best alignment and rendering.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center mr-4 mt-0.5 text-xs font-bold shrink-0">3</div>
            <div>
              <p className="font-semibold text-stone-800">Delivery</p>
              <p className="text-sm text-stone-500">You'll receive a link to download your high-quality video file within your delivery window.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => onNavigate(AppStep.LANDING)}>Return Home</Button>
        <Button variant="outline">View Order Details</Button>
      </div>
      
      <p className="mt-12 text-stone-400 text-sm italic">
        "Those we love don't go away, they walk beside us every day."
      </p>
    </div>
  );
};

export default SuccessPage;
