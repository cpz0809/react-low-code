import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

export enum HistoryOperateTypeEnum {
  COMPONENT,
  STYLE,
  MOVE
}

export enum HistoryEnum {
  ADD = 'ADD',
  EDIT = 'EDIT'
}

export interface HistorySingleType {
  type: HistoryEnum
  oldComponent: PaneItemType
  newComponent: PaneItemType
  OperateType: HistoryOperateTypeEnum
}

export interface HistoryStateType {
  historyList: HistorySingleType[]
  runHistoryList: HistorySingleType[]
  currentStep: number
}
