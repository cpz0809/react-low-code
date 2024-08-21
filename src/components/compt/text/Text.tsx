import DraggableView from '@/components/board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const Text = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <span>这是正文组件</span>
    </DraggableView>
  )
}

export default Text
