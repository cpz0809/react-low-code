import './index.scss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Sidebar from './sidebar/Sidebar.tsx'
import Simulator from './simulator/Simulator.tsx'
import { getPrefixCls } from '@/util/global-config.ts'
import EditStyleArea from './edit-style-area/EditStyleArea.tsx'
import DragLayerView from './drag-layer-view/DragLayerView.tsx'
import ComLibPane from '@/components/board/drawer-menu/com-lib-pane/ComLibPane.tsx'
import OutlineTree from '@/components/board/drawer-menu/outline-tree/OutlineTree.tsx'
import ApiManage from './drawer-menu/api-manage/ApiManage.tsx'

const Board = () => {
  const prefix = getPrefixCls('board')
  return (
    <div className={`${prefix}-container`}>
      <Sidebar />
      <DndProvider backend={HTML5Backend}>
        {/* 组件库 */}
        <ComLibPane />
        {/* 大纲 */}
        <OutlineTree />
        {/* 页面接口 */}
        <ApiManage />
        {/* 模拟器 */}
        <Simulator />
        {/* 拖动试图组件 */}
        <DragLayerView />
      </DndProvider>
      <EditStyleArea />
    </div>
  )
}

export default Board
