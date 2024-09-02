import { PaneItemType } from '../drawer-menu/com-lib-pane/Type'

export interface DraggableViewProps {
  item: PaneItemType
  children: React.FunctionComponentElement<{ componentid: string }>
  // 自定义放置
  place?: (target: PaneItemType) => any
}
