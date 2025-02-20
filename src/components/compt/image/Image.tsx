import { PaneItemType } from '@/components/_types/util.ts'
import DraggableView from '@/components/board/drop/DraggableView'

const Image = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <img {...item.attr} />
    </DraggableView>
  )
}

export default Image
