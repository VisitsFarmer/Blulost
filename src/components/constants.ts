import { QueryClient } from "@tanstack/react-query";

export const userId: number = 3058946492;

export const universeIds: number[] = [
  4990665573,
  6519977076,
  5693522631,
  5629457769,
  5976020326,
  6548976575,
  6512924074,
];

export type Review = {
  display: string;
  user: string;
  review: string;
  link: URL;
  avatar?: string;
};
export const reviews: Review[] = [
  {
    display: "doBIG",
    user: "@do_bigR",
    review: "🐐",
    link: new URL("https://x.com/do_bigR/status/1829604216756900221"),
    avatar: "do_bigr.jpg",
  },
  {
    display: "PLAYSIDE",
    user: "@PLAYSIDEgg",
    review: "love it!",
    link: new URL("https://x.com/PLAYSIDEgg/status/1814080926009459011"),
    avatar: "playsidegg.jpg",
  },
  {
    display: "Ian",
    user: "@Vamonoz4",
    review: "LOVE THIS IS SUPER CREATIVE AND AMAZINGGGG",
    link: new URL("https://x.com/Vamonoz4/status/1782518042125029698"),
    avatar: "vamonoz4.jpg",
  },
  {
    display: "Elit",
    user: "@ElitRBLX",
    review: "Oh wow, nice! thanks :)",
    link: new URL("https://x.com/ElitRBLX/status/1763985329344614736"),
    avatar: "elitrblx.jpg",
  },
  {
    display: "Brennan",
    user: "@3DBrennan",
    review: "much love bro thank you",
    link: new URL("https://x.com/3DBrennan/status/1759689956081979813"),
    avatar: "3dbrennan.jpg",
  },
  {
    display: "Ready, set, more!",
    user: "@readysetroblox",
    review: "This is AWESOME! Keep up the great work 💪🔥",
    link: new URL("https://x.com/readysetroblox/status/1760923679595122948"),
    avatar: "readysetroblox.jpg",
  },
  {
    display: "VuukStudios",
    user: "@VuukStudios",
    review: "This is looking epic! 🤩",
    link: new URL("https://x.com/VuukStudios/status/1757474004116377833"),
    avatar: "vuukstudios.jpg",
  },
];

export type UniverseAPIResponse = {
  data: {
    id: number;
    rootPlaceId: number;
    name: string;
    description: string;
    sourceName: string;
    sourceDescription: string;
    creator: {
      id: number;
      name: string;
      type: "User" | "Group";
      isRNVAccount: boolean;
      hasVerifiedBadge: boolean;
    };
    price: number;
    allowedGearGenres: string[];
    allowedGearCategories: string[];
    isGenreEnforced: boolean;
    copyingAllowed: boolean;
    playing: number;
    visits: number;
    maxPlayers: number;
    created: string;
    updated: string;
    studioAccessToApisAllowed: boolean;
    createVipServersAllowed: boolean;
    universeAvatarType: "MorphToR6" | "MorphToR15" | "PlayerChoice";
    genre: string;
    genre_l1: string;
    genre_l2: string;
    isAllGenre: boolean;
    isFavoritedByUser: boolean;
    favoritedCount: number;
  }[];
};
export type GameIconAPIResponse = {
  data: {
    targetId: number;
    state: "Error" | "Completed" | "InReview" | "Pending" | "Blocked" | "TemporarilyUnavailable";
    imageUrl: string;
    version: string;
  }[];
};

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
};