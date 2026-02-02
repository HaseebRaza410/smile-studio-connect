import { useState, useEffect } from "react";
import { 
  Save,
  RefreshCw,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Bot
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Preference {
  key: string;
  value: string;
  description: string | null;
}

const SettingsTab = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_preferences")
        .select("key, value");

      if (error) throw error;

      const prefs: Record<string, string> = {};
      data?.forEach((p) => {
        prefs[p.key] = p.value;
      });
      setPreferences(prefs);
    } catch (error) {
      toast.error("Failed to fetch preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreference = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(preferences).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
        updated_by: user?.id,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_preferences")
          .update({ value: update.value, updated_at: update.updated_at, updated_by: update.updated_by })
          .eq("key", update.key);

        if (error) throw error;
      }

      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clinic Information */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" />
          Clinic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clinic_name">Clinic Name</Label>
            <Input
              id="clinic_name"
              value={preferences.clinic_name || ""}
              onChange={(e) => updatePreference("clinic_name", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="clinic_address" className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Address
            </Label>
            <Input
              id="clinic_address"
              value={preferences.clinic_address || ""}
              onChange={(e) => updatePreference("clinic_address", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clinic_phone" className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> Phone Number
            </Label>
            <Input
              id="clinic_phone"
              value={preferences.clinic_phone || ""}
              onChange={(e) => updatePreference("clinic_phone", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="clinic_email" className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </Label>
            <Input
              id="clinic_email"
              type="email"
              value={preferences.clinic_email || ""}
              onChange={(e) => updatePreference("clinic_email", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="whatsapp_number" className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> WhatsApp Number
            </Label>
            <Input
              id="whatsapp_number"
              value={preferences.whatsapp_number || ""}
              onChange={(e) => updatePreference("whatsapp_number", e.target.value)}
              placeholder="+923241572018"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Working Hours
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="working_hours_weekday">Weekdays</Label>
            <Input
              id="working_hours_weekday"
              value={preferences.working_hours_weekday || ""}
              onChange={(e) => updatePreference("working_hours_weekday", e.target.value)}
              placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="working_hours_weekend">Weekends</Label>
            <Input
              id="working_hours_weekend"
              value={preferences.working_hours_weekend || ""}
              onChange={(e) => updatePreference("working_hours_weekend", e.target.value)}
              placeholder="Sat: 9:00 AM - 2:00 PM"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Features
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable_chatbot" className="text-base">AI Chatbot</Label>
              <p className="text-sm text-muted-foreground">Show AI assistant on the website</p>
            </div>
            <Switch
              id="enable_chatbot"
              checked={preferences.enable_chatbot === "true"}
              onCheckedChange={(checked) => updatePreference("enable_chatbot", String(checked))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable_whatsapp" className="text-base">WhatsApp Button</Label>
              <p className="text-sm text-muted-foreground">Show WhatsApp contact button</p>
            </div>
            <Switch
              id="enable_whatsapp"
              checked={preferences.enable_whatsapp === "true"}
              onCheckedChange={(checked) => updatePreference("enable_whatsapp", String(checked))}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={savePreferences} disabled={isSaving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;
