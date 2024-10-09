import { ContactForm } from "@/components/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Interested in my work? Feel free to contact me through any means, such as this page or my X page.",
  openGraph: {
    type: "website",
    title: "Contact",
    description: "Interested in my work? Feel free to contact me through any means, such as this page or my X page.",
    locale: "en_US",
    url: "https://blulost.com/contact",
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
    title: "Contact",
    description: "Interested in my work? Feel free to contact me through any means, such as this page or my X page.",
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
    canonical: "/contact",
    languages: {
      "x-default": "/contact",
      "en-US": "/contact",
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
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-xl text-slate-200">
          Interested in my work? Feel free to contact me through any means, such as this page or my X page.
        </p>
        <footer className="absolute -bottom-[16px] left-0 right-0 flex flex-col gap-2 h-8 bg-gradient-to-t from-blue-500 to-transparent" role="presentation" />
      </header>
      <main className="flex flex-col gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>Get in touch with me via this form.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Other Forms of Contact</CardTitle>
            <CardDescription>Other ways to contact me.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="gap-2" asChild>
              <Link href="https://x.com/Blul0st" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="presentation" fill="currentColor" className="size-6">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
                X/Twitter
              </Link>
            </Button>
            <Button variant="link" className="gap-2" asChild>
              <Link href="https://www.roblox.com/users/3058946492/profile" target="_blank" rel="noopener noreferrer">
                <svg role="presentation" xmlns="http://www.w3.org/2000/svg" className="size-6" fill="currentColor" version="1.1" viewBox="0 0 302.7 302.7">
                  <path d="M120.5,271.7c-110.9-28.6-120-31-119.9-31.5 C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8S302.1,62,302.2,62c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5 C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8 c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z" strokeLinecap="butt" strokeMiterlimit={4} strokeLinejoin="miter" stroke="none" fillRule="nonzero" />
                </svg>
                Roblox Profile
              </Link>
            </Button>
            <Button variant="link" className="gap-2" asChild>
              <Link href="mailto:bluemaster442@gmail.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation" className="size-6">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                Email
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </main>
  );
};