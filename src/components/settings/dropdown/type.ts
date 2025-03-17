import { MenuProps } from 'antd'

export interface DropdownAttrType {
  arrow: boolean
  disabled: boolean
  placement:
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'top'
    | ' topLeft'
    | ' topRight'
  trigger: 'click' | 'hover' | 'contextMenu'[]
  menu: MenuProps
}

export enum DropdownAttrEnum {
  ARROW = 'arrow',
  DISABLED = 'disabled',
  DROPDOWNRENDERED = 'dropdownRender',
  PLACEMENT = 'placement',
  TRIGGER = 'trigger',
  MENU = 'menu'
}
