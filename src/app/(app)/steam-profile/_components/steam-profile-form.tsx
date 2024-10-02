"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { addSteamId } from "../_actions/add-steam-id";

const formSchema = z.object({
  steamId: z.string().min(1),
});
export type FormValues = z.infer<typeof formSchema>;

export function SteamProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steamId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setPending(true);
    await addSteamId(values);
    setPending(false);
  }

  const [pending, setPending] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Input your Steam ID</CardTitle>
        <CardDescription>
          Enter your steam ID below to track the release data of the games in
          wishlist.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="steamId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steam ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Steam ID"
                      required
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {pending && <Loader className="mr-3 h-5 w-5 animate-spin" />}
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
