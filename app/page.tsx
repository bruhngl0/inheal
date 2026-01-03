import About from "@/components/About";
import Book from "@/components/Book";
import Faqs from "@/components/Faqs";
import Qafs from "@/components/Qaf";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Servicespc from "@/components/Servicespc";
import Blogs from "@/components/Blogs";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div id="about">
        <About />
      </div>
      <Services />
      <Servicespc />
      <div id="book">
        <Book />
      </div>
      <div id="contact">
        <Qafs />
      </div>

      <div>
        <Faqs />
      </div>

      <div>
        <Blogs />
      </div>
      <Footer />
    </>
  );
}
