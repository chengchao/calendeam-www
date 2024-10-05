"use server";

import * as SteamProfilesService from "@/lib/steam-profiles/steam-profiles.service";

export async function createSteamProfile(steamId: string) {
  return await SteamProfilesService.createSteamProfile(steamId);
}

export async function deleteSteamProfile(steamId: string) {
  return await SteamProfilesService.deleteSteamProfile(steamId);
}
