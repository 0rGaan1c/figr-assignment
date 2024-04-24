import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("user"));
}
