import { Masonry, ResponsiveMasonry } from "@/components/client";
import { reviews } from "@/components/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Reviews from Blulost's clients, who have had nothing but great experiences with his modeling and building work.",
  openGraph: {
    type: "website",
    title: "Reviews",
    description: "Reviews from Blulost's clients, who have had nothing but great experiences with his modeling and building work.",
    locale: "en_US",
    url: "https://blulost.com/reviews",
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
    title: "Reviews",
    description: "Reviews from Blulost's clients, who have had nothing but great experiences with his modeling and building work.",
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
    canonical: "/reviews",
    languages: {
      "x-default": "/reviews",
      "en-US": "/reviews",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function GamesPage() {
  return (
    <main className="p-4">
      <header className="flex flex-col gap-4 h-screen -mx-4 -mt-4 p-6 justify-center items-center relative">
        <Image src="/banners/og.png" alt="Games that Blulost has contributed to" width={1200} height={630} sizes="100vw" className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover -z-50 blur brightness-[60%]" />
        <h1 className="text-4xl font-bold">Reviews</h1>
        <p className="text-xl text-slate-200">
          Reviews from Blulost's clients, who have had nothing but great experiences with his modeling and building work.
        </p>
        <footer className="absolute -bottom-[16px] left-0 right-0 flex flex-col gap-2 h-8 bg-gradient-to-t from-blue-500 to-transparent" role="presentation" />
      </header>
      <main className="mt-8">
        <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 639: 2, 767: 3, 1440: 4 }}>
          <Masonry gutter="1rem">
            {
              reviews.map(function(review, i) {
                return (
                  <Card key={`${review.user}-${i.toString()}`}>
                    <CardHeader className="flex flex-row flex-wrap gap-2 space-y-0">
                      <Image src={`/avatars/${review.avatar ?? "default.png"}`} alt={`${review.user}'s avatar`} width={400} height={400} sizes="48px" className="size-12 rounded-full aspect-square" />
                      <main className="flex flex-col gap-1.5 w-max">
                        <CardTitle className="flex items-center gap-1 w-max">
                          {review.display}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-blue-500">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                        </CardTitle>
                        <CardDescription className="w-max">{review.user}</CardDescription>
                      </main>
                    </CardHeader>
                    <CardContent>
                      {review.review}
                    </CardContent>
                  </Card>
                );
              })
            }
          </Masonry>
        </ResponsiveMasonry>
      </main>
    </main>
  );
};