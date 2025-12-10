
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, MessageSquare, ClipboardList } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-3 mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-[#3D9DA1]">
          <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z" />
            <path d="M8 17v1a4 4 0 0 0 8 0v-1" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="8" y1="13" x2="16" y2="13" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">VIRTUAL HEALTH COACH</h1>
        <p className="text-xl mb-8">Welcome!</p>
        <p className="text-lg mb-10">Get personalized wellness guidance with your AI coach</p>
        
        <Button 
          onClick={() => navigate("/login")} 
          className="w-full py-6 text-lg bg-[#3D9DA1] hover:bg-[#3D9DA1]/90 mb-8"
        >
          Get Started
        </Button>
        
        {/* Features */}
        <div className="space-y-6 mt-12">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-[#3D9DA1] mr-3" />
            <div className="text-left">
              <h3 className="text-lg font-semibold">Track Your Health</h3>
              <p className="text-gray-600">Monitor steps, calories, and activity</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MessageSquare className="h-6 w-6 text-[#3D9DA1] mr-3" />
            <div className="text-left">
              <h3 className="text-lg font-semibold">Chat with Your AI</h3>
              <p className="text-gray-600">Get answers and guidance anytime</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-[#3D9DA1] mr-3" />
            <div className="text-left">
              <h3 className="text-lg font-semibold">Receive Daily Tips</h3>
              <p className="text-gray-600">Personalized wellness recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
