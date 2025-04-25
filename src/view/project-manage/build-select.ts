import IconVite from '@/assets/icon/vite-logo.svg'

interface BuildSelectItem {
  key: string
  name: string
  icon: string
}

export const buildSelect: BuildSelectItem[] = [
  {
    key: 'vite',
    name: 'vite',
    icon: IconVite
  }
]
