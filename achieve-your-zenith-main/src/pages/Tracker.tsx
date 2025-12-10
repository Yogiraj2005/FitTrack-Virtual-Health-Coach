
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Heart, Play, Pause, RotateCcw, Clock, Timer } from "lucide-react";

const Tracker = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [calories, setCalories] = useState(0);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        
        // Simulate calories being burned (simplified for demo)
        if (time % 5 === 0) {
          setCalories(prevCalories => prevCalories + 1);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
    setCalories(0);
  };
  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Workout Tracker</h1>
      
      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="timer">
            <Timer className="mr-2 h-4 w-4" />
            Timer
          </TabsTrigger>
          <TabsTrigger value="workout">
            <Dumbbell className="mr-2 h-4 w-4" />
            Current Workout
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="timer" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Workout Timer</CardTitle>
                <CardDescription>Track time spent on your workout</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-7xl font-bold mb-8 mt-4 text-fitness-primary">
                  {formatTime(time)}
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={toggleTimer}
                    variant="outline" 
                    size="lg" 
                    className="rounded-full h-16 w-16 flex items-center justify-center border-2 text-fitness-primary border-fitness-primary"
                  >
                    {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                  <Button 
                    onClick={resetTimer}
                    variant="outline" 
                    size="lg" 
                    className="rounded-full h-16 w-16 flex items-center justify-center text-fitness-error border-2 border-fitness-error"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Session started at {new Date().toLocaleTimeString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 inline mr-1 text-fitness-accent" />
                  72 BPM
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
                <CardDescription>Current workout statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Elapsed Time</span>
                    <span className="text-sm font-medium">{formatTime(time)}</span>
                  </div>
                  <Progress value={(time / 3600) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Calories Burned</span>
                    <span className="text-sm font-medium">{calories} kcal</span>
                  </div>
                  <Progress value={(calories / 500) * 100} className="h-2" indicatorClassName="bg-fitness-accent" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Intensity</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Progress value={65} className="h-2" indicatorClassName="bg-fitness-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="workout" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Full Body Power</CardTitle>
              <CardDescription>Track your progress through this workout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center p-3 border rounded-lg bg-muted/30">
                  <div className="mr-4 bg-fitness-primary/10 p-2 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-fitness-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Squats</h4>
                    <p className="text-sm text-muted-foreground">3 sets x 12 reps</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg bg-muted/30">
                  <div className="mr-4 bg-fitness-primary/10 p-2 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-fitness-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Push-ups</h4>
                    <p className="text-sm text-muted-foreground">3 sets x 15 reps</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg bg-muted/30">
                  <div className="mr-4 bg-fitness-primary/10 p-2 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-fitness-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Lunges</h4>
                    <p className="text-sm text-muted-foreground">3 sets x 10 reps each leg</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg bg-muted/30">
                  <div className="mr-4 bg-fitness-primary/10 p-2 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-fitness-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Plank</h4>
                    <p className="text-sm text-muted-foreground">3 sets x 30 seconds</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg bg-muted/30">
                  <div className="mr-4 bg-fitness-primary/10 p-2 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-fitness-primary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">Dumbbell Rows</h4>
                    <p className="text-sm text-muted-foreground">3 sets x 12 reps</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-fitness-primary hover:bg-fitness-primary/90">
                Complete Workout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracker;
