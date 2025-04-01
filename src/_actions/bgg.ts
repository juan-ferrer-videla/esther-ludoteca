"use server";
import { safeFail, SafeResponse } from "@/lib/utils";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
const parser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
});
const searchBGGschema = z.object({
  boardgames: z.object({
    boardgame: z.object({
      objectid: z.string(),
    }),
  }),
});

const BASE_BGG_API = "https://boardgamegeek.com/xmlapi";

export const getGameId = async (
  game: string
): Promise<SafeResponse<{ objectId: number }>> => {
  try {
    const res = await fetch(`${BASE_BGG_API}/search?search=${game}`);
    if (!res.ok) return { data: null, success: false, error: res.statusText };
    const xmlContent = await res.text();
    const json = parser.parse(xmlContent);
    const { success, data } = searchBGGschema.safeParse(json);
    if (!success)
      return {
        data: null,
        success: false,
        error: "Unknown game",
      };
    return {
      data: { objectId: parseInt(data.boardgames.boardgame.objectid) },
      success: true,
      error: null,
    };
  } catch (error) {
    return safeFail(error);
  }
};

export const getGameStats = async (
  state: SafeResponse,
  formData: FormData
): Promise<SafeResponse> => {
  const game = z.string().parse(formData.get("game"));
  const { data, success, error } = await getGameId(game);
  if (!success) return { data: null, success: false, error };
  try {
    const res = await fetch(`${BASE_BGG_API}/boardgame/${data.objectId}`);
    if (!res.ok) return { data: null, success: false, error: res.statusText };
    const xmlContent = await res.text();
    const json = parser.parse(xmlContent);
    return {
      data: json,
      success: true,
      error: null,
    };
  } catch (error) {
    return safeFail(error);
  }
};
