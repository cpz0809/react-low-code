import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import DraggableView from '@/components/board/drop/DraggableView'
import { ButtonAttrType } from '@/components/settings/button/type'
import { Button as AntButton } from 'antd'

const Button = ({ item }: { item: PaneItemType<ButtonAttrType> }) => {
  return (
    <DraggableView item={item}>
      <AntButton {...item.attr}>{item.attr.children}</AntButton>
    </DraggableView>
  )
}

export default Button
