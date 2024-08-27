import { Drawer as AntDrawer } from 'antd'
import DraggableView from '../../board/drop/DraggableView'
import DragTips from '../public/drag-tips/DragTips'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'

const Drawer = ({ item }: { item: PaneItemType }) => {
  const containerDom = document.documentElement.querySelector(
    '.simulator-render-content'
  )
  return (
    <AntDrawer {...item.attr} getContainer={containerDom as HTMLDivElement}>
      <DraggableView item={item}>
        <div>
          <DragTips />
        </div>
      </DraggableView>
    </AntDrawer>
  )
}

export default Drawer
