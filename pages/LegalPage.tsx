
import React from 'react';

const LegalPage: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Legal Information</h1>
      
      <div className="space-y-12 prose prose-stone max-w-none text-stone-600">
        <section>
          <h2 className="text-2xl font-serif text-stone-800 mb-4 font-bold">Privacy Policy</h2>
          <p>
            Your privacy is our priority. Any photos, videos, or audio you upload to Eternal Paws are used solely for the purpose of generating your memorial video. 
            All original media files are deleted from our servers 30 days after your order is completed.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>We do not sell your personal data to third parties.</li>
            <li>We use secure AWS infrastructure for storage.</li>
            <li>We process payments securely via Stripe.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-stone-800 mb-4 font-bold">Terms of Service</h2>
          <p>
            By using Eternal Paws, you agree to the following terms:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>You represent that you have the right to use and upload the photos and music files provided.</li>
            <li>You will not upload any illegal, offensive, or harmful material.</li>
            <li>Eternal Paws is a creative service and we reserve the right to refuse service if content violates our safety standards.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-stone-800 mb-4 font-bold">Refund Policy</h2>
          <p>
            Because our product is a personalized digital service, we generally do not offer refunds once rendering has begun. However:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>If there is a technical defect in your final video, we will fix it free of charge.</li>
            <li>If we fail to meet the delivery deadline for 'Rush' orders, we will refund the priority fee.</li>
            <li>Cancellations requested within 30 minutes of order placement (if rendering has not started) will be fully refunded.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
