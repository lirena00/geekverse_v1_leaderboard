import Link from "next/link";
import { Card } from "~/components/ui/card";
export default function Header() {
  return (
    <Card>
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          <Link href="/" legacyBehavior passHref>
            Geekverse v.1
          </Link>
        </h1>

        <nav className="flex gap-4">
          <Link href="/upload">Upload</Link>
        </nav>
      </header>
    </Card>
  );
}
