import { EditableTypeItem, PaneItemType } from '@/components/board/_types/util.ts'

export interface Props<T = any> {
  type: EditableTypeItem
  data?: PaneItemType<T>
}

export interface SingleStyleType {
  name: string
  style: string
}
