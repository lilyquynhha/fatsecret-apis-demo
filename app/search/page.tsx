import SearchResults from "@/components/ui/foods/search-results";
import SearchBar from "@/components/ui/foods/search-bar";
import {
  fatsecretFetchGeneral,
  FatsecretGeneralSearchRes,
  FatsecretGeneralSearch,
  fatsecretFetchDetailed,
} from "@/lib/fatsecret";
import {
  mapDetailedSearchToFoodModel,
  mapGeneralSearchToFoodModel,
} from "@/lib/utils";

export default async function Page(props: {
  searchParams: Promise<{
    food_name?: string;
    food_id?: string;
  }>;
}) {

  const searchParams = await props.searchParams; // Get search params
  const foodNameQuery = searchParams?.food_name; // Get food_name from search params
  let fetchedFoodsData;
  let fetchedFoodData;
  let mappedFoodsData; // All matched foods by name
  let mappedFoodData; // Specific food by id
  let isFoodsFound = false;
  let isFoodFound = false;
  let isInput = false;

  // If food_name is empty (meaning the user hasn't entered any input)
  if (!foodNameQuery) {
    mappedFoodsData = undefined;
    mappedFoodData = undefined;
  } else {
    isInput = true;
    fetchedFoodsData = await fatsecretFetchGeneral(foodNameQuery); // Fetch all matched foods by name

    // If no food is found by name
    if (fetchedFoodsData.foods.total_results == 0) {
      mappedFoodsData = undefined;
      mappedFoodData = undefined;
    } else {
      isFoodsFound = true;
      mappedFoodsData = mapGeneralSearchToFoodModel(
        fetchedFoodsData.foods.food,
      ); // Map response to FoodGeneral data model
      const foodIdQuery = searchParams?.food_id || mappedFoodsData[0].food_id;

      fetchedFoodData = await fatsecretFetchDetailed(foodIdQuery);

      mappedFoodData = mapDetailedSearchToFoodModel(fetchedFoodData);
      if (mappedFoodData) isFoodFound = true;
      console.log(mappedFoodData);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto w-full md:w-[80%] lg:w-[70%] py-6 px-6">
          <SearchBar />
          {!isInput && "Enter a food name to show search results."}
          {isInput && (
            <SearchResults
              foods={mappedFoodsData}
              specificFood={mappedFoodData}
            />
          )}
        </div>
      </div>
    </>
  );
}
