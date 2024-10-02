import { SteamProfileForm } from "./_components/steam-profile-form";

export default async function SteamProfile() {
  return (
    <div className="container flex h-[90vh] w-full items-center justify-center">
      <SteamProfileForm />
    </div>
  );
}
