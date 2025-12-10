
import { useState } from "react";
import { Activity, Dumbbell, Heart, Timer, Thermometer, Apple, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import StatCard from "@/components/StatCard";
import WorkoutCard from "@/components/WorkoutCard";
import ActivityProgress from "@/components/ActivityProgress";
import ExerciseTimeline from "@/components/ExerciseTimeline";
import { recommendedWorkouts, getWorkoutVideoById } from "@/data/workoutData";
import { getNutrientItemsByCategory } from "@/data/nutrientData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);
  const [showVideoId, setShowVideoId] = useState<string | null>(null);
  
  const timelineItems = [
    {
      time: "Today, 6:30 AM",
      title: "Morning Cardio",
      description: "30 min · 350 calories",
      icon: "timer" as const
    },
    {
      time: "Yesterday, 5:45 PM",
      title: "Full Body Workout",
      description: "45 min · 420 calories",
      icon: "activity" as const
    },
    {
      time: "Monday, 7:00 AM",
      title: "HIIT Training",
      description: "25 min · 310 calories",
      icon: "heart" as const
    }
  ];

  // Get nutrient items for the dashboard preview
  const proteinItems = getNutrientItemsByCategory("Protein").slice(0, 3);
  const carbsItems = getNutrientItemsByCategory("Carbs").slice(0, 3);

  const handleWorkoutSelect = (workout: any) => {
    setSelectedWorkout(workout);
  };

  const handleShowVideo = (videoId: string) => {
    setShowVideoId(videoId);
    // Close workout detail if open
    setSelectedWorkout(null);
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Hey, Sarah! 👋</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Daily Steps" 
          value="8,493" 
          icon={<Activity className="h-5 w-5 text-fitness-primary" />}
          change="+12% from yesterday"
          isPositive={true}
        />
        <StatCard 
          title="Calories" 
          value="1,842" 
          icon={<Thermometer className="h-5 w-5 text-fitness-accent" />}
          change="320 kcal remaining"
          isPositive={true}
        />
        <StatCard 
          title="Active Time" 
          value="87 min" 
          icon={<Timer className="h-5 w-5 text-fitness-secondary" />}
          change="-8% from yesterday"
          isPositive={false}
        />
        <StatCard 
          title="Heart Rate" 
          value="72 bpm" 
          icon={<Heart className="h-5 w-5 text-fitness-error" />}
          change="Resting"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended Workouts</h2>
              <Link to="/workouts" className="text-sm text-fitness-primary hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedWorkouts.slice(0, 2).map((workout) => (
                <WorkoutCard 
                  key={workout.id}
                  title={workout.title}
                  category={workout.category}
                  duration={workout.duration}
                  intensity={workout.intensity as "Easy" | "Medium" | "Hard"}
                  image={workout.image}
                  onClick={() => handleWorkoutSelect(workout)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Weekly Goals</h2>
            <div className="stat-card space-y-4">
              <ActivityProgress 
                title="Workout Sessions" 
                achieved={4} 
                goal={5} 
                unit="workouts"
                color="bg-fitness-primary"
              />
              <ActivityProgress 
                title="Active Minutes" 
                achieved={210} 
                goal={300} 
                unit="min"
                color="bg-fitness-secondary"
              />
              <ActivityProgress 
                title="Calories Burned" 
                achieved={1250} 
                goal={2000} 
                unit="kcal"
                color="bg-fitness-accent"
              />
            </div>
          </div>

          {/* Nutrient Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Nutrition Tracker</h2>
              <Link to="/nutrient-plan" className="text-sm text-fitness-primary hover:underline">View full plan</Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center mb-4">
                <Apple className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Today's Nutrition</h3>
              </div>
              
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <h4 className="text-sm font-medium mb-2">Suggested Proteins</h4>
                  <div className="space-y-2">
                    {proteinItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.protein}g protein</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <h4 className="text-sm font-medium mb-2">Suggested Carbs</h4>
                  <div className="space-y-2">
                    {carbsItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.carbs}g carbs</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <Link to="/nutrient-plan">
                  <Button variant="outline" size="sm" className="w-full">
                    View Complete Nutrition Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="stat-card h-full">
            <ExerciseTimeline items={timelineItems} />
          </div>
        </div>
      </div>
      
      {/* Workout Detail Dialog */}
      <Dialog open={!!selectedWorkout} onOpenChange={(open) => !open && setSelectedWorkout(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
          {selectedWorkout && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedWorkout.title}</DialogTitle>
                <DialogDescription>
                  {selectedWorkout.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 py-1 px-2 rounded-md text-xs">{selectedWorkout.category}</span>
                  <span className="text-xs bg-slate-100 py-1 px-2 rounded">{selectedWorkout.duration}</span>
                  <span className={`text-xs py-1 px-2 rounded-full ${
                    selectedWorkout.intensity === "Easy" 
                      ? "bg-green-100 text-green-800" 
                      : selectedWorkout.intensity === "Medium" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {selectedWorkout.intensity}
                  </span>
                </div>
                
                <h3 className="font-medium">Exercises</h3>
                <div className="space-y-2">
                  {selectedWorkout.exercises.map((exercise: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-gray-600">{exercise.sets} sets × {exercise.reps}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleShowVideo(exercise.videoId)}
                      >
                        Watch Demo
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Video Dialog */}
      <Dialog open={!!showVideoId} onOpenChange={(open) => !open && setShowVideoId(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
          {showVideoId && (() => {
            const video = getWorkoutVideoById(showVideoId);
            if (!video) return null;
            
            return (
              <>
                <DialogHeader>
                  <DialogTitle>{video.title}</DialogTitle>
                  <DialogDescription>
                    {video.caption}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="aspect-video w-full my-2">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                
                <div className="flex items-center gap-2 my-2 flex-wrap">
                  <span className="bg-slate-100 py-1 px-2 rounded-md text-xs">{video.category}</span>
                  {video.bodyPart && video.bodyPart !== video.category && (
                    <span className="bg-slate-100 py-1 px-2 rounded-md text-xs">{video.bodyPart}</span>
                  )}
                  <span className={`text-xs py-1 px-2 rounded-full ${
                    video.intensity === "Easy" 
                      ? "bg-green-100 text-green-800" 
                      : video.intensity === "Medium" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {video.intensity}
                  </span>
                  <span className="text-xs bg-slate-100 py-1 px-2 rounded ml-auto">{video.duration}</span>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
