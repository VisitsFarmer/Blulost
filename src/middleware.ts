import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/home") {
    return NextResponse.rewrite(new URL("/", req.url));
  };
};