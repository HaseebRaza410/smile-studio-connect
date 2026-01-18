import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Smile, Stethoscope, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description: "Comprehensive dental exams, cleanings, fillings, and preventive care to maintain your oral health.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and smile makeovers designed just for you.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Shield,
    title: "Orthodontics",
    description: "Straighten your teeth with traditional braces or modern clear aligners for a perfect bite.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that look, feel, and function like natural teeth.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Smile,
    title: "Teeth Whitening",
    description: "Professional whitening treatments for a brighter, more confident smile in just one visit.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Zap,
    title: "Emergency Care",
    description: "Same-day appointments for dental emergencies. We're here when you need us most.",
    color: "bg-accent/10 text-accent",
  },
];

const Services = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive Dental Care
          </h2>
          <p className="text-lg text-muted-foreground">
            From routine check-ups to advanced procedures, we offer a full range of 
            dental services to keep your smile healthy and beautiful.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
