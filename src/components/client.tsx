"use client";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { isServer, type QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { GameIconAPIResponse, makeQueryClient, UniverseAPIResponse, universeIds, userId } from "./constants";
import { basicFetch, sendEmail } from "./actions";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Masonry from "react-responsive-masonry";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

// Providers
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    };
    return browserQueryClient;
  };
};

export function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function PlayerCount() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["players"],
    queryFn: () => basicFetch<UniverseAPIResponse>("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });

  if (isPending) {
    return (
      <Skeleton className="h-4 w-[200px]" />
    );
  };

  if (isError) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
    );
  };

  const totalPlayerCount = data!.data.reduce((prev, curr) => prev + curr.playing, 0);

  return (
    <h2 className="text-3xl font-bold">
      {totalPlayerCount.toLocaleString()}
    </h2>
  );
};
export function VisitCount() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["visits"],
    queryFn: () => basicFetch<UniverseAPIResponse>("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });

  if (isPending) {
    return (
      <Skeleton className="h-4 w-[200px]" />
    );
  };

  if (isError) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
    );
  };

  const totalPlayerCount = data!.data.reduce((prev, curr) => prev + curr.visits, 0);

  return (
    <h2 className="text-3xl font-bold">
      {totalPlayerCount.toLocaleString()}
    </h2>
  );
};
export function FollowerCount() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["followers"],
    queryFn: () => basicFetch<{ count: string }>("https://friends.roblox.com/v1/users/" + userId.toString() + "/followers/count"),
  });

  if (isPending) {
    return (
      <Skeleton className="h-9 w-[200px]" />
    );
  };

  if (isError) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <h2 className="text-3xl font-bold">
      {data!.count.toLocaleString()}
    </h2>
  );
};

export function Top3Games({ className }: { className?: string }) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["games"],
    queryFn: () => basicFetch<UniverseAPIResponse>("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });
  const { isPending: imageIsPending, isError: imageIsError, data: imageData } = useQuery({
    queryKey: ["gameIcon"],
    queryFn: () => basicFetch<GameIconAPIResponse>("https://thumbnails.roblox.com/v1/games/icons?universeIds=" + universeIds.join(",") + "&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false"),
  });

  if (isPending) {
    return (
      <Skeleton className="h-4 w-[200px]" />
    );
  };

  if (isError) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
    );
  };

  const top3Games = data!.data.sort((a, b) => b.playing - a.playing).slice(0, 3);

  return top3Games.map(function(game, i) {
    function GameIcon() {
      if (imageIsPending) {
        return (
          <Skeleton className="h-full w-full aspect-square rounded-lg" />
        );
      };

      if (imageIsError) {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        );
      };

      if (imageData) {
        let imageUrl: string = "";

        imageData.data.forEach(function(image) {
          if (image.targetId === game.id) {
            imageUrl = image.imageUrl;
          };
        });

        return (
          <Image src={imageUrl} alt={`Icon for \"${game.name}\"`} width={512} height={512} sizes="512px" className="h-full w-full aspect-square rounded-lg" />
        );
      };
    };

    return (
      <Card className={className} key={`${game.name}${i}`}>
        <CardHeader>
          <GameIcon />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardTitle>
            {game.name}
          </CardTitle>
          <main className="flex flex-col md:flex-row md:items-center justify-center text-slate-400">
            <p className="flex gap-1 px-2 border-b md:border-b-0 md:border-r border-slate-400/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
              {game.playing.toLocaleString()} Playing
            </p>
            <p className="flex gap-1 px-2 border-b md:border-b-0 md:border-r border-slate-400/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
              {game.visits.toLocaleString()} Plays
            </p>
            <p className="flex gap-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              {game.favoritedCount.toLocaleString()} Favorites
            </p>
          </main>
          <footer className="py-2">
            <Button className="bg-green-500 hover:bg-green-600 focus:bg-green-600 text-slate-100 flex items-center justify-center gap-2" asChild>
              <Link href={`https://roblox.com/games/${game.rootPlaceId.toString()}`} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
                Play
              </Link>
            </Button>
          </footer>
        </CardContent>
      </Card>
    );
  });
};
export function Games({ className }: { className?: string }) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["games"],
    queryFn: () => basicFetch<UniverseAPIResponse>("https://games.roblox.com/v1/games?universeIds=" + universeIds.join(",")),
  });
  const { isPending: imageIsPending, isError: imageIsError, data: imageData } = useQuery({
    queryKey: ["gameIcon"],
    queryFn: () => basicFetch<GameIconAPIResponse>("https://thumbnails.roblox.com/v1/games/icons?universeIds=" + universeIds.join(",") + "&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false"),
  });

  if (isPending) {
    return (
      <Skeleton className="h-4 w-[200px]" />
    );
  };

  if (isError) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
    );
  };

  const topGames = data!.data.sort((a, b) => b.playing - a.playing);

  return topGames.map(function(game, i) {
    function GameIcon() {
      if (imageIsPending) {
        return (
          <Skeleton className="h-full w-full aspect-square rounded-lg" />
        );
      };

      if (imageIsError) {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        );
      };

      if (imageData) {
        let imageUrl: string = "";

        imageData.data.forEach(function(image) {
          if (image.targetId === game.id) {
            imageUrl = image.imageUrl;
          };
        });

        return (
          <Image src={imageUrl} alt={`Icon for \"${game.name}\"`} width={512} height={512} sizes="512px" className="h-full w-full aspect-square rounded-lg" />
        );
      };
    };

    return (
      <Card className={className} key={`${game.name}${i}`}>
        <CardHeader>
          <GameIcon />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardTitle>
            {game.name}
          </CardTitle>
          <main className="flex flex-col md:flex-row md:items-center justify-center text-slate-400">
            <p className="flex gap-1 px-2 border-b md:border-b-0 md:border-r border-slate-400/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
              {game.playing.toLocaleString()} Playing
            </p>
            <p className="flex gap-1 px-2 border-b md:border-b-0 md:border-r border-slate-400/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
              {game.visits.toLocaleString()} Plays
            </p>
            <p className="flex gap-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              {game.favoritedCount.toLocaleString()} Favorites
            </p>
          </main>
          <footer className="py-2">
            <Button className="bg-green-500 hover:bg-green-600 focus:bg-green-600 text-slate-100 flex items-center justify-center gap-2" asChild>
              <Link href={`https://roblox.com/games/${game.rootPlaceId.toString()}`} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
                Play
              </Link>
            </Button>
          </footer>
        </CardContent>
      </Card>
    );
  });
};

