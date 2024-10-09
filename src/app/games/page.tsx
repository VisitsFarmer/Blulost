import { basicFetch } from "@/components/actions";
import { Games } from "@/components/client";
import { universeIds } from "@/components/constants";
import { QueryClient } from "@tanstack/react-query";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Games",
  description: "Games where Blulost's professional modeling and building skills have contributed to their success.",
  openGraph: {
    type: "website",
    title: "Games",
    description: "Games where Blulost's professional modeling and building skills have contributed to their success.",
    locale: "en_US",
    url: "https://blulost.com/games",
    siteName: "Blulost",
    images: [
      {
        url: "https://blulost.com/og/banner.png",
        width: 1200,
        height: 630,
        alt: "Blulost",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Games",
    description: "Games where Blulost's professional modeling and building skills have contributed to their success.",
    images: [
      {
        url: "https://blulost.com/og/banner.png",
        width: 1200,
        height: 630,
        alt: "Blulost",
      },
    ],
    site: "@Blul0st",
    creator: "@VisitsFarmer",
  },
  alternates: {
    canonical: "/games",
    languages: {
      "x-default": "/games",
      "en-US": "/games",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function GamesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["games"],
    queryFn: () => basicFetch("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });

  return (
    <main className="p-4">
      <header className="flex flex-col gap-4 h-screen -mx-4 -mt-4 p-6 justify-center items-center relative">
        <Image src="/banners/og.png" alt="Games that Blulost has contributed to" width={1200} height={630} sizes="100vw" className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover -z-50 blur brightness-[60%]" />
        <h1 className="text-4xl font-bold">Games</h1>
        <p className="text-xl text-slate-200">
          Games where Blulost's professional modeling and building skills have contributed to their success.
        </p>
        <footer className="absolute -bottom-[16px] left-0 right-0 flex flex-col gap-2 h-8 bg-gradient-to-t from-blue-500 to-transparent" role="presentation" />
      </header>
      <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Games />
      </main>
    </main>
  );
};