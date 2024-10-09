"use client";

import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteSteamProfile } from "../_actions";
import { steamProfileSchema } from "../_data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

async function handleDelete(steamProfileId: string) {
  console.log("Delete steamProfileId");
  await deleteSteamProfile(steamProfileId);
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const steamProfile = steamProfileSchema.parse(row.original);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* TODO: add Edit back */}
          {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => console.log(e)}>
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this steam profile from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <form
            onSubmit={async () => {
              await handleDelete(steamProfile.id);
              router.refresh();
            }}
          >
            <Button variant="destructive" type="submit">
              Confirm
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
