"use client";

import NormalPreview from "./normal-preview";
import PopupPreview from "./popup-preview";
import { useEffect, useState } from "react";

export default function FoodPreview({ foodId }: { foodId: string | null }) {
  const [food, setFood] = useState(undefined);

  // Fetch a specific food by food id
  useEffect(() => {
    fetch(`/api/foods/search-by-id?food_id=${foodId}`)
      .then((res) => res.json())
      .then(setFood);
  }, [foodId]);

  if (!foodId) {
    return (
      <div className="hidden md:block md:w-[50%] h-96 p-4 bg-white overflow-hidden">
        Select a food to see details.
      </div>
    );
  }

  return (
    <>
      <NormalPreview specificFood={food} />
      <PopupPreview specificFood={food} />
    </>
  );
}
