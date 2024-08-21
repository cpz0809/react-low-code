import './index.scss'
import DraggableView from '@/components/board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const Title = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <p draggable="true">这是标题组件</p>
    </DraggableView>
  )
}

export default Title
