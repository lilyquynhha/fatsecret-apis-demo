"use client";

import { FoodGeneral } from "@/lib/data/types";
import { ScrollArea } from "../scroll-area";
import { Card, CardContent } from "../card";
import Pagination from "./pagination";

export default function FoodsList({
  foods,
  totalPages,
  currentPage,
  onSelect,
}: {
  foods: FoodGeneral[];
  totalPages: number;
  currentPage: number;
  onSelect: (foodId: string) => void;
}) {
  return (
    <>
      <div className="w-full md:w-[50%] h-96 mb-3">
        <ScrollArea className="h-full">
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

        <Pagination page={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}
