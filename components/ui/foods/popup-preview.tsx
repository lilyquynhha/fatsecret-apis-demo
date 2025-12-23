"use client";

import { FoodDetailed } from "@/lib/data/types";
import FoodInfoCard from "./food-info-card";

import { Button } from "../button";
import { useState } from "react";
export default function PopupPreview({
  specificFood: specificFood,
}: {
  specificFood: FoodDetailed | undefined;
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [currentFood, setCurrentFood] = useState(specificFood);
  if (currentFood != specificFood) {
    setCurrentFood(specificFood);
    setIsPreviewOpen(true);
  }

  return (
    <>
      {isPreviewOpen && specificFood && (
        <div className="md:hidden fixed inset-0 max-w-sm h-96 mx-auto my-auto">
          <div className="relative w-full h-full bg-background rounded-lg border-2 border-gray-300 border-solid flex flex-col">
            <Button className="absolute top-2 right-2 z-10"
            onClick={()=> {setIsPreviewOpen(!isPreviewOpen)}}
            >X</Button>

            <FoodInfoCard food={specificFood} />
          </div>
        </div>
      )}
    </>
  );
}
