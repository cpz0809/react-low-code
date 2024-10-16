import { TabsProps } from 'antd'
import { Tabs as AntTabs } from 'antd'
import DraggableView from '../../board/drop/DraggableView'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import DragTips from '@/components/compt/public/drag-tips/DragTips.tsx'
import { useDispatch } from 'react-redux'
import {
  insert,
  setCurrentClick,
  updateCurrentClick,
  updateParams
} from '@/store/modules/drag'
import { TabsAttrType } from '@/components/settings/tabs/type.ts'
import { cloneElement, FunctionComponentElement, useEffect } from 'react'
import ViewProvider from '@/components/board/drop/ViewProvider.tsx'

const Tabs = ({ item }: { item: PaneItemType<TabsAttrType> }) => {
  const dispatch = useDispatch()
  const { labels, activeKey, type, size, items } = item.attr

  useEffect(() => {
    changeParams({ items: labels.map(() => []) })
  }, [labels.length])

  const handlePlace = (data: PaneItemType) => {
    const arr = structuredClone(items)
    arr[Number(activeKey)].push(data)
    dispatch(insert({ component: data }))
    changeParams({ items: arr })
  }

  const handleRender = (
    children: FunctionComponentElement<{ componentid: string }>,
    props: any
  ) => {
    return cloneElement(children, props)
  }

  const renderItems = () =>
    labels.map((tag, index: number) => ({
      children: renderChildren(index),
      label: tag.name,
      key: `${index}`
    }))

  const renderChildren = (key: number) => {
    const arr = items[key]
    if (!arr || arr.length === 0) return <DragTips />
    return arr.map((item) => ViewProvider(item))
  }

  const tabsItems: TabsProps['items'] = renderItems()

  const changeParams = (params: Partial<TabsAttrType>) => {
    const temp = {
      ...item.attr,
      ...params
    }
    dispatch(
      updateParams({
        uuid: item.uuid,
        key: 'attr',
        params: temp
      })
    )
    dispatch(
      updateCurrentClick({
        key: 'attr',
        params: temp
      })
    )
  }

  const onChange = (activeKey: string) => {
    changeParams({ activeKey })
    dispatch(setCurrentClick(null))
  }

  return (
    <DraggableView item={item} onPlace={handlePlace} onRender={handleRender}>
      <div>
        <AntTabs
          items={tabsItems}
          activeKey={activeKey}
          onChange={onChange}
          type={type}
          size={size}
        />
      </div>
    </DraggableView>
  )
}

export default Tabs
