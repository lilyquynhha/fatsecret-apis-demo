import { FoodGeneral, FoodDetailed, Serving } from "./data/types";
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

interface ServingRes {
  serving_id: string;

  metric_serving_unit: "ml" | "g" | "oz";
  metric_serving_amount: number;

  measurement_description: string;
  number_of_units: number;

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
      serving: ServingRes[];
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

  const mappedServings: Serving[] = servings.map((serving) => {
    const convertedMetricServingAmount = toNumber(
      serving.metric_serving_amount,
    );
    const convertedNonstandardServingAmount = toNumber(serving.number_of_units);
    const convertedCalories = toNumber(serving.calories);
    const convertedCarbohydrate = toNumber(serving.carbohydrate);
    const convertedProtein = toNumber(serving.protein);
    const convertedFat = toNumber(serving.fat);

    return {
      serving_id: serving.serving_id,

      serving_unit: serving.metric_serving_unit,
      serving_amount: convertedMetricServingAmount
        ? convertedMetricServingAmount
        : 0,

      nonstandard_serving_unit: serving.measurement_description,
      nonstandard_serving_amount: convertedNonstandardServingAmount
        ? convertedNonstandardServingAmount
        : 0,

      calories: convertedCalories ? convertedCalories : 0,
      carbohydrate: convertedCarbohydrate ? convertedCarbohydrate : 0,
      protein: convertedProtein ? convertedProtein : 0,
      fat: convertedFat ? convertedFat : 0,
      saturated_fat: toNumber(serving.saturated_fat),
      polyunsaturated_fat: toNumber(serving.polyunsaturated_fat),
      monounsaturated_fat: toNumber(serving.monounsaturated_fat),
      cholesterol: toNumber(serving.cholesterol),
      sodium: toNumber(serving.sodium),
      potassium: toNumber(serving.potassium),
      fiber: toNumber(serving.fiber),
      sugar: toNumber(serving.sugar),
      vitamin_a: toNumber(serving.vitamin_a),
      vitamin_c: toNumber(serving.vitamin_c),
      calcium: toNumber(serving.calcium),
      iron: toNumber(serving.iron),
      trans_fat: toNumber(serving.trans_fat),
      added_sugars: toNumber(serving.added_sugars),
      vitamin_d: toNumber(serving.vitamin_d),
    };
  });

  return {
    food_id: res.food.food_id,
    food_name: res.food.food_name,
    food_description: res.food.food_description,
    food_type: res.food.food_type,
    brand_name: res.food.brand_name ? res.food.brand_name : null,

    servings: {
      serving: mappedServings,
    },
  };
}
