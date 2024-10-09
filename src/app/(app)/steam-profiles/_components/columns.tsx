"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SteamProfile } from "../_data/schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<SteamProfile>[] = [
  {
    accessorKey: "steamId",
    header: "Steam profile id",
  },
  {
    accessorKey: "releaseDateIcsFileUrl",
    header: "Release date ICalender file",
    cell: ({ row }) => {
      const steamProfile = row.original;
      const { releaseDateIcsFileUrl } = steamProfile;

      return (
        <>
          {releaseDateIcsFileUrl ? (
            <span>{releaseDateIcsFileUrl}</span>
          ) : (
            <span>Not ready</span>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
