
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import CreatorPage from './pages/CreatorPage';
import SuccessPage from './pages/SuccessPage';
import LegalPage from './pages/LegalPage';
import { AppStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  // Sync scroll position on navigation
  useEffect(() => {
    if (targetSection && currentStep === AppStep.LANDING) {
      // Small delay to ensure DOM is ready if we just switched to Landing
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setTargetSection(null);
      }, 50);
      return () => clearTimeout(timer);
    } else if (!targetSection) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentStep, targetSection]);

  const handleNavigate = (step: AppStep, section?: string) => {
    if (section) {
      // Explicitly set target section first
      setTargetSection(section);
      // Then change step (or trigger effect if already on landing)
      setCurrentStep(AppStep.LANDING);
      
      // If we are already on LANDING, the useEffect won't trigger via currentStep change
      // so we manually check if we need to scroll immediately
      if (currentStep === AppStep.LANDING) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setTargetSection(null);
        }
      }
    } else {
      setTargetSection(null);
      setCurrentStep(step);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case AppStep.LANDING:
        return (
          <LandingPage 
            onStart={() => setCurrentStep(AppStep.UPLOAD)} 
            onNavigate={handleNavigate}
          />
        );
      case AppStep.UPLOAD:
      case AppStep.DETAILS:
      case AppStep.STYLE:
      case AppStep.CHECKOUT:
        return (
          <CreatorPage 
            onSuccess={() => setCurrentStep(AppStep.SUCCESS)} 
            onNavigate={handleNavigate}
          />
        );
      case AppStep.SUCCESS:
        return <SuccessPage onNavigate={handleNavigate} />;
      case AppStep.LEGAL:
      case AppStep.TERMS:
      case AppStep.REFUNDS:
      case AppStep.MISSION:
      case AppStep.FAQ:
      case AppStep.CONTACT:
        return <LegalPage subType={currentStep} onNavigate={handleNavigate} />;
      default:
        return <LandingPage onStart={() => setCurrentStep(AppStep.UPLOAD)} onNavigate={handleNavigate} />;
    }
  };

  const isLanding = currentStep === AppStep.LANDING;
  const isSuccess = currentStep === AppStep.SUCCESS;

  return (
    <Layout 
      onNavigate={handleNavigate} 
      hideNav={isSuccess}
      hideFooter={isSuccess}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
