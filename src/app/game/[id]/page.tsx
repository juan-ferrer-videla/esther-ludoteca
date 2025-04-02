import { getGameStats } from "@/_actions/bgg";
import React from "react";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const gameId = (await params).id;
  const gameStatsResponse = await getGameStats(gameId);
  if (!gameStatsResponse.success) return <p>Ocurrio un error inesperado</p>;
  const {
    name,
    description,
    image,
    playingtime,
    maxplaytime,
    minplaytime,
    maxplayers,
    minplayers,
    minage,
    yearpublished,
  } = gameStatsResponse.data;
  return (
    <>
      <div className="mb-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {name}
        </h1>
        <p className="text-lg mb-2">{description}</p>
        <p className=" text-muted-foreground">Publicado en {yearpublished}</p>
      </div>
      <section className="flex flex-wrap gap-20">
        <ul className="[&>li:not(:first-child)]:mt-4">
          <li>
            <strong className="text-lg">Tiempo de juego</strong>
            <p>Recomendado {playingtime}</p>
            <p>Maximo {maxplaytime}</p>
            <p>Minimo {minplaytime}</p>
          </li>
          <li>
            <strong className="text-lg">Cantidad de jugadores</strong>
            <p>Maximo {maxplayers}</p>
            <p>Minimo {minplayers}</p>
          </li>
          <li>
            <strong className="text-lg">Edad minima</strong>
            <p> {minage}</p>
          </li>
        </ul>
        <img src={image} alt={name} className="grow w-72" />
      </section>
    </>
  );
}
