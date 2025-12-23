import SearchResults from "@/components/ui/foods/search-results";
import SearchBar from "@/components/ui/foods/search-bar";
import {
  fatsecretFetchGeneral,
  FatsecretGeneralSearchRes,
  FatsecretGeneralSearch,
  fatsecretFetchDetailed,
} from "@/lib/fatsecret";
import { mapDetailedSearchToFoodModel, mapGeneralSearchToFoodModel } from "@/lib/utils";
import { mockFoods } from "@/lib/data/mock-foods";

export default async function Page(props: {
  searchParams: Promise<{
    food_name?: string;
    food_id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const foodNameQuery = searchParams?.food_name || "";
  

  const fetchedFoodsData = await fatsecretFetchGeneral(foodNameQuery);
  const mappedFoodsData = mapGeneralSearchToFoodModel(fetchedFoodsData.foods.food);
  const foodIdQuery = searchParams?.food_id || mappedFoodsData[0].food_id;

  const fetchedFoodData = await fatsecretFetchDetailed(foodIdQuery);
  const mappedFoodData = mapDetailedSearchToFoodModel(fetchedFoodData);
  console.log(mappedFoodData);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto w-full md:w-[80%] lg:w-[70%] py-6 px-6">
          <SearchBar />

          <SearchResults foods={mappedFoodsData} specificFood={mappedFoodData} />
        </div>
      </div>
    </>
  );
}
