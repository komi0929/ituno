"use client";

import { getFaviconUrl } from "@/lib/utils/favicon";
import { Plus } from "lucide-react";

interface SNSQuickAddProps {
  onAdd: (title: string, url: string, iconUrl: string) => void;
  disabled?: boolean;
}

// Presets using dynamic favicon API instead of local files
const PRESETS = [
  { name: "X", url: "https://twitter.com/" },
  { name: "Instagram", url: "https://instagram.com/" },
  { name: "TikTok", url: "https://tiktok.com/" },
  { name: "YouTube", url: "https://youtube.com/" },
  { name: "Threads", url: "https://threads.net/" },
  { name: "Note", url: "https://note.com/" },
  { name: "GitHub", url: "https://github.com/" },
];

export function SNSQuickAdd({ onAdd, disabled }: SNSQuickAddProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        人気アプリを追加
      </label>
      <div className="flex flex-wrap gap-3">
        {PRESETS.map((app) => {
          const iconUrl = getFaviconUrl(app.url, 128);
          return (
            <button
              key={app.name}
              onClick={() => onAdd(app.name, app.url, iconUrl)}
              disabled={disabled}
              className="group relative flex h-14 w-14 items-center justify-center rounded-[14px] transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              title={`${app.name}を追加`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-zinc-700 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={iconUrl}
                  alt={app.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to a placeholder if favicon fails
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-[14px] bg-black/0 transition-colors group-hover:bg-black/10">
                <Plus className="h-6 w-6 text-white opacity-0 shadow-sm drop-shadow-md transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
