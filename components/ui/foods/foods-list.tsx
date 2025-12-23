"use client";

import {FoodGeneral } from "@/lib/data/types";
import { ScrollArea } from "../scroll-area";
import { Card, CardContent } from "../card";
import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";

export default function FoodsList({ foods }: { foods: FoodGeneral[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  const handleClick = (food_id: string) => {
    params.set("food_id", food_id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <ScrollArea className="w-full md:w-[50%] h-96 mb-3">
        {foods.map((food) => (
          <Card
            key={food.food_id}
            className="mb-2 cursor-pointer hover:bg-muted p-3"
            onClick={() => {
              handleClick(food.food_id);
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
