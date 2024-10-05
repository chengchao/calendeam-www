import Link from "next/link";

import { getMySteamProfiles } from "@/lib/steam-profiles/steam-profiles.service";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/page-header";

import { columns } from "./_components/columns";

export default async function SteamProfile() {
  const steamProfiles = await getMySteamProfiles();

  return (
    <div className="container">
      <PageHeader title={"Steam profiles"} pretitle={"steam profiles"}>
        <Button asChild>
          <Link href="/steam-profiles/create">Add steam profile</Link>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={steamProfiles} />
    </div>
  );
}
