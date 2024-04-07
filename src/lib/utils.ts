import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractInitials(name: string) {
  return name
    .split(" ")
    .map((letter) => letter[0])
    .join("");
}

export function capitalizeFirstLetter(str: string) {
  return str
    .split(" ")
    .map((letter) => `${letter[0].toUpperCase()}${letter.slice(1)}`)
    .join(" ");
}

export function getImageSrcFromServer(path: string) {
  const src = `${import.meta.env.VITE_BASE_URL}${path}`;
  return src;
}
