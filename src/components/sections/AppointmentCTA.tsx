import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppointmentCTA = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium mb-6">
              Ready to Transform Your Smile?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Schedule Your Visit Today
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              Take the first step towards a healthier, more beautiful smile. 
              Our friendly team is ready to welcome you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link to="/appointment">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Online
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+1234567890">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Clock,
                title: "Opening Hours",
                lines: [
                  "Mon - Fri: 9:00 AM - 6:00 PM",
                  "Saturday: 9:00 AM - 2:00 PM",
                  "Sunday: Closed",
                ],
              },
              {
                icon: Phone,
                title: "Contact Info",
                lines: [
                  "(123) 456-7890",
                  "info@dentalcare.com",
                  "123 Dental Street, NY",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-3">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.lines.map((line, i) => (
                    <li key={i} className="text-sm text-primary-foreground/70">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
