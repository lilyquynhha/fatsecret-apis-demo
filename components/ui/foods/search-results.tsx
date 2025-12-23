import { FoodGeneral } from "@/lib/data/types";
import FoodsList from "./foods-list";
import FoodPreview from "./food-preview";

export default async function SearchResults({
  foods,
  searchParams,
}: {
  foods: FoodGeneral[] | undefined;
  searchParams?: { food_name?: string; food_id?: string };
}) {
  return (
    <>
      {!foods && <p>No food found</p>}
      {foods && (
        <div id="search-result" className="flex flex-col md:flex-row gap-2">
          <FoodsList foods={foods} />
          <FoodPreview searchParams={searchParams} />
        </div>
      )}
    </>
  );
}
