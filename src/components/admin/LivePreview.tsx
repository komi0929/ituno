"use client";

import { AppIcon } from "@/components/ios/AppIcon";
import { Dock } from "@/components/ios/Dock";
import { DynamicIsland } from "@/components/ios/DynamicIsland";
import { PhoneFrame } from "@/components/ios/PhoneFrame";
import { SquircleDefs } from "@/components/ios/SquircleDefs";
import { StatusBar } from "@/components/ios/StatusBar";
import { Database } from "@/lib/types/schema";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

interface LivePreviewProps {
  profile: Profile | null;
  links: Link[];
}

export function LivePreview({ profile, links }: LivePreviewProps) {
  const gridLinks = links
    .filter((l) => !l.is_docked)
    .sort((a, b) => a.sort_order - b.sort_order);
  const dockLinks = links
    .filter((l) => l.is_docked)
    .sort((a, b) => a.sort_order - b.sort_order);

  const wallpaper =
    (profile?.theme_config as any)?.wallpaper ||
    "https://images.unsplash.com/photo-1695503348386-2a7444c979d5?q=80&w=2670";

  return (
    <PhoneFrame>
      <div
        className="relative h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        {/* Status Bar */}
        <StatusBar />
        <SquircleDefs />

        {/* Dynamic Island */}
        <div className="flex w-full justify-center pt-2">
          <DynamicIsland />
        </div>

        {/* Profile Info (Optional) */}
        {profile?.full_name && (
          <div className="mt-4 flex flex-col items-center gap-2 px-4">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-16 w-16 rounded-full border-2 border-white/20 object-cover shadow-lg"
              />
            )}
            <h2 className="text-lg font-semibold text-white drop-shadow-md">
              {profile.full_name}
            </h2>
            {profile.bio && (
              <p className="text-center text-sm text-white/80 drop-shadow-md">
                {profile.bio}
              </p>
            )}
          </div>
        )}

        {/* App Grid */}
        <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6 px-4">
          {gridLinks.map((link) => (
            <AppIcon
              key={link.id}
              id={link.id}
              title={link.title}
              iconUrl={link.icon_url}
            />
          ))}
        </div>

        {/* Dock */}
        {dockLinks.length > 0 && (
          <Dock>
            {dockLinks.map((link) => (
              <AppIcon
                key={link.id}
                id={link.id}
                title={link.title}
                iconUrl={link.icon_url}
              />
            ))}
          </Dock>
        )}
      </div>
    </PhoneFrame>
  );
}
