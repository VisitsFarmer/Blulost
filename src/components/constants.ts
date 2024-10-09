import { QueryClient } from "@tanstack/react-query";

export const userId: number = 3058946492;

export const universeIds: number[] = [
  4990665573,
  6519977076,
  5693522631,
  5629457769,
  5976020326,
];

export type Review = {
  display: string;
  user: string;
  review: string;
  avatar?: string;
};
export const reviews: Review[] = [
  {
    display: "VisitsFarmer",
    user: "@VisitsFarmer",
    review: "blulost is great i think idk lol",
    avatar: "visitsfarmer.png",
  },
  {
    display: "VisitsFarmer",
    user: "@VisitsFarmer",
    review: "blulost is great i think idk lol",
    avatar: "visitsfarmer.png",
  },
  {
    display: "VisitsFarmer",
    user: "@VisitsFarmer",
    review: "blulost is great i think idk lol",
    avatar: "visitsfarmer.png",
  },
  {
    display: "VisitsFarmer",
    user: "@VisitsFarmer",
    review: "blulost is great i think idk lol",
    avatar: "visitsfarmer.png",
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