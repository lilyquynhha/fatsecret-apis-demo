import { NextResponse } from "next/server";
import { FoodDetailed } from "./data/types";

const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";
const API_BASE = "https://platform.fatsecret.com/rest";

let cachedToken: {
  accessToken: string;
  expiresAt: number;
} | null = null;

async function getAccessToken() {
  // reuse token if still valid
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }

  const credentials = Buffer.from(
    `${process.env.FATSECRET_CLIENT_ID}:${process.env.FATSECRET_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "basic",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to get FatSecret access token");
  }

  const data = await res.json();

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - 60_000, // 1 min buffer
  };

  return cachedToken.accessToken;
}

export async function fatsecretFetch(
  endpoint: string,
  params?: Record<string, string>,
) {
  const token = await getAccessToken();

  const url = new URL(`${API_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FatSecret error: ${text}`);
  }

  return res.json();
}

export interface FatsecretGeneralSearch {
  food_id: string;
  food_name: string;
  food_description: string;
  food_type: "Brand" | "Generic";
  brand_name?: string;
}

export interface FatsecretGeneralSearchRes {
  foods: {
    total_results: number;
    food: FatsecretGeneralSearch[];
  };
}

interface Serving {
  metric_serving_unit: "g" | "ml";
  metric_serving_amount: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  saturated_fat?: number;
  polyunsaturated_fat?: number;
  monounsaturated_fat?: number;
  cholesterol?: number;
  sodium?: number;
  potassium?: number;
  fiber?: number;
  sugar?: number;
  vitamin_a?: number;
  vitamin_c?: number;
  calcium?: number;
  iron?: number;
  trans_fat?: number;
  added_sugars?: number;
  vitamin_d?: number;
}

export interface FatsecretDetailedSearchRes {
  food: {
    food_id: string;
    food_name: string;
    food_description: string;
    food_type: "Brand" | "Generic";
    brand_name?: string;
    servings: {
      serving: Serving[];
    };
  };
}

export async function fatsecretFetchGeneral(food_name: string) {
  const data = await fatsecretFetch("/foods/search/v1", {
    search_expression: food_name,
    format: "json",
  });

  return data as FatsecretGeneralSearchRes;
}

export async function fatsecretFetchDetailed(food_id: string) {
  const data = await fatsecretFetch("/food/v5", {
    food_id: food_id,
    format: "json",
  });

  return data as FatsecretDetailedSearchRes;
}
