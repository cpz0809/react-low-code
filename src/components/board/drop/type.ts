import { PaneItemType } from '../drawer-menu/com-lib-pane/Type'

export interface DraggableViewProps {
  item: PaneItemType
  children: React.FunctionComponentElement<{ componentid: string }>
  isRenderChildren?: boolean
}
