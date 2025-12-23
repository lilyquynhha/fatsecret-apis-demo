import { fatsecretFetch } from "@/lib/fatsecret";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("food_id");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 },
    );
  }

  const data = await fatsecretFetch("/food/v5", {
    food_id: query,
    format: "json",
  });

  return NextResponse.json(data);
}
