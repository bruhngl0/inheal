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

      <div id="service">
        <Services />
        <Servicespc />
      </div>
      <div id="book">
        <Book />
      </div>
      <div id="faq">
        <Qafs />
      </div>

      <div>
        <Faqs />
      </div>

      <div id="blog">
        <Blogs />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
