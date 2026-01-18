import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jennifer Adams",
    role: "Marketing Executive",
    content: "I've been terrified of dentists my whole life, but the team at DentalCare made me feel completely at ease. Dr. Mitchell was incredibly gentle and explained everything clearly. My smile has never looked better!",
    rating: 5,
    avatar: "JA",
  },
  {
    name: "Robert Thompson",
    role: "Business Owner",
    content: "The best dental experience I've ever had. From the modern facility to the friendly staff, everything was top-notch. My teeth whitening results exceeded my expectations!",
    rating: 5,
    avatar: "RT",
  },
  {
    name: "Lisa Chen",
    role: "Teacher",
    content: "Dr. Chen transformed my daughter's smile with Invisalign. The whole process was smooth, and the results are amazing. We couldn't be happier with the care we received.",
    rating: 5,
    avatar: "LC",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Our Patients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Hear from our satisfied patients about 
            their experience at DentalCare.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 p-8 rounded-2xl bg-muted/50 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "2,000+", label: "Patient Reviews" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "15+", label: "Years Trusted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
