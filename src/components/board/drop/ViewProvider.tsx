import { Fragment } from 'react'
import { BaseDraggableViewProvider } from './DraggableViewProvider.tsx'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { isArray } from '@/util/is.ts'

const ViewProvider = (item: PaneItemType) => {
  const renderChildren = () => item.loop.map((data: any) => render(data))

  const render = (uuid: string) =>
    !item.hidden && (
      <Fragment key={uuid}>{BaseDraggableViewProvider.of(item)}</Fragment>
    )

  return isArray(item.loop) ? renderChildren() : render(item.uuid)
}
export default ViewProvider
