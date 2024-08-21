import { getPrefixCls } from '@/util/global-config.ts'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import './style/tree-node.scss'
import TreeNodeTitle from '@/components/board/drawer-menu/outline-tree/TreeNodeTitle.tsx'

interface TreeNodeProps {
  data: PaneItemType
  maxDragVal: number | undefined
}

const TreeNode = ({ data, maxDragVal }: TreeNodeProps) => {
  const prefix = getPrefixCls('tree-node')

  const TreeNodeBranches = (children: PaneItemType[]) => (
    <div className={`${prefix}-node-branches`}>
      <div className={`${prefix}-node-children`}>
        {children.map((item) => TreeNode({ data: item, maxDragVal }))}
      </div>
    </div>
  )

  return (
    <div key={data?.uuid} className={`${prefix}`}>
      <TreeNodeTitle data={data} />
      {data.children.length > 0 && TreeNodeBranches(data.children)}
    </div>
  )
}
export default TreeNode
