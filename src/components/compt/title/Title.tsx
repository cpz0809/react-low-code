import DraggableView from '@/components/board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { useEffect } from 'react'
import { TextNodeAttrType } from '@/components/settings/text/type'

const Title = ({ item }: { item: PaneItemType<TextNodeAttrType> }) => {
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
      <p draggable="true">{renderChildren()}</p>
    </DraggableView>
  )
}

export default Title
