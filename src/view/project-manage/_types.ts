import { CommonType } from '@/common/types/common.ts'

export interface ProjectItem extends CommonType {
  code: string
  pageCoverImage: string
  pageName: string
  pageUrl: string
  positionX: number
  positionY: number
}

export interface CanvasElement extends ProjectItem {
  image:  HTMLImageElement
  isSelected: boolean
}
