import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const appointmentSchema = z.object({
  patient_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  patient_email: z.string().email("Please enter a valid email").max(255),
  patient_phone: z.string().min(10, "Please enter a valid phone number").max(20),
  service: z.string().min(1, "Please select a service"),
  doctor: z.string().optional(),
  preferred_date: z.string().min(1, "Please select a date"),
  preferred_time: z.string().min(1, "Please select a time"),
  message: z.string().max(500).optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const services = [
  "General Checkup",
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Filling",
  "Root Canal",
  "Dental Implants",
  "Orthodontics",
  "Cosmetic Dentistry",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const Appointment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patient_name: "",
      patient_email: "",
      patient_phone: "",
      service: "",
      doctor: "",
      preferred_date: "",
      preferred_time: "",
      message: "",
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        patient_name: data.patient_name,
        patient_email: data.patient_email,
        patient_phone: data.patient_phone,
        service: data.service,
        doctor: data.doctor || null,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time,
        message: data.message || null,
      });

      if (error) throw error;
      
      setIsSuccess(true);
      toast.success("Appointment request submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              <h1 className="text-3xl font-bold mb-4">Appointment Requested!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for choosing DentalCare. We'll contact you shortly to confirm your appointment.
              </p>
              <Button onClick={() => setIsSuccess(false)}>Book Another</Button>
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
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Book Now
              </span>
              <h1 className="text-4xl font-bold mb-4">Schedule Your Visit</h1>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-2xl border border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="patient_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="John Doe" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="patient_email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="email" placeholder="john@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="patient_phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="(123) 456-7890" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="preferred_date" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" min={new Date().toISOString().split('T')[0]} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="preferred_time" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><Clock className="mr-2 h-4 w-4" /><SelectValue placeholder="Select time" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea placeholder="Any specific concerns or requests..." className="pl-10 min-h-[100px]" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Appointment"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointment;
