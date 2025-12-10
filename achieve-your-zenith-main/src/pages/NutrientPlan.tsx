import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Utensils, Apple, ArrowRight, PieChart } from "lucide-react";
import NutrientCard from "@/components/NutrientCard";
import { Badge } from "@/components/ui/badge";
import { getNutrientItemsByCategory, getNutrientPlans, getNutrientItemById } from "@/data/nutrientData";
import type { NutrientItem, NutrientPlan as NutrientPlanType } from "@/data/nutrientData";
import { useToast } from "@/components/ui/use-toast";

const NutrientPlan = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Protein");
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientItem | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<NutrientPlanType | null>(null);
  const [customPlan, setCustomPlan] = useState<NutrientItem[]>([]);
  const { toast } = useToast();
  
  const categories = ["Protein", "Carbs", "Fat", "Vegetables", "Dairy", "Nuts"];
  const nutrientItems = getNutrientItemsByCategory(activeCategory);
  const recommendedPlans = getNutrientPlans();
  
  const handleNutrientSelect = (nutrient: NutrientItem) => {
    setSelectedNutrient(nutrient);
  };
  
  const handlePlanSelect = (plan: NutrientPlanType) => {
    setSelectedPlan(plan);
  };
  
  const handleAddToCustomPlan = (nutrient: NutrientItem) => {
    if (!customPlan.some(item => item.id === nutrient.id)) {
      setCustomPlan([...customPlan, nutrient]);
    }
    setSelectedNutrient(null);
  };
  
  const handleRemoveFromCustomPlan = (nutrientId: string) => {
    setCustomPlan(customPlan.filter(item => item.id !== nutrientId));
  };
  
  const getTotalCalories = () => {
    return customPlan.reduce((total, item) => total + item.calories, 0);
  };
  
  const getTotalMacros = () => {
    return customPlan.reduce((total, item) => ({
      protein: total.protein + item.protein,
      carbs: total.carbs + item.carbs,
      fat: total.fat + item.fat
    }), { protein: 0, carbs: 0, fat: 0 });
  };

  // Function to get complete nutrient items from recommendations
  const getCompleteNutrientItems = (recommendations: { id: string }[]) => {
    const completeItems: NutrientItem[] = [];
    
    for (const rec of recommendations) {
      const fullItem = getNutrientItemById(rec.id);
      if (fullItem) {
        completeItems.push(fullItem);
      }
    }
    
    return completeItems;
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Apple className="h-7 w-7 mr-2 text-[#3D9DA1]" />
          <h1 className="text-3xl font-bold">Nutrition Plan</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {recommendedPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`cursor-pointer ${selectedPlan?.id === plan.id ? 'border-2 border-[#3D9DA1]' : 'border'}`}
            onClick={() => handlePlanSelect(plan)}
          >
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Daily Calories:</span>
                  <span className="font-medium">{plan.dailyCalories} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-blue-500 rounded" style={{width: `${plan.macroSplit.protein}%`}}></div>
                  <div className="h-2 bg-green-500 rounded" style={{width: `${plan.macroSplit.carbs}%`}}></div>
                  <div className="h-2 bg-yellow-500 rounded" style={{width: `${plan.macroSplit.fat}%`}}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Protein {plan.macroSplit.protein}%</span>
                  <span>Carbs {plan.macroSplit.carbs}%</span>
                  <span>Fat {plan.macroSplit.fat}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Build Your Own Plan</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="Protein" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getNutrientItemsByCategory(category).map((nutrient) => (
                    <div key={nutrient.id} onClick={() => handleNutrientSelect(nutrient)}>
                      <NutrientCard 
                        nutrient={nutrient} 
                        onSelect={() => handleNutrientSelect(nutrient)} 
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="h-5 w-5 mr-2" />
                Your Custom Plan
              </CardTitle>
              <CardDescription>
                {customPlan.length === 0 ? 
                  'Add items to build your custom meal plan' : 
                  `${customPlan.length} item${customPlan.length > 1 ? 's' : ''} in your plan`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customPlan.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Select foods from the categories</p>
                  <ArrowRight className="h-5 w-5 mx-auto mt-2" />
                </div>
              ) : (
                <div className="space-y-3">
                  {customPlan.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.calories} kcal</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveFromCustomPlan(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  
                  {customPlan.length > 0 && (
                    <div className="pt-4 mt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Total Calories:</span>
                        <span>{getTotalCalories()} kcal</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <PieChart className="h-4 w-4" />
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden flex">
                          <div className="h-full bg-blue-500" style={{width: `${getTotalMacros().protein * 100 / (getTotalMacros().protein + getTotalMacros().carbs + getTotalMacros().fat)}%`}}></div>
                          <div className="h-full bg-green-500" style={{width: `${getTotalMacros().carbs * 100 / (getTotalMacros().protein + getTotalMacros().carbs + getTotalMacros().fat)}%`}}></div>
                          <div className="h-full bg-yellow-500" style={{width: `${getTotalMacros().fat * 100 / (getTotalMacros().protein + getTotalMacros().carbs + getTotalMacros().fat)}%`}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>P: {Math.round(getTotalMacros().protein)}g</span>
                        <span>C: {Math.round(getTotalMacros().carbs)}g</span>
                        <span>F: {Math.round(getTotalMacros().fat)}g</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Nutrient Detail Dialog */}
      <Dialog open={!!selectedNutrient} onOpenChange={(open) => !open && setSelectedNutrient(null)}>
        <DialogContent>
          {selectedNutrient && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedNutrient.name}</DialogTitle>
                <DialogDescription>
                  {selectedNutrient.category} • {selectedNutrient.servingSize}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-medium">{selectedNutrient.calories} kcal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="font-medium">{selectedNutrient.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="font-medium">{selectedNutrient.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="font-medium">{selectedNutrient.fat}g</p>
                </div>
                {selectedNutrient.fiber > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Fiber</p>
                    <p className="font-medium">{selectedNutrient.fiber}g</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500">Benefits:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedNutrient.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => handleAddToCustomPlan(selectedNutrient)}
              >
                Add to My Plan
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Plan Detail Dialog */}
      <Dialog open={!!selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)}>
        <DialogContent>
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPlan.title}</DialogTitle>
                <DialogDescription>
                  {selectedPlan.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Recommended Foods</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPlan.recommendations.map((item) => (
                      <div key={item.id} className="p-2 bg-gray-50 rounded flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.calories} kcal</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Nutrition Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Calories:</span>
                      <span className="font-medium">{selectedPlan.dailyCalories} kcal</span>
                    </div>
                    <div>
                      <p className="text-sm mb-1">Macronutrient Split:</p>
                      <div className="flex items-center gap-1 h-2">
                        <div className="h-full bg-blue-500 rounded-l" style={{width: `${selectedPlan.macroSplit.protein}%`}}></div>
                        <div className="h-full bg-green-500" style={{width: `${selectedPlan.macroSplit.carbs}%`}}></div>
                        <div className="h-full bg-yellow-500 rounded-r" style={{width: `${selectedPlan.macroSplit.fat}%`}}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Protein {selectedPlan.macroSplit.protein}%</span>
                        <span>Carbs {selectedPlan.macroSplit.carbs}%</span>
                        <span>Fat {selectedPlan.macroSplit.fat}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPlan(null)}
                >
                  Close
                </Button>
                <Button onClick={() => {
                  // Get complete nutrient items for the recommendations
                  const completeItems = getCompleteNutrientItems(selectedPlan.recommendations);
                  
                  // Filter out items that are already in the custom plan
                  const newItems = completeItems.filter(
                    item => !customPlan.some(existing => existing.id === item.id)
                  );
                  
                  if (newItems.length > 0) {
                    setCustomPlan([...customPlan, ...newItems]);
                    toast({
                      title: "Plan added",
                      description: `Added ${newItems.length} new items to your custom plan`,
                    });
                  } else {
                    toast({
                      title: "No new items",
                      description: "All items from this plan are already in your custom plan",
                    });
                  }
                  
                  setSelectedPlan(null);
                }}>
                  Use This Plan
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NutrientPlan;
