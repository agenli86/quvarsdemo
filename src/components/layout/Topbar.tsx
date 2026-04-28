import { Phone, Clock } from 'lucide-react'

export default function Topbar({ text }: { text?: string }) {
  if (!text) return null
  return (
    <div className="bg-gradient-quvars-dark text-white text-xs md:text-sm py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Clock size={14} className="hidden md:inline" />
        <span className="text-center">{text}</span>
      </div>
    </div>
  )
}
