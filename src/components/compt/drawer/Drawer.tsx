import { Button, Drawer as AntDrawer } from 'antd'
import { useState } from 'react'
import DraggableView from '../../board/drop/DraggableView'
import DragTips from '../public/drag-tips/DragTips'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'

const Drawer = ({ item }: { item: PaneItemType }) => {
  const containerDom = document.documentElement.querySelector(
    '.drop-simulator-content'
  )

  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <DraggableView item={item} isRenderChildren={false}>
        <Button type="primary" onClick={showDrawer}>
          Open Modal
        </Button>
      </DraggableView>

      <AntDrawer
        {...item.attr}
        onClose={onClose}
        open={open}
        getContainer={containerDom as HTMLDivElement}
      >
        <DraggableView item={item}>
          <div>
            <DragTips />
          </div>
        </DraggableView>
      </AntDrawer>
    </>
  )
}

export default Drawer
