import React from 'react';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import ArchitectureBlueprint3D from '../components/home/ArchitectureBlueprint3D';
import AboutSection from '../components/home/AboutSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';

export default function HomePage() {
  return (
    <main className="bg-[#070B14] overflow-x-hidden selection:bg-sky-500 selection:text-white">
      <Hero />
      <ArchitectureBlueprint3D />
      <ServicesOverview />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
