import { TabsType } from 'antd/es/tabs'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { PaneItemType } from '@/components/_types/util.ts'

export interface TabsAttrType {
  activeKey: string
  labels: LabelsType[]
  type: TabsType
  size: SizeType
  items: PaneItemType[][]
}

export interface LabelsType {
  name: string
  isClose: boolean
  disable: boolean
}

export enum TabsAttrEnum {
  Labels = 'labels',
  Type = 'type',
  Size = 'size'
}
