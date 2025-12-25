import { fetchGeneral, mapToFoodGeneral } from "@/lib/fatsecret";
import SearchResults from "./search-results";

export default async function FetchSearchResults({
  foodName,
}: {
  foodName: string;
}) {
  let mappedFoods; // Store fetched & mapped foods
  
  const fetchedFoodsData = await fetchGeneral(foodName); // Fetch all matched foods by name
  
  // Check is any food is found
  if (fetchedFoodsData.foods.total_results > 0) {
    mappedFoods = mapToFoodGeneral(fetchedFoodsData); // Map fetched foods to FoodGeneral model
  } else {
    mappedFoods = undefined;
  }
  return (
    <>
      <SearchResults foods={mappedFoods} />
    </>
  );
}
