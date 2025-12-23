import { FoodDetailed } from "@/lib/data/types";
import FoodInfoCard from "./food-info-card";

import { Button } from "../button";
export default function PopupPreview({
  selectedFood,
  closePreview,
}: {
  selectedFood: FoodDetailed;
  closePreview: () => void;
}) {
  return (
    <>
      <div className="md:hidden fixed inset-0 max-w-sm h-96 mx-auto my-auto">
        <div className="relative w-full h-full bg-background rounded-lg border-2 border-black border-solid flex flex-col">
          {/* Close button */}
          <Button
            className="absolute top-2 right-2 z-10"
            onClick={closePreview}
          >
            X
          </Button>

         <FoodInfoCard food={selectedFood}/>
        </div>
      </div>
    </>
  );
}
