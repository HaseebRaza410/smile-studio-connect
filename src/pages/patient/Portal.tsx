import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  LogOut,
  RefreshCw,
  Plus,
  User
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
type AppointmentStatus = Database["public"]["Enums"]["appointment_status"];

const statusColors: Record<AppointmentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons: Record<AppointmentStatus, typeof Clock> = {
  pending: Clock,
  confirmed: AlertCircle,
  completed: CheckCircle,
  cancelled: XCircle,
};

const PatientPortal = () => {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch appointments by email since patients aren't linked by user_id
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_email", user.email)
        .order("preferred_date", { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const upcomingAppointments = appointments.filter(
    a => a.status === "pending" || a.status === "confirmed"
  );
  const pastAppointments = appointments.filter(
    a => a.status === "completed" || a.status === "cancelled"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link to="/appointment">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card p-4 rounded-xl border border-border">
              <Calendar className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold">{appointments.length}</p>
              <p className="text-sm text-muted-foreground">Total Appointments</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <Clock className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-2xl font-bold">
                {appointments.filter(a => a.status === "completed").length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <AlertCircle className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-2xl font-bold">
                {appointments.filter(a => a.status === "confirmed").length}
              </p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Button variant="ghost" size="sm" onClick={fetchAppointments}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {isLoading ? (
              <div className="bg-card p-8 rounded-xl border border-border text-center">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary" />
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="bg-card p-8 rounded-xl border border-border text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any scheduled appointments.
                </p>
                <Button asChild>
                  <Link to="/appointment">Book an Appointment</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {upcomingAppointments.map((apt) => {
                  const StatusIcon = statusIcons[apt.status];
                  return (
                    <div
                      key={apt.id}
                      className="bg-card p-6 rounded-xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${statusColors[apt.status]} border`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {apt.service}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{new Date(apt.preferred_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{apt.preferred_time}</span>
                          </div>
                        </div>
                        {apt.doctor && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Doctor: {apt.doctor}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
              <div className="grid gap-4">
                {pastAppointments.map((apt) => {
                  const StatusIcon = statusIcons[apt.status];
                  return (
                    <div
                      key={apt.id}
                      className="bg-card p-6 rounded-xl border border-border opacity-75"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${statusColors[apt.status]} border`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {apt.service}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(apt.preferred_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{apt.preferred_time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientPortal;
