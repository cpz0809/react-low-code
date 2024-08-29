import DraggableView from '@/components/board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { useEffect } from 'react'

const Text = ({ item }: { item: PaneItemType }) => {
  useEffect(() => {
    if (item.attr) {
      renderChildren()
    }
  }, [])

  const renderChildren = () => {
    const { children, isMark, isCode, isDel, isU, isStrong } = item.attr
    let component = <>{children}</>
    if (isMark) {
      component = <mark>{component}</mark>
    }
    if (isCode) {
      component = <code>{component}</code>
    }
    if (isDel) {
      component = <del>{component}</del>
    }
    if (isU) {
      component = <u>{component}</u>
    }
    if (isStrong) {
      component = <strong>{component}</strong>
    }
    return component
  }
  return (
    <DraggableView item={item}>
      <span>{renderChildren()}</span>
    </DraggableView>
  )
}

export default Text
