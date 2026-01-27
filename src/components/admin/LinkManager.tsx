"use client";

import { fetchUrlMetadata } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/schema";
import { getAppIconUrl } from "@/lib/utils/app-icons";
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
import { GripVertical, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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
          {link.icon_url ? (
            <img
              src={link.icon_url}
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
            className="w-full bg-transparent text-sm font-medium text-white placeholder-zinc-500 focus:outline-none"
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
            className="w-full bg-transparent text-sm text-blue-400 placeholder-zinc-600 focus:outline-none"
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
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddLink = async () => {
    setIsAdding(true);
    try {
      const newLink: LinkInsert = {
        user_id: userId,
        title: "新しいリンク",
        url: "", // Empty by default now to encourage pasting
        icon_url: "",
        is_docked: false,
        sort_order: links.length,
      };

      const { data, error } = await supabase
        .from("links")
        .insert(newLink as any)
        .select()
        .single();

      if (error) throw error;
      if (data) onLinksChange([...links, data as Link]);
    } catch (err) {
      console.error("Failed to add link:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateLink = async (id: string, updates: Partial<Link>) => {
    // Optimistic update
    onLinksChange(links.map((l) => (l.id === id ? { ...l, ...updates } : l)));

    // Persist to DB
    await (supabase.from("links") as any).update(updates).eq("id", id);
  };

  const handleDeleteLink = async (id: string) => {
    // Optimistic update
    onLinksChange(links.filter((l) => l.id !== id));

    // Persist to DB
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

      // Batch update sort_order in DB
      for (const link of newLinks) {
        await (supabase.from("links") as any)
          .update({ sort_order: link.sort_order })
          .eq("id", link.id);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            リンク管理
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            ホーム画面に表示するアプリやリンクを管理します。
          </p>
        </div>
        <button
          onClick={handleAddLink}
          disabled={isAdding}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg disabled:opacity-50"
        >
          {isAdding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          リンクを追加
        </button>
      </div>

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
          <div className="rounded-full bg-zinc-800 p-4">
            <Plus className="h-6 w-6 text-zinc-500" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-white">
            リンクがありません
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            「リンクを追加」ボタンから最初のリンクを作成しましょう。
          </p>
        </div>
      )}
    </div>
  );
}
