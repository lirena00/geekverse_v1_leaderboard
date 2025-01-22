import Header from "~/components/Header";
import { getTeamsName } from "~/server/queries";
import { PointsForm } from "~/components/form-points";

export const dynamic = "force-dynamic";

export default async function DashPage() {
  const team = await getTeamsName();
  return (
    <main className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-semibold">Points Dashboard</h1>
        <div className="relative flex w-full items-center justify-center">
          <PointsForm teams={team} />
        </div>
      </div>
    </main>
  );
}
