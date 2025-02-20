import { getPrefixCls } from '@/util/global-config.ts'
import DraggableView from '@/components/board/drop/DraggableView'
import { PaneItemType } from '@/components/_types/util.ts'

const Main = ({ item }: { item: PaneItemType }) => {
  const prefix = getPrefixCls('main')
  return (
    <DraggableView item={item}>
      <div className={`${prefix}-container`}></div>
    </DraggableView>
  )
}
export default Main
