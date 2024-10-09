import { Masonry, ResponsiveMasonry } from "@/components/client";
import { readdirSync, readFileSync } from "fs";
import { type Metadata } from "next";
import Image from "next/image";
import { cwd } from "process";
import sharp from "sharp";

export const metadata: Metadata = {
  title: "Works",
  description: "A gallery containing the past works of Blulost, a professional Roblox modeler and game builder.",
  openGraph: {
    type: "website",
    title: "Works",
    description: "A gallery containing the past works of Blulost, a professional Roblox modeler and game builder.",
    locale: "en_US",
    url: "https://blulost.com/works",
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
    title: "Works",
    description: "A gallery containing the past works of Blulost, a professional Roblox modeler and game builder.",
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
    canonical: "/works",
    languages: {
      "x-default": "/works",
      "en-US": "/works",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function PastWorks() {
  const files = readdirSync(`${cwd()}/public/works`, { withFileTypes: true });

  const els = await Promise.all(files.map(async function(img, i) {
    const file = readFileSync(`${cwd()}/public/works/${img.name}`);
    const sharpFile = sharp(file);
    const metadata = await sharpFile.metadata();
    const alt = img.name.replaceAll("-", " ").replace(/\.[^/.]+$/, "").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    return (
      <Image draggable={false} src={`/works/${img.name}`} alt={alt} width={metadata.width ?? 1} height={metadata.height ?? 1} sizes="(max-width: 768px) 60vw, (max-width: 1024px) 30vw, 20vw" className="w-full h-auto rounded-lg" />
    );
  }));

  return els;
};

export default async function GamesPage() {
  return (
    <main className="p-4">
      <header className="flex flex-col gap-4 h-screen -mx-4 -mt-4 justify-center items-center relative p-6">
        <Image src="/banners/og.png" alt="Games that Blulost has contributed to" width={1200} height={630} sizes="100vw" className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover -z-50 blur brightness-[60%]" />
        <h1 className="text-4xl font-bold">Works</h1>
        <p className="text-xl text-slate-200">
          A gallery containing the past works of Blulost, a professional Roblox modeler and game builder.
        </p>
        <footer className="absolute -bottom-[16px] left-0 right-0 flex flex-col gap-2 h-8 bg-gradient-to-t from-blue-500 to-transparent" role="presentation" />
      </header>
      <main className="mt-8">
        <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 639: 2, 767: 3, 1440: 5 }}>
          <Masonry gutter="1rem">
            <PastWorks />
          </Masonry>
        </ResponsiveMasonry>
      </main>
    </main>
  );
};