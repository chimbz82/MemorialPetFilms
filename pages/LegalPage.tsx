
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
      case AppStep.TERMS:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Terms of Service</h1>
            
            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">1. The Service</h3>
            <p className="text-stone-600 leading-relaxed">
              Eternal Paws provides a digital memorial video creation service. This service allows you to upload personal media (photos, short videos, and audio) to be professionally compiled into a high-quality video tribute using our proprietary templates. This is a one-time service; we do not offer user accounts or ongoing subscriptions.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">2. Your Responsibilities and Content</h3>
            <p className="text-stone-600 leading-relaxed">
              You are solely responsible for the content you upload. By using our service, you confirm that you have the legal right to use all uploaded photos, videos, and music. 
            </p>
            <p className="text-stone-600 leading-relaxed font-bold">
              Important: If you choose to upload your own audio file, you must ensure you hold the necessary licenses or permissions from the copyright owner. Eternal Paws accepts no liability for copyright infringement resulting from user-uploaded media.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">3. Prohibited Content</h3>
            <p className="text-stone-600 leading-relaxed">
              We maintain a respectful environment. You may not upload content that is illegal, harmful, offensive, or infringes on the privacy or intellectual property of others. We reserve the right to refuse service and issue a refund if uploaded content violates these standards.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">4. Payment and Delivery</h3>
            <p className="text-stone-600 leading-relaxed">
              Payments are one-off and processed securely at the point of order. Delivery times depend on the package selected:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Standard: Delivery within 24 hours.</li>
              <li>Premium: Delivery within 12 hours.</li>
              <li>Rush: Priority delivery within 1 hour.</li>
            </ul>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">5. Limitation of Liability</h3>
            <p className="text-stone-600 leading-relaxed">
              While we strive for perfection, we provide the service on an "as is" basis. Our total liability is limited to the amount paid for the service. We are not liable for any emotional distress or indirect losses arising from the use of our service.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">6. Governing Law</h3>
            <p className="text-stone-600 leading-relaxed">
              These terms are governed by the laws of England and Wales.
            </p>
          </article>
        );

      case AppStep.LEGAL: // Defaulting to Privacy Policy if generic 'LEGAL' is called
      case AppStep.LANDING: // Safe fallback
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Privacy Policy</h1>
            <p className="text-stone-600 leading-relaxed">
              At Eternal Paws, we understand the sensitive nature of your memories. We are committed to protecting your privacy in accordance with UK GDPR.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">Data We Collect</h3>
            <p className="text-stone-600 leading-relaxed">
              We collect only the information necessary to fulfill your order: your email address (for delivery) and the media files you upload for the video. We do not require or create user accounts.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">Storage and Security</h3>
            <p className="text-stone-600 leading-relaxed">
              Your files are stored in secure, encrypted cloud storage. Access is strictly limited to our automated rendering systems and, occasionally, a member of our technical team to resolve specific rendering issues. No public access is ever permitted.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">30-Day Retention Policy</h3>
            <p className="text-stone-600 leading-relaxed">
              To ensure your privacy, all uploaded photos, videos, and audio files, as well as the final rendered memorial video, are automatically and permanently deleted from our servers 30 days after your order is completed. We recommend you download and back up your video promptly.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">Your Rights</h3>
            <p className="text-stone-600 leading-relaxed">
              Under UK GDPR, you have the right to access the data we hold or request its immediate deletion before the 30-day window. As we do not sell data, you will never receive marketing from third parties as a result of using Eternal Paws.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">Contact</h3>
            <p className="text-stone-600 leading-relaxed">
              For data requests, please contact privacy@eternalpaws.com.
            </p>
          </article>
        );

      case AppStep.REFUNDS:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Refund Policy</h1>
            <p className="text-stone-600 leading-relaxed">
              Because our memorial videos are bespoke, digital products, our refund policy reflects the custom nature of the work.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">Custom Service Exclusions</h3>
            <p className="text-stone-600 leading-relaxed">
              Once rendering has commenced, we are unable to offer a refund for "change of mind." The creation of your video involves significant processing power and designer resources allocated to your specific files.
            </p>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">Eligibility for Refund</h3>
            <p className="text-stone-600 leading-relaxed">
              A full refund will be issued in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Technical failure: If our systems are unable to complete your video render.</li>
              <li>Non-delivery: If you do not receive your download link within the promised timeframe.</li>
              <li>Major defect: If the final video has clear technical corruption or rendering errors.</li>
            </ul>

            <h3 className="text-xl font-serif font-bold text-stone-800 mt-8 mb-4">How to Request</h3>
            <p className="text-stone-600 leading-relaxed">
              To request a refund, please email support@eternalpaws.com with your order details. We aim to respond to all refund requests within 48 hours.
            </p>
          </article>
        );

      case AppStep.CONTACT:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Contact Us</h1>
            <p className="text-stone-600 leading-relaxed mb-12">
              We are here to support you during this time. Please reach out with any questions regarding your order, our templates, or technical assistance.
            </p>
            
            <div className="bg-stone-50 p-10 rounded-[2.5rem] border border-stone-100">
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Support Email</h4>
                  <p className="text-2xl font-serif font-bold text-stone-800">support@eternalpaws.com</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Expected Response Time</h4>
                  <p className="text-stone-600">We aim to respond to all inquiries within 48 hours.</p>
                </div>
              </div>
            </div>
          </article>
        );

      case AppStep.MISSION:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Our Mission</h1>
            <p className="text-2xl font-serif italic text-stone-500 mb-12 leading-relaxed">
              "To honor the deep, silent bond between humans and their companions through art and dignity."
            </p>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Eternal Paws was born from a simple observation: the digital tools available to memorialise our pets often felt cluttered, corporate, or overly complex. We believed there was a need for something different—something quiet.
              </p>
              <p>
                Our mission is to provide a service that prioritises dignity and simplicity. We don't believe in emotional manipulation or corporate buzzwords. Instead, we focus on high-quality design and uncompromising privacy.
              </p>
              <p>
                By removing the need for accounts and subscriptions, we ensure that your focus remains exactly where it should be: on the life and legacy of the companion you loved.
              </p>
            </div>
          </article>
        );

      case AppStep.FAQ:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Frequently Asked Questions</h1>
            <div className="space-y-8">
              {[
                { 
                  q: "How long does it take?", 
                  a: "Delivery depends on your package: Standard (24 hours), Premium (12 hours), or Rush (1 hour)." 
                },
                { 
                  q: "Can I use my own music?", 
                  a: "Yes. You can upload any MP3, M4A, or WAV file. Please ensure you have the right to use the audio you provide." 
                },
                { 
                  q: "Are my files private?", 
                  a: "Yes. Your files are stored in encrypted cloud storage and are never made public. Only our automated rendering system 'sees' your media." 
                },
                { 
                  q: "Do I need an account?", 
                  a: "No. We do not offer accounts. You simply upload your files, pay, and receive your video link via email." 
                },
                { 
                  q: "How long are files stored?", 
                  a: "All original files and your final video are permanently deleted from our servers 30 days after completion." 
                },
                { 
                  q: "Can I download and share the video?", 
                  a: "Absolutely. Once rendered, the video is yours. You can download the file to any device and share it on social media or with family." 
                },
                { 
                  q: "What if I need help?", 
                  a: "Simply email support@eternalpaws.com. We are a small, dedicated team and we are here to help." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
                  <h3 className="font-serif font-bold text-lg text-stone-800 mb-3">{faq.q}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </article>
        );

      default:
        return null;
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
