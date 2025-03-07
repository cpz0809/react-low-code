import { PaneItemType } from '@/components/board/_types/util.ts'
import DraggableView from '../../board/drop/DraggableView'
import DragTips from '../public/drag-tips/DragTips'

const Box = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <DragTips />
    </DraggableView>
  )
}

export default Box
