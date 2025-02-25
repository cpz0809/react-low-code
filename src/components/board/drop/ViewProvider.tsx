import { Fragment } from 'react'
import { BaseDraggableViewProvider } from './DraggableViewProvider.tsx'
import { PaneItemType } from '@/components/_types/util.ts'
import { isObject } from '@/util/is.ts'

const ViewProvider = (item: PaneItemType) => {
  const provider = (uuid: string) =>
    item.hidden === 1 && (
      <Fragment key={uuid}>{BaseDraggableViewProvider.of(item)}</Fragment>
    )

  const render = () => {
    // 如果为空
    if (!item.loop) return provider(item.uuid)
    // array 绑定的静态数据
    if (Array.isArray(item.loop))
      return item.loop.map((data: any) => provider(data.uuid))
    // 绑定的数据是从服务器获取 并且value是数组类型
    if (isObject(item.loop) && Array.isArray(item.loop.value))
      return item.loop.value.map((data: any) => provider(data.uuid))
    // 如果都不是
    return provider(item.uuid)
  }

  return render()
}
export default ViewProvider
