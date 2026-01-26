
"use client"

import { useCallback, useRef } from "react"

interface LongPressOptions {
  threshold?: number
  onStart?: () => void
  onFinish?: () => void
  onCancel?: () => void
}

export function useLongPress(
  callback: () => void,
  { threshold = 500, onStart, onFinish, onCancel }: LongPressOptions = {}
) {
  const timerRef = useRef<NodeJS.Timeout>(null)
  const isLongPress = useRef(false)

  const start = useCallback(() => {
    onStart?.()
    isLongPress.current = false
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      callback()
    }, threshold)
  }, [callback, threshold, onStart])

  const clear = useCallback(
    (shouldTriggerClick = true) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (isLongPress.current) {
        onFinish?.()
      } else if (shouldTriggerClick) {
        onCancel?.()
      }
    },
    [onFinish, onCancel]
  )

  return {
    onPointerDown: start,
    onPointerUp: () => clear(true),
    onPointerLeave: () => clear(false),
    onTouchStart: start,
    onTouchEnd: () => clear(true),
  }
}
