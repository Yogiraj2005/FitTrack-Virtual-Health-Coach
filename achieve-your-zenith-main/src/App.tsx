
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import NutrientPlan from "./pages/NutrientPlan";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";
import WellnessPlan from "./pages/WellnessPlan";
import Chatbot from "./pages/Chatbot";
import Index from "./pages/Index";

const App = () => {
  return (
    <Router>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/nutrient-plan" element={<NutrientPlan />} />
            <Route path="/wellness-plan" element={<WellnessPlan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </TooltipProvider>
    </Router>
  );
};

export default App;
