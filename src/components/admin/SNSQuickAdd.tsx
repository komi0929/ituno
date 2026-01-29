"use client";

import { IOS_OFFICIAL_ICONS } from "@/lib/utils/itunes-api";
import { Plus } from "lucide-react";
import Image from "next/image";

interface SNSQuickAddProps {
  onAdd: (title: string, url: string, iconUrl: string) => void;
  disabled?: boolean;
}

const PRESETS = [
  { name: "X", url: "https://twitter.com/", icon: IOS_OFFICIAL_ICONS.X },
  {
    name: "Instagram",
    url: "https://instagram.com/",
    icon: IOS_OFFICIAL_ICONS.Instagram,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/",
    icon: IOS_OFFICIAL_ICONS.TikTok,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/",
    icon: IOS_OFFICIAL_ICONS.YouTube,
  },
  {
    name: "Threads",
    url: "https://threads.net/",
    icon: IOS_OFFICIAL_ICONS.Threads,
  },
  { name: "Note", url: "https://note.com/", icon: IOS_OFFICIAL_ICONS.Note },
  {
    name: "GitHub",
    url: "https://github.com/",
    icon: IOS_OFFICIAL_ICONS.GitHub,
  },
];

export function SNSQuickAdd({ onAdd, disabled }: SNSQuickAddProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        人気アプリを追加
      </label>
      <div className="flex flex-wrap gap-3">
        {PRESETS.map((app) => (
          <button
            key={app.name}
            onClick={() => onAdd(app.name, app.url, app.icon)}
            disabled={disabled}
            className="group relative flex h-14 w-14 items-center justify-center rounded-[14px] transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
            title={`${app.name}を追加`}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[14px] shadow-sm">
              <Image
                src={app.icon}
                alt={app.name}
                fill
                sizes="56px"
                className="object-cover transition-transform group-hover:scale-105"
                unoptimized // Use unoptimized to avoid potential upstream optimization issues with Apple's CDN if strict
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-[14px] bg-black/0 transition-colors group-hover:bg-black/10">
              <Plus className="h-6 w-6 text-white opacity-0 shadow-sm drop-shadow-md transition-opacity group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
