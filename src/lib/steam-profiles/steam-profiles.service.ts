import "server-only";

import { auth, clerkClient } from "@clerk/nextjs/server";

import { steamProfilesSchema } from "./entities/steam-profile.entity";

export async function getSteamProfilesByUserId(userId: string) {
  const token = process.env.CLOUDFLARE_API_KEY;
  const domain = process.env.CLOUDFLARE_WORKER_DOMAIN;

  const response = await fetch(`${domain}/api/users/${userId}/steam-profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get steam profiles: ${errorText}`);
  }

  const steamProfilesJson = await response.json();
  const steamProfiles = steamProfilesSchema.parse(steamProfilesJson);

  steamProfiles.forEach((steamProfile) => {
    if (!steamProfile.releaseDateIcsKey) {
      return;
    }

    const fileName = steamProfile.releaseDateIcsKey?.split("/").pop();
    const steamId = steamProfile.steamId;
    const url = `${process.env.CLOUDFLARE_WORKER_DOMAIN}/wishlists/steam-profiles/${steamId}/ics/${fileName}`;
    steamProfile.releaseDateIcsFileUrl = url;
  });

  return steamProfiles;
}

export async function getMySteamProfiles() {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) {
    throw new Error("No user found");
  }

  const clerkUser = await clerkClient().users.getUser(clerkUserId);
  const userId = clerkUser.privateMetadata.userId;
  if (!userId || typeof userId !== "string") {
    throw new Error("No user found");
  }

  return getSteamProfilesByUserId(userId);
}

export async function createSteamProfile(steamId: string) {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) {
    throw new Error("No user found");
  }

  const clerkUser = await clerkClient().users.getUser(clerkUserId);
  const userId = clerkUser.privateMetadata.userId;
  if (!userId || typeof userId !== "string") {
    throw new Error("No user found");
  }

  const token = process.env.CLOUDFLARE_API_KEY;
  const domain = process.env.CLOUDFLARE_WORKER_DOMAIN;

  const response = await fetch(`${domain}/api/steam-profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      steamId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(errorText);
    throw new Error(`Failed to add steam id: ${errorText}`);
  }

  const steamProfile = await response.json();

  return steamProfile;
}

export async function deleteSteamProfile(steamId: string) {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) {
    throw new Error("No user found");
  }

  const clerkUser = await clerkClient().users.getUser(clerkUserId);
  const userId = clerkUser.privateMetadata.userId;
  if (!userId || typeof userId !== "string") {
    throw new Error("No user found");
  }

  const token = process.env.CLOUDFLARE_API_KEY;
  const domain = process.env.CLOUDFLARE_WORKER_DOMAIN;

  const response = await fetch(`${domain}/api/steam-profiles/${steamId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(errorText);
    throw new Error(`Failed to delete steam id: ${errorText}`);
  }

  const steamProfile = await response.json();

  return steamProfile;
}
