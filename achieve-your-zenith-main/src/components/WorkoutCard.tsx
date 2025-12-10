
import { Button } from "@/components/ui/button";
import { Clock, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface WorkoutCardProps {
  title: string;
  category: string;
  duration: string;
  intensity: "Easy" | "Medium" | "Hard";
  image: string;
  onClick?: () => void;
}

const WorkoutCard = ({ title, category, duration, intensity, image, onClick }: WorkoutCardProps) => {
  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'chest': return 'bg-blue-500/20 text-blue-300';
      case 'back': return 'bg-purple-500/20 text-purple-300';
      case 'legs': return 'bg-indigo-500/20 text-indigo-300';
      case 'shoulders': return 'bg-cyan-500/20 text-cyan-300';
      case 'arms': return 'bg-orange-500/20 text-orange-300';
      case 'core': return 'bg-teal-500/20 text-teal-300';
      default: return 'bg-white/20 text-white';
    }
  };

  // Function to get video thumbnail based on category and title
  const getWorkoutVideoThumbnail = (category: string, title: string) => {
    // Use specific workout video thumbnails based on category
    switch(category.toLowerCase()) {
      case 'chest': 
        return "https://img.youtube.com/vi/rT7DgCr-3pg/hqdefault.jpg";
      case 'back': 
        return "https://img.youtube.com/vi/r4MzxtBKyNE/hqdefault.jpg"; 
      case 'legs': 
        return "https://img.youtube.com/vi/SW_C1A-rejs/hqdefault.jpg";
      case 'shoulders': 
        return "https://img.youtube.com/vi/qEwKCR5JCog/hqdefault.jpg";
      case 'arms': 
        return "https://img.youtube.com/vi/ykJmrZ5v0Oo/hqdefault.jpg";
      case 'core': 
        return "https://img.youtube.com/vi/ASdvN_XEl_c/hqdefault.jpg";
      default: 
        // Default video thumbnail based on workout title
        if (title.toLowerCase().includes('bench') || title.toLowerCase().includes('press')) {
          return "https://img.youtube.com/vi/rT7DgCr-3pg/hqdefault.jpg";
        } else if (title.toLowerCase().includes('squat') || title.toLowerCase().includes('leg')) {
          return "https://img.youtube.com/vi/SW_C1A-rejs/hqdefault.jpg";
        } else if (title.toLowerCase().includes('pull') || title.toLowerCase().includes('dead')) {
          return "https://img.youtube.com/vi/r4MzxtBKyNE/hqdefault.jpg";
        } else if (title.toLowerCase().includes('hip') || title.toLowerCase().includes('thrust')) {
          return "https://img.youtube.com/vi/xDmFkJxPzeM/hqdefault.jpg";
        } else {
          return "https://img.youtube.com/vi/eGo4IYlbE5g/hqdefault.jpg";
        }
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group h-64"
      onClick={onClick}
    >
      <img 
        src={image || getWorkoutVideoThumbnail(category, title)} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 left-2">
        <Badge className={`${getCategoryColor(category)}`}>
          {category}
        </Badge>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="bg-white/20 text-white py-1 px-2 rounded-md text-xs flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium py-1 px-2 rounded-full ${
            intensity === "Easy" 
              ? "bg-green-500/20 text-green-300" 
              : intensity === "Medium" 
              ? "bg-yellow-500/20 text-yellow-300" 
              : "bg-red-500/20 text-red-300"
          }`}>
            {intensity}
          </span>
          <Button size="sm" className="bg-[#3D9DA1] hover:bg-[#3D9DA1]/90 rounded-full">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
