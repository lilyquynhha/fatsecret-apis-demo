import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/ui/foods/search-results";
import PopupPreview from "@/components/ui/foods/popup-preview";

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto w-full md:w-[80%] lg:w-[70%] py-6 px-6">
          {/* Search bar*/}
          <div id="search-bar" className="flex w-full gap-2 mb-4">
            <Input type="text" placeholder="Enter food name" className="h-10" />
            <Button className="h-10">Search</Button>
          </div>

          <SearchResults/>
        </div>
       
      </div>
    </>
  );
}
