import { Link } from "react-router-dom";
import { ArrowRight, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import doctor1 from "@/assets/images/doctors/doctor-1.jpg";
import doctor2 from "@/assets/images/doctors/doctor-2.jpg";
import doctor3 from "@/assets/images/doctors/doctor-3.jpg";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Lead Dentist",
    specialty: "Cosmetic Dentistry",
    experience: "15+ years",
    image: doctor1,
    education: "Harvard Dental School",
  },
  {
    name: "Dr. Michael Chen",
    role: "Orthodontist",
    specialty: "Orthodontics & Aligners",
    experience: "12+ years",
    image: doctor2,
    education: "UCLA Dental School",
  },
  {
    name: "Dr. Emily Tanaka",
    role: "Dental Hygienist",
    specialty: "Preventive Care",
    experience: "8+ years",
    image: doctor3,
    education: "NYU Dental School",
  },
];

const Doctors = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Meet Our Expert Dentists
          </h2>
          <p className="text-lg text-muted-foreground">
            Our skilled and compassionate team is dedicated to providing you with 
            the highest quality dental care in a comfortable environment.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">
                    {doctor.experience}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">
                  {doctor.role}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  Specializing in {doctor.specialty}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  <span>{doctor.education}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/appointment">
              Book With Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
