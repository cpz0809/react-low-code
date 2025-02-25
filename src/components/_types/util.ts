import React from 'react'
import { HistoryEnum } from '@/store/_types/history.ts'
import { VariableSingleProps } from '@/store/_types/context.ts'

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

// 组件分类枚举
export enum CategoryEnum {
  default = 'default',
  container = 'container'
}

// 网格分组类型
export interface GroupPaneType {
  name: string
  components: PaneItemType[]
}

// 可编辑类型
export type EditableTypeItem = 'attr' | 'style' | 'event' | 'senior'

// 可修改属性值
export type PaneItemEditKey =
  | 'name'
  | 'style'
  | 'attr'
  | 'hidden'
  | 'children'
  | 'loop'
  | 'methods'
  | 'className'

// 单个元素类型
export type PaneItemType<T = { [key: string]: any }> = {
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
  // 类名
  className: string | null
  // 子组件
  children: any
  // 父元素id
  parentUuid: string | null
  // 操作类型
  operate: HistoryEnum.ADD | HistoryEnum.EDIT | null
  // 可编辑属性tab标签
  editableType: EditableTypeItem[]
  // 属性
  attr: T
  // 是否显示
  hidden: number
  // 元素类型
  categoryType: CategoryEnum
  // 循环数据
  loop: VariableSingleProps | any[] | null
  // 可绑定事件
  selectableEvent: string[]
  // 绑定的事件
  methods: { [ket: string]: string }
}

// export type PaneItemType<T = { [key: string]: any }> = {
//   [key in PaneItemEditKey]: key extends 'name'
//     ? string
//     : key extends 'style'
//       ? React.CSSProperties
//       : key extends 'attr'
//         ? T
//         : key extends 'hidden'
//           ? boolean
//           : key extends 'children'
//             ? any
//             : key extends 'loop'
//               ? any
//               : key extends 'className'
//                 ? string
//                 : key extends 'methods'
//                   ? { [key: string]: string }
//                   : any
// } & {
//   // id
//   uuid: string
//   // 名称
//   name: string
//   // icon
//   svg: string
//   // 类型
//   type: string
//   // 样式
//   style: React.CSSProperties
//   // 类名
//   className: string
//   // 子组件
//   children: any
//   // 父元素id
//   parentUuid: string | null
//   // 操作类型
//   operate: HistoryEnum.ADD | HistoryEnum.EDIT | null
//   // 可编辑属性tab标签
//   editableType: EditableTypeItem[]
//   // 属性
//   attr: T
//   // 是否显示
//   hidden: boolean
//   // 元素类型
//   categoryType: CategoryEnum
//   // 循环数据
//   loop: any
//   // 可绑定事件
//   selectableEvent: string[]
//   // 绑定的事件
//   methods: { [ket: string]: string }
// }
