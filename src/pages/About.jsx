import HeroSection from "../components/about/HeroSection";
import MissionVision from "../components/about/MissionVision";
import OurStory from "../components/about/OurStory";
import TrustedBrands from "../components/about/TrustedBrands";
import WhyChooseUs from "../components/about/WhyChooseUs";

export default function About() {
  return (
    <main>
      <HeroSection />
      <OurStory />
      <MissionVision />
      <WhyChooseUs/>
      <TrustedBrands/>
    </main>
  );
}
