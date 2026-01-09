
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
            <h1 className="text-4xl font-serif font-bold text-brand-heading mb-8">Terms of Service</h1>
            
            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">1. The Service</h3>
            <p className="text-brand-body leading-relaxed">
              Memorial Pet Films provides a digital memorial film creation service. This service allows you to upload personal media (photos, short videos, and audio) to be professionally compiled into a high-quality video tribute using our proprietary templates. This is a one-time service; we do not offer user accounts or ongoing subscriptions.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">2. Your Responsibilities and Content</h3>
            <p className="text-brand-body leading-relaxed">
              You are solely responsible for the content you upload. By using our service, you confirm that you have the legal right to use all uploaded photos, videos, and music. 
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">3. Music and Audio Rights</h3>
            <p className="text-brand-body leading-relaxed">
              You may choose to upload your own audio files or select a track from our provided library. If you choose to upload your own music, you are responsible for ensuring you have the necessary rights or permissions from the copyright owner to use that audio. 
            </p>
            <p className="text-brand-body leading-relaxed">
              Memorial Pet Films acts solely as a technical service provider for the private processing of your media. We do not publicly host, share, or redistribute your finished memorial film, and we do not claim any ownership over your uploaded content.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">4. Prohibited Content</h3>
            <p className="text-brand-body leading-relaxed">
              We maintain a respectful environment. You may not upload content that is illegal, harmful, offensive, or infringes on the privacy or intellectual property of others. We reserve the right to refuse service and issue a refund if uploaded content violates these standards.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">5. Payment and Delivery</h3>
            <p className="text-brand-body leading-relaxed">
              Payments are one-off and processed securely at the point of order. Delivery times depend on the package selected:
            </p>
            <ul className="list-disc pl-6 text-brand-body space-y-2">
              <li>Standard: Delivery within 24 hours.</li>
              <li>Premium: Delivery within 12 hours.</li>
              <li>Rush: Priority delivery within 1 hour.</li>
            </ul>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">6. Limitation of Liability</h3>
            <p className="text-brand-body leading-relaxed">
              While we strive for perfection, we provide the service on an "as is" basis. Our total liability is limited to the amount paid for the service. We are not liable for any emotional distress or indirect losses arising from the use of our service.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">7. Governing Law</h3>
            <p className="text-brand-body leading-relaxed">
              These terms are governed by the laws of England and Wales.
            </p>
          </article>
        );

      case AppStep.REFUNDS:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-brand-heading mb-8">Refund Policy</h1>
            <p className="text-brand-body leading-relaxed">
              At Memorial Pet Films, we understand that creating a memorial film is a deeply personal and often difficult task. We are committed to providing a respectful service that honours your companion.
            </p>
            <p className="text-brand-body leading-relaxed">
              Because our films are bespoke digital products—personalised specifically for you using your own media—our refund policy is designed to reflect the custom nature of the service while remaining fair to all parties.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Personalised Digital Goods</h3>
            <p className="text-brand-body leading-relaxed">
              Under UK consumer law, the standard 14-day "cooling off" period and right to cancel do not apply to goods that are made to the consumer's specifications or are clearly personalised. Furthermore, work on your memorial film begins shortly after your payment is confirmed to ensure we meet our delivery deadlines.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">When a Refund is Available</h3>
            <p className="text-brand-body leading-relaxed">
              We will issue a full refund in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-brand-body space-y-2">
              <li><strong>Non-delivery:</strong> If payment has been successfully taken but your film download link is not delivered within the timeframe specified for your package.</li>
              <li><strong>Technical Failure:</strong> If a technical error on our side prevents the film from being rendered or results in a severely corrupted file that cannot be viewed.</li>
              <li><strong>Unfulfilled Service:</strong> If we exercise our right to refuse service due to unsuitable content prior to any rendering work commencing.</li>
            </ul>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">When a Refund is Not Available</h3>
            <p className="text-brand-body leading-relaxed">
              We are unable to offer refunds in the following instances:
            </p>
            <ul className="list-disc pl-6 text-brand-body space-y-2">
              <li><strong>Rendering in Progress:</strong> Once the technical process of rendering your film has begun, significant compute resources have been used and a refund is no longer possible.</li>
              <li><strong>Change of Mind:</strong> We cannot offer refunds if you decide you no longer want the film after it has been submitted for processing.</li>
              <li><strong>User Error:</strong> This includes mistakes in the pet's name, dates, or messages provided by the user, or the submission of low-quality or blurry photos.</li>
              <li><strong>Copyright Issues:</strong> If a film is completed but you later find you did not have the rights to use the uploaded media.</li>
            </ul>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">How to Request a Refund</h3>
            <p className="text-brand-body leading-relaxed">
              If you believe you are entitled to a refund based on the criteria above, please contact us at <a href="mailto:MemorialPetFilms@protonmail.com" className="font-bold text-brand-heading hover:underline">MemorialPetFilms@protonmail.com</a>.
            </p>
            <p className="text-brand-body leading-relaxed">
              Please include your order reference number (provided in your confirmation email) and a clear description of the issue.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Processing Timeframes</h3>
            <p className="text-brand-body leading-relaxed">
              We aim to respond to all refund requests within 2 business days. If a refund is approved, it will be processed immediately. However, it may take between 5 to 10 business days to appear in your account, depending on your bank's processing times.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Governing Law</h3>
            <p className="text-brand-body leading-relaxed">
              This Refund Policy is governed by the laws of England and Wales.
            </p>
          </article>
        );

      case AppStep.CONTACT:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-brand-heading mb-8">Contact Us</h1>
            <p className="text-brand-body leading-relaxed mb-12">
              We are here to support you during this time. Please reach out with any questions regarding your order, our templates, or technical assistance.
            </p>
            
            <div className="bg-brand-section/20 p-10 rounded-[2.5rem] border border-brand-section">
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-heading/50 mb-2">Support Email</h4>
                  <a href="mailto:MemorialPetFilms@protonmail.com" className="text-2xl font-serif font-bold text-brand-heading hover:underline block">MemorialPetFilms@protonmail.com</a>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-heading/50 mb-2">Expected Response Time</h4>
                  <p className="text-brand-body/70">We aim to respond to all inquiries within 48 hours.</p>
                </div>
              </div>
            </div>
          </article>
        );

      case AppStep.MISSION:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-brand-heading mb-8">Our Mission</h1>
            <p className="text-2xl font-serif italic text-brand-body/60 mb-12 leading-relaxed">
              "To honour the deep, silent bond between humans and their companions through art and dignity."
            </p>
            <div className="space-y-6 text-brand-body/70 leading-relaxed">
              <p>
                Memorial Pet Films was born from a simple observation: the digital tools available to memorialise our pets often felt cluttered, corporate, or overly complex. We believed there was a need for something different—something quiet.
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
            <h1 className="text-4xl font-serif font-bold text-brand-heading mb-8">Frequently Asked Questions</h1>
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
                  a: "No. We do not offer accounts. You simply upload your files, pay, and receive your film link via email." 
                },
                { 
                  q: "How long are files stored?", 
                  a: "All original files and your final film are permanently deleted from our servers 30 days after completion." 
                },
                { 
                  q: "Can I download and share the film?", 
                  a: "Absolutely. Once rendered, the film is yours. You can download the file to any device and share it on social media or with family." 
                },
                { 
                  q: "What if I need help?", 
                  a: <span>Simply email <a href="mailto:MemorialPetFilms@protonmail.com" className="text-brand-heading font-bold hover:underline">MemorialPetFilms@protonmail.com</a>. We are a small, dedicated team and we are here to help.</span>
                }
              ].map((faq, i) => (
                <div key={i} className="bg-brand-section/20 p-8 rounded-3xl border border-brand-section">
                  <h3 className="font-serif font-bold text-lg text-brand-heading mb-3">{faq.q}</h3>
                  <div className="text-brand-body/70 text-sm leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </article>
        );

      case AppStep.LEGAL: 
      default:
        return (
          <article className="prose prose-stone max-w-none">
            <h1 className="text-4xl font-serif font-bold text-brand-heading mb-8">Privacy Policy</h1>
            <p className="text-brand-body leading-relaxed">
              At Memorial Pet Films, we understand the sensitive nature of your memories. We are committed to protecting your privacy in accordance with UK GDPR.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Data We Collect</h3>
            <p className="text-brand-body leading-relaxed">
              We collect only the information necessary to fulfil your order: your email address (for delivery) and the media files you upload for the film. We do not require or create user accounts.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Storage and Security</h3>
            <p className="text-brand-body leading-relaxed">
              Your files are stored in secure, encrypted cloud storage. Access is strictly limited to our automated rendering systems and, occasionally, a member of our technical team to resolve specific rendering issues. No public access is ever permitted.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">30-Day Retention Policy</h3>
            <p className="text-brand-body leading-relaxed">
              To ensure your privacy, all uploaded photos, videos, and audio files, as well as the final rendered memorial film, are automatically and permanently deleted from our servers 30 days after your order is completed. We recommend you download and back up your film promptly.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Your Rights</h3>
            <p className="text-brand-body leading-relaxed">
              Under UK GDPR, you have the right to access the data we hold or request its immediate deletion before the 30-day window. As we do not sell data, you will never receive marketing from third parties as a result of using Memorial Pet Films.
            </p>

            <h3 className="text-xl font-serif font-bold text-brand-heading mt-8 mb-4">Contact</h3>
            <p className="text-brand-body leading-relaxed">
              For data requests, please contact <a href="mailto:MemorialPetFilms@protonmail.com" className="font-bold text-brand-heading hover:underline">MemorialPetFilms@protonmail.com</a>.
            </p>
          </article>
        );
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[60vh]">
      <div className="mb-12">
        <button 
          onClick={() => onNavigate(AppStep.LANDING)}
          className="text-xs font-bold uppercase tracking-widest text-brand-heading/50 hover:text-brand-heading transition-colors"
        >
          ← Back to Home
        </button>
      </div>
      
      {renderContent()}

      <div className="mt-20 pt-12 border-t border-brand-section flex gap-4">
        <Button onClick={() => onNavigate(AppStep.UPLOAD)}>Start Your Memorial</Button>
        <Button variant="ghost" onClick={() => onNavigate(AppStep.FAQ)}>Read FAQs</Button>
      </div>
    </div>
  );
};

export default LegalPage;
