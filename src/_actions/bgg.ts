"use server";

import { GameStats } from "@/components/game-searcher";
import { safeFail, SafeResponse } from "@/lib/utils";
import { BGGschema } from "@/services/BGG";
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

const BASE_BGG_API = "https://boardgamegeek.com/xmlapi/";

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
        error: `Game "${game}" not found`,
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
  _: GameStats,
  formData: FormData
): Promise<GameStats<z.infer<typeof BGGschema>>> => {
  const safeParseData = z.string().safeParse(formData.get("game"));

  if (!safeParseData.success)
    return {
      data: null,
      success: false,
      error: `Missing "game" entry in formData`,
      idle: false,
    };
  const { data, success, error } = await getGameId(safeParseData.data);
  if (!success) return { data: null, success: false, error, idle: false };
  try {
    const res = await fetch(`${BASE_BGG_API}/boardgame/${data.objectId}`);
    if (!res.ok)
      return { data: null, success: false, error: res.statusText, idle: false };
    const xmlContent = await res.text();
    const json = BGGschema.parse(parser.parse(xmlContent));
    return {
      data: json,
      success: true,
      error: null,
      idle: false,
    };
  } catch (error) {
    return { ...safeFail(error), idle: false };
  }
};
