import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl">🦷</span>
            <span className="text-lg md:text-xl font-bold text-foreground">DentalCare <span className="text-primary">PK</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+923241572018"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>0324-1572018</span>
            </a>
            {user ? (
              <Button asChild variant="outline">
                <Link to={isAdmin ? "/admin" : "/patient"} className="gap-2">
                  <User className="w-4 h-4" />
                  {isAdmin ? "Admin Panel" : "My Portal"}
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link to="/auth" className="gap-2">
                  <User className="w-4 h-4" />
                  Login
                </Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/appointment" className="gap-2">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <Button asChild className="w-full">
                  <Link to="/appointment" onClick={() => setIsOpen(false)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
