import { basicFetch } from "@/components/actions";
import { FollowerCount, PlayerCount, Top3Games, VisitCount } from "@/components/client";
import { reviews, universeIds, userId } from "@/components/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { readdirSync, readFileSync } from "fs";
import Image from "next/image";
import Link from "next/link";
import { cwd } from "process";
import sharp from "sharp";

async function PastWorks() {
  const files = readdirSync(`${cwd()}/public/works`, { withFileTypes: true });

  const els = await Promise.all(files.map(async function(img, i) {
    const file = readFileSync(`${cwd()}/public/works/${img.name}`);
    const sharpFile = sharp(file);
    const metadata = await sharpFile.metadata();
    const alt = img.name.replaceAll("-", " ").replace(/\.[^/.]+$/, "").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    return (
      <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3 flex items-center justify-center" key={`${img.name}${i}`}>
        <Image draggable={false} src={`/works/${img.name}`} alt={alt} width={metadata.width ?? 1} height={metadata.height ?? 1} sizes="(max-width: 768px) 60vw, (max-width: 1024px) 30vw, 20vw" className="w-full h-auto rounded-lg" />
      </CarouselItem>
    );
  }));

  return els;
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["players"],
    queryFn: () => basicFetch("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });
  await queryClient.prefetchQuery({
    queryKey: ["visits"],
    queryFn: () => basicFetch("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });
  await queryClient.prefetchQuery({
    queryKey: ["games"],
    queryFn: () => basicFetch("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });
  await queryClient.prefetchQuery({
    queryKey: ["followers"],
    queryFn: () => basicFetch("https://friends.roblox.com/v1/users/" + userId.toString() + "/followers/count"),
  });

  return (
    <main className="p-4">
      <header className="flex flex-col gap-4 h-screen -mx-4 -mt-4 justify-center items-center relative">
        <Image src="/banners/og.png" alt="Games that Blulost has contributed to" width={1200} height={630} sizes="100vw" className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover -z-50 blur brightness-[60%]" />
        <Image src="/logos/blulost.png" alt="Blulost" width={244} height={258} sizes="96px" className="size-24 self-center" />
        <h1 className="text-4xl font-bold">Blulost</h1>
        <main className="bg-blue-600/60 border-2 border-blue-300/60 rounded-lg backdrop-blur-lg flex flex-col md:flex-row items-center justify-center divide-y-2 md:divide-x-2 md:divide-y-0 divide-blue-300/60">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="flex flex-col items-center gap-1 md:gap-2 p-4 w-full md:w-auto">
              <PlayerCount />
              <p className="text-xl">Total Players</p>
            </section>
            <section className="flex flex-col items-center gap-1 md:gap-2 p-4 w-full md:w-auto">
              <VisitCount />
              <p className="text-xl">Total Visits</p>
            </section>
            <section className="flex flex-col items-center gap-1 md:gap-2 p-4 w-full md:w-auto">
              <FollowerCount />
              <p className="text-xl">Total Followers</p>
            </section>
          </HydrationBoundary>
        </main>
        <footer className="absolute -bottom-[16px] left-0 right-0 flex flex-col gap-2 h-8 bg-gradient-to-t from-blue-500 to-transparent" role="presentation" />
      </header>
      <main className="flex flex-col gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>
              Who is Blulost?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Image src="/logos/blulost.png" alt="Blulost" width={244} height={258} sizes="96px" className="size-24 self-center md:basis-1/4 h-full" />
            <main className="flex flex-col md:basis-3/4">
              <p className="text-4xl font-bold">Hello, I am Blulost!</p>
              <p className="text-xl text-slate-200">
                I am currently 17 years old, and I have been modeling low-poly and mid-poly cartoony Roblox games for the past 4 years, while also building games for the past 7 years.
                I&apos;ve had a deep passion for Roblox development ever since I was 10 years old, and my goal is to show you that passion while working with you.
                This website was made with the goal of expanding my works and portfolio to others, as I believe everyone should have a chance for success when designing their own games.
                If you&apos;re interested in my works, don&apos;t hesitate to contact me! I would love to hear from you!
              </p>
            </main>
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </CardFooter>
        </Card>
        <section className="flex flex-col gap-2">
          <header className="flex flex-col">
            <h2 className="text-3xl font-bold">
              Top Games
            </h2>
            <p className="text-slate-200">
              The top 3 Roblox games where Blulost&apos;s modeling and building experience has shown massive success rates.
            </p>
          </header>
          <main className="flex flex-col md:flex-row gap-4 overflow-x-scroll">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Top3Games className="md:basis-1/2 lg:basis-1/3" />
            </HydrationBoundary>
          </main>
          <footer className="flex items-center">
            <Button asChild>
              <Link href="/games">View All</Link>
            </Button>
          </footer>
        </section>
        <Card>
          <CardHeader>
            <CardTitle>
              Past Works
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 py-[4.5rem] sm:pt-0 sm:pb-6 sm:px-[4.5rem]">
            <Carousel className="w-full cursor-grab active:cursor-grabbing">
              <CarouselContent>
                <PastWorks />
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </CardContent>
        </Card>
        <section className="flex flex-col gap-2">
          <header className="flex flex-col">
            <h2 className="text-3xl font-bold">
              Reviews
            </h2>
          </header>
          <main className="flex flex-col md:flex-row gap-4 py-[4.5rem] sm:pt-0 sm:pb-6 sm:px-[4.5rem]">
            <Carousel orientation="vertical" className="sm:hidden w-full cursor-grab active:cursor-grabbing">
              <CarouselContent>
                {
                  reviews.map(function(review, i) {
                    return (
                      <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3" key={`${review.user}-${i.toString()}`}>
                        <Card>
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
                      </CarouselItem>
                    );
                  })
                }
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
            <Carousel className="hidden sm:block w-full cursor-grab active:cursor-grabbing">
              <CarouselContent>
                {
                  reviews.map(function(review, i) {
                    return (
                      <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3" key={`${review.user}-${i}`}>
                        <Card>
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
                            {review.review }
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    );
                  })
                }
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </main>
        </section>
      </main>
      <Card className="flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Interested in my work?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          Interested in everything you&apos;ve seen so far? Feel free to contact me! I am always happy to work with a new client.
          <Button className="w-max bg-blue-500 hover:bg-blue-600 focus:bg-blue-600" asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};