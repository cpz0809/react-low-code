import React from 'react'
import { HistoryEnum } from '@/store/types/history'

// 组件类型枚举
export enum PaneItemTypes {
  Image = 'Image',
  Text = 'Text',
  Title = 'Title',
  Main = 'Main',
  Modal = 'Modal',
  Drawer = 'Drawer',
  Tabs = 'Tabs',
  Box = 'Box'
}

export enum CategoryEnum {
  default = 'default',
  container = 'container'
}

// 网格分组类型
export interface GroupPaneType {
  name: string
  components: PaneItemType[]
}

export type EditableTypeItem = 'attr' | 'style' | 'event' | 'senior'

export type PaneItemEditKey = 'name' | 'style' | 'attr' | 'hidden'

// 单个元素类型
export type PaneItemType = {
  [key in PaneItemEditKey]: any
} & {
  uuid: string
  name: string
  svg: string
  type: string
  style: React.CSSProperties
  children: PaneItemType[]
  parentUuid: string | null
  operate: HistoryEnum.ADD | HistoryEnum.EDIT | null
  index: number
  editableType: EditableTypeItem[]
  attr: { [key: string]: any }
  hidden: boolean
  categoryType: CategoryEnum
}
