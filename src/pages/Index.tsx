import AdvancedNavbar from '@/components/AdvancedNavbar';
import ModernHero from '@/components/ModernHero';
import AdvancedShopSection from '@/components/AdvancedShopSection';
import ModernAboutSection from '@/components/ModernAboutSection';
import AthletesSection from '@/components/AthletesSection';
import JoinSection from '@/components/JoinSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Chatbot from "../components/Chatbot";

const Index = () => {
  return (
    <>
      <div className="min-h-screen">
        <AdvancedNavbar />
        <ModernHero />
        <AdvancedShopSection />
        <ModernAboutSection />
        <AthletesSection />
        <JoinSection />
        <ContactSection />
        <Footer />
      </div>
      <Chatbot />
    </>
  );
};

export default Index;