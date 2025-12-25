"use client";

import { FoodGeneral } from "@/lib/data/types";
import FoodsList from "./foods-list";
import FoodPreview from "./food-preview";
import { useState } from "react";
import { MAX_RESULTS } from "@/lib/fatsecret";

export default function SearchResults({
  foods,
  totalResults,
  page,
}: {
  foods: FoodGeneral[] | undefined;
  totalResults: number;
  page: number;
}) {
  const [currentFoods, setCurrentFoods] = useState(foods);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

  if (!foods) {
    return <p>No food found.</p>;
  }

  const totalPages = Math.ceil(totalResults / MAX_RESULTS);

  // Reset selected food if it is a new food search
  if (foods != currentFoods) {
    setSelectedFoodId(null);
    setCurrentFoods(foods);
  }

  return (
    <>
      <div id="search-result" className="flex flex-col md:flex-row gap-2">
        <FoodsList
          foods={foods}
          currentPage={page}
          totalPages={totalPages}
          onSelect={setSelectedFoodId}
        />
        <FoodPreview foodId={selectedFoodId} />
      </div>
    </>
  );
}
