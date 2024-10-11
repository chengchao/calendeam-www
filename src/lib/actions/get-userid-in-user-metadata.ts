"use server";

import * as ClerkUtils from "@/lib/clerk-utils";

export async function getUserIdInUserMetadata() {
  return await ClerkUtils.getUserIdInUserMetadata();
}
