


import FeaturesGrid from '../components/FeaturesGrid';
import FinalCTA from '../components/FinalCTA';
import HomeHero from '../components/HomeHero';
import InteractivePlayground from '../components/InteractivePlayground';
import Navbar from '../components/Navbar';
import PricingSection from '../components/PricingSection';
import SecurityTrust from '../components/SecurityTrust';
import SocialProofSection from '../components/SocialProofSection';

export default function HomeLayout() {


  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col">
      
      {/* 1. NAVIGATION BAR */}
    <Navbar></Navbar>
      {/* 2. HERO SECTION */}
    
    <HomeHero></HomeHero>
    <FeaturesGrid></FeaturesGrid>
    <InteractivePlayground></InteractivePlayground>
    <SecurityTrust></SecurityTrust>
    <PricingSection></PricingSection>
    <SocialProofSection></SocialProofSection>
      {/* 3. FOOTER */}
    <FinalCTA></FinalCTA>

    </div>
  );
}