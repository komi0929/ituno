
"use client"

import { createClient } from "@/lib/supabase/client"
import { Database } from "@/lib/types/schema"
import { getFaviconUrl } from "@/lib/utils/favicon"
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Loader2, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

type Link = Database["public"]["Tables"]["links"]["Row"]
type LinkInsert = Database["public"]["Tables"]["links"]["Insert"]

interface LinkManagerProps {
  userId: string
  links: Link[]
  onLinksChange: (links: Link[]) => void
}

interface SortableLinkItemProps {
  link: Link
  onUpdate: (id: string, updates: Partial<Link>) => void
  onDelete: (id: string) => void
}

function SortableLinkItem({ link, onUpdate, onDelete }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-zinc-500 hover:text-white"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {link.icon_url && (
        <img
          src={link.icon_url}
          alt={link.title}
          className="h-10 w-10 rounded-lg object-cover"
        />
      )}

      <div className="flex-1 space-y-2">
        <input
          type="text"
          value={link.title}
          onChange={(e) => onUpdate(link.id, { title: e.target.value })}
          className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          placeholder="タイトル"
        />
        <input
          type="url"
          value={link.url}
          onChange={(e) => {
            const url = e.target.value
            onUpdate(link.id, {
              url,
              icon_url: getFaviconUrl(url),
            })
          }}
          className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          placeholder="https://..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs text-zinc-400">
          <input
            type="checkbox"
            checked={link.is_docked ?? false}
            onChange={(e) => onUpdate(link.id, { is_docked: e.target.checked })}
            className="rounded border-zinc-600"
          />
          Dock
        </label>
        <button
          onClick={() => onDelete(link.id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function LinkManager({ userId, links, onLinksChange }: LinkManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const supabase = createClient()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleAddLink = async () => {
    setIsAdding(true)
    try {
      const newLink: LinkInsert = {
        user_id: userId,
        title: "新しいリンク",
        url: "https://example.com",
        icon_url: getFaviconUrl("https://example.com"),
        is_docked: false,
        sort_order: links.length,
      }

      const { data, error } = await supabase
        .from("links")
        .insert(newLink as any)
        .select()
        .single()

      if (error) throw error
      if (data) onLinksChange([...links, data as Link])
    } catch (err) {
      console.error("Failed to add link:", err)
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdateLink = async (id: string, updates: Partial<Link>) => {
    // Optimistic update
    onLinksChange(links.map((l) => (l.id === id ? { ...l, ...updates } : l)))

    // Persist to DB
    await (supabase.from("links") as any).update(updates).eq("id", id)
  }

  const handleDeleteLink = async (id: string) => {
    // Optimistic update
    onLinksChange(links.filter((l) => l.id !== id))

    // Persist to DB
    await (supabase.from("links") as any).delete().eq("id", id)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id)
      const newIndex = links.findIndex((l) => l.id === over?.id)
      const newLinks = arrayMove(links, oldIndex, newIndex).map((l, i) => ({
        ...l,
        sort_order: i,
      }))
      onLinksChange(newLinks)

      // Batch update sort_order in DB
      for (const link of newLinks) {
        await (supabase.from("links") as any).update({ sort_order: link.sort_order }).eq("id", link.id)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">リンク管理</h2>
        <button
          onClick={handleAddLink}
          disabled={isAdding}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
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
          <div className="space-y-3">
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
        <div className="rounded-lg border border-dashed border-zinc-700 p-8 text-center text-zinc-500">
          リンクがありません。「リンクを追加」ボタンをクリックして始めましょう。
        </div>
      )}
    </div>
  )
}
