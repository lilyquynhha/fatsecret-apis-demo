"use client";

import { ScrollArea } from "../scroll-area";
import { Card, CardContent } from "../card";
import { mockFoods } from "@/lib/data/mock-foods";
import PopupPreview from "./popup-preview";
import { useState } from "react";
import FoodInfoCard from "./food-info-card";

export default function SearchResults() {
  const [selectedFood, setSelectedFood] = useState(mockFoods[0]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div id="search-result" className="flex flex-col md:flex-row gap-2">
      {/* All results */}
      <ScrollArea className="w-full md:w-[50%] h-96 mb-3">
        {mockFoods.map((food) => (
          <Card
            key={food.food_id}
            className="mb-2 cursor-pointer hover:bg-muted p-3"
            onClick={() => {
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
                Per {food.serving_size}
                {food.serving_unit} – {food.calories} kcal | Carbs:{" "}
                {food.carbohydrate}g | Protein: {food.protein}g | Fat:{" "}
                {food.fat}g
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
        <div className="h-full flex flex-col">
            <FoodInfoCard food={selectedFood}/>
        </div>
       
      </div>
      {/** Selected food information: Popup for small screens */}
      {isPreviewOpen && (
        <PopupPreview
          selectedFood={selectedFood}
          closePreview={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
