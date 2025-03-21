import { useDragLayer } from 'react-dnd'
import { getPrefixCls } from '@/util/global-config.ts'
import './index.scss'
import { XYCoord } from 'react-dnd'
import { PaneItemType } from '@/components/board/_types/util.ts'

interface DragLayerType {
  isDragging: boolean
  currentOffset: XYCoord | null
  capturedItem: PaneItemType
}

const DragLayerView = () => {
  const prefixCls = getPrefixCls('drag-layer-view')
  const { isDragging, currentOffset, capturedItem }: DragLayerType =
    useDragLayer((monitor) => ({
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getClientOffset(),
      capturedItem: monitor.getItem()
    }))
  const left = currentOffset ? currentOffset.x - 20 : 0
  const top = currentOffset ? currentOffset.y - 64 + 8 : 0

  return (
    isDragging && (
      <div className={`${prefixCls}-container`} style={{ left, top }}>
        <img src={capturedItem.svg} alt={capturedItem.name} />
        <p>{capturedItem.name}</p>
      </div>
    )
  )
}

export default DragLayerView
