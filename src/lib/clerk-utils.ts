import { auth, clerkClient } from "@clerk/nextjs/server";

import "server-only";

export async function getUserIdInUserMetadata() {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) {
    throw new Error("No Clerk user ID found");
  }

  const clerkUser = await clerkClient().users.getUser(clerkUserId);
  // if userId is not found in the metadata, return undefined
  const userId = clerkUser.privateMetadata.userId;
  if (!userId) {
    return null;
  }

  return userId as string;
}
