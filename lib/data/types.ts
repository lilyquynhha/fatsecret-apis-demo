export interface FoodGeneral {
  food_id: string;
  food_name: string;
  food_description: string;
  food_type: "Brand" | "Generic";
  brand_name: string | null;
}

export interface Serving {
  serving_id: string;

  // Used for nutrients calculation logic (server-side)
  serving_unit: "ml" | "g" | "oz";
  serving_amount: number;

  // Used for display purposes & serving size choice (client-side)
  nonstandard_serving_unit: string;
  nonstandard_serving_amount: number;

  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  saturated_fat: number | null;
  polyunsaturated_fat: number | null;
  monounsaturated_fat: number | null;
  cholesterol: number | null;
  sodium: number | null;
  potassium: number | null;
  fiber: number | null;
  sugar: number | null;
  vitamin_a: number | null;
  vitamin_c: number | null;
  calcium: number | null;
  iron: number | null;
  trans_fat: number | null;
  added_sugars: number | null;
  vitamin_d: number | null;
}

export interface FoodDetailed extends FoodGeneral {
  servings: {
    serving: Serving[];
  };
}
