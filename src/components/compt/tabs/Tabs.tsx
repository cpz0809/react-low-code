import { TabsProps } from 'antd'
import { Tabs as AntTabs } from 'antd'
import DraggableView from '../../board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'

const Tabs = ({ item }: { item: PaneItemType }) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1'
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3'
    }
  ]

  return (
    <DraggableView item={item}>
      <AntTabs items={items} />
    </DraggableView>
  )
}

export default Tabs
