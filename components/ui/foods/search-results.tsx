"use client";

import { ScrollArea } from "../scroll-area";
import { Card, CardContent } from "../card";
import PopupPreview from "./popup-preview";
import { useState } from "react";
import FoodInfoCard from "./food-info-card";
import { FoodGeneral, FoodDetailed } from "@/lib/data/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SearchResults({
  foods,
  specificFood,
}: {
  foods: FoodGeneral[] | undefined;
  specificFood: FoodDetailed | undefined;
}) {

  if (!foods) {
    return (<p>No food found.</p>);
  }

  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (food_id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("food_id", food_id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const [selectedFood, setSelectedFood] = useState(foods[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div id="search-result" className="flex flex-col md:flex-row gap-2">
      {/* All results */}
      <ScrollArea className="w-full md:w-[50%] h-96 mb-3">
        {foods.map((food) => (
          <Card
            key={food.food_id}
            className="mb-2 cursor-pointer hover:bg-muted p-3"
            onClick={() => {
              handleClick(food.food_id);
              setSelectedFood(food);
              setIsPreviewOpen(true);
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

      {/** Selected food information: Side bar for medium screens and above */}

      <div
        id="result-preview"
        className="hidden md:block md:w-[50%] h-96 p-1 bg-white overflow-hidden"
      >
        {!specificFood && (<p>Selected food is invalid.</p>)}
        {specificFood && (
          <div className="h-full flex flex-col">
            <FoodInfoCard food={specificFood} />
          </div>
        )}
      </div>
      {/** Selected food information: Popup for small screens */}
      { isPreviewOpen && specificFood && (
        <PopupPreview
          selectedFood={specificFood}
          closePreview={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
