import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SafeResponse<
  T extends Record<string, unknown> = Record<string, unknown>
> =
  | { data: T; success: true; errors: null }
  | { data: null; success: false; errors: string[] };

export const safeFail = (error: unknown) => {
  const { data, success } = z.instanceof(Error).safeParse(error);
  if (!success)
    return {
      data: null,
      success: false as const,
      errors: ["Unknown error"],
    };
  return {
    data: null,
    success: false as const,
    errors: [data.message],
  };
};
