import Header from "~/components/Header";
import { getTeamsForLb } from "~/server/queries";
import { columns } from "~/components/columns";
import { DataTable } from "~/components/data-table";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const team = await getTeamsForLb();
  return (
    <main className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <DataTable columns={columns} data={team} />
      </div>
    </main>
  );
}
