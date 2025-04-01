"use client";

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { type SuccessResponse } from "@/lib/utils";
import { z } from "zod";
import { collectionSchema } from "@/services/BGG";

export const CollectionTable = ({
  items,
}: {
  items: SuccessResponse<z.infer<typeof collectionSchema>>["data"]["items"];
}) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
        <Label htmlFor="game">Game</Label>
        <Input
          id="game"
          placeholder="Busca tu juego"
          name="game"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <Table>
        <TableCaption>Lista de juegos en ludoteca.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Sub tipo</TableHead>
            <TableHead>Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.item
            .filter(
              ({ name, status: { own } }) =>
                name["#text"].toLowerCase().includes(query.toLowerCase()) &&
                parseInt(own) > 0
            )
            .map(({ name, subtype, collid, status: { own }, ...rest }) => (
              <TableRow key={collid}>
                <TableCell>
                  {"thumbnail" in rest ? (
                    <div className="relative w-20 h-20">
                      <img
                        src={rest.thumbnail}
                        className="absolute w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    "empty"
                  )}
                </TableCell>
                <TableCell className="font-medium">{name["#text"]}</TableCell>
                <TableCell>{subtype}</TableCell>
                <TableCell>{own}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
