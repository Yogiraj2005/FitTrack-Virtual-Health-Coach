
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NutrientItem } from "@/data/nutrientData";
import { Badge } from "@/components/ui/badge";
import { Heart, Apple, Info, ChefHat } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getHomemadeFoodAlternatives } from "@/data/nutrientData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NutrientCardProps {
  nutrient: NutrientItem;
  onSelect?: () => void;
}

// Define additional optional properties as a separate type
type ExtendedNutrientProperties = {
  rating?: number;
  description?: string;
  timing?: string;
  source?: string;
};

// Use a type intersection for extended nutrient item
type ExtendedNutrientItem = NutrientItem & Partial<ExtendedNutrientProperties>;

const NutrientCard = ({ nutrient, onSelect }: NutrientCardProps) => {
  // Cast nutrient to the extended type
  const extendedNutrient = nutrient as ExtendedNutrientItem;
  
  // Get homemade alternatives based on nutrient category
  const homemadeOptions = getHomemadeFoodAlternatives(nutrient.category);
  
  // Function to get badge color based on benefit
  const getBenefitColor = (benefit: string) => {
    const benefitLower = benefit.toLowerCase();
    if (benefitLower.includes("energy") || benefitLower.includes("strength")) {
      return "bg-amber-100 text-amber-800 border-amber-200";
    } else if (benefitLower.includes("weight") || benefitLower.includes("fat")) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (benefitLower.includes("immune") || benefitLower.includes("health")) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (benefitLower.includes("recovery")) {
      return "bg-purple-100 text-purple-800 border-purple-200";
    } else {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={nutrient.image}
            alt={nutrient.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2">{nutrient.category}</Badge>
          <Badge 
            className={`absolute top-2 left-2 ${nutrient.isVegetarian ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'}`}
          >
            {nutrient.isVegetarian ? 'Vegetarian' : 'Non-Veg'}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            {nutrient.name}
            {extendedNutrient.rating && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm font-normal">
                    <Heart className="h-4 w-4 mr-1 text-red-500 fill-red-500" />
                    <span>{extendedNutrient.rating}/5</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>User satisfaction rating</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 flex-grow">
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <p className="text-gray-500">Calories</p>
              <p className="font-medium">{nutrient.calories} kcal</p>
            </div>
            <div>
              <p className="text-gray-500">Protein</p>
              <p className="font-medium">{nutrient.protein}g</p>
            </div>
            <div>
              <p className="text-gray-500">Carbs</p>
              <p className="font-medium">{nutrient.carbs}g</p>
            </div>
            <div>
              <p className="text-gray-500">Fat</p>
              <p className="font-medium">{nutrient.fat}g</p>
            </div>
          </div>
          
          {extendedNutrient.description && (
            <div className="mb-3">
              <p className="text-xs text-gray-600 line-clamp-2">{extendedNutrient.description}</p>
            </div>
          )}
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Benefits:</p>
            <div className="flex flex-wrap gap-1">
              {nutrient.benefits.map((benefit, index) => (
                <Badge key={index} variant="outline" className={`text-xs ${getBenefitColor(benefit)}`}>
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
          
          {extendedNutrient.timing && (
            <div className="mt-2">
              <p className="text-gray-500 text-sm">Best time:</p>
              <p className="text-xs font-medium">{extendedNutrient.timing}</p>
            </div>
          )}
          
          {extendedNutrient.source && (
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Apple className="h-3 w-3 mr-1" />
              <span>Source: {extendedNutrient.source}</span>
            </div>
          )}
          
          {/* Homemade Alternatives - Now directly displayed in the card in an expandable section */}
          {homemadeOptions.length > 0 && (
            <div className="mt-4">
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full text-xs flex items-center justify-between bg-green-50 hover:bg-green-100 border-green-200">
                    <div className="flex items-center">
                      <ChefHat className="h-3 w-3 mr-1" />
                      <span>Homemade Alternatives</span>
                    </div>
                    <span className="text-xs opacity-50">▼</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="space-y-2 p-2 bg-gray-50 rounded-md border border-green-100">
                    {homemadeOptions.map((option, index) => (
                      <div key={index} className={`p-2 ${index > 0 ? 'border-t border-green-100 pt-2' : ''}`}>
                        <p className="font-medium text-xs">{option.name}</p>
                        <p className="text-xs text-gray-500">{option.description}</p>
                        <div className="mt-1 flex justify-between text-xs">
                          <span>{option.calories} kcal</span>
                          <span className="text-blue-600">P: {option.protein}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 mt-auto">
          {onSelect && (
            <Button 
              onClick={onSelect}
              variant="outline" 
              className="w-full hover:bg-[#3D9DA1]/10"
            >
              Add to Plan
            </Button>
          )}
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default NutrientCard;
