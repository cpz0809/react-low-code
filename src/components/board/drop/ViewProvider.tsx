import { Fragment } from 'react'
import { BaseDraggableViewProvider } from './DraggableViewProvider.tsx'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

const ViewProvider = (item: PaneItemType) => {

  return (
    !item.hidden && (
      <Fragment key={item.uuid}>{BaseDraggableViewProvider.of(item)}</Fragment>
    )
  )
}
export default ViewProvider
