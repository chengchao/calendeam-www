import { z } from "zod";

export const steamProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  steamId: z.string(),
  releaseDateIcsKey: z.string().nullable(),
  releaseDateIcsFileUrl: z.string().optional(),
  createdAt: z.string().pipe(z.coerce.date()),
  updatedAt: z.string().pipe(z.coerce.date()),
});

export const steamProfilesSchema = z.array(steamProfileSchema);

export type SteamProfile = z.infer<typeof steamProfileSchema>;
