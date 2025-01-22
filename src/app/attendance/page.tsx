import { getTeamsName } from "~/server/queries";
import Header from "~/components/Header";
import { DomainForm } from "~/components/form-domain";

export default async function AttendancePage() {
  const teams = await getTeamsName();

  return (
    <main className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-4 px-4">
        <h1 className="self-start text-2xl font-semibold">Attendance</h1>
        <div className="flex w-full items-center justify-center">
          <DomainForm teams={teams} />
        </div>
      </div>
    </main>
  );
}
