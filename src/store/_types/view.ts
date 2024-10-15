import { SelectEquipEnum } from '@/components/header/types.ts'

export interface OptionDeviceProps {
  width: number
  device: SelectEquipEnum
}

export interface ViewStateType {
  boardWidth: number
  isComLibPaneLock: boolean
  paneVisible: boolean
  outlineTreeVisible: boolean
  apiVisible: boolean
  variableVisible: boolean
  programVisible: boolean
  contextMenuVisible: boolean
  contentMenuPosition: { x: number; y: number }
  optionsDevice: OptionDeviceProps[]
}

export type VisibleKeys =
  | 'paneVisible'
  | 'outlineTreeVisible'
  | 'apiVisible'
  | 'variableVisible'
  | 'programVisible'
