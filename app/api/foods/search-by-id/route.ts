import { fatsecretFetch } from "@/lib/fatsecret";
import { mapToFoodDetailed } from "@/lib/fatsecret";
import { NextResponse } from "next/server";

// Fetch a specific food by food_id
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const foodId = searchParams.get("food_id");

  if (!foodId) {
    return NextResponse.json({ error: "Missing food_id" }, { status: 400 });
  }

  const raw = await fatsecretFetch("/food/v5", {
    food_id: foodId,
    format: "json",
  });

  // If no food is found
  if (raw.error) {
    return NextResponse.json(raw.error);
  }

  // Map fetched food to FoodDetailed model
  const mapped = mapToFoodDetailed(raw);

  return NextResponse.json(mapped);
}
