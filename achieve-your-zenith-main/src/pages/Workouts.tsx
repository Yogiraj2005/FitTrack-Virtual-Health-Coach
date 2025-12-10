
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutVideo from "@/components/WorkoutVideo";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkoutVideos, getRecommendedWorkouts, getWorkoutVideoById } from "@/data/workoutData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Grid3x3, List, Play, User, Camera } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FormScanner from "@/components/FormScanner";
import { useIsMobile } from "@/hooks/use-mobile";

const Workouts = () => {
  const [activeBodyPart, setActiveBodyPart] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);
  const [showVideoId, setShowVideoId] = useState<string | null>(null);
  const [showFormScanner, setShowFormScanner] = useState(false);
  const isMobile = useIsMobile();
  
  // Get filtered workout videos based on selected body part only, removing gender filter
  const workoutVideos = getWorkoutVideos(activeBodyPart);
  
  // Get recommended workouts without gender filtering
  const recommendedWorkouts = getRecommendedWorkouts();

  const handleBodyPartChange = (value: string) => {
    setActiveBodyPart(value);
  };

  const handleWorkoutSelect = (workout: any) => {
    setSelectedWorkout(workout);
  };

  const handleShowVideo = (videoId: string) => {
    setShowVideoId(videoId);
    // Close workout detail if open
    setSelectedWorkout(null);
  };

  // Create workout cards for each category
  const renderWorkoutCards = () => {
    const categoriesToShow = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
    
    return categoriesToShow.map(category => {
      // Get the first two videos of each category for cards
      const videos = getWorkoutVideos(category).slice(0, isMobile ? 1 : 2);
      
      if (videos.length === 0) return null;
      
      return (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 capitalize">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {videos.map((video) => (
              <WorkoutCard
                key={video.id}
                title={video.title}
                category={video.category}
                duration={video.duration}
                intensity={video.intensity as "Easy" | "Medium" | "Hard"}
                image={video.thumbnailUrl}
                onClick={() => handleShowVideo(video.id)}
              />
            ))}
            <Button 
              variant="outline" 
              className="h-16 sm:h-24 border-dashed"
              onClick={() => {
                setActiveBodyPart(category);
                const element = document.getElementById('all-workouts');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View all {category} workouts
            </Button>
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className="container py-4 sm:py-6 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Workout Video Library</h1>
        <div className="flex gap-2 flex-wrap w-full sm:w-auto justify-end">
          <Button 
            variant="outline" 
            size="icon"
            className={`${viewMode === "grid" ? "bg-slate-100" : ""} hidden sm:flex`}
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="icon"
            className={`${viewMode === "list" ? "bg-slate-100" : ""} hidden sm:flex`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            className="gap-2 text-sm"
            onClick={() => setShowFormScanner(true)}
          >
            <Camera className="h-4 w-4" />
            <span className="sm:block">Check Form</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-fitness-primary hover:bg-fitness-primary/90 text-sm">
                Create Custom Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Custom Workout</DialogTitle>
                <DialogDescription>
                  Mix and match exercises to create your perfect routine
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Custom workout builder would go here */}
                <p>Coming soon! This feature is under development.</p>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button type="button" className="w-full sm:w-auto">Save Workout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Removed the gender filter section entirely */}
      
      {/* Featured workouts section */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Featured Workouts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {recommendedWorkouts.slice(0, isMobile ? 2 : 3).map((workout) => (
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
      </section>
      
      {/* Display workout cards grouped by category */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Browse By Body Part</h2>
        {renderWorkoutCards()}
      </section>
      
      {/* Body part tabs */}
      <div id="all-workouts">
        <Tabs defaultValue="all" className="w-full" onValueChange={handleBodyPartChange} value={activeBodyPart}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">All Workout Videos</h2>
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-nowrap pb-2">
            <TabsTrigger value="all">All Workouts</TabsTrigger>
            <TabsTrigger value="chest">Chest</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
            <TabsTrigger value="legs">Legs</TabsTrigger>
            <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
            <TabsTrigger value="arms">Arms</TabsTrigger>
            <TabsTrigger value="core">Core</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeBodyPart} className="mt-0">
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              : "space-y-4"
            }>
              {workoutVideos.map((workout) => (
                viewMode === "grid" ? (
                  <WorkoutVideo
                    key={workout.id}
                    {...workout}
                  />
                ) : (
                  <Card key={workout.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/3">
                          <div 
                            className="aspect-video md:aspect-square relative cursor-pointer"
                            onClick={() => handleShowVideo(workout.id)}
                          >
                            <img
                              src={workout.thumbnailUrl}
                              alt={workout.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <Button 
                                size="icon" 
                                className="rounded-full h-10 w-10 bg-fitness-primary hover:bg-fitness-primary/90"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 md:w-2/3">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg">{workout.title}</h3>
                            <span className="text-xs bg-slate-100 py-1 px-2 rounded">{workout.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 my-2 flex-wrap">
                            <span className="bg-slate-100 py-1 px-2 rounded-md text-xs">{workout.category}</span>
                            {workout.bodyPart && workout.bodyPart !== workout.category && (
                              <span className="bg-slate-100 py-1 px-2 rounded-md text-xs">{workout.bodyPart}</span>
                            )}
                            <span className={`text-xs py-1 px-2 rounded-full ${
                              workout.intensity === "Easy" 
                                ? "bg-green-100 text-green-800" 
                                : workout.intensity === "Medium" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {workout.intensity}
                            </span>
                          </div>
                          {workout.caption && (
                            <p className="text-sm text-gray-600 line-clamp-2">{workout.caption}</p>
                          )}
                          <div className="mt-3">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleShowVideo(workout.id)}
                            >
                              Watch Video
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
              {workoutVideos.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No workouts found for the selected filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
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

      {/* Form Scanner Dialog */}
      <Dialog open={showFormScanner} onOpenChange={setShowFormScanner}>
        <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Workout Form Scanner</DialogTitle>
            <DialogDescription>
              Position yourself in view of the camera to analyze your form
            </DialogDescription>
          </DialogHeader>
          <FormScanner />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;

