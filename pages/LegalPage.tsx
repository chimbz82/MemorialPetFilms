
import React from 'react';
import { AppStep } from '../types';
import Button from '../components/Button';

interface LegalPageProps {
  subType?: AppStep;
  onNavigate: (step: AppStep, section?: string) => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ subType, onNavigate }) => {
  const renderContent = () => {
    switch (subType) {
      case AppStep.FAQ:
        return (
          <section>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Frequently Asked Questions</h1>
            <div className="space-y-8">
              {[
                { q: "How long does it take?", a: "Depending on your package, between 1 and 24 hours. Rush orders are prioritized at the top of our render queue." },
                { q: "Can I use my own music?", a: "Yes, you can upload MP3 or M4A files during the creation process. We also provide a curated library of instrumental tracks." },
                { q: "What happens to my photos?", a: "We take privacy seriously. All files are automatically and permanently deleted 30 days after your order is completed." }
              ].map((faq, i) => (
                <div key={i} className="bg-stone-50 p-8 rounded-3xl">
                  <h3 className="font-serif font-bold text-lg text-stone-800 mb-3">{faq.q}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case AppStep.MISSION:
        return (
          <section>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Our Mission</h1>
            <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
              <p className="text-xl italic font-serif text-stone-500">"Honoring the bond that never truly breaks."</p>
              <p>Eternal Paws was founded on the belief that every pet deserves a dignified farewell. We combine artisanal design sensibilities with modern technology to help families celebrate the unique lives of their companions.</p>
              <p>Our goal is to provide a quiet, respectful space where memories can be gathered and transformed into a lasting tribute that can be shared with loved ones across the globe.</p>
            </div>
          </section>
        );
      case AppStep.CONTACT:
        return (
          <section>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Contact Us</h1>
            <div className="bg-stone-50 p-10 rounded-[2.5rem] max-w-xl">
              <p className="text-stone-600 mb-8">Our support team is available 24/7 to help you with your order or any technical questions.</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Email Support</h4>
                  <a href="mailto:support@eternalpaws.com" className="text-lg font-serif font-bold text-stone-800 hover:text-stone-500 transition-colors">support@eternalpaws.com</a>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Business Inquiries</h4>
                  <p className="text-lg font-serif font-bold text-stone-800">hello@eternalpaws.com</p>
                </div>
              </div>
            </div>
          </section>
        );
      case AppStep.TERMS:
        return (
          <section>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Terms of Service</h1>
            <div className="space-y-6 text-stone-600">
              <p>By using Eternal Paws, you agree to these terms. You represent that you have the right to use and upload all media provided. You agree that the service is provided for personal, non-commercial use.</p>
              <p>We reserve the right to refuse service if content violates our quality or safety standards. All rendered videos are digital products and are subject to the specific refund policies outlined on our Refund page.</p>
            </div>
          </section>
        );
      case AppStep.REFUNDS:
        return (
          <section>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Refund Policy</h1>
            <div className="space-y-6 text-stone-600">
              <p>Because our memorials are personalized digital products, we generally do not offer refunds once rendering has commenced. However, if there is a technical defect in the final render, we will provide a free re-render or credit.</p>
              <p>For 'Rush' orders, if we fail to deliver within the 1-hour window due to a system error, we will refund the priority fee upon request.</p>
            </div>
          </section>
        );
      default:
        return (
          <section>
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Privacy Policy</h1>
            <div className="space-y-6 text-stone-600">
              <p>Your privacy is our priority. Any photos, videos, or audio you upload to Eternal Paws are used solely for generating your memorial video. All original media files and rendered videos are permanently deleted from our servers 30 days after order completion.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We use industry-standard encryption for all data transfers.</li>
                <li>We do not sell user information to third-party advertisers.</li>
                <li>Payments are handled exclusively through Stripe's secure infrastructure.</li>
              </ul>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[60vh]">
      <div className="mb-12">
        <button 
          onClick={() => onNavigate(AppStep.LANDING)}
          className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
      
      {renderContent()}

      <div className="mt-20 pt-12 border-t border-stone-100 flex gap-4">
        <Button onClick={() => onNavigate(AppStep.UPLOAD)}>Start Your Memorial</Button>
        <Button variant="ghost" onClick={() => onNavigate(AppStep.FAQ)}>Read FAQs</Button>
      </div>
    </div>
  );
};

export default LegalPage;
