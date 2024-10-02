"use server";

import { auth } from "@clerk/nextjs/server";

import { FormValues } from "../_components/steam-profile-form";

export async function addSteamId(values: FormValues) {
  const { userId } = auth();
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
      steamId: values.steamId,
    }),
  });

  const steamProfile = await response.json();

  return steamProfile;
}
