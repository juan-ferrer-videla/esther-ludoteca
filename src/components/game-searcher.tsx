"use client";

import { getGameStats } from "@/_actions/bgg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeResponse } from "@/lib/utils";
import { useActionState } from "react";
import { Button } from "./ui/button";

export type GameStats = SafeResponse & { idle: boolean };

export const GameSearcher = () => {
  const initialState: GameStats = {
    data: null,
    success: false,
    error: "Unknown error",
    idle: true,
  };

  const [state, formAction, pending] = useActionState(
    getGameStats,
    initialState
  );

  return (
    <>
      <form action={formAction}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="game">Game</Label>
          <Input id="game" placeholder="Busca tu juego" name="game" />
        </div>
        <Button disabled={pending} className="mt-4">
          {" "}
          {pending ? "Buscando..." : "Buscar"}
        </Button>
      </form>
      {!state.idle && (
        <pre className="mt-6">{JSON.stringify(state, null, 2)}</pre>
      )}
    </>
  );
};
