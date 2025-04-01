import { getGameCollection } from "@/_actions/bgg";
import { DataTableDemo } from "@/components/data-table";

export default async function Home() {
  const { data, success } = await getGameCollection();

  if (!success) return <p>Ocurrió un error inesperado</p>;

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-6">
        Esther ludoteca
      </h1>

      <DataTableDemo data={data.items} />
    </>
  );
}
