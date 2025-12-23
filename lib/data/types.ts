export interface FoodGeneral {
  food_id: string;
  food_name: string;
  food_description: string;
  food_type: "Brand" | "Generic";
  brand_name?: string;
}

export interface FoodDetailed extends FoodGeneral {
  serving_unit: "g" | "ml";
  serving_size: number;
  preferred_serving_size: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  saturated_fat?: number;
  polyunsaturated_fat?: number;
  monounsaturated_fat?: number;
  cholesterol?: number;
  sodium?: number;
  potassium?: number;
  fiber?: number;
  sugar?: number;
  vitamin_a?: number;
  vitamin_c?: number;
  calcium?: number;
  iron?: number;
  trans_fat?: number;
  added_sugars?: number;
  vitamin_d?: number;
}
