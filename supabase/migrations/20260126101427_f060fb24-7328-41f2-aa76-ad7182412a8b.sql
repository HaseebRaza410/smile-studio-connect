-- Add RLS policy to allow authenticated users to view their own appointments by email
CREATE POLICY "Users can view own appointments by email"
ON public.appointments
FOR SELECT
TO authenticated
USING (patient_email = auth.jwt() ->> 'email');