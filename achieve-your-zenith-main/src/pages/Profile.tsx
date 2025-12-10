
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Award, Calendar, ChevronRight, ClipboardList, Settings, Trophy, User } from "lucide-react";
import ActivityProgress from "@/components/ActivityProgress";

const Profile = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" alt="User profile" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Sarah Anderson</h1>
            <p className="text-muted-foreground">Fitness enthusiast · Member since 2023</p>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="progress" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="progress">
                <Activity className="mr-2 h-4 w-4" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Trophy className="mr-2 h-4 w-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="history">
                <Calendar className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                  <CardDescription>Your progress towards this week's fitness goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                    title="Steps" 
                    achieved={38250} 
                    goal={50000} 
                    unit="steps"
                    color="bg-fitness-accent"
                  />
                  <ActivityProgress 
                    title="Calories Burned" 
                    achieved={1250} 
                    goal={2000} 
                    unit="kcal"
                    color="bg-amber-500"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Your fitness progress over the last month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    [Interactive Chart Placeholder]
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges and milestones you've reached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="bg-amber-100 p-3 rounded-full mb-2">
                        <Award className="h-8 w-8 text-amber-500" />
                      </div>
                      <h4 className="font-medium text-sm">Early Bird</h4>
                      <p className="text-xs text-muted-foreground text-center">Complete 10 morning workouts</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="bg-fitness-primary/10 p-3 rounded-full mb-2">
                        <Trophy className="h-8 w-8 text-fitness-primary" />
                      </div>
                      <h4 className="font-medium text-sm">Consistency</h4>
                      <p className="text-xs text-muted-foreground text-center">Workout 5 days in a row</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="bg-fitness-secondary/10 p-3 rounded-full mb-2">
                        <Activity className="h-8 w-8 text-fitness-secondary" />
                      </div>
                      <h4 className="font-medium text-sm">Cardio Master</h4>
                      <p className="text-xs text-muted-foreground text-center">Complete 20 cardio sessions</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow bg-muted/30">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <Award className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-sm">Power Lifter</h4>
                      <p className="text-xs text-muted-foreground text-center">Complete 15 strength workouts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Workout History</CardTitle>
                  <CardDescription>Review your previous workout sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday, May 1", "Sunday, April 30", "Saturday, April 29", "Thursday, April 27", "Wednesday, April 26"].map((date, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-fitness-primary/10 p-2 rounded-lg">
                            <ClipboardList className="h-5 w-5 text-fitness-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{date}</p>
                            <p className="text-sm text-muted-foreground">
                              {index === 0 || index === 2 ? "Morning HIIT" : index === 1 ? "Yoga Flow" : "Full Body Power"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {index === 0 || index === 2 ? "25 min" : index === 1 ? "30 min" : "45 min"}
                          </Badge>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Age</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Height</span>
                <span className="font-medium">5'7" (170 cm)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Weight</span>
                <span className="font-medium">143 lbs (65 kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">BMI</span>
                <span className="font-medium">22.5</span>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-semibold mb-4">Fitness Interests</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">HIIT</Badge>
                <Badge variant="secondary">Yoga</Badge>
                <Badge variant="secondary">Strength Training</Badge>
                <Badge variant="secondary">Running</Badge>
                <Badge variant="secondary">Pilates</Badge>
                <Badge variant="secondary">Hiking</Badge>
                <Badge variant="secondary">Cycling</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
