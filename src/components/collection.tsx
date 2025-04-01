import { getGameCollection } from "@/_actions/bgg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { CollectionTable } from "./collection-table";

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
  return <CollectionTable items={data.items} />;
};
