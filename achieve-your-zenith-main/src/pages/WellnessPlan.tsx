
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarCheck, Activity, Apple, Moon, List, Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getNutrientItemById } from "@/data/nutrientData";
import { getWorkoutVideoById } from "@/data/workoutData";

interface PlanSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  activities: {
    id: string;
    name: string;
    description: string;
    completed: boolean;
  }[];
}

// Define the selected workout and nutrition plan types
interface SelectedWorkout {
  id: string;
  title: string;
  category: string;
  duration: string;
  intensity: "Easy" | "Medium" | "Hard";
  image?: string;
}

interface SelectedNutrient {
  id: string;
  name: string;
  category: string;
  isVegetarian: boolean;
  calories: number;
  image?: string;
}

// Weekly plan structure
interface WeeklyPlan {
  day: string;
  workouts: SelectedWorkout[];
  nutrients: SelectedNutrient[];
}

const WellnessPlan = () => {
  const [planSections, setPlanSections] = useState<PlanSection[]>([
    {
      id: "fitness",
      title: "Fitness",
      icon: <Activity className="h-5 w-5 text-[#3D9DA1]" />,
      activities: [
        {
          id: "workout1",
          name: "Morning Cardio",
          description: "30 min jogging or brisk walking",
          completed: false
        },
        {
          id: "workout2",
          name: "Strength Training",
          description: "Focus on upper body - 3 sets of 12 reps",
          completed: false
        },
        {
          id: "workout3",
          name: "Evening Yoga",
          description: "15 min stretching and relaxation",
          completed: false
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      icon: <Apple className="h-5 w-5 text-red-500" />,
      activities: [
        {
          id: "nutrition1",
          name: "Protein Intake",
          description: "Consume 80g of protein today",
          completed: false
        },
        {
          id: "nutrition2",
          name: "Hydration",
          description: "Drink 8 glasses of water",
          completed: false
        },
        {
          id: "nutrition3",
          name: "Balanced Meals",
          description: "Include vegetables in at least 2 meals",
          completed: false
        }
      ]
    },
    {
      id: "sleep",
      title: "Sleep",
      icon: <Moon className="h-5 w-5 text-indigo-500" />,
      activities: [
        {
          id: "sleep1",
          name: "Early Bedtime",
          description: "Be in bed by 10:30 PM",
          completed: false
        },
        {
          id: "sleep2",
          name: "Morning Routine",
          description: "Wake up at 6:30 AM",
          completed: false
        },
        {
          id: "sleep3",
          name: "Screen Time",
          description: "No screens 30 min before sleep",
          completed: false
        }
      ]
    }
  ]);

  const { toast } = useToast();
  const [selectedWorkouts, setSelectedWorkouts] = useState<SelectedWorkout[]>([]);
  const [selectedNutrients, setSelectedNutrients] = useState<SelectedNutrient[]>([]);
  const [dietPreference, setDietPreference] = useState<'all' | 'vegetarian' | 'non-vegetarian'>('all');
  const [activeTab, setActiveTab] = useState<string>("daily");
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan[]>([]);

  // Load selected items from localStorage when component mounts
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('selectedWorkouts');
    if (savedWorkouts) {
      try {
        setSelectedWorkouts(JSON.parse(savedWorkouts));
      } catch (error) {
        console.error("Failed to parse saved workouts", error);
      }
    }

    const savedNutrients = localStorage.getItem('selectedNutrients');
    if (savedNutrients) {
      try {
        setSelectedNutrients(JSON.parse(savedNutrients));
      } catch (error) {
        console.error("Failed to parse saved nutrients", error);
      }
    }

    const savedDietPreference = localStorage.getItem('dietPreference');
    if (savedDietPreference) {
      setDietPreference(savedDietPreference as 'all' | 'vegetarian' | 'non-vegetarian');
    }
    
    // Create a weekly plan based on saved data
    generateWeeklyPlan();
  }, []);

  // Generate fitness activities from selected workouts
  useEffect(() => {
    if (selectedWorkouts.length > 0) {
      const workoutActivities = selectedWorkouts.map((workout, index) => ({
        id: `selected-workout-${workout.id}`,
        name: workout.title,
        description: `${workout.category} - ${workout.duration} - ${workout.intensity}`,
        completed: false
      }));

      setPlanSections(prevSections => 
        prevSections.map(section => 
          section.id === "fitness" 
            ? {
                ...section,
                activities: [...workoutActivities]
              }
            : section
        )
      );
      
      toast({
        title: "Workouts Updated",
        description: "Your wellness plan has been updated with your selected workouts.",
      });
      
      // Update weekly plan when workouts change
      generateWeeklyPlan();
    }
  }, [selectedWorkouts, toast]);

  // Generate nutrition activities from selected nutrients
  useEffect(() => {
    if (selectedNutrients.length > 0) {
      const nutrientActivities = selectedNutrients.map(nutrient => ({
        id: `selected-nutrient-${nutrient.id}`,
        name: nutrient.name,
        description: `${nutrient.category} - ${nutrient.calories} calories - ${nutrient.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}`,
        completed: false
      }));

      setPlanSections(prevSections => 
        prevSections.map(section => 
          section.id === "nutrition" 
            ? {
                ...section,
                activities: [...nutrientActivities]
              }
            : section
        )
      );
      
      toast({
        title: "Nutrition Plan Updated",
        description: "Your wellness plan has been updated with your selected nutrition items.",
      });
      
      // Update weekly plan when nutrients change
      generateWeeklyPlan();
    }
  }, [selectedNutrients, toast]);

  const handleToggleComplete = (sectionId: string, activityId: string) => {
    setPlanSections(sections => 
      sections.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              activities: section.activities.map(activity => 
                activity.id === activityId 
                  ? { ...activity, completed: !activity.completed } 
                  : activity
              )
            }
          : section
      )
    );
  };

  const calculateProgress = (section: PlanSection) => {
    const completedCount = section.activities.filter(a => a.completed).length;
    return section.activities.length > 0 ? (completedCount / section.activities.length) * 100 : 0;
  };

  const overallProgress = () => {
    const totalActivities = planSections.reduce((acc, section) => acc + section.activities.length, 0);
    const completedActivities = planSections.reduce(
      (acc, section) => acc + section.activities.filter(a => a.completed).length, 
      0
    );
    return totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
  };

  const handlePreferenceChange = (preference: 'all' | 'vegetarian' | 'non-vegetarian') => {
    setDietPreference(preference);
    localStorage.setItem('dietPreference', preference);
    toast({
      title: "Preference Updated",
      description: `Your diet preference has been updated to ${preference}.`,
    });
  };
  
  // Function to generate a weekly plan based on selected workouts and nutrients
  const generateWeeklyPlan = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // Get saved data
    const savedWorkouts = localStorage.getItem('selectedWorkouts');
    const parsedWorkouts = savedWorkouts ? JSON.parse(savedWorkouts) : [];
    
    const savedNutrients = localStorage.getItem('selectedNutrients');
    const parsedNutrients = savedNutrients ? JSON.parse(savedNutrients) : [];
    
    // Create a balanced weekly plan
    const newWeeklyPlan: WeeklyPlan[] = days.map((day, index) => {
      // Distribute workouts across the week - focus on different body parts on different days
      const dayWorkouts = parsedWorkouts
        .filter((_: any, i: number) => i % days.length === index)
        .slice(0, 2); // Limit to 2 workouts per day
        
      // For nutrients, try to balance macros across the week
      const dayNutrients = parsedNutrients
        .filter((_: any, i: number) => i % days.length === index)
        .slice(0, 3); // Limit to 3 nutrients per day
        
      return {
        day,
        workouts: dayWorkouts,
        nutrients: dayNutrients
      };
    });
    
    setWeeklyPlan(newWeeklyPlan);
  };

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <CalendarCheck className="h-7 w-7 mr-2 text-[#3D9DA1]" />
        <h1 className="text-3xl font-bold">Your Wellness Plan</h1>
      </div>

      <Card className="mb-6 border-[#3D9DA1]/20">
        <CardHeader className="pb-2">
          <CardTitle>Today's Progress</CardTitle>
          <CardDescription>Complete your daily activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Daily Progress</span>
            <span className="text-sm font-medium">{Math.round(overallProgress())}%</span>
          </div>
          <Progress value={overallProgress()} className="h-2" indicatorClassName="bg-[#3D9DA1]" />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="daily" className="w-full mb-6" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="daily">Daily Plan</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <div className="mb-6">
            <Tabs defaultValue="fitness" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="fitness">Fitness Preferences</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition Preferences</TabsTrigger>
              </TabsList>
              <TabsContent value="fitness">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Workout Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedWorkouts.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500">Go to the workouts page to select training plans</p>
                          <Button 
                            className="mt-4 bg-[#3D9DA1] hover:bg-[#3D9DA1]/90"
                            onClick={() => window.location.href = '/workouts'}
                          >
                            Choose Workouts
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-medium mb-2">Your Selected Workouts</h3>
                          <div className="space-y-2">
                            {selectedWorkouts.map(workout => (
                              <div key={workout.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{workout.title}</p>
                                  <p className="text-sm text-gray-500">{workout.category} · {workout.intensity} · {workout.duration}</p>
                                </div>
                                <div className="flex items-center">
                                  {workout.image && (
                                    <div className="h-10 w-10 rounded overflow-hidden mr-2">
                                      <img src={workout.image} alt={workout.title} className="h-full w-full object-cover" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="nutrition">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Apple className="h-5 w-5 mr-2" />
                      Diet Preference
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Select Your Diet Type</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge 
                            className={`cursor-pointer ${dietPreference === 'all' ? 'bg-[#3D9DA1]' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => handlePreferenceChange('all')}
                          >
                            All
                          </Badge>
                          <Badge 
                            className={`cursor-pointer ${dietPreference === 'vegetarian' ? 'bg-green-500' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => handlePreferenceChange('vegetarian')}
                          >
                            Vegetarian
                          </Badge>
                          <Badge 
                            className={`cursor-pointer ${dietPreference === 'non-vegetarian' ? 'bg-red-500' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => handlePreferenceChange('non-vegetarian')}
                          >
                            Non-Vegetarian
                          </Badge>
                        </div>
                      </div>
                      
                      {selectedNutrients.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500">Go to the nutrition plan page to select your nutrition plan</p>
                          <Button 
                            className="mt-4 bg-[#3D9DA1] hover:bg-[#3D9DA1]/90"
                            onClick={() => window.location.href = '/nutrient-plan'}
                          >
                            Choose Nutrition Plan
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-medium mb-2">Your Selected Nutrition Items</h3>
                          <div className="space-y-2">
                            {selectedNutrients.map(nutrient => (
                              <div key={nutrient.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{nutrient.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {nutrient.category} · {nutrient.calories} kcal · 
                                    <span className={`${nutrient.isVegetarian ? 'text-green-600' : 'text-red-600'} ml-1`}>
                                      {nutrient.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  {nutrient.image && (
                                    <div className="h-10 w-10 rounded overflow-hidden">
                                      <img src={nutrient.image} alt={nutrient.name} className="h-full w-full object-cover" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {planSections.map(section => (
              <Card key={section.id} className="border-gray-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {section.icon}
                      <CardTitle className="ml-2">{section.title}</CardTitle>
                    </div>
                    <span className="text-sm font-medium">{Math.round(calculateProgress(section))}%</span>
                  </div>
                  <Progress 
                    value={calculateProgress(section)} 
                    className="h-1 mt-2" 
                    indicatorClassName={
                      section.id === "fitness" 
                        ? "bg-[#3D9DA1]" 
                        : section.id === "nutrition" 
                          ? "bg-red-500" 
                          : "bg-indigo-500"
                    }
                  />
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {section.activities.length === 0 ? (
                      <div className="py-4 text-center text-gray-500">
                        <List className="mx-auto h-8 w-8 mb-2" />
                        <p>No activities yet. Add activities from your selected plans.</p>
                      </div>
                    ) : (
                      section.activities.map(activity => (
                        <div key={activity.id} className="py-3 flex items-center justify-between">
                          <div>
                            <h4 className={`font-medium ${activity.completed ? 'line-through text-gray-400' : ''}`}>
                              {activity.name}
                            </h4>
                            <p className={`text-sm ${activity.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                              {activity.description}
                            </p>
                          </div>
                          <Button
                            variant={activity.completed ? "default" : "outline"}
                            size="sm"
                            className={activity.completed ? "bg-[#3D9DA1] hover:bg-[#3D9DA1]/90" : ""}
                            onClick={() => handleToggleComplete(section.id, activity.id)}
                          >
                            {activity.completed ? "Completed" : "Complete"}
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Weekly Schedule View */}
        <TabsContent value="weekly">
          <div className="space-y-6">
            {weeklyPlan.map((day, index) => (
              <Card key={index} className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle>{day.day}</CardTitle>
                  <CardDescription>Your personalized daily plan</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Workouts for the day */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Dumbbell className="h-4 w-4 mr-2 text-[#3D9DA1]" />
                      <h3 className="font-semibold">Workouts</h3>
                    </div>
                    <div className="space-y-2">
                      {day.workouts.length > 0 ? (
                        day.workouts.map((workout, idx) => (
                          <div key={idx} className="p-2 bg-gray-50 rounded-md flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sm">{workout.title}</p>
                              <p className="text-xs text-gray-500">{workout.category} · {workout.duration}</p>
                            </div>
                            <Badge className={`text-xs ${
                              workout.intensity === "Easy" 
                                ? "bg-green-100 text-green-800" 
                                : workout.intensity === "Medium" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {workout.intensity}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          <p>No workouts scheduled</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Nutrition for the day */}
                  <div>
                    <div className="flex items-center mb-2">
                      <Apple className="h-4 w-4 mr-2 text-red-500" />
                      <h3 className="font-semibold">Nutrition</h3>
                    </div>
                    <div className="space-y-2">
                      {day.nutrients.length > 0 ? (
                        day.nutrients.map((nutrient, idx) => (
                          <div key={idx} className="p-2 bg-gray-50 rounded-md flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sm">{nutrient.name}</p>
                              <p className="text-xs text-gray-500">{nutrient.category} · {nutrient.calories} kcal</p>
                            </div>
                            <Badge className={`${nutrient.isVegetarian ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                              {nutrient.isVegetarian ? 'Veg' : 'Non-Veg'}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          <p>No nutrition items planned</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellnessPlan;
