import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Captcha, { CaptchaRef } from "@/components/common/Captcha";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Dental Street, Clifton", "Karachi, Pakistan"],
    link: null,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+92-324-1572018"],
    link: "tel:+923241572018",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["razahaseeb410@gmail.com"],
    link: "mailto:razahaseeb410@gmail.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
    link: null,
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<CaptchaRef>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: { ...formData, captchaToken },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setIsSuccess(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setCaptchaToken(null);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSuccess(false)} className="rounded-lg">Send Another Message</Button>
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
              <span className="inline-block px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
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
                  className="p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                  {info.details.map((detail) => (
                    info.link ? (
                      <a 
                        key={detail} 
                        href={info.link}
                        className="block text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={detail} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    )
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
              <div className="bg-card p-8 rounded-lg border border-border">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        name="name"
                        placeholder="Ahmed Khan"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="ahmed@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        name="phone"
                        placeholder="+92-300-1234567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="rounded-lg"
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
                        className="rounded-lg"
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
                      className="rounded-lg"
                    />
                  </div>
                  
                  <Captcha
                    ref={captchaRef}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                    onError={() => {
                      setCaptchaToken(null);
                      toast.error("CAPTCHA error. Please try again.");
                    }}
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-lg" 
                    disabled={isSubmitting || !captchaToken}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden border border-border h-[500px] lg:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2894831809045!2d67.0251684!3d24.8607344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8a4c93c2ab%3A0x4e9c9a8d9e5e5e5e!2sClifton%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1623175834637!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location - Karachi, Pakistan"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-accent/10 p-8 md:p-12 rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Dental Emergency?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you're experiencing a dental emergency, don't wait. Call our emergency 
                line immediately and we'll get you the care you need.
              </p>
              <a
                href="tel:+923241572018"
                className="inline-flex items-center gap-2 text-2xl font-bold text-accent hover:underline"
              >
                <Phone className="w-6 h-6" />
                +92-324-1572018
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
