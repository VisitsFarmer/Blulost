import Link from "next/link";
import Image from "next/image";
import { AnimatedHeader, AnimatedImage, AnimatedLink } from "./client";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="bg-blue-600 z-50 supports-[backdrop-filter:blur(4px)]:bg-blue-600/60 backdrop-blur-sm p-4 flex justify-between items-center border-b border-blue-300/60 fixed top-0 w-full">
      <AnimatedLink href="/" className="flex items-center" initial="initial" animate="animate" whileHover="hover">
        <AnimatedImage src="/logos/blulost.png" alt="Blulost" width={244} height={258} sizes="48px" className="size-12" transition={{ duration: 0.4 }} variants={{ initial: { y: 6, opacity: 0 }, animate: { y: 0, opacity: 1 }, hover: { scale: 1.1 } }} />
        <AnimatedHeader className="hidden sm:block">
          Blulost
        </AnimatedHeader>
      </AnimatedLink>
      <nav className="hidden md:flex gap-4 items-center justify-center">
        <Link href="/" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Home
        </Link>
        <Link href="/games" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Games
        </Link>
        <Link href="/works" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Works
        </Link>
        <Link href="/reviews" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Reviews
        </Link>
        <Link href="/contact" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="border-b-2 border-blue-300/60 py-2">
            <h2 className="text-2xl font-bold">
              Menu
            </h2>
          </SheetHeader>
          <nav className="flex flex-col gap-2 py-2">
            <Link href="/" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
              Home
            </Link>
            <Link href="/games" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
              Games
            </Link>
            <Link href="/works" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
              Works
            </Link>
            <Link href="/reviews" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
              Reviews
            </Link>
            <Link href="/contact" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
              Contact
            </Link>
          </nav>
          <SheetFooter className="border-t-2 border-blue-300/60 py-2">
            <SheetClose asChild>
              <Button variant="outline">
                Close Menu
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-300/60 bg-blue-600 py-2 px-4">
      <header className="p-2 border-b border-blue-300/60">
        <Link href="/" className="flex items-center">
          <Image src="/logos/blulost.png" alt="Blulost" width={244} height={258} sizes="48px" className="size-12" />
          <h2 className="text-3xl font-bold">
            Blulost
          </h2>
        </Link>
      </header>
      <nav className="flex flex-wrap gap-4 p-2">
        <Link href="/" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Home
        </Link>
        <Link href="/games" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Games
        </Link>
        <Link href="/works" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Works
        </Link>
        <Link href="/reviews" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Reviews
        </Link>
        <Link href="/contact" className="transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          Contact
        </Link>
        <Link href="https://www.roblox.com/users/3058946492/profile" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          <svg role="presentation" xmlns="http://www.w3.org/2000/svg" className="size-6" fill="currentColor" version="1.1" viewBox="0 0 302.7 302.7">
            <path d="M120.5,271.7c-110.9-28.6-120-31-119.9-31.5 C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8S302.1,62,302.2,62c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5 C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8 c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z" strokeLinecap="butt" strokeMiterlimit={4} strokeLinejoin="miter" stroke="none" fillRule="nonzero" />
          </svg>
          Roblox Profile
        </Link>
        <Link href="https://x.com/Blul0st" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 transition-colors duration-300 hover:text-slate-300 focus:text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="presentation" fill="currentColor" className="size-6">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
          </svg>
          X/Twitter
        </Link>
      </nav>
    </footer>
  );
};