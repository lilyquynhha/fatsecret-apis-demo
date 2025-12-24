"use client";

import { FoodGeneral } from "@/lib/data/types";
import FoodsList from "./foods-list";
import FoodPreview from "./food-preview";
import { useEffect, useState } from "react";

export default function SearchResults({
  foods,
}: {
  foods: FoodGeneral[] | undefined;
}) {
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

  // Reset selected food if it is a new food search
  useEffect(() => {
    setSelectedFoodId(null);
  }, [foods]);

  return (
    <>
      {foods ? (
        <div id="search-result" className="flex flex-col md:flex-row gap-2">
          <FoodsList foods={foods} onSelect={setSelectedFoodId} />
          <FoodPreview foodId={selectedFoodId} />
        </div>
      ) : (
        <p>No food found.</p>
      )}
    </>
  );
}
