"use client";

import { FoodDetailed } from "@/lib/data/types";
import { Separator } from "../separator";
import { ScrollArea } from "../scroll-area";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

export default function FoodInfoCard({ food }: { food: FoodDetailed }) {
  const [servingId, setServingId] = useState(
    food.servings.serving[0].serving_id,
  );
  const serving = food.servings.serving.find(
    (serving) => serving.serving_id == servingId,
  );
  return (
    <>
      {/* Header: Food name */}
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold">{food.food_name}</h2>
        {food.brand_name && (
          <p className="text-muted-foreground">{food.brand_name}</p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Nutrition list */}
      <ScrollArea className=" min-h-0 px-6 pb-6">
        <div className="space-y-2">
          <Select onValueChange={setServingId}>
            <SelectTrigger>
              <SelectValue
                placeholder={`${serving?.nonstandard_serving_amount} ${serving?.nonstandard_serving_unit}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Serving</SelectLabel>
                {food.servings.serving.map((serving) => (
                  <SelectItem
                    key={serving.serving_id}
                    value={serving.serving_id}
                  >
                    {`${serving.nonstandard_serving_amount} ${serving.nonstandard_serving_unit}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <p>
            <span className="font-semibold">Calories</span>: {serving?.calories}
          </p>
          <p>
            <span className="font-semibold">Carbohydrate</span>:{" "}
            {serving?.carbohydrate}
          </p>
          <p>
            <span className="font-semibold">Protein</span>: {serving?.protein}
          </p>
          <p>
            <span className="font-semibold">Fat</span>: {serving?.fat}
          </p>
          <p>
            <span className="font-semibold">Saturated Fat</span>:{" "}
            {serving?.saturated_fat}
          </p>
          <p>
            <span className="font-semibold">Polyunsaturated Fat</span>:{" "}
            {serving?.polyunsaturated_fat}
          </p>
          <p>
            <span className="font-semibold">Monounsaturated Fat</span>:{" "}
            {serving?.monounsaturated_fat}
          </p>
          <p>
            <span className="font-semibold">Cholesterol</span>:{" "}
            {serving?.cholesterol}
          </p>
          <p>
            <span className="font-semibold">Sodium</span>: {serving?.sodium}
          </p>
          <p>
            <span className="font-semibold">Potassium</span>:{" "}
            {serving?.potassium}
          </p>
          <p>
            <span className="font-semibold">Fiber</span>: {serving?.fiber}
          </p>
          <p>
            <span className="font-semibold">Sugar</span>: {serving?.sugar}
          </p>
          <p>
            <span className="font-semibold">Vitamin A</span>:{" "}
            {serving?.vitamin_a}
          </p>
          <p>
            <span className="font-semibold">Vitamin C</span>:{" "}
            {serving?.vitamin_c}
          </p>
          <p>
            <span className="font-semibold">Calcium</span>: {serving?.calcium}
          </p>
          <p>
            <span className="font-semibold">Iron</span>: {serving?.iron}
          </p>
          <p>
            <span className="font-semibold">Trans Fat</span>:{" "}
            {serving?.trans_fat}
          </p>
          <p>
            <span className="font-semibold">Added Sugars</span>:{" "}
            {serving?.added_sugars}
          </p>
          <p>
            <span className="font-semibold">Vitamin D</span>:{" "}
            {serving?.vitamin_d}
          </p>
        </div>
      </ScrollArea>
    </>
  );
}
