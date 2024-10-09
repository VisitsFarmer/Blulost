import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Footer, Header } from "@/components/layout";
import { Providers, ReactLenis } from "@/components/client";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://blulost.com"),
  title: {
    default: "Blulost",
    template: "%s • Blulost",
  },
  description: "Portfolio for Blulost, a professional Roblox builder and 3D modeler.",
  openGraph: {
    type: "website",
    title: {
      default: "Blulost",
      template: "%s • Blulost",
    },
    description: "Portfolio for Blulost, a professional Roblox builder and 3D modeler.",  
    locale: "en_US",
    url: "https://blulost.com",
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
    title: {
      default: "Blulost",
      template: "%s • Blulost",
    },
    description: "Portfolio for Blulost, a professional Roblox builder and 3D modeler.",  
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
    canonical: "/",
    languages: {
      "x-default": "/",
      "en-US": "/",
    },
  },
  icons: {
    apple: "/ico/apple-touch-icon.png",
    icon: [
      {
        url: "/ico/favicon.ico",
        rel: "shortcut icon",
        type: "image/x-icon",
        sizes: "48x48",
      },
      {
        url: "/ico/favicon-48x48.png",
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
      },
    ],
    other: [
      {
        url: "/ico/site.webmanifest",
        rel: "manifest",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <html className="bg-blue-500" lang="en-US" dir="ltr">
        <body
          className={cn("text-slate-100 flex flex-col min-h-screen", GeistSans.className)}
        >
          <Header />
          <Providers>
            {children}
          </Providers>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ReactLenis>
  );
};