import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { User } from "@/lib/users/entities/user.entity";
import { createUser } from "@/lib/users/users.service";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id: clerkUserId } = evt.data;
  if (!clerkUserId) {
    throw new Error("clerk user id not found");
  }

  const eventType = evt.type;
  console.log(`Webhook with and ID of ${clerkUserId} and type of ${eventType}`);
  console.log("Webhook body:", body);

  let user: User | undefined;

  if (evt.type === "user.created") {
    if (evt.data.email_addresses.length == 0) {
      return new Response("No email address found", { status: 400 });
    }

    // Create a new user
    try {
      user = await createUser(evt.data.email_addresses[0].email_address);
      await clerkClient().users.updateUserMetadata(clerkUserId, {
        privateMetadata: {
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating user:", error.message);
      } else {
        console.error("Unknown error creating user:", error);
      }
      return new Response("Error occured", { status: 400 });
    }
  }

  return new Response("Success", { status: 200 });
}
