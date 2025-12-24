import SearchResults from "@/components/ui/foods/search-results";
import SearchBar from "@/components/ui/foods/search-bar";
import { fetchGeneral, mapToFoodGeneral } from "@/lib/fatsecret";

export default async function Page(props: {
  searchParams: Promise<{
    food_name?: string;
    food_id?: string;
  }>;
}) {
  // Get food_name from search params
  const searchParams = await props.searchParams;
  const foodName = searchParams?.food_name;

  let mappedFoods; // Store fetched & mapped foods
  let isInput = false; // Control the display of SearchResults based on whether the user has entered a search input

  // Check if the user has entered a search input
  if (!foodName) {
    mappedFoods = undefined;
  } else {
    isInput = true;
    let fetchedFoodsData = await fetchGeneral(foodName); // Fetch all matched foods by name

    // Check is any food is found
    if (fetchedFoodsData.foods.total_results > 0) {
      mappedFoods = mapToFoodGeneral(fetchedFoodsData); // Map fetched foods to FoodGeneral model
    } else {
      mappedFoods = undefined;
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto w-full md:w-[80%] lg:w-[70%] py-6 px-6">
          <SearchBar />

          {isInput ? (
            <SearchResults foods={mappedFoods} />
          ) : (
            <p>Enter a food name to show search results.</p>
          )}
        </div>
      </div>
    </>
  );
}
