
import { Progress } from "@/components/ui/progress";

interface ActivityProgressProps {
  title: string;
  achieved: number;
  goal: number;
  unit: string;
  color?: string;
}

const ActivityProgress = ({ 
  title, 
  achieved, 
  goal, 
  unit,
  color = "bg-fitness-primary" 
}: ActivityProgressProps) => {
  const percentage = Math.min(Math.round((achieved / goal) * 100), 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-sm text-muted-foreground">
          {achieved}/{goal} {unit}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        indicatorClassName={color}
      />
    </div>
  );
};

export default ActivityProgress;
