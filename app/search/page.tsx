import FetchSearchResults from "@/components/ui/foods/fetch-search-results";
import { SearchResultsSkeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams: Promise<{
    food_name?: string;
    food_id?: string;
    page?: number;
  }>;
}) {
  // Get food_name and page from search params
  const searchParams = await props.searchParams;
  const foodName = searchParams?.food_name;
  const page = Number(searchParams?.page ?? 0);

  // Check if the user has entered a search input
  if (!foodName) {
    return <p>Enter a food name to show search results.</p>;
  }

  return (
    <>
      <Suspense
        key={`${foodName}-${page}`}
        fallback={<SearchResultsSkeleton />}
      >
        <FetchSearchResults foodName={foodName} page={page} />
      </Suspense>
    </>
  );
}
