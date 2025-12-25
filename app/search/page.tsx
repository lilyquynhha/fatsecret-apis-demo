import FetchSearchResults from "@/components/ui/foods/fetch-search-results";
import { SearchResultsSkeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams: Promise<{
    food_name?: string;
    food_id?: string;
  }>;
}) {
  // Get food_name from search params
  const searchParams = await props.searchParams;
  const foodName = searchParams?.food_name;

  // Check if the user has entered a search input
  if (!foodName) {
    return <p>Enter a food name to show search results.</p>;
  }

  return (
    <>
      <Suspense key={foodName} fallback={<SearchResultsSkeleton />}>
        <FetchSearchResults foodName={foodName} />
      </Suspense>
    </>
  );
}
