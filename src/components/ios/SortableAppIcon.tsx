
"use client"

import { AppIcon } from "@/components/ios/AppIcon"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableAppIconProps {
  id: string
  title: string
  iconUrl?: string | null
  isJiggling?: boolean
  onClick?: () => void
  onLongPress?: () => void
  onRemove?: () => void
}

export function SortableAppIcon({ id, ...props }: SortableAppIconProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <AppIcon id={id} {...props} />
    </div>
  )
}
