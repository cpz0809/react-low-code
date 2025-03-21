import './style/index.scss'
import Drawer from '@/components/board/drawer-menu/_components/drawer/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuVisible } from '@/store/modules/view.ts'
import { RootState } from '@/store'
import { getPrefixCls } from '@/util/global-config.ts'
import { arrayToTree } from '@/components/board/_util/node.ts'
import Tree from './Tree.tsx'
import { useRef, useState } from 'react'
import { PaneItemType } from '@/components/board/_types/util.ts'

const OutlineTree = () => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('outline-tree')
  const { itemList } = useSelector((state: RootState) => state.dragSplice)
  const { outlineTreeVisible } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const treeBodyRef = useRef<HTMLDivElement>(null)

  const treeData = arrayToTree(itemList)

  const [keys, setKeys] = useState<string[]>([])

  const handleCollapse = (item: PaneItemType) => {
    const index = keys.findIndex((key) => key === item.uuid)
    const temp = [...keys]
    if (index === -1) {
      temp.push(item.uuid)
    } else {
      temp.splice(index, 1)
    }
    setKeys(temp)
  }

  return (
    <Drawer
      show={outlineTreeVisible}
      title="大纲树"
      onclose={() => dispatch(setMenuVisible('outlineTreeVisible'))}
    >
      <div className={`${prefix}`}>
        <div className={`${prefix}-body`} ref={treeBodyRef}>
          <Tree data={treeData} onCollapse={handleCollapse} activeKeys={keys} />
        </div>
      </div>
    </Drawer>
  )
}

export default OutlineTree
