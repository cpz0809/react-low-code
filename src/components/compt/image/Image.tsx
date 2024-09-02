import ImageDefault from '@/assets/svg/image-default.svg'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import DraggableView from '@/components/board/drop/DraggableView'

const Image = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <img src={ImageDefault} />
    </DraggableView>
  )
}

export default Image
