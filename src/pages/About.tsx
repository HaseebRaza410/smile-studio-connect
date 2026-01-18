import { Award, Users, Heart, Clock, CheckCircle, Target, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import teamImage from "@/assets/images/team.jpg";
import clinicInterior from "@/assets/images/clinic-interior.jpg";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "10,000+", label: "Happy Patients" },
  { value: "6", label: "Expert Dentists" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "We prioritize your comfort and well-being, providing personalized care tailored to your unique needs.",
  },
  {
    icon: Shield,
    title: "Excellence & Quality",
    description: "We use the latest technology and techniques to deliver the highest standard of dental care.",
  },
  {
    icon: Users,
    title: "Family-Friendly",
    description: "From toddlers to seniors, we provide comprehensive dental care for the whole family.",
  },
  {
    icon: Target,
    title: "Continuous Improvement",
    description: "Our team stays updated with the latest advancements in dental medicine through ongoing education.",
  },
];

const milestones = [
  { year: "2008", event: "DentalCare clinic founded by Dr. Sarah Mitchell" },
  { year: "2012", event: "Expanded to include orthodontics and cosmetic services" },
  { year: "2016", event: "Opened state-of-the-art facility with latest technology" },
  { year: "2020", event: "Introduced digital dentistry and 3D imaging" },
  { year: "2023", event: "Celebrated 10,000+ satisfied patients milestone" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Trusted Partner in{" "}
                  <span className="text-primary">Dental Health</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  At DentalCare, we believe everyone deserves a healthy, beautiful smile. 
                  Since 2008, we've been committed to providing exceptional dental care 
                  in a comfortable, welcoming environment. Our team of experienced professionals 
                  combines expertise with compassion to deliver the best possible outcomes for our patients.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link to="/appointment">Book Appointment</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src={teamImage}
                  alt="DentalCare Team"
                  className="rounded-2xl shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Award Winning</p>
                      <p className="text-sm text-muted-foreground">Best Clinic 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={clinicInterior}
                  alt="Our Modern Clinic"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A Legacy of Excellence
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  DentalCare was founded with a simple mission: to provide exceptional 
                  dental care that puts patients first. What started as a small practice 
                  has grown into a comprehensive dental center, but our commitment to 
                  personalized care remains unchanged.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Our state-of-the-art facility features the latest dental technology, 
                  including digital X-rays, 3D imaging, and laser dentistry. We've invested 
                  in these advancements to provide you with the most accurate diagnoses 
                  and comfortable treatments possible.
                </p>
                <div className="space-y-3">
                  {["Advanced dental technology", "Experienced specialists", "Comfortable environment", "Comprehensive care"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Drives Us Every Day
              </h2>
              <p className="text-lg text-muted-foreground">
                Our core values guide everything we do, from patient care to team development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Milestones Along the Way
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pt-2 pb-8">
                    <p className="text-foreground font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust DentalCare with their smiles.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/appointment">Schedule Your Visit</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
