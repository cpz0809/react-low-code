import './style/index.scss'
import Drawer from '@/components/board/drawer-menu/_components/drawer/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuVisible } from '@/store/modules/view.ts'
import { RootState } from '@/store'
import { getPrefixCls } from '@/util/global-config.ts'
import { arrayToTree } from '@/util/node.ts'
import TreeNode from '@/components/board/drawer-menu/outline-tree/TreeNode.tsx'
import { useRef } from 'react'

const OutlineTree = () => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('outline-tree')
  const { itemList } = useSelector((state: RootState) => state.dragSplice)
  const { outlineTreeVisible } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const treeBodyRef = useRef<HTMLDivElement>(null)

  const treeData = arrayToTree(itemList)

  return (
    <Drawer
      show={outlineTreeVisible}
      title="大纲树"
      onclose={() => dispatch(setMenuVisible('outlineTreeVisible'))}
    >
      <div className={`${prefix}`}>
        <div className={`${prefix}-body`} ref={treeBodyRef}>
          <TreeNode
            data={treeData[0]}
            maxDragVal={treeBodyRef.current?.getBoundingClientRect().top}
          />
        </div>
      </div>
    </Drawer>
  )
}

export default OutlineTree
