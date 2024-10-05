import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const steamProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  steamId: z.string(),
});

export type SteamProfile = z.infer<typeof steamProfileSchema>;
