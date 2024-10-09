import { Button } from "@/components/ui/button";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Sorry, but I couldn't find the page you were looking for.",
  openGraph: {
    title: "404",
    description: "Sorry, but I couldn't find the page you were looking for.",
  },
  twitter: {
    title: "404",
    description: "Sorry, but I couldn't find the page you were looking for.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center gap-4 p-4 h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">
        Sorry, but I couldn&apos;t find the page you were looking for.
      </p>
      <Button asChild>
        <Link href="/">
          Go Home
        </Link>
      </Button>
    </main>
  );
};