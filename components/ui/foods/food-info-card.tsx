import { FoodDetailed } from "@/lib/data/types";
import { Separator } from "../separator";
import { ScrollArea } from "../scroll-area";

export default function FoodInfoCard({ food }: { food: FoodDetailed }) {
  return (
    <>
      {/* Header: Food name */}
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold">{food.food_name}</h2>
        {food.brand_name && (
          <p className="text-muted-foreground">{food.brand_name}</p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Nutrition list */}
      <ScrollArea className=" min-h-0 px-6 pb-6">
        <div className="space-y-2">
          <p>
            Serving size: {food.serving_size}
            {food.serving_unit}
          </p>
          <p>Calories: {food.calories} kcal</p>
          <p>Carbohydrate: {food.carbohydrate} g</p>
          <p>Protein: {food.protein} g</p>
          <p>Fat: {food.fat} g</p>
          <p>Saturated Fat: {food.saturated_fat}</p>
          <p>Polyunsaturated Fat: {food.polyunsaturated_fat}</p>
          <p>Monounsaturated Fat: {food.monounsaturated_fat}</p>
          <p>Cholesterol: {food.cholesterol}</p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          
        </div>
      </ScrollArea>
    </>
  );
}
