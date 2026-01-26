import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Owner contact details
const OWNER_EMAIL = "razahaseeb410@gmail.com";
const OWNER_WHATSAPP = "923241572018";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentNotification {
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Input validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, dashes, parentheses, and plus sign
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.length >= 7 && phone.length <= 20;
}

function isValidDate(dateStr: string): boolean {
  // Expect YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function isValidTime(timeStr: string): boolean {
  // Common time formats
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9](\s?(AM|PM|am|pm))?$|^([0-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/;
  return timeRegex.test(timeStr) && timeStr.length <= 20;
}

function isValidName(name: string): boolean {
  return name.length >= 1 && name.length <= 100;
}

function isValidService(service: string): boolean {
  const validServices = [
    "General Checkup",
    "Teeth Cleaning",
    "Teeth Whitening",
    "Dental Filling",
    "Root Canal",
    "Dental Implants",
    "Orthodontics",
    "Cosmetic Dentistry",
    "General Dentistry",
    "Cosmetic Dentistry",
    "Root Canal Therapy",
    "Pediatric Dentistry",
    "Emergency Dentistry"
  ];
  return validServices.includes(service) || (service.length >= 1 && service.length <= 100);
}

function isValidMessage(message: string | undefined): boolean {
  if (!message) return true;
  return message.length <= 1000;
}

function validateAppointmentData(data: unknown): { valid: boolean; error?: string; data?: AppointmentNotification } {
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Invalid request format" };
  }

  const d = data as Record<string, unknown>;

  // Required fields
  if (typeof d.patient_name !== "string" || !isValidName(d.patient_name)) {
    return { valid: false, error: "Invalid patient name" };
  }
  if (typeof d.patient_email !== "string" || !isValidEmail(d.patient_email)) {
    return { valid: false, error: "Invalid email address" };
  }
  if (typeof d.patient_phone !== "string" || !isValidPhone(d.patient_phone)) {
    return { valid: false, error: "Invalid phone number" };
  }
  if (typeof d.service !== "string" || !isValidService(d.service)) {
    return { valid: false, error: "Invalid service" };
  }
  if (typeof d.preferred_date !== "string" || !isValidDate(d.preferred_date)) {
    return { valid: false, error: "Invalid date format" };
  }
  if (typeof d.preferred_time !== "string" || !isValidTime(d.preferred_time)) {
    return { valid: false, error: "Invalid time format" };
  }
  
  // Optional message
  if (d.message !== undefined && (typeof d.message !== "string" || !isValidMessage(d.message))) {
    return { valid: false, error: "Message too long" };
  }

  return {
    valid: true,
    data: {
      patient_name: d.patient_name,
      patient_email: d.patient_email,
      patient_phone: d.patient_phone,
      service: d.service,
      preferred_date: d.preferred_date,
      preferred_time: d.preferred_time,
      message: d.message as string | undefined
    }
  };
}

// Generate WhatsApp notification URL for owner
function generateOwnerWhatsAppUrl(data: AppointmentNotification): string {
  const message = `🦷 New Appointment Request!

📋 Patient Details:
• Name: ${data.patient_name}
• Email: ${data.patient_email}
• Phone: ${data.patient_phone}

📅 Appointment:
• Service: ${data.service}
• Date: ${data.preferred_date}
• Time: ${data.preferred_time}
${data.message ? `\n📝 Notes: ${data.message}` : ''}

Please confirm the appointment.`;
  
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate all inputs
    const validation = validateAppointmentData(rawData);
    if (!validation.valid || !validation.data) {
      return new Response(
        JSON.stringify({ error: validation.error || "Invalid request" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data = validation.data;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Escape all user inputs for HTML
    const safeName = escapeHtml(data.patient_name);
    const safeEmail = escapeHtml(data.patient_email);
    const safePhone = escapeHtml(data.patient_phone);
    const safeService = escapeHtml(data.service);
    const safeDate = escapeHtml(data.preferred_date);
    const safeTime = escapeHtml(data.preferred_time);
    const safeMessage = data.message ? escapeHtml(data.message) : null;

    // Generate WhatsApp link for owner notification
    const ownerWhatsAppUrl = generateOwnerWhatsAppUrl(data);

    // Send notification email to clinic owner with WhatsApp link
    const clinicEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DentalCare <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `🦷 New Appointment Request - ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0284c7;">🦷 New Appointment Request</h1>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Patient Details</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Phone:</strong> ${safePhone}</p>
            </div>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Appointment Details</h2>
              <p><strong>Service:</strong> ${safeService}</p>
              <p><strong>Preferred Date:</strong> ${safeDate}</p>
              <p><strong>Preferred Time:</strong> ${safeTime}</p>
              ${safeMessage ? `<p><strong>Additional Notes:</strong> ${safeMessage}</p>` : ''}
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${ownerWhatsAppUrl}" style="display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                📱 Open in WhatsApp
              </a>
            </div>
            <p style="color: #64748b; font-size: 14px;">Please contact the patient to confirm the appointment via email or WhatsApp.</p>
          </div>
        `,
      }),
    });

    if (!clinicEmailResponse.ok) {
      const errorText = await clinicEmailResponse.text();
      console.error("Failed to send clinic email:", errorText);
    }

    console.log("Clinic notification email with WhatsApp link sent to:", OWNER_EMAIL);

    // Send confirmation email to patient with WhatsApp contact info
    const patientWhatsAppUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent("Hello! I recently booked an appointment and have a question.")}`;
    
    const patientEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DentalCare <onboarding@resend.dev>",
        to: [data.patient_email],
        subject: "Appointment Request Received - DentalCare",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0284c7;">Thank You for Your Appointment Request!</h1>
            <p>Dear ${safeName},</p>
            <p>We have received your appointment request and will contact you shortly to confirm your booking.</p>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Your Request Details</h2>
              <p><strong>Service:</strong> ${safeService}</p>
              <p><strong>Preferred Date:</strong> ${safeDate}</p>
              <p><strong>Preferred Time:</strong> ${safeTime}</p>
            </div>
            <p>If you have any questions, please don't hesitate to contact us:</p>
            <ul>
              <li>📞 Phone: 03241572018</li>
              <li>📧 Email: ${OWNER_EMAIL}</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${patientWhatsAppUrl}" style="display: inline-block; background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                💬 Chat with us on WhatsApp
              </a>
            </div>
            <p>We look forward to seeing you!</p>
            <p style="color: #64748b; margin-top: 30px;">Best regards,<br>The DentalCare Team</p>
          </div>
        `,
      }),
    });

    if (!patientEmailResponse.ok) {
      const errorText = await patientEmailResponse.text();
      console.error("Failed to send patient email:", errorText);
    }

    console.log("Patient confirmation email with WhatsApp link sent");

    return new Response(
      JSON.stringify({ 
        success: true,
        ownerNotified: {
          email: OWNER_EMAIL,
          whatsapp: OWNER_WHATSAPP
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in send-appointment-notification:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
