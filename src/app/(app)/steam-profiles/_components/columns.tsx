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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
