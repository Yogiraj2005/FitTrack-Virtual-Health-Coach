
import { Button } from "@/components/ui/button";
import { Dumbbell, User, Menu, MessageSquare, CalendarCheck, Activity, Apple } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: <Activity className="h-5 w-5" /> },
    { path: "/workouts", label: "Workouts", icon: <Dumbbell className="h-5 w-5" /> },
    { path: "/tracker", label: "Tracker", icon: <Activity className="h-5 w-5" /> },
    { path: "/chatbot", label: "AI Coach", icon: <MessageSquare className="h-5 w-5" /> },
    { path: "/wellness-plan", label: "Wellness Plan", icon: <CalendarCheck className="h-5 w-5" /> },
    { path: "/nutrient-plan", label: "Nutrients", icon: <Apple className="h-5 w-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-[#3D9DA1]" />
            <span className="text-xl font-bold">FitTrack</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                location.pathname === link.path
                  ? "text-[#3D9DA1]"
                  : "hover:text-[#3D9DA1]"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b pb-4">
          <nav className="flex flex-col container">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 py-3 px-4 ${
                  location.pathname === link.path
                    ? "bg-[#3D9DA1]/10 text-[#3D9DA1]"
                    : "hover:bg-slate-50"
                } rounded-md`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
