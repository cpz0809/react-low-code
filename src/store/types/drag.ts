import {
  PaneItemEditKey,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

export interface ViewStateType {
  itemList: PaneItemType[]
  currentMove: null | PaneItemType
  currentClick: null | PaneItemType
  currentDrag: null | CurrentDragType
}

export interface UpdateParams {
  uuid: string
  key: PaneItemEditKey
  params: any
}

export interface InsertProps {
  component: PaneItemType
  index?: number
}

export type CurrentDragKeyType = 'current' | 'target' | 'offset'

export interface OffsetProps {
  x: number
  y: number
}

export type CurrentDragType = {
  [key in CurrentDragKeyType]: any
} & {
  current: PaneItemType
  target: PaneItemType
  offset?: OffsetProps | null
}
