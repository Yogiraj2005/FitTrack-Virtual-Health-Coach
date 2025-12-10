export interface NutrientItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSize: string;
  benefits: string[];
  image: string;
  isVegetarian: boolean;
}

export interface MacroSplit {
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutrientPlan {
  id: string;
  title: string;
  description: string;
  dailyCalories: number;
  macroSplit: MacroSplit;
  recommendations: {
    id: string;
    name: string;
    image: string;
    calories: number;
  }[];
  image: string;
  isVegetarian: boolean;
}

// New dataset from https://www.kaggle.com/datasets/alibostanc/nutritional-information-of-protein-products
export const nutrientItems: NutrientItem[] = [
  {
    id: "pro1",
    name: "Whey Protein Concentrate",
    category: "Protein",
    calories: 120,
    protein: 24,
    carbs: 3,
    fat: 2,
    fiber: 0,
    servingSize: "30g scoop",
    benefits: ["Muscle building", "Post-workout recovery", "Protein synthesis"],
    image: "https://images.unsplash.com/photo-1607443053036-25e4f9d650cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "pro2",
    name: "Whey Protein Isolate",
    category: "Protein",
    calories: 110,
    protein: 25,
    carbs: 1,
    fat: 0.5,
    fiber: 0,
    servingSize: "30g scoop",
    benefits: ["Lean muscle gain", "Low lactose", "Fast absorption"],
    image: "https://images.unsplash.com/photo-1593095948071-474c414833f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "pro3",
    name: "Casein Protein",
    category: "Protein",
    calories: 120,
    protein: 24,
    carbs: 3,
    fat: 1,
    fiber: 0,
    servingSize: "33g scoop",
    benefits: ["Slow digestion", "Overnight recovery", "Anti-catabolism"],
    image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "pro4",
    name: "Pea Protein",
    category: "Protein",
    calories: 120,
    protein: 21,
    carbs: 4,
    fat: 2,
    fiber: 1,
    servingSize: "33g scoop",
    benefits: ["Plant-based", "Hypoallergenic", "Sustainable"],
    image: "https://images.unsplash.com/photo-1615104985402-bb6a1f365022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "pro5",
    name: "Hemp Protein",
    category: "Protein",
    calories: 110,
    protein: 15,
    carbs: 8,
    fat: 3,
    fiber: 7,
    servingSize: "30g scoop",
    benefits: ["Complete protein", "High fiber", "Omega fatty acids"],
    image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "pro6",
    name: "Brown Rice Protein",
    category: "Protein",
    calories: 100,
    protein: 20,
    carbs: 4,
    fat: 0.5,
    fiber: 1,
    servingSize: "30g scoop",
    benefits: ["Hypoallergenic", "Plant-based", "Easy digestion"],
    image: "https://images.unsplash.com/photo-1615104985402-bb6a1f365022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "pro7",
    name: "Egg White Protein",
    category: "Protein",
    calories: 110,
    protein: 24,
    carbs: 2,
    fat: 0,
    fiber: 0,
    servingSize: "30g scoop",
    benefits: ["Complete protein", "Dairy-free", "High bioavailability"],
    image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: false
  },
  {
    id: "per1",
    name: "Creatine Monohydrate",
    category: "Performance",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: "5g scoop",
    benefits: ["Strength gains", "Power output", "Muscle volume"],
    image: "https://images.unsplash.com/photo-1586401877159-35b10d27a6be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "per2",
    name: "Pre-Workout Complex",
    category: "Performance",
    calories: 15,
    protein: 0,
    carbs: 4,
    fat: 0,
    fiber: 0,
    servingSize: "10g scoop",
    benefits: ["Energy boost", "Focus", "Pump enhancement"],
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "per3",
    name: "Beta-Alanine",
    category: "Performance",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: "3g scoop",
    benefits: ["Endurance", "Reduced fatigue", "High-intensity performance"],
    image: "https://images.unsplash.com/photo-1586401877159-35b10d27a6be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "rec1",
    name: "BCAA Supplement",
    category: "Recovery",
    calories: 5,
    protein: 0,
    carbs: 1,
    fat: 0,
    fiber: 0,
    servingSize: "7g scoop",
    benefits: ["Muscle preservation", "Reduced soreness", "Enhanced recovery"],
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "rec2",
    name: "Glutamine",
    category: "Recovery",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: "5g scoop",
    benefits: ["Gut health", "Immune function", "Recovery support"],
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "rec3",
    name: "ZMA Complex",
    category: "Recovery",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: "3 capsules",
    benefits: ["Sleep quality", "Hormone support", "Recovery enhancement"],
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "wel1",
    name: "Fish Oil",
    category: "Wellness",
    calories: 45,
    protein: 0,
    carbs: 0,
    fat: 5,
    fiber: 0,
    servingSize: "2 softgels",
    benefits: ["Joint health", "Heart health", "Reduced inflammation"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: false
  },
  {
    id: "wel2",
    name: "Multivitamin",
    category: "Wellness",
    calories: 10,
    protein: 0,
    carbs: 2,
    fat: 0,
    fiber: 0,
    servingSize: "1 tablet",
    benefits: ["Nutrient gaps", "Immune support", "Overall health"],
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "wel3",
    name: "Collagen Peptides",
    category: "Wellness",
    calories: 35,
    protein: 9,
    carbs: 0,
    fat: 0,
    fiber: 0,
    servingSize: "10g scoop",
    benefits: ["Joint support", "Skin health", "Connective tissue"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: false
  }
];

// Homemade food alternatives database from https://www.kaggle.com/datasets/utsavdey1410/food-nutrition-dataset
export const homemadeFoodAlternatives = {
  "Protein": [
    { name: "Greek Yogurt", description: "High protein dairy option", calories: 100, protein: 10, carbs: 3, fat: 0 },
    { name: "Lentil Soup", description: "Plant-based protein source", calories: 150, protein: 9, carbs: 20, fat: 1 },
    { name: "Egg White Omelette", description: "Complete protein source", calories: 120, protein: 20, carbs: 2, fat: 5 }
  ],
  "Performance": [
    { name: "Banana with Honey", description: "Natural pre-workout energy", calories: 130, protein: 1, carbs: 30, fat: 0 },
    { name: "Coffee", description: "Natural stimulant", calories: 5, protein: 0, carbs: 0, fat: 0 },
    { name: "Beetroot Juice", description: "Natural nitrates for performance", calories: 70, protein: 1, carbs: 15, fat: 0 }
  ],
  "Recovery": [
    { name: "Turmeric Milk", description: "Anti-inflammatory properties", calories: 80, protein: 4, carbs: 5, fat: 3 },
    { name: "Tart Cherry Juice", description: "Reduces muscle soreness", calories: 120, protein: 1, carbs: 28, fat: 0 },
    { name: "Bone Broth", description: "Joint support and protein", calories: 50, protein: 10, carbs: 0, fat: 1 }
  ],
  "Wellness": [
    { name: "Green Tea", description: "Antioxidants and light caffeine", calories: 0, protein: 0, carbs: 0, fat: 0 },
    { name: "Chia Pudding", description: "Omega-3 fatty acids", calories: 150, protein: 5, carbs: 15, fat: 8 },
    { name: "Ginger Lemon Water", description: "Digestive support", calories: 10, protein: 0, carbs: 2, fat: 0 }
  ],
  "Weight Gain": [
    { name: "Peanut Butter Banana Smoothie", description: "Calorie-dense and nutritious", calories: 400, protein: 15, carbs: 50, fat: 15 },
    { name: "Homemade Trail Mix", description: "Nuts, seeds, and dried fruits", calories: 300, protein: 10, carbs: 25, fat: 20 },
    { name: "Avocado Toast", description: "Healthy fats and carbs", calories: 350, protein: 8, carbs: 30, fat: 22 }
  ],
  "Weight Management": [
    { name: "Cucumber Mint Water", description: "Hydration with metabolism support", calories: 5, protein: 0, carbs: 1, fat: 0 },
    { name: "Vegetable Soup", description: "Volume eating with low calories", calories: 100, protein: 5, carbs: 15, fat: 2 },
    { name: "Salad with Vinaigrette", description: "Fiber-rich and filling", calories: 150, protein: 3, carbs: 10, fat: 10 }
  ],
  "Hydration": [
    { name: "Coconut Water", description: "Natural electrolytes", calories: 45, protein: 2, carbs: 9, fat: 0 },
    { name: "Watermelon", description: "92% water content with electrolytes", calories: 50, protein: 1, carbs: 11, fat: 0 },
    { name: "Homemade Electrolyte Drink", description: "Water, salt, lemon, and honey", calories: 30, protein: 0, carbs: 8, fat: 0 }
  ],
};

// Updated nutrient plans to match the new supplements dataset
export const nutrientPlans: NutrientPlan[] = [
  {
    id: "np1",
    title: "Muscle Building Plan",
    description: "High protein nutrition plan designed for maximum muscle growth",
    dailyCalories: 3000,
    macroSplit: {
      protein: 40,
      carbs: 40,
      fat: 20
    },
    recommendations: [
      {
        id: "pro1",
        name: "Whey Protein Concentrate",
        image: "https://images.unsplash.com/photo-1607443053036-25e4f9d650cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 120,
      },
      {
        id: "per1",
        name: "Creatine Monohydrate",
        image: "https://images.unsplash.com/photo-1586401877159-35b10d27a6be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 0,
      },
      {
        id: "per2",
        name: "Pre-Workout Complex",
        image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 15,
      },
      {
        id: "rec1",
        name: "BCAA Supplement",
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 5,
      }
    ],
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "np2",
    title: "Weight Loss Support",
    description: "Low calorie, high protein plan to support fat loss while preserving muscle",
    dailyCalories: 1800,
    macroSplit: {
      protein: 45,
      carbs: 30,
      fat: 25
    },
    recommendations: [
      {
        id: "pro2",
        name: "Whey Protein Isolate",
        image: "https://images.unsplash.com/photo-1593095948071-474c414833f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 110,
      },
      {
        id: "per3",
        name: "Beta-Alanine",
        image: "https://images.unsplash.com/photo-1586401877159-35b10d27a6be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 0,
      },
      {
        id: "wel2",
        name: "Multivitamin",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 10,
      },
      {
        id: "rec1",
        name: "BCAA Supplement",
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 5,
      }
    ],
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "np3",
    title: "Vegan Performance",
    description: "Plant-based nutrition plan for optimal athletic performance",
    dailyCalories: 2600,
    macroSplit: {
      protein: 30,
      carbs: 50,
      fat: 20
    },
    recommendations: [
      {
        id: "pro4",
        name: "Pea Protein",
        image: "https://images.unsplash.com/photo-1615104985402-bb6a1f365022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 120,
      },
      {
        id: "pro5",
        name: "Hemp Protein",
        image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 110,
      },
      {
        id: "per1",
        name: "Creatine Monohydrate",
        image: "https://images.unsplash.com/photo-1586401877159-35b10d27a6be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 0,
      },
      {
        id: "wel2",
        name: "Multivitamin",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 10,
      }
    ],
    image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "np4",
    title: "Recovery Focus",
    description: "Specialized nutrition plan to optimize post-workout recovery",
    dailyCalories: 2400,
    macroSplit: {
      protein: 35,
      carbs: 45,
      fat: 20
    },
    recommendations: [
      {
        id: "pro3",
        name: "Casein Protein",
        image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 120,
      },
      {
        id: "rec1",
        name: "BCAA Supplement",
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 5,
      },
      {
        id: "rec2",
        name: "Glutamine",
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 0,
      },
      {
        id: "rec3",
        name: "ZMA Complex",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 0,
      }
    ],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "np5",
    title: "Wellness Support",
    description: "Balanced nutrition and supplementation for overall health and wellness",
    dailyCalories: 2200,
    macroSplit: {
      protein: 30,
      carbs: 40,
      fat: 30
    },
    recommendations: [
      {
        id: "wel1",
        name: "Fish Oil",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 45,
      },
      {
        id: "wel2",
        name: "Multivitamin",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 10,
      },
      {
        id: "wel3",
        name: "Collagen Peptides",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 35,
      },
      {
        id: "pro2",
        name: "Whey Protein Isolate",
        image: "https://images.unsplash.com/photo-1593095948071-474c414833f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        calories: 110,
      }
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isVegetarian: false
  }
];

// Helper functions to get nutrient items by category and vegetarian status
export function getNutrientItemsByCategory(category: string, isVegetarian?: boolean): NutrientItem[] {
  if (isVegetarian === undefined) {
    return nutrientItems.filter(item => item.category === category);
  }
  return nutrientItems.filter(item => item.category === category && item.isVegetarian === isVegetarian);
}

// Helper function to get nutrient plans by vegetarian status
export function getNutrientPlansByType(isVegetarian?: boolean): NutrientPlan[] {
  if (isVegetarian === undefined) {
    return nutrientPlans;
  }
  return nutrientPlans.filter(plan => plan.isVegetarian === isVegetarian);
}

// Helper function to get homemade alternatives for a specific category
export function getHomemadeFoodAlternatives(category: string) {
  return homemadeFoodAlternatives[category as keyof typeof homemadeFoodAlternatives] || [];
}

// Keep existing helper functions
export function getNutrientPlans(): NutrientPlan[] {
  return nutrientPlans;
}

export function getNutrientItemById(id: string): NutrientItem | undefined {
  return nutrientItems.find(item => item.id === id);
}
