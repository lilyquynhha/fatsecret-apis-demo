import { fatsecretFetchDetailed } from "@/lib/fatsecret";
import { mapDetailedSearchToFoodModel } from "@/lib/utils";
import NormalPreview from "./normal-preview";
import PopupPreview from "./popup-preview";

export default async function FoodPreview(props: {
  searchParams?: {
    food_id?: string;
  };
}) {
  const searchParams = props.searchParams; // Get search params
  const foodId = searchParams?.food_id; // Get food_id from search params
//   console.log(searchParams);
  if (!foodId) {
    return <div className="hidden md:block">Select a food to see details</div>;
  }

  // Fetch specific food by id
  const fetchedFood = await fatsecretFetchDetailed(foodId);
  const mappedFood = mapDetailedSearchToFoodModel(fetchedFood);

  return (
    <>
      <NormalPreview specificFood={mappedFood} />
      <PopupPreview specificFood={mappedFood} />
    </>
  );
}
