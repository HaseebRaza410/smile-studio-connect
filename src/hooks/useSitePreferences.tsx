import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SitePreferences {
  clinic_name: string;
  clinic_phone: string;
  clinic_email: string;
  clinic_address: string;
  working_hours_weekday: string;
  working_hours_weekend: string;
  whatsapp_number: string;
  enable_chatbot: boolean;
  enable_whatsapp: boolean;
}

const defaultPreferences: SitePreferences = {
  clinic_name: "DentalCare PK",
  clinic_phone: "+92-324-1572018",
  clinic_email: "razahaseeb410@gmail.com",
  clinic_address: "123 Dental Street, Clifton, Karachi, Pakistan",
  working_hours_weekday: "Mon - Fri: 9:00 AM - 6:00 PM",
  working_hours_weekend: "Sat: 9:00 AM - 2:00 PM",
  whatsapp_number: "+923241572018",
  enable_chatbot: true,
  enable_whatsapp: true,
};

interface PreferencesContextType {
  preferences: SitePreferences;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<SitePreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("site_preferences")
        .select("key, value");

      if (error) throw error;

      if (data) {
        const prefs = { ...defaultPreferences };
        data.forEach((row) => {
          const key = row.key as keyof SitePreferences;
          if (key in prefs) {
            if (key === "enable_chatbot" || key === "enable_whatsapp") {
              (prefs as any)[key] = row.value === "true";
            } else {
              (prefs as any)[key] = row.value;
            }
          }
        });
        setPreferences(prefs);
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <PreferencesContext.Provider value={{ preferences, isLoading, refetch: fetchPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const useSitePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error("useSitePreferences must be used within a PreferencesProvider");
  }
  return context;
};
