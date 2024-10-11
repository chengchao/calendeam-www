"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import useSWR from "swr";

import { getUserIdInUserMetadata } from "@/lib/actions/get-userid-in-user-metadata";
import { Button } from "@/components/ui/button";

export default function Home() {
  const fetcher = async (clerkUserId: string | null) => {
    if (!clerkUserId) {
      return null;
    }

    const userId = await getUserIdInUserMetadata();
    return userId;
  };

  const { user: clerkUser, isLoaded: isClerkUserLoaded } = useUser();

  const { data: userId, isLoading } = useSWR(clerkUser?.id, fetcher, {
    refreshInterval: 1000,
  });

  if (!isClerkUserLoaded || isLoading || !userId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="mr-3 h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container flex h-[90vh] flex-col items-center justify-center">
      <h1>Welcome to your new app!</h1>
      <p>Click the button below to add steam profiles</p>
      <br />
      <Button asChild>
        <Link href="/steam-profiles">Add steam profiles</Link>
      </Button>
    </div>
  );
}
