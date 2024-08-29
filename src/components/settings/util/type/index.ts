import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

export interface Props<T = { [key: string]: any }> {
  type: EditableTypeItem
  data?: PaneItemType<T>
}

export interface SingleStyleType {
  name: string
  style: string
}
