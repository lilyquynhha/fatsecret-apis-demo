"use client";

import { FoodGeneral } from "@/lib/data/types";
import { ScrollArea } from "../scroll-area";
import { Card, CardContent } from "../card";

export default function FoodsList({
  foods,
  onSelect,
}: {
  foods: FoodGeneral[];
  onSelect: (foodId: string) => void;
}) {
  return (
    <>
      <ScrollArea className="w-full md:w-[50%] h-96 mb-3">
        {foods.map((food) => (
          <Card
            key={food.food_id}
            className="mb-2 cursor-pointer hover:bg-muted p-3"
            onClick={() => {
              onSelect(food.food_id);
            }}
          >
            <CardContent>
              <div className="font-medium">
                {food.food_name}
                {food.brand_name && ` (${food.brand_name})`}
              </div>

              <div className="text-sm text-muted-foreground">
                {food.food_description}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
}
