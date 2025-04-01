"use server";

import { GameStats } from "@/components/game-searcher";
import { safeFail, SafeResponse } from "@/lib/utils";
import { BGGschema, CollectionMapped, collectionSchema } from "@/services/BGG";
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
const COLLECTION_URL =
  "https://boardgamegeek.com/xmlapi2/collection?username=dodadodadoda";

export const getGameId = async (
  game: string
): Promise<SafeResponse<{ objectId: number }>> => {
  try {
    const res = await fetch(`${BASE_BGG_API}/search?search=${game}`);
    if (!res.ok)
      return { data: null, success: false, errors: [res.statusText] };
    const xmlContent = await res.text();
    const json = parser.parse(xmlContent);
    const { success, data } = searchBGGschema.safeParse(json);
    if (!success)
      return {
        data: null,
        success: false,
        errors: [`Game "${game}" not found`],
      };
    return {
      data: { objectId: parseInt(data.boardgames.boardgame.objectid) },
      success: true,
      errors: null,
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
      errors: [`Missing "game" entry in formData`],
      idle: false,
    };
  const { data, success, errors } = await getGameId(safeParseData.data);
  if (!success)
    return {
      data: null,
      success: false,
      errors,
      idle: false,
    };
  try {
    const res = await fetch(`${BASE_BGG_API}/boardgame/${data.objectId}`);
    if (!res.ok)
      return {
        data: null,
        success: false,
        errors: [res.statusText],
        idle: false,
      };
    const xmlContent = await res.text();
    const json = BGGschema.parse(parser.parse(xmlContent));
    return {
      data: json,
      success: true,
      errors: null,
      idle: false,
    };
  } catch (error) {
    return { ...safeFail(error), idle: false };
  }
};

export const getGameCollection = async (): Promise<
  SafeResponse<CollectionMapped>
> => {
  try {
    const res = await fetch(COLLECTION_URL);
    if (!res.ok)
      return { data: null, success: false, errors: [res.statusText] };
    const xmlContent = await res.text();
    const collectionRes = collectionSchema.safeParse(parser.parse(xmlContent));
    if (!collectionRes.success) {
      return {
        data: null,
        success: false,
        errors: [collectionRes.error.message],
      };
    }
    return {
      data: {
        items: collectionRes.data.items.item.map(
          ({ name, status: { own }, collid, subtype, ...rest }) => ({
            name: name["#text"],
            own: parseInt(own),
            id: collid,
            thumbnail: "thumbnail" in rest ? rest.thumbnail : null,
            subtype,
          })
        ),
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    return { ...safeFail(error) };
  }
};
