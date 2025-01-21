"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type Team = {
  id: number;
  rank: number | null;
  num: number | null;
  name: string;
  domain: string | null;
  round_one: number | null;
  round_two: number | null;
  bounty: number | null;
  total: number | null;
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "num",
    header: "S.No.",
    enableSorting: false,
  },
  {
    accessorKey: "rank",
    header: "Rank",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Team Name",
    enableSorting: false,
  },
  {
    accessorKey: "domain",
    header: "Domain",
    enableSorting: false,
  },
  {
    accessorKey: "round_one",
    header: "Round 1",
    enableSorting: true,
  },
  {
    accessorKey: "round_two",
    header: "Round 2",
    enableSorting: true,
  },
  {
    accessorKey: "bounty",
    header: "Bounty",
    enableSorting: true,
  },
  {
    accessorKey: "total",
    header: "Total",
    enableSorting: true,
  },
];
