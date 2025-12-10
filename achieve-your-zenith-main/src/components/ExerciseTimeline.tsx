
import { Activity, Heart, Timer } from "lucide-react";

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: "activity" | "heart" | "timer";
}

interface ExerciseTimelineProps {
  items: TimelineItem[];
}

const ExerciseTimeline = ({ items }: ExerciseTimelineProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity":
        return <Activity className="h-5 w-5 text-fitness-primary" />;
      case "heart":
        return <Heart className="h-5 w-5 text-fitness-accent" />;
      case "timer":
        return <Timer className="h-5 w-5 text-fitness-secondary" />;
      default:
        return <Activity className="h-5 w-5 text-fitness-primary" />;
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-fitness-primary/10">
            {getIcon(item.icon)}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{item.time}</p>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseTimeline;
