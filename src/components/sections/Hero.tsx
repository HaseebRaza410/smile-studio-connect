import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero.jpg";

const benefits = [
  "Advanced Technology",
  "Experienced Team",
  "Comfortable Care",
];

const Hero = () => {
  return (
    <section className="relative pt-20 lg:pt-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-dental-teal-light to-background" />
      
      <div className="container relative mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">
                Rated 4.9/5 by 2000+ Patients
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Smile,{" "}
              <span className="text-primary">Our Passion</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience exceptional dental care in a warm, welcoming environment. 
              Our expert team combines cutting-edge technology with gentle, 
              personalized treatment.
            </p>

            <div className="flex flex-wrap gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/appointment">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/services">
                  Explore Services
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "10K+", label: "Happy Patients" },
                { value: "25+", label: "Expert Dentists" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-prominent">
              <img
                src={heroImage}
                alt="Modern dental clinic interior"
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-elevated">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Easy Online Booking</p>
                    <p className="text-sm text-muted-foreground">
                      Schedule your visit in just 2 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
