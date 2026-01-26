
"use client"

interface DockProps {
  children: React.ReactNode
}

export function Dock({ children }: DockProps) {
  return (
    // EXACT iOS Dock: 92% width, h-24, heavy blur, rounded-[35px]
    <div className="w-[92%] h-24 bg-white/20 backdrop-blur-3xl rounded-[35px] mx-auto absolute bottom-4 left-0 right-0 z-10 flex items-center justify-evenly px-4">
      {children}
    </div>
  )
}
