import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Dental Street", "Medical District, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["(123) 456-7890", "(123) 456-7891"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@dentalcare.com", "appointments@dentalcare.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    toast.success("Message sent successfully!");
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSuccess(false)}>Send Another Message</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We'd Love to{" "}
                <span className="text-primary">Hear From You</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions about our services? Want to schedule an appointment? 
                Reach out to us and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-[500px] lg:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784368459377!3d40.75797977932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623175834637!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-accent/10 p-8 md:p-12 rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Dental Emergency?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you're experiencing a dental emergency, don't wait. Call our emergency 
                line immediately and we'll get you the care you need.
              </p>
              <a
                href="tel:+11234567890"
                className="inline-flex items-center gap-2 text-2xl font-bold text-accent hover:underline"
              >
                <Phone className="w-6 h-6" />
                (123) 456-7890
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
