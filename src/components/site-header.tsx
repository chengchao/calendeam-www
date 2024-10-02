import { SignedIn, UserButton } from "@clerk/nextjs";

import { MainNav } from "./main-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="ml-6 flex flex-1 items-center gap-4 md:justify-end lg:ml-0">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
