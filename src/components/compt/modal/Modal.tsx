import { Modal as AntModal } from 'antd'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import DragTips from '@/components/compt/public/drag-tips/DragTips.tsx'
import DraggableView from '@/components/board/drop/DraggableView'

const Modal = ({ item }: { item: PaneItemType }) => {
  const containerDom = document.documentElement.querySelector(
    '.simulator-render-content'
  )

  return (
    <AntModal {...item.attr} getContainer={containerDom as HTMLDivElement}>
      <DraggableView item={item}>
        <div>
          <DragTips />
        </div>
      </DraggableView>
    </AntModal>
  )
}

export default Modal
