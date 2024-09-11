import './style/com-lib-pane.scss'
import { getPrefixCls } from '@/util/global-config.ts'
import { library } from './category/index.ts'
import PaneItem from './PaneItem.tsx'
import Drawer from '@/components/board/drawer-menu/_components/drawer/Drawer.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setMenuVisible } from '@/store/modules/view.ts'
import { Collapse as AntCollapse, Tabs } from 'antd'
import { GroupPaneType } from './Type.ts'

const ComLibPane = () => {
  const prefixCls = getPrefixCls('com-lib-pane')
  const dispatch = useDispatch()
  const { paneVisible } = useSelector((state: RootState) => state.viewSplice)

  const renderSelectedItem = (data: GroupPaneType[]) =>
    data.map((item, index) => ({
      key: index + 1,
      label: item.name,
      children: (
        <div className={`${prefixCls}-cards`}>
          {item.components.map((components) => {
            return <PaneItem key={components.name} data={components} />
          })}
        </div>
      )
    }))

  const renderCollapse = () =>
    library.map((item, index) => ({
      key: `${index + 1}`,
      label: item.name,
      children: (
        <div className={`${prefixCls}-collapse`}>
          <AntCollapse
            defaultActiveKey={library[0].data.map((_, index) => index + 1)}
            bordered={false}
            ghost={true}
            items={renderSelectedItem(item.data)}
            collapsible="icon"
            expandIconPosition="end"
          />
        </div>
      )
    }))

  return (
    <Drawer
      show={paneVisible}
      title="组件库"
      onclose={() => dispatch(setMenuVisible('paneVisible'))}
    >
      <div className={`${prefixCls}-tabs`}>
        <Tabs defaultActiveKey="1" items={renderCollapse()} />
      </div>
    </Drawer>
  )
}

export default ComLibPane
