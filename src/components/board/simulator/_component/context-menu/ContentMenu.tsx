import { getPrefixCls } from '@/util/global-config.ts'
import { Menu } from 'antd'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { CategoryEnum, PaneItemType } from '@/components/board/_types/util.ts'
import { insert, setCurrentClick, setPasteboard } from '@/store/modules/drag.ts'
import { generateParams } from '@/components/board/_util/generate-params.ts'
import { ChildrenMenuItem, ContextMenuProps } from './type'
import { setContextMenuVisible } from '@/store/modules/view.ts'
import { useState } from 'react'

const ContextMenu = ({ copy, remove }: ContextMenuProps) => {
  const prefixCls = getPrefixCls('simulator')
  const dispatch = useDispatch()
  const { currentClick, pasteboard, itemList } = useSelector(
    (state: RootState) => state.dragSplice
  )

  const [children, setChildren] = useState<ChildrenMenuItem[]>([])

  const items = [
    {
      key: 'sub1',
      label: '选择组件',
      children
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

  const handleOpenChange = () => {
    if (!currentClick) return
    setChildren(findAssociation(itemList, currentClick))
  }

  /**
   * 根据key查找关联对象
   * @param array 数据
   * @param refer 参照值
   */
  const findAssociation = (
    array: PaneItemType[],
    refer: PaneItemType
  ): ChildrenMenuItem[] => {
    const visited = new Set<string>()
    const result: PaneItemType[] = []

    // 构建快速查找结构
    const uuidMap = new Map(array.map((item) => [item.uuid, item]))
    const parentChildMap = array.reduce((map, item) => {
      if (item.parentUuid) {
        map.set(item.parentUuid, [...(map.get(item.parentUuid) || []), item])
      }
      return map
    }, new Map<string, PaneItemType[]>())

    // 有效性检查
    const current = uuidMap.get(refer.uuid)
    if (!current) return []

    // 向上遍历父链
    const traverseUp = (node: PaneItemType | null | undefined) => {
      if (!node || visited.has(node.uuid)) return
      visited.add(node.uuid)
      result.push(node)
      traverseUp(node.parentUuid ? uuidMap.get(node.parentUuid) : null)
    }

    // 向下遍历子链
    const traverseDown = (node: PaneItemType) => {
      if (visited.has(node.uuid)) return
      visited.add(node.uuid)
      result.push(node)
      parentChildMap.get(node.uuid)?.forEach((child) => traverseDown(child))
    }

    // 执行遍历（排除自身）
    traverseUp(current.parentUuid ? uuidMap.get(current.parentUuid) : null) // 父链
    traverseDown(current) // 子链

    // 排除自身转换成可以渲染的格式
    return result
      .filter((item) => item.uuid !== current.uuid)
      .map((item) => ({
        label: item.name,
        key: item.uuid,
        onClick: handleChildrenMenuClick
      }))
  }

  const handleChildrenMenuClick = (e: any) => {
    const item = itemList.find((item) => item.uuid === e.key)
    if (!item) return
    dispatch(setCurrentClick(item))
  }

  return (
    <Menu
      rootClassName={`${prefixCls}-menu`}
      mode="vertical"
      items={items}
      onClick={() => dispatch(setContextMenuVisible(false))}
      onOpenChange={handleOpenChange}
    />
  )
}
export default ContextMenu
