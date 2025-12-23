import { FoodDetailed } from "@/lib/data/types";
import FoodInfoCard from "./food-info-card";

export default function NormalPreview({
  specificFood,
}: {
  specificFood: FoodDetailed | undefined;
}) {
  return (
    <>
      {/** Selected food information: Side bar for medium screens and above */}

      <div
        id="result-preview"
        className="hidden md:block md:w-[50%] h-96 p-1 bg-white overflow-hidden"
      >
        {!specificFood && <p>Selected food is invalid.</p>}
        {specificFood && (
          <div className="h-full flex flex-col">
            <FoodInfoCard food={specificFood} />
          </div>
        )}
      </div>
    </>
  );
}
