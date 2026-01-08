
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import CreatorPage from './pages/CreatorPage';
import SuccessPage from './pages/SuccessPage';
import LegalPage from './pages/LegalPage';
import { AppStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);

  // Sync scroll position on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const renderContent = () => {
    switch (currentStep) {
      case AppStep.LANDING:
        return (
          <LandingPage 
            onStart={() => setCurrentStep(AppStep.UPLOAD)} 
            onNavigate={setCurrentStep}
          />
        );
      case AppStep.UPLOAD:
      case AppStep.DETAILS:
      case AppStep.STYLE:
      case AppStep.CHECKOUT:
        return (
          <CreatorPage 
            onSuccess={() => setCurrentStep(AppStep.SUCCESS)} 
            onNavigate={setCurrentStep}
          />
        );
      case AppStep.SUCCESS:
        return <SuccessPage onNavigate={setCurrentStep} />;
      case AppStep.LEGAL:
        return <LegalPage />;
      default:
        return <LandingPage onStart={() => setCurrentStep(AppStep.UPLOAD)} onNavigate={setCurrentStep} />;
    }
  };

  return (
    <Layout 
      onNavigate={setCurrentStep} 
      hideNav={currentStep === AppStep.SUCCESS}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
