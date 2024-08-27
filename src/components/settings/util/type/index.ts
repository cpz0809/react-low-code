import {
  EditableTypeItem,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

export interface Props {
  type: EditableTypeItem
  data?: PaneItemType
}

export interface SingleStyleType {
  name: string
  style: string
}
