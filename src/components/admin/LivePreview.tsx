"use client";

import { AppIcon } from "@/components/ios/AppIcon";
import { Dock } from "@/components/ios/Dock";
import { DynamicIsland } from "@/components/ios/DynamicIsland";
import { PhoneFrame } from "@/components/ios/PhoneFrame";
import { SquircleDefs } from "@/components/ios/SquircleDefs";
import { StatusBar } from "@/components/ios/StatusBar";
import { Database } from "@/lib/types/schema";
import { getFaviconUrl } from "@/lib/utils/favicon";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

interface ThemeConfig {
  wallpaper?: string;
}

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

  const themeConfig = profile?.theme_config as unknown as ThemeConfig;
  const wallpaper =
    themeConfig?.wallpaper ||
    "linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)";

  return (
    <PhoneFrame>
      <SquircleDefs />
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: wallpaper.startsWith("http")
            ? `url(${wallpaper})`
            : wallpaper,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <DynamicIsland />
        <StatusBar />

        {/* Profile Header (optional) */}
        {profile && (
          <div className="mt-20 flex flex-col items-center px-4">
            {profile.avatar_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile.full_name || ""}
                className="h-16 w-16 rounded-full object-cover shadow-lg"
              />
            )}
            {profile.full_name && (
              <h1 className="mt-2 text-lg font-semibold text-white drop-shadow-md">
                {profile.full_name}
              </h1>
            )}
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
              iconUrl={
                link.icon_url ||
                (link.url ? getFaviconUrl(link.url, 128) : null)
              }
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
                iconUrl={
                  link.icon_url ||
                  (link.url ? getFaviconUrl(link.url, 128) : null)
                }
              />
            ))}
          </Dock>
        )}
      </div>
    </PhoneFrame>
  );
}
