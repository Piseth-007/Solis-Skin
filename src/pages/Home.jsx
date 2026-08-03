import { useEffect, useState } from "react";
import {
  getProductList,
  getProducts,
  toProductView,
} from "../api/productApi";

import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import BestSeller from "../components/home/BestSeller";
import SkinConcern from "../components/home/SkinConcern";
import WhyChoose from "../components/home/WhyChoose";
import BrandSection from "../components/home/BrandSection";
import NewArrivals from "../components/home/NewArrivals";
import Testimonials from "../components/home/Testimonials";
import BeforeAfter from "../components/home/BeforeAfter";
import InstagramGallery from "../components/home/InstagramGallery";
import BeautyBlog from "../components/home/BeautyBlog";
import Newsletter from "../components/home/Newsletter";
import FAQ from "../components/home/FAQ";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(0, 100);
        setProducts(getProductList(data).map(toProductView));
      } catch (error) {
        console.error("Failed to load home products:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Hero />

      <BrandSection />

      <Categories />

      <SkinConcern />

      <BestSeller products={products} />

      <NewArrivals products={products} />

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
