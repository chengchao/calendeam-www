import Link from "next/link";

import { siteConfig } from "@/config/site-config";

import { Icons } from "./icons";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6 lg:h-10 lg:w-10" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6"></nav>
    </div>
  );
}
