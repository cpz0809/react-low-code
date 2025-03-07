import { PaneItemType } from '@/components/board/_types/util.ts'
import { FunctionComponentElement } from 'react'

export interface DraggableViewProps {
  item: PaneItemType
  children: FunctionComponentElement<{ componentid: string }>
  // 自定义放置事件
  onPlace?: (target: PaneItemType) => any
  // 自定义渲染事件
  onRender?: (
    children: FunctionComponentElement<{ componentid: string }>,
    props: any
  ) => FunctionComponentElement<{ componentid: string }>
}
