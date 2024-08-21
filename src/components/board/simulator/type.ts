// 基础属性类型
export interface CurrentBaseAttr {
  width: number
  height: number
  top: number
  left: number
}

// 点击属性类型
export interface CurrentClickAttr extends CurrentBaseAttr {
  isSelected?: boolean
  node: HTMLElement
}

export enum CurrentDropDirection {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom'
}

// 拖拽属性类型
export interface CurrentDropAttr extends CurrentBaseAttr {
  direction: CurrentDropDirection
}

export interface CurrentDrop {
  target: CurrentDropAttr
  original: CurrentBaseAttr
}

export interface ActionsProps {
  tree: PaneItemType[]
  current: PaneItemType | null
  copy: (e: React.MouseEvent<HTMLElement>) => void
  remove: () => void
}
