import { TabsProps } from 'antd'
import { Tabs as AntTabs } from 'antd'
import DraggableView from '../../board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import DragTips from '@/components/compt/public/drag-tips/DragTips.tsx'
import { useDispatch } from 'react-redux'
import { updateParams } from '@/store/modules/drag'
import { TabsAttrType } from '@/components/settings/tabs/type'

const Tabs = ({ item }: { item: PaneItemType<TabsAttrType> }) => {
  const dispatch = useDispatch()
  const { children, activeKey } = item.attr

  const handlePlace = (data: PaneItemType) => {
    const temp = { ...data }
    temp.attr = { ...temp.attr, activeKey }
    return temp
  }

  const renderItems = () =>
    children.map((tag, index: number) => ({
      children: <DragTips />,
      label: tag.label,
      key: `${index}`
    }))

  const items: TabsProps['items'] = renderItems()

  const onChange = (activeKey: string) => {
    dispatch(
      updateParams({
        uuid: item.uuid,
        key: 'attr',
        params: {
          ...item.attr,
          activeKey
        }
      })
    )
  }

  return (
    <DraggableView item={item} place={handlePlace}>
      <div>
        <AntTabs items={items} activeKey={activeKey} onChange={onChange} />
      </div>
    </DraggableView>
  )
}

export default Tabs
