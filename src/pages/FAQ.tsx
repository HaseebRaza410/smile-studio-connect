import { HelpCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How often should I visit the dentist?",
    answer: "We recommend visiting the dentist every 6 months for a routine checkup and professional cleaning. However, if you have specific dental conditions or concerns, your dentist may suggest more frequent visits. Regular checkups help detect problems early when they're easier and less expensive to treat.",
  },
  {
    question: "Does teeth whitening damage my enamel?",
    answer: "Professional teeth whitening performed by qualified dentists is safe and does not damage enamel. We use clinically tested products at appropriate concentrations. Some patients may experience temporary sensitivity, which typically resolves within a few days. Over-the-counter products or excessive use can potentially cause issues, which is why professional supervision is recommended.",
  },
  {
    question: "What should I do in a dental emergency?",
    answer: "For dental emergencies like severe toothache, knocked-out tooth, or broken tooth, contact us immediately at 03241572018. While waiting, rinse your mouth with warm water. For a knocked-out tooth, try to place it back in the socket or keep it in milk. Apply a cold compress to reduce swelling. Avoid aspirin directly on gums. We prioritize emergency cases and will see you as soon as possible.",
  },
  {
    question: "Are dental X-rays safe?",
    answer: "Yes, dental X-rays are very safe. Modern digital X-rays use minimal radiation—about the same amount you'd receive from a short airplane flight. We follow strict safety protocols and only take X-rays when necessary for diagnosis. X-rays help us detect cavities, bone loss, and other issues not visible during a regular exam, making them an essential diagnostic tool.",
  },
  {
    question: "How can I prevent bad breath?",
    answer: "Bad breath (halitosis) can be prevented with good oral hygiene. Brush twice daily, including your tongue where bacteria accumulate. Floss daily to remove food particles between teeth. Stay hydrated and avoid dry mouth. Limit foods like garlic and onions. Use an antibacterial mouthwash. If bad breath persists despite good hygiene, schedule a checkup as it could indicate gum disease or other health issues.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our dental services, treatments, and care.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find the answer you're looking for? Our friendly team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-lg">
                  <a href="tel:+923241572018" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg">
                  <a href="mailto:razahaseeb410@gmail.com" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Schedule Your Visit?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Book an appointment today and experience our exceptional dental care.
            </p>
            <Button asChild variant="secondary" size="lg" className="rounded-lg">
              <Link to="/appointment">Book Appointment</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;