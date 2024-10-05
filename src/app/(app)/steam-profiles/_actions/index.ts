"use server";

import { redirect } from "next/navigation";

import * as SteamProfilesService from "@/lib/steam-profiles/steam-profiles.service";

export async function createSteamProfile(steamId: string) {
  return await SteamProfilesService.createSteamProfile(steamId);
}

export async function deleteSteamProfile(steamId: string) {
  await SteamProfilesService.deleteSteamProfile(steamId);
  redirect("/steam-profiles");
}
