import { FoodGeneral, FoodDetailed } from "./data/types";
import { toNumber } from "./utils";

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

// fatsecret's general search response data model
export interface GeneralSearchRes {
  foods: {
    total_results: number;
    food: FoodGeneral[];
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

// fatsecret's detailed search response data model
export interface DetailedSearchRes {
  error?: {
    code: string;
    message: string;
  };
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

// Fetch all matched foods by name
export async function fetchGeneral(food_name: string) {
  const data = await fatsecretFetch("/foods/search/v1", {
    search_expression: food_name,
    format: "json",
  });

  return data as GeneralSearchRes;
}

// Fetch a specific food's details by food_id
export async function fetchDetailed(food_id: string) {
  const data = await fatsecretFetch("/food/v5", {
    food_id: food_id,
    format: "json",
  });

  return data as DetailedSearchRes;
}

// Map a general search response to FoodGeneral model
export function mapToFoodGeneral(res: GeneralSearchRes): FoodGeneral[] {
  return res.foods.food.map((food) => ({
    food_id: food.food_id,
    food_name: food.food_name,
    food_description: food.food_description,
    food_type: food.food_type,
    brand_name: food.brand_name,
  }));
}

// Map a detailed search response to FoodDetailed model
export function mapToFoodDetailed(res: DetailedSearchRes): FoodDetailed {
  const servings = res.food.servings.serving;
  const s = servings[0];

  return {
    food_id: res.food.food_id,
    food_name: res.food.food_name,
    food_description: res.food.food_description,
    food_type: res.food.food_type,
    brand_name: res.food.brand_name,
    serving_unit: s.metric_serving_unit,
    serving_size: toNumber(s.metric_serving_amount)!,
    preferred_serving_size: toNumber(s.metric_serving_amount)!,

    calories: toNumber(s.calories)!,
    carbohydrate: toNumber(s.carbohydrate)!,
    protein: toNumber(s.protein)!,
    fat: toNumber(s.fat)!,

    saturated_fat: toNumber(s.saturated_fat),
    polyunsaturated_fat: toNumber(s.polyunsaturated_fat),
    monounsaturated_fat: toNumber(s.monounsaturated_fat),
    cholesterol: toNumber(s.cholesterol),
    sodium: toNumber(s.sodium),
    potassium: toNumber(s.potassium),
    fiber: toNumber(s.fiber),
    sugar: toNumber(s.sugar),

    vitamin_a: toNumber(s.vitamin_a),
    vitamin_c: toNumber(s.vitamin_c),
    calcium: toNumber(s.calcium),
    iron: toNumber(s.iron),
    trans_fat: toNumber(s.trans_fat),
    added_sugars: toNumber(s.added_sugars),
    vitamin_d: toNumber(s.vitamin_d),
  };
}
