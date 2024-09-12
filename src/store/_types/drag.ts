import {
  PaneItemEditKey,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { CurrentDropDirection } from '@/components/board/simulator/type'

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

export type CurrentDragKeyType = 'current' | 'target'

export interface OffsetProps {
  left: number
  top: number
}

export interface CurrentDragType {
  current: PaneItemType
  target: PaneItemType
  offset: OffsetProps
}

export type UpdatePositionProps = {
  [key in CurrentDragKeyType]: any
} & {
  current?: PaneItemType | null
  target: PaneItemType
  direction: CurrentDropDirection
}

export interface UpdateCurrentClickParams {
  key: PaneItemEditKey
  params: any
}
