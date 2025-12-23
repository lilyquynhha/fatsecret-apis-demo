import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FatsecretGeneralSearchRes, FatsecretGeneralSearch, FatsecretDetailedSearchRes } from "./fatsecret";
import { FoodDetailed, FoodGeneral } from "./data/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapGeneralSearchToFoodModel(
  res: FatsecretGeneralSearch[],
): FoodGeneral[] {
  return res.map((food) => ({
    food_id: food.food_id,
    food_name: food.food_name,
    food_description: food.food_description,
    food_type: food.food_type,
    brand_name: food.brand_name,
  }));
}

export function mapDetailedSearchToFoodModel(
  res: FatsecretDetailedSearchRes,
): FoodDetailed {
  return {
    food_id: res.food.food_id,
    food_name: res.food.food_name,
    food_description: res.food.food_description,
    food_type: res.food.food_type,
    brand_name: res.food.brand_name,
    serving_unit: res.food.servings.serving[0].metric_serving_unit,
    serving_size: res.food.servings.serving[0].metric_serving_amount,
    preferred_serving_size: res.food.servings.serving[0].metric_serving_amount,
    calories: res.food.servings.serving[0].calories,
    carbohydrate: res.food.servings.serving[0].carbohydrate,
    protein: res.food.servings.serving[0].protein,
    fat: res.food.servings.serving[0].fat,
    saturated_fat: res.food.servings.serving[0].saturated_fat,
    polyunsaturated_fat: res.food.servings.serving[0].polyunsaturated_fat,
    monounsaturated_fat: res.food.servings.serving[0].monounsaturated_fat,
    cholesterol: res.food.servings.serving[0].cholesterol,
    sodium: res.food.servings.serving[0].sodium,
    potassium: res.food.servings.serving[0].potassium,
    fiber: res.food.servings.serving[0].fiber,
    sugar: res.food.servings.serving[0].sugar,
    vitamin_a: res.food.servings.serving[0].vitamin_a,
    vitamin_c: res.food.servings.serving[0].vitamin_c,
    calcium: res.food.servings.serving[0].calcium,
    iron: res.food.servings.serving[0].iron,
    trans_fat: res.food.servings.serving[0].trans_fat,
    added_sugars: res.food.servings.serving[0].added_sugars,
    vitamin_d: res.food.servings.serving[0].vitamin_d,
  };
}
