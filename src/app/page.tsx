import Link from "next/link";
import Header from "~/components/Header";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-8">
      <Header />
      <div className="px-4">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
      </div>
    </main>
  );
}
