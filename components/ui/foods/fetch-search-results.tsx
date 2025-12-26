import { fetchGeneral, mapToFoodGeneral } from "@/lib/fatsecret";
import SearchResults from "./search-results";

export default async function FetchSearchResults({
  foodName,
  page,
}: {
  foodName: string;
  page: number;
}) {
  let mappedFoods; // Store fetched & mapped foods

  const fetchedFoodsData = await fetchGeneral(foodName, page); // Fetch all matched foods by name
  const totalResults = fetchedFoodsData.foods.total_results;

  // Check is any food is found
  if (totalResults > 0) {
    mappedFoods = mapToFoodGeneral(fetchedFoodsData); // Map fetched foods to FoodGeneral model
  } else {
    mappedFoods = undefined;
  }
  return (
    <>
      <SearchResults
        foods={mappedFoods}
        totalResults={totalResults}
        page={page}
      />
    </>
  );
}
