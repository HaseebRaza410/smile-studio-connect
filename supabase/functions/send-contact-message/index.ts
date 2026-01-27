import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "razahaseeb410@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_IP) {
    return true;
  }
  
  record.count++;
  return false;
}

// HTML escape function
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function isValidName(name: string): boolean {
  return name.length >= 1 && name.length <= 100;
}

function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.length >= 7 && phone.length <= 20;
}

function isValidSubject(subject: string): boolean {
  return subject.length >= 1 && subject.length <= 200;
}

function isValidMessage(message: string): boolean {
  return message.length >= 1 && message.length <= 2000;
}

interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function validateContactData(data: unknown): { valid: boolean; error?: string; data?: ContactMessage } {
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Invalid request format" };
  }

  const d = data as Record<string, unknown>;

  if (typeof d.name !== "string" || !isValidName(d.name)) {
    return { valid: false, error: "Invalid name" };
  }
  if (typeof d.email !== "string" || !isValidEmail(d.email)) {
    return { valid: false, error: "Invalid email address" };
  }
  if (d.phone !== undefined && d.phone !== "" && (typeof d.phone !== "string" || !isValidPhone(d.phone))) {
    return { valid: false, error: "Invalid phone number" };
  }
  if (typeof d.subject !== "string" || !isValidSubject(d.subject)) {
    return { valid: false, error: "Invalid subject" };
  }
  if (typeof d.message !== "string" || !isValidMessage(d.message)) {
    return { valid: false, error: "Invalid message" };
  }

  return {
    valid: true,
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone as string | undefined,
      subject: d.subject,
      message: d.message,
    }
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many messages. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rawData = await req.json();
    
    const validation = validateContactData(rawData);
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

    // Escape all inputs for HTML
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = data.phone ? escapeHtml(data.phone) : "Not provided";
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message);

    // Send email to clinic owner
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DentalCare <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `📧 Contact Form: ${safeSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0284c7;">📧 New Contact Message</h1>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Contact Details</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              <p><strong>Phone:</strong> ${safePhone}</p>
            </div>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Subject</h2>
              <p>${safeSubject}</p>
            </div>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #334155;">Message</h2>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
            </div>
            <p style="color: #64748b; font-size: 14px;">Reply directly to this email or contact the sender at ${safeEmail}</p>
          </div>
        `,
        reply_to: data.email,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Failed to send email:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send message" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Contact message sent to:", OWNER_EMAIL);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in send-contact-message:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);