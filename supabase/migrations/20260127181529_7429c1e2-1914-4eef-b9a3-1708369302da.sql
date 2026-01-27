-- Add DELETE policy for profiles table so users can delete their own profiles
CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);