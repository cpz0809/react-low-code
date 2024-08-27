import DraggableView from '@/components/board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const Text = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <span>{item.attr.children}</span>
    </DraggableView>
  )
}

export default Text
