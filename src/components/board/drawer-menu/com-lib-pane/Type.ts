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
  Box = 'Box',
  Button = 'Button'
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
  // id
  uuid: string
  // 名称
  name: string
  // icon
  svg: string
  // 类型
  type: string
  // 样式
  style: React.CSSProperties
  // 子组件
  children: PaneItemType[]
  // 父元素id
  parentUuid: string | null
  // 操作类型
  operate: HistoryEnum.ADD | HistoryEnum.EDIT | null
  // 可编辑属性tab标签
  editableType: EditableTypeItem[]
  // 属性
  attr: { [key: string]: any }
  // 是否显示
  hidden: boolean
  // 元素类型
  categoryType: CategoryEnum
  // 附加组件
  // additional?: AdditionalType
}

type AdditionalType = {
  [key in string]: PaneItemType
} & Partial<Record<PaneItemTypes, PaneItemType>>
