import { Fragment } from 'react'
import { BaseDraggableViewProvider } from './DraggableViewProvider.tsx'
import { PaneItemType } from '@/components/_types/util.ts'
import { isArray } from '@/util/is.ts'

const ViewProvider = (item: PaneItemType) => {
  const renderChildren = () => item.loop?.value.map((data: any) => render(data))

  const render = (uuid: string) =>
    !item.hidden && (
      <Fragment key={uuid}>{BaseDraggableViewProvider.of(item)}</Fragment>
    )

  return isArray(item.loop?.value) ? renderChildren() : render(item.uuid)
}
export default ViewProvider
