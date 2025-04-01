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
import { CollectionMapped } from "@/services/BGG";

export const CollectionTable = ({ items }: CollectionMapped) => {
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
          {items
            .filter(
              ({ name, own }) =>
                name.toLowerCase().includes(query.toLowerCase()) && own > 0
            )
            .map(({ name, subtype, id, own, thumbnail }) => (
              <TableRow key={id}>
                <TableCell>
                  {thumbnail ? (
                    <div className="relative w-20 h-20">
                      <img
                        src={thumbnail}
                        className="absolute w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    "empty"
                  )}
                </TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{subtype}</TableCell>
                <TableCell>{own}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
