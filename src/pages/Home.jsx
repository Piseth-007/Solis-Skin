import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import BestSeller from "../components/home/BestSeller";
import SkinConcern from "../components/home/SkinConcern";
import WhyChoose from "../components/home/WhyChoose";
import BrandSection from "../components/home/BrandSection";
import FlashSale from "../components/home/FlashSale";
import NewArrivals from "../components/home/NewArrivals";
import Testimonials from "../components/home/Testimonials";
import BeforeAfter from "../components/home/BeforeAfter";
import InstagramGallery from "../components/home/InstagramGallery";
import BeautyBlog from "../components/home/BeautyBlog";
import Newsletter from "../components/home/Newsletter";
import FAQ from "../components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandSection />
      <Categories />
      <SkinConcern />
      <BestSeller />
      <FlashSale />
      <NewArrivals />
      <WhyChoose />
      <Testimonials />
      <BeforeAfter />
      <BeautyBlog />
      <InstagramGallery />
      <Newsletter />
      <FAQ />
    </>
  );
}
