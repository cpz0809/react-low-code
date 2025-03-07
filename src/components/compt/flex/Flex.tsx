import DraggableView from '@/components/board/drop/DraggableView.tsx'
import { PaneItemType } from '@/components/board/_types/util.ts'
import { Flex as AntdFlex } from 'antd'
import DragTips from '@/components/compt/public/drag-tips/DragTips.tsx'

const Flex = ({ item }: { item: PaneItemType }) => {
  return (
    <DraggableView item={item}>
      <AntdFlex {...item.attr}>
        <DragTips />
      </AntdFlex>
    </DraggableView>
  )
}

export default Flex
