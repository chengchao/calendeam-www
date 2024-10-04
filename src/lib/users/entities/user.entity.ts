import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  createdAt: z.string().pipe(z.coerce.date()),
  updatedAt: z.string().pipe(z.coerce.date()),
});

export type User = z.infer<typeof userSchema>;
