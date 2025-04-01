import { getGameCollection } from "@/_actions/bgg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Collection = async () => {
  const { data, errors, success } = await getGameCollection();
  if (!success)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errors}</AlertDescription>
      </Alert>
    );
  return (
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
        {data.items.item.map(
          ({ name, subtype, collid, status: { own }, ...rest }) => (
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
          )
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
