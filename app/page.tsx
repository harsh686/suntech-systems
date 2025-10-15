import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import SolarCalculator from '@/components/SolarCalculator';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import SolarGPTChat from '@/components/SolarGPTChat';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Services />
      <SolarCalculator />
      <ContactSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <SolarGPTChat />
    </main>
  );
}
