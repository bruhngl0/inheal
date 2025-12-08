import About from "@/components/About";
import Book from "@/components/Book";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Book />
      <Faqs />
      <Footer />
    </>
  );
}
