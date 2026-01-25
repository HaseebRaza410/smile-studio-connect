import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AppointmentNotification = await req.json();
    
    // Validate required fields
    if (!data.patient_name || !data.patient_email || !data.service || !data.preferred_date || !data.preferred_time) {
      throw new Error("Missing required fields");
    }

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send notification email to clinic
    const clinicEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DentalCare <onboarding@resend.dev>",
        to: ["razahaseeb410@gmail.com"],
        subject: `New Appointment Request - ${data.patient_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0284c7;">New Appointment Request</h1>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Patient Details</h2>
              <p><strong>Name:</strong> ${data.patient_name}</p>
              <p><strong>Email:</strong> ${data.patient_email}</p>
              <p><strong>Phone:</strong> ${data.patient_phone}</p>
            </div>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Appointment Details</h2>
              <p><strong>Service:</strong> ${data.service}</p>
              <p><strong>Preferred Date:</strong> ${data.preferred_date}</p>
              <p><strong>Preferred Time:</strong> ${data.preferred_time}</p>
              ${data.message ? `<p><strong>Additional Notes:</strong> ${data.message}</p>` : ''}
            </div>
            <p style="color: #64748b; font-size: 14px;">Please contact the patient to confirm the appointment.</p>
          </div>
        `,
      }),
    });

    if (!clinicEmailResponse.ok) {
      const errorText = await clinicEmailResponse.text();
      console.error("Failed to send clinic email:", errorText);
    }

    console.log("Clinic notification email sent");

    // Send confirmation email to patient
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
            <p>Dear ${data.patient_name},</p>
            <p>We have received your appointment request and will contact you shortly to confirm your booking.</p>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Your Request Details</h2>
              <p><strong>Service:</strong> ${data.service}</p>
              <p><strong>Preferred Date:</strong> ${data.preferred_date}</p>
              <p><strong>Preferred Time:</strong> ${data.preferred_time}</p>
            </div>
            <p>If you have any questions, please don't hesitate to contact us:</p>
            <ul>
              <li>Phone: 03241572018</li>
              <li>Email: razahaseeb410@gmail.com</li>
            </ul>
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

    console.log("Patient confirmation email sent");

    return new Response(
      JSON.stringify({ success: true, clinicEmail: clinicEmailResponse, patientEmail: patientEmailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-appointment-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
