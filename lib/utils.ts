import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toNumber = (value?: string | number) => {
  if (!Number(value)) return null;
  return Number(value);
};
