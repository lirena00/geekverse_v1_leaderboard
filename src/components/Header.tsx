import Link from "next/link";
import { Card } from "~/components/ui/card";
export default function Header() {
  return (
    <Card className="bg-accent">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          <Link href="/" legacyBehavior passHref>
            Geekverse v.1
          </Link>
        </h1>

        <div className="flex gap-4">
          <Link href="/upload">Upload</Link>
          <Link href="/attendance">Attendance</Link>
          <Link href="/dashboard">Points</Link>
        </div>
      </header>
    </Card>
  );
}
