import DraggableView from '../../board/drop/DraggableView'
import DragTips from '../public/drag-tips/DragTips'

const Box = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <div>
        <DragTips />
      </div>
    </DraggableView>
  )
}

export default Box
