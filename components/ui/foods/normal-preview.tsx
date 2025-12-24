import { FoodDetailed } from "@/lib/data/types";
import FoodInfoCard from "./food-info-card";

export default function NormalPreview({
  specificFood,
}: {
  specificFood: FoodDetailed | undefined;
}) {
  return (
    <>
      <div
        id="result-preview"
        className="hidden md:block md:w-[50%] h-96 p-1 bg-white overflow-hidden"
      >
        {specificFood && (
          <div className="h-full flex flex-col">
            <FoodInfoCard food={specificFood} />
          </div>
        )}
      </div>
    </>
  );
}
