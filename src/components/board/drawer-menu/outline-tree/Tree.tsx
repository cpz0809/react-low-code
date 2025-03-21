import { getPrefixCls } from '@/util/global-config.ts'
import { PaneItemType } from '@/components/board/_types/util.ts'
import './style/tree-node.scss'
import TreeNodeTitle from './TreeNodeTitle.tsx'
import { DownOutlined, RightOutlined } from '@ant-design/icons'

interface TreeNodeProps {
  data: PaneItemType[]
  onCollapse?: (item: PaneItemType) => void
  activeKeys?: string[]
}

const Tree = ({ data, onCollapse, activeKeys = [] }: TreeNodeProps) => {
  const prefix = getPrefixCls('tree-node')

  const isActive = (uuid: string) => activeKeys.includes(uuid)

  const TreeNodeBranches = (children: PaneItemType[], item: PaneItemType) => (
    <div
      className={`${prefix}-branches ${isActive(item.uuid) ? `${prefix}-branches-active` : ''}`}
    >
      <div className={`${prefix}-children`}>
        {children.map((item) => ChildNode(item))}
      </div>
    </div>
  )

  const ChildNode = (item: PaneItemType) => (
    <div
      className={`${prefix} ${isActive(item.uuid) ? `${prefix}-expand` : ''}`}
      key={item.uuid}
    >
      <div className={`${prefix}-header`}>
        {/*  折叠  */}
        {TreeExpand(item)}
        <TreeNodeTitle data={item} />
      </div>

      {item.children.length > 0 && TreeNodeBranches(item.children, item)}
    </div>
  )

  const TreeExpand = (item: PaneItemType) =>
    item.children.length > 0 ? (
      <div
        className={`${prefix}-expand-btn`}
        onClick={() => onCollapse?.(item)}
      >
        {isActive(item.uuid) ? <DownOutlined /> : <RightOutlined />}
      </div>
    ) : (
      <i className={`${prefix}-expand-placeholder`} />
    )

  return data.map((item: PaneItemType) => ChildNode(item))
}
export default Tree
