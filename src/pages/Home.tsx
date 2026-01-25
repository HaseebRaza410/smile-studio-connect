import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Doctors from "@/components/sections/Doctors";
import Testimonials from "@/components/sections/Testimonials";
import AppointmentCTA from "@/components/sections/AppointmentCTA";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import AIChatbot from "@/components/common/AIChatbot";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Doctors />
        <Testimonials />
        <AppointmentCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
};

export default Home;
