import { z } from "zod";

export const BGGschema = z.object({
  boardgames: z.object({
    boardgame: z.object({
      yearpublished: z.number(),
      minplayers: z.number(),
      maxplayers: z.number(),
      playingtime: z.number(),
      minplaytime: z.number(),
      maxplaytime: z.number(),
      age: z.number(),
      name: z.object({
        "#text": z.string(),
        primary: z.string(),
        sortindex: z.string(),
      }),
      description: z.string(),
      thumbnail: z.string(),
      image: z.string(),
      boardgamepublisher: z.object({
        "#text": z.string(),
        objectid: z.string(),
      }),
      boardgamehonor: z.array(
        z.object({ "#text": z.string(), objectid: z.string() })
      ),
      boardgamecategory: z.object({
        "#text": z.string(),
        objectid: z.string(),
      }),
      boardgamesubdomain: z.array(
        z.object({ "#text": z.string(), objectid: z.string() })
      ),
      boardgamedesigner: z.object({
        "#text": z.string(),
        objectid: z.string(),
      }),
      boardgameartist: z.array(
        z.object({ "#text": z.string(), objectid: z.string() })
      ),
      boardgamepodcastepisode: z.object({
        "#text": z.string(),
        objectid: z.string(),
      }),
      boardgamemechanic: z.array(
        z.object({ "#text": z.string(), objectid: z.string() })
      ),
      boardgameversion: z.array(
        z.object({ "#text": z.string(), objectid: z.string() })
      ),
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
        ])
      ),
      "poll-summary": z.object({
        result: z.array(z.object({ name: z.string(), value: z.string() })),
        name: z.string(),
        title: z.string(),
      }),
      objectid: z.string(),
    }),
    termsofuse: z.string(),
  }),
});
