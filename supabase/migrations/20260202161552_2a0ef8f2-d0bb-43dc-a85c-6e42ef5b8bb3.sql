-- Create contact_messages table to store form submissions
CREATE TABLE public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Only admins can view contact messages
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update contact messages (mark as read)
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete contact messages
CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow public insert (for contact form)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Create site_preferences table for clinic settings
CREATE TABLE public.site_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value text NOT NULL,
    description text,
    updated_at timestamp with time zone DEFAULT now(),
    updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_preferences ENABLE ROW LEVEL SECURITY;

-- Anyone can read preferences (for displaying on site)
CREATE POLICY "Anyone can view site preferences"
ON public.site_preferences
FOR SELECT
USING (true);

-- Only admins can manage preferences
CREATE POLICY "Admins can update site preferences"
ON public.site_preferences
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert site preferences"
ON public.site_preferences
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site preferences"
ON public.site_preferences
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Insert default preferences
INSERT INTO public.site_preferences (key, value, description) VALUES
('clinic_name', 'DentalCare PK', 'Clinic name displayed on site'),
('clinic_phone', '+92-324-1572018', 'Main contact phone number'),
('clinic_email', 'razahaseeb410@gmail.com', 'Main contact email'),
('clinic_address', '123 Dental Street, Clifton, Karachi, Pakistan', 'Clinic physical address'),
('working_hours_weekday', 'Mon - Fri: 9:00 AM - 6:00 PM', 'Weekday working hours'),
('working_hours_weekend', 'Sat: 9:00 AM - 2:00 PM', 'Weekend working hours'),
('whatsapp_number', '+923241572018', 'WhatsApp contact number'),
('enable_chatbot', 'true', 'Enable AI chatbot on site'),
('enable_whatsapp', 'true', 'Enable WhatsApp button on site');