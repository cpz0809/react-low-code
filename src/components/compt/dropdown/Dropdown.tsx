import { PaneItemType } from '@/components/board/_types/util.ts'
import DraggableView from '@/components/board/drop/DraggableView'
import { Dropdown as AntdDropdown } from 'antd'
import DragTips from '@/components/compt/public/drag-tips/DragTips.tsx'
import { cloneElement, FunctionComponentElement } from 'react'
import ViewProvider from '@/components/board/drop/ViewProvider.tsx'

const Dropdown = ({ item }: { item: PaneItemType }) => {
  const handleRender = (
    children: FunctionComponentElement<{ componentid: string }>,
    props: any
  ) => {
    return cloneElement(children, {
      ...props,
      style: { display: 'inline-block' }
    })
  }
  return (
    <DraggableView item={item} onRender={handleRender}>
      <div>
        <AntdDropdown {...item.attr}>
          <div>
            {item.children.length > 0 ? (
              item.children.map((item: PaneItemType) => ViewProvider(item))
            ) : (
              <DragTips />
            )}
          </div>
        </AntdDropdown>
      </div>
    </DraggableView>
  )
}

export default Dropdown
