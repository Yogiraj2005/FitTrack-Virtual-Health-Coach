
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

const StatCard = ({ title, value, icon, change, isPositive = true, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={cn(
              "text-xs mt-1 font-medium flex items-center",
              isPositive ? "text-fitness-success" : "text-fitness-error"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className="bg-fitness-primary/10 p-2 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
