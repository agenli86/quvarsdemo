import {
  Sparkles, Flower, Heart, Star, Eye, Sun, Moon, Gem, Crown,
  Wand2, Palette, Scissors, SprayCan, Leaf, Feather, Droplets,
  Flame, Zap, type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  flower: Flower,
  heart: Heart,
  star: Star,
  eye: Eye,
  sun: Sun,
  moon: Moon,
  gem: Gem,
  crown: Crown,
  'wand-2': Wand2,
  wand: Wand2,
  palette: Palette,
  scissors: Scissors,
  'spray-can': SprayCan,
  leaf: Leaf,
  feather: Feather,
  droplets: Droplets,
  flame: Flame,
  zap: Zap,
}

export function getIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Sparkles
  return iconMap[name.toLowerCase()] || Sparkles
}
