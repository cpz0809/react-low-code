import { getPrefixCls } from '@/util/global-config.ts'
import { Menu } from 'antd'
import './indes.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  CategoryEnum,
  PaneItemType
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { insert, setPasteboard } from '@/store/modules/drag.ts'
import { generateParams } from '@/util/generate-params.ts'
import { ContextMenuProps } from '@/components/board/simulator/_component/context-menu/type.ts'
import { setContextMenuVisible } from '@/store/modules/view.ts'

const ContextMenu = ({ copy, remove }: ContextMenuProps) => {
  const prefixCls = getPrefixCls('simulator')
  const dispatch = useDispatch()
  const { currentClick, pasteboard } = useSelector(
    (state: RootState) => state.dragSplice
  )
  const items = [
    {
      key: 'sub1',
      label: '选择组件',
      children: []
    },
    {
      key: 'key1',
      label: '复制',
      onClick: (e: any) => {
        copy(e.domEvent)
      }
    },
    {
      key: 'key2',
      label: '拷贝',
      onClick: () => {
        if (!currentClick) return
        dispatch(setPasteboard(currentClick))
      }
    },
    {
      key: 'key4',
      label: '粘贴至内部',
      disabled:
        !pasteboard || currentClick?.categoryType === CategoryEnum.default,
      onClick: () => {
        if (!pasteboard || !currentClick) return
        dispatch(
          insert({
            component: generateParams({
              ...pasteboard,
              parentUuid: currentClick.uuid
            }) as PaneItemType
          })
        )
      }
    },
    {
      key: 'key5',
      label: '删除',
      onClick: () => {
        remove()
      }
    }
  ]

  return (
    <Menu
      rootClassName={`${prefixCls}-menu`}
      mode="vertical"
      items={items}
      onClick={() => dispatch(setContextMenuVisible(false))}
    />
  )
}
export default ContextMenu
