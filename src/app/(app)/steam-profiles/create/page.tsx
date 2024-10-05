import PageHeader from "@/components/page-header";

import { SteamProfileForm } from "../_components/steam-profile-form";

export default async function CreateSteamProfile() {
  return (
    <div className="container">
      <PageHeader
        title={"Add steam profile"}
        pretitle={"steam profile"}
        pretitleHref="/steam-profiles"
      />
      <div className="mb-8 flex w-full items-center justify-center">
        <SteamProfileForm />
      </div>
    </div>
  );
}
