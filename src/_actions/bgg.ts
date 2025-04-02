"use server";

import { safeFail, SafeResponse } from "@/lib/utils";
import {
  CollectionMapped,
  collectionSchema,
  GameDetails,
  gameStatsSchema,
} from "@/services/BGG";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
});

const BASE_BGG_API = "https://boardgamegeek.com/xmlapi2";
const COLLECTION_PATH = "/collection?username=dodadodadoda";

export const getGameStats = async (
  id: string
): Promise<SafeResponse<GameDetails>> => {
  try {
    const res = await fetch(`${BASE_BGG_API}/thing?id=${id}`);
    if (!res.ok)
      return {
        data: null,
        success: false,
        errors: [res.statusText],
      };
    const xmlContent = await res.text();
    const { data, success, error } = gameStatsSchema.safeParse(
      parser.parse(xmlContent)
    );
    if (!success) return { data: null, success, errors: [error.message] };
    const {
      description,
      image,
      maxplayers,
      maxplaytime,
      minage,
      minplayers,
      minplaytime,
      playingtime,
      name,
      yearpublished,
    } = data.items.item;
    return {
      data: {
        description,
        image,
        name: name[0].value,
        maxplayers: parseInt(maxplayers.value),
        maxplaytime: parseInt(maxplaytime.value),
        minage: parseInt(minage.value),
        minplayers: parseInt(minplayers.value),
        minplaytime: parseInt(minplaytime.value),
        playingtime: parseInt(playingtime.value),
        yearpublished: parseInt(yearpublished.value),
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    return safeFail(error);
  }
};

export const getGameCollection = async (): Promise<
  SafeResponse<CollectionMapped>
> => {
  try {
    const res = await fetch(`${BASE_BGG_API}${COLLECTION_PATH}`);
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
          ({ name, objectid, status: { own }, collid, subtype, ...rest }) => ({
            name: name["#text"],
            own: parseInt(own),
            id: collid,
            thumbnail: "thumbnail" in rest ? rest.thumbnail : null,
            subtype,
            gameId: objectid,
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
