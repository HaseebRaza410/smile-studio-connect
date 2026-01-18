import { Link } from "react-router-dom";
import { 
  Smile, 
  Sparkles, 
  Shield, 
  Stethoscope, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Syringe,
  Heart,
  Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import clinicImage from "@/assets/images/clinic.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description: "Comprehensive dental exams, cleanings, and preventive care to maintain your oral health.",
    features: ["Regular checkups", "Professional cleaning", "Cavity detection", "Gum disease prevention"],
    price: "From $75",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Professional whitening treatments to brighten your smile by several shades.",
    features: ["In-office whitening", "Take-home kits", "Long-lasting results", "Safe for enamel"],
    price: "From $299",
  },
  {
    icon: Smile,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and other aesthetic treatments.",
    features: ["Porcelain veneers", "Dental bonding", "Smile makeovers", "Tooth contouring"],
    price: "From $500",
  },
  {
    icon: Shield,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that look and function like natural teeth.",
    features: ["Single tooth implants", "Full arch restoration", "Bone grafting", "Same-day implants"],
    price: "From $2,500",
  },
  {
    icon: Syringe,
    title: "Root Canal Therapy",
    description: "Pain-free root canal treatments to save damaged teeth and relieve discomfort.",
    features: ["Modern techniques", "Minimal discomfort", "Quick recovery", "Tooth preservation"],
    price: "From $800",
  },
  {
    icon: Zap,
    title: "Orthodontics",
    description: "Straighten your teeth with braces or clear aligners for a perfect smile.",
    features: ["Traditional braces", "Invisalign", "Retainers", "Teen & adult options"],
    price: "From $3,500",
  },
  {
    icon: Heart,
    title: "Pediatric Dentistry",
    description: "Gentle, kid-friendly dental care to establish healthy habits early.",
    features: ["Child-friendly environment", "Preventive care", "Dental sealants", "Fluoride treatments"],
    price: "From $60",
  },
  {
    icon: Clock,
    title: "Emergency Dentistry",
    description: "Same-day appointments for dental emergencies when you need care urgently.",
    features: ["Same-day service", "Pain relief", "Tooth repair", "24/7 phone support"],
    price: "Varies",
  },
];

const benefits = [
  "State-of-the-art technology",
  "Experienced specialists",
  "Comfortable environment",
  "Flexible payment options",
  "Insurance accepted",
  "Same-day appointments",
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Comprehensive{" "}
                <span className="text-primary">Dental Services</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                From routine checkups to advanced cosmetic procedures, we offer a full range 
                of dental services to keep your smile healthy and beautiful.
              </p>
              <Button asChild size="lg">
                <Link to="/appointment">Book Your Appointment</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-6 bg-card rounded-2xl border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-semibold text-primary">{service.price}</span>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/appointment">
                        Book <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Quality Care You Can Trust
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We combine advanced technology with compassionate care to deliver 
                  exceptional dental services. Our team is dedicated to making your 
                  visit as comfortable and effective as possible.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link to="/appointment">Schedule a Consultation</Link>
                  </Button>
                </div>
              </div>
              <div>
                <img
                  src={clinicImage}
                  alt="Modern Dental Equipment"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Common Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "How often should I visit the dentist?",
                  a: "We recommend visiting every 6 months for routine checkups and cleanings. However, some patients may need more frequent visits based on their oral health needs.",
                },
                {
                  q: "Do you accept dental insurance?",
                  a: "Yes, we accept most major dental insurance plans. Our team will help you understand your coverage and maximize your benefits.",
                },
                {
                  q: "What payment options do you offer?",
                  a: "We accept cash, credit cards, and offer flexible payment plans. We also have financing options available for larger treatments.",
                },
                {
                  q: "Is teeth whitening safe?",
                  a: "Yes, professional teeth whitening is safe when performed by our trained dentists. We use FDA-approved products that are gentle on your enamel.",
                },
              ].map((faq) => (
                <div key={faq.q} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your appointment today and take the first step towards a healthier smile.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/appointment">Book Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
