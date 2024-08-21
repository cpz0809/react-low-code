import { getPrefixCls } from '@/util/global-config.ts'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { arrayToTree } from '@/util/node.ts'
import { useDispatch } from 'react-redux'
import { setCurrentClick } from '@/store/modules/drag.ts'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { ActionsProps } from './type'
import './style/action.scss'

const Actions = ({ current, copy, remove, tree }: ActionsProps) => {
  const dispatch = useDispatch()
  const prefix = getPrefixCls('simulator')

  const treeToMenu = () => {
    const newTree = arrayToTree(tree)

    return newTree.map((item) => ({
      key: item.uuid,
      label: (
        <div
          className={`${prefix}-current-selector-item`}
          onClick={() => handleSelectParentEl(item)}
        >
          <img src={item.svg} alt={item.name} />
          <p>{item.name}</p>
        </div>
      )
    }))
  }

  const handleSelectParentEl = (component: PaneItemType) => {
    dispatch(setCurrentClick(component))
  }

  const items: MenuProps['items'] = treeToMenu()

  return (
    <div className={`${prefix}-current-actions`}>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        overlayClassName={`${prefix}-current-dropdown`}
      >
        <div className={`${prefix}-current-selector`}>
          <img src={current?.svg} alt={current?.name} />
          <p>{current?.name}</p>
        </div>
      </Dropdown>
      <div className={`${prefix}-current-action`} onClick={copy}>
        <CopyOutlined />
      </div>
      <div className={`${prefix}-current-action`} onClick={remove}>
        <DeleteOutlined />
      </div>
    </div>
  )
}

export default Actions
