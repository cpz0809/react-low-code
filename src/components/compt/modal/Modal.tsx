import { Modal as AntModal, Button } from 'antd'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { useState } from 'react'
import DragTips from '@/components/compt/public/drag-tips/DragTips.tsx'
import DraggableView from '@/components/board/drop/DraggableView'

const Modal = ({ item }: { item: PaneItemType }) => {

  const containerDom = document.documentElement.querySelector(
    '.simulator-render-content'
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <DraggableView item={item} isRenderChildren={false}>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      </DraggableView>

      <AntModal
        {...item.attr}
        getContainer={containerDom as HTMLDivElement}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DraggableView item={item}>
          <div>
            <DragTips />
          </div>
        </DraggableView>
      </AntModal>
    </>
  )
}

export default Modal
