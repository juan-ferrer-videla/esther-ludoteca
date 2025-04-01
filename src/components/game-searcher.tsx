"use client";

import { getGameStats } from "@/_actions/bgg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeResponse } from "@/lib/utils";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export type GameStats<
  T extends Record<string, unknown> = Record<string, unknown>
> = SafeResponse<T> & { idle: boolean };

export const GameSearcher = () => {
  const initialState: GameStats = {
    data: null,
    success: false,
    errors: [],
    idle: true,
  };

  const [state, formAction, pending] = useActionState(
    getGameStats,
    initialState
  );

  return (
    <>
      <form action={formAction} className="mb-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="game">Game</Label>
          <Input id="game" placeholder="Busca tu juego" name="game" />
        </div>
        <Button disabled={pending} className="mt-4">
          {" "}
          {pending ? "Buscando..." : "Buscar"}
        </Button>
      </form>
      {!state.idle &&
        (!state.success ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.errors}</AlertDescription>
          </Alert>
        ) : (
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        ))}
    </>
  );
};
