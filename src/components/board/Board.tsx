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

const Board = () => {
  const prefix = getPrefixCls('board')
  return (
    <div className={`${prefix}-container`}>
      <Sidebar />
      <DndProvider backend={HTML5Backend}>
        <ComLibPane />
        <OutlineTree />
        <Simulator />
        <DragLayerView />
      </DndProvider>
      <EditStyleArea />
    </div>
  )
}

export default Board
