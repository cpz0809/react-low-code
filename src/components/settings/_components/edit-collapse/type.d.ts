import { ReactNode } from 'react'
import { PaneItemType } from '@/components/_types/util.ts'

export interface EditCollapseProps {
  title: string
  // 是否可以折叠
  isCollapse?: boolean
  // 是否可以绑定变量
  isConfig?: boolean
  children: ReactNode
  paramsKey?: keyof PaneItemType
}
