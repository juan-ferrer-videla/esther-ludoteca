import { z } from "zod";

export type TCollection = z.infer<typeof collectionSchema>;
export type TCollectionItem = TCollection["items"]["item"][number];

export interface GameDetails {
  description: string;
  name: string;
  image: string;
  maxplayers: number;
  minplayers: number;
  playingtime: number;
  maxplaytime: number;
  minplaytime: number;
  minage: number;
  yearpublished: number;
}

export interface CollectionItem {
  own: number;
  name: string;
  id: string;
  thumbnail: string | null;
  subtype: string;
  gameId: string;
}

export type CollectionMapped = {
  items: CollectionItem[];
};

export const collectionSchema = z.object({
  "?xml": z.object({
    version: z.string(),
    encoding: z.string(),
    standalone: z.string(),
  }),
  items: z.object({
    item: z.array(
      z.union([
        z.object({
          name: z.object({ "#text": z.string(), sortindex: z.string() }),
          originalname: z.string(),
          yearpublished: z.number(),
          image: z.string(),
          thumbnail: z.string(),
          status: z.object({
            own: z.string(),
            prevowned: z.string(),
            fortrade: z.string(),
            want: z.string(),
            wanttoplay: z.string(),
            wanttobuy: z.string(),
            wishlist: z.string(),
            preordered: z.string(),
            lastmodified: z.string(),
          }),
          numplays: z.number(),
          objecttype: z.string(),
          objectid: z.string(),
          subtype: z.string(),
          collid: z.string(),
        }),
        z.object({
          name: z.object({ "#text": z.string(), sortindex: z.string() }),
          originalname: z.string(),
          image: z.string(),
          thumbnail: z.string(),
          status: z.object({
            own: z.string(),
            prevowned: z.string(),
            fortrade: z.string(),
            want: z.string(),
            wanttoplay: z.string(),
            wanttobuy: z.string(),
            wishlist: z.string(),
            preordered: z.string(),
            lastmodified: z.string(),
          }),
          numplays: z.number(),
          objecttype: z.string(),
          objectid: z.string(),
          subtype: z.string(),
          collid: z.string(),
        }),
        z.object({
          name: z.object({ "#text": z.string(), sortindex: z.string() }),
          yearpublished: z.number(),
          image: z.string(),
          thumbnail: z.string(),
          status: z.object({
            own: z.string(),
            prevowned: z.string(),
            fortrade: z.string(),
            want: z.string(),
            wanttoplay: z.string(),
            wanttobuy: z.string(),
            wishlist: z.string(),
            preordered: z.string(),
            lastmodified: z.string(),
          }),
          numplays: z.number(),
          objecttype: z.string(),
          objectid: z.string(),
          subtype: z.string(),
          collid: z.string(),
        }),
        z.object({
          name: z.object({ "#text": z.string(), sortindex: z.string() }),
          image: z.string(),
          thumbnail: z.string(),
          status: z.object({
            own: z.string(),
            prevowned: z.string(),
            fortrade: z.string(),
            want: z.string(),
            wanttoplay: z.string(),
            wanttobuy: z.string(),
            wishlist: z.string(),
            preordered: z.string(),
            lastmodified: z.string(),
          }),
          numplays: z.number(),
          objecttype: z.string(),
          objectid: z.string(),
          subtype: z.string(),
          collid: z.string(),
        }),
        z.object({
          name: z.object({ "#text": z.string(), sortindex: z.string() }),
          yearpublished: z.number(),
          status: z.object({
            own: z.string(),
            prevowned: z.string(),
            fortrade: z.string(),
            want: z.string(),
            wanttoplay: z.string(),
            wanttobuy: z.string(),
            wishlist: z.string(),
            preordered: z.string(),
            lastmodified: z.string(),
          }),
          numplays: z.number(),
          objecttype: z.string(),
          objectid: z.string(),
          subtype: z.string(),
          collid: z.string(),
        }),
      ])
    ),
    totalitems: z.string(),
    termsofuse: z.string(),
    pubdate: z.string(),
  }),
});

export const gameStatsSchema = z.object({
  items: z.object({
    item: z.object({
      thumbnail: z.string(),
      image: z.string(),
      name: z.array(
        z.object({ type: z.string(), sortindex: z.string(), value: z.string() })
      ),
      description: z.string(),
      yearpublished: z.object({ value: z.string() }),
      minplayers: z.object({ value: z.string() }),
      maxplayers: z.object({ value: z.string() }),
      poll: z.array(
        z.union([
          z.object({
            results: z.array(
              z.object({
                result: z.array(
                  z.object({ value: z.string(), numvotes: z.string() })
                ),
                numplayers: z.string(),
              })
            ),
            name: z.string(),
            title: z.string(),
            totalvotes: z.string(),
          }),
          z.object({
            results: z.object({
              result: z.array(
                z.object({ value: z.string(), numvotes: z.string() })
              ),
            }),
            name: z.string(),
            title: z.string(),
            totalvotes: z.string(),
          }),
          z.object({
            results: z.object({
              result: z.array(
                z.object({
                  level: z.string(),
                  value: z.string(),
                  numvotes: z.string(),
                })
              ),
            }),
            name: z.string(),
            title: z.string(),
            totalvotes: z.string(),
          }),
        ])
      ),
      "poll-summary": z.object({
        result: z.array(z.object({ name: z.string(), value: z.string() })),
        name: z.string(),
        title: z.string(),
      }),
      playingtime: z.object({ value: z.string() }),
      minplaytime: z.object({ value: z.string() }),
      maxplaytime: z.object({ value: z.string() }),
      minage: z.object({ value: z.string() }),
      link: z.array(
        z.object({ type: z.string(), id: z.string(), value: z.string() })
      ),
      type: z.string(),
      id: z.string(),
    }),
    termsofuse: z.string(),
  }),
});