export const AnimatedLink = motion.create(Link);
export const AnimatedImage = motion.create(Image);

export function AnimatedHeader({ className, children }: { className: string, children: string }) {
  const h2Variants: Variants = {
    initial: {
      filter: "blur(4px)",
      opacity: 0,
      rotateX: -80,
      y: 6,
    },
    animate: i => ({
      filter: "blur(0px)",
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.2,
        ease: "easeInOut",
      },
      y: 0,
    }),
    hover: i => ({
      filter: "blur(4px)",
      opacity: 0,
      rotateX: 80,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: "easeInOut",
      },
      y: -6,
    }),
  };
  const divVariants: Variants = {
    initial: {
      filter: "blur(4px)",
      opacity: 0,
      rotateX: -80,
      y: 6,
    },
    animate: i => ({
      filter: "blur(4px)",
      opacity: 0,
      rotateX: -80,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: "easeInOut",
      },
      y: 6,
    }),
    hover: i => ({
      filter: "blur(0px)",
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.2,
        ease: "easeInOut",
      },
      y: 0,
    }),
  };

  const splitText = children.split("");

  return (
    <div className={cn("relative", className)}>
      <h2 className="text-3xl font-bold">
        {
          splitText.map(function(char, i) {
            return (
              <motion.span className="inline-block" variants={h2Variants} custom={i} key={`${char}${i}`}>
                {char}
              </motion.span>
            );
          })
        }
      </h2>
      <div className="absolute top-0 left-0 right-0 bottom-0 text-3xl font-bold">
        {
          splitText.map(function(char, i) {
            return (
              <motion.span className="inline-block" variants={divVariants} custom={i} key={`${char}${i}`}>
                {char}
              </motion.span>
            );
          })
        }
      </div>
    </div>
  );
};

export function ContactForm() {
  const formSchema = z.object({
    name: z.string().min(2).max(32),
    email: z.string().email(),
    message: z.string().min(2).max(1024),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Sending contact form...");
    try {
      await sendEmail(data);
      toast("Success!");
    } catch(e) {
      toast("Failed to send contact form.", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:border-red-700",
        },
      });
    };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Blulost" {...field} />
              </FormControl>
              <FormDescription>
                The name you prefer to go by. Make this your Discord username if you prefer to be contacted via Discord.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="blulost@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                The email you would prefer to be contacted at.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="I am interested in..." {...field} />
              </FormControl>
              <FormDescription>
                The message you would like to send to Blulost.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600" type="submit">
          Send
        </Button>
      </form>
    </Form>
  );
};

export { Masonry };
export { ResponsiveMasonry } from "react-responsive-masonry";
export { ReactLenis } from "@studio-freight/react-lenis";