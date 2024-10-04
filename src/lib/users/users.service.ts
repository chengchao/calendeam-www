import "server-only";

import { userSchema } from "./entities/user.entity";

export async function createUser(email: string) {
  const token = process.env.CLOUDFLARE_API_KEY;
  const domain = process.env.CLOUDFLARE_WORKER_DOMAIN;

  const response = await fetch(`${domain}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create user: ${errorText}`);
  }

  const userJson = await response.json();
  const user = userSchema.parse(userJson);

  return user;
}
