import { fetchUrlMetadata } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/schema";
import { getAppIconUrl } from "@/lib/utils/app-icons";
import { LOCAL_APP_ICONS } from "@/lib/utils/itunes-api";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { SNSQuickAdd } from "./SNSQuickAdd";

type Link = Database["public"]["Tables"]["links"]["Row"];
type LinkInsert = Database["public"]["Tables"]["links"]["Insert"];

interface LinkManagerProps {
  userId: string;
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

interface SortableLinkItemProps {
  link: Link;
  onUpdate: (id: string, updates: Partial<Link>) => void;
  onDelete: (id: string) => void;
}

function SortableLinkItem({ link, onUpdate, onDelete }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  // Handle URL changes with auto-fetch
  const handleUrlBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (!url) return;

    // If title is empty or default, try to fetch metadata
    if (!link.title || link.title === "新しいリンク") {
      const metadata = await fetchUrlMetadata(url);
      if (metadata?.title) {
        onUpdate(link.id, {
          title: metadata.title,
          icon_url: metadata.icon_url,
        });
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="mt-2 text-zinc-600 transition-colors hover:text-zinc-400 focus:outline-none"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Icon Preview */}
      <div className="flex-shrink-0 pt-1">
        <div className="h-10 w-10 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800">
          {link.icon_url || LOCAL_APP_ICONS[link.title] ? (
            <img
              src={LOCAL_APP_ICONS[link.title] || link.icon_url || ""}
              alt={link.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
              No Icon
            </div>
          )}
        </div>
      </div>

      {/* Inputs */}
      <div className="flex-1 space-y-3">
        <div>
          <label className="sr-only">タイトル</label>
          <input
            type="text"
            value={link.title}
            onChange={(e) => onUpdate(link.id, { title: e.target.value })}
            className="w-full bg-transparent text-base lg:text-sm font-medium text-white placeholder-zinc-500 focus:outline-none"
            placeholder="サイトのタイトル..."
          />
        </div>

        <div>
          <label className="sr-only">URL</label>
          <input
            type="url"
            value={link.url}
            onChange={(e) => {
              const url = e.target.value;
              onUpdate(link.id, {
                url,
                icon_url: getAppIconUrl(url), // Optimistic update
              });
            }}
            onBlur={handleUrlBlur}
            className="w-full bg-transparent text-base lg:text-sm text-blue-400 placeholder-zinc-600 focus:outline-none"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between gap-2">
        {/* Toggle Dock */}
        <label
          className={`flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            link.is_docked
              ? "bg-blue-500/10 text-blue-400"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
          }`}
        >
          <input
            type="checkbox"
            checked={link.is_docked ?? false}
            onChange={(e) => onUpdate(link.id, { is_docked: e.target.checked })}
            className="hidden"
          />
          Dock
        </label>

        <button
          onClick={() => onDelete(link.id)}
          className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100"
          title="削除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function LinkManager({
  userId,
  links,
  onLinksChange,
}: LinkManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddLink = async (
    title = "新しいリンク",
    url = "",
    iconUrl = "",
    isCustom = false,
  ) => {
    setIsAdding(true);
    try {
      // If custom URL provided, try to fetch metadata first
      let finalTitle = title;
      let finalIcon = iconUrl;

      if (isCustom && url) {
        const metadata = await fetchUrlMetadata(url);
        if (metadata) {
          finalTitle = metadata.title || title;
          finalIcon = metadata.icon_url || iconUrl;
        }
      }

      const newLink: LinkInsert = {
        user_id: userId,
        title: finalTitle,
        url: url,
        icon_url: finalIcon,
        is_docked: false,
        sort_order: links.length,
      };

      const { data, error } = await supabase
        .from("links")
        .insert(newLink as any)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        onLinksChange([...links, data as Link]);
        setCustomUrl(""); // Clear input if successful
      }
    } catch (err: any) {
      console.error("Failed to add link:", err);
      alert(`追加に失敗しました: ${err.message || "不明なエラー"}`);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateLink = async (id: string, updates: Partial<Link>) => {
    onLinksChange(links.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    await (supabase.from("links") as any).update(updates).eq("id", id);
  };

  const handleDeleteLink = async (id: string) => {
    onLinksChange(links.filter((l) => l.id !== id));
    await (supabase.from("links") as any).delete().eq("id", id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over?.id);
      const newLinks = arrayMove(links, oldIndex, newIndex).map((l, i) => ({
        ...l,
        sort_order: i,
      }));
      onLinksChange(newLinks);
      for (const link of newLinks) {
        await (supabase.from("links") as any)
          .update({ sort_order: link.sort_order })
          .eq("id", link.id);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          リンク管理
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          iPhoneホーム画面のように、リンクを管理できます。
        </p>
      </div>

      {/* 1. Review & Add Presets */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl">
        <SNSQuickAdd
          onAdd={(title, url, icon) => handleAddLink(title, url, icon)}
          disabled={isAdding}
        />

        <div className="my-6 h-px w-full bg-zinc-800/50" />

        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            またはURLから追加
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://mysite.com"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-blue-500 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && customUrl) {
                  handleAddLink("新しいリンク", customUrl, "", true);
                }
              }}
            />
            <button
              onClick={() => handleAddLink("新しいリンク", customUrl, "", true)}
              disabled={!customUrl || isAdding}
              className="flex items-center gap-2 rounded-xl bg-white px-6 font-bold text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "追加"}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sortable List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {links.map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                onUpdate={handleUpdateLink}
                onDelete={handleDeleteLink}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {links.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 py-20 text-center">
          <p className="text-zinc-500">
            上のボタンからSNSを追加するか、URLを入力してください。
          </p>
        </div>
      )}
    </div>
  );
}
