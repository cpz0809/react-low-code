/**
 * 节点相关操作
 */
import React from 'react'
import {
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

/**
 * 根据当前e.target 找到对应节点上的uuid
 * @param e
 * @param arr
 */
export const getEventTargetDomUuid = (
  e: React.MouseEvent<HTMLElement>,
  arr: PaneItemType[]
): PaneItemType | null => {
  const filterFromComponents = (
    uuid: string,
    items: PaneItemType[]
  ): null | PaneItemType => {
    if (items.length === 0) return null
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.uuid === uuid) return item
      const foundInChildren: null | PaneItemType = filterFromComponents(
        uuid,
        item.children
      )
      if (foundInChildren !== null) {
        return foundInChildren
      }
    }
    return null
  }
  const targetNodeUuid = (e.target as HTMLElement).getAttribute('componentid')

  if (targetNodeUuid) {
    const findComponent = filterFromComponents(targetNodeUuid, arr)
    if (findComponent) return findComponent
  }

  const currentTargetNodeUuid = (e.currentTarget as HTMLElement).getAttribute(
    'componentid'
  )
  if (currentTargetNodeUuid) {
    const findComponent = filterFromComponents(currentTargetNodeUuid, arr)
    if (findComponent) return findComponent
  }

  return null
}

interface FilterFromDomRes {
  attr: DOMRect
  node: HTMLElement
}

/**
 * 按uuid 查找对应节点
 * @param uuid id
 * @param nodes 节点树
 * @returns 节点
 */
export const filterFromDom = (
  uuid: string,
  nodes: NodeListOf<ChildNode>
): FilterFromDomRes | null => {
  if (!nodes || nodes.length === 0) return null
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i] as HTMLElement
    // 如果是文本节点就跳过
    if (node.nodeType !== Node.ELEMENT_NODE) continue
    if (uuid === node.getAttribute('componentid')) {
      return {
        attr: node.getBoundingClientRect(),
        node
      }
    } else {
      const res = filterFromDom(uuid, node.childNodes)
      if (res) return res
    }
  }
  return null
}

// 删除节点
export const removeNode = (uuid: string, arr: PaneItemType[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].uuid === uuid) {
      arr.splice(i, 1)
      return
    }
    if (arr[i].children.length > 0) {
      removeNode(uuid, arr[i].children)
    }
  }
}

/**
 * 更新组件数据
 * @param uuid 组件id
 * @param arr 数据
 * @param callback 需要执行的函数
 * @returns
 */
export const updateNode = (
  uuid: string,
  arr: PaneItemType[],
  callback: (item: PaneItemType) => void
) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].uuid === uuid) {
      callback(arr[i])
      return
    }
    if (arr[i].children.length > 0) {
      updateNode(uuid, arr[i].children, callback)
    }
  }
}

/**
 * 交换节点位置
 * @param tree 树
 * @param oldNode 旧节点
 * @param newNode 新节点
 * @returns
 */
export const swapNodes = (
  tree: PaneItemType[],
  oldNode: PaneItemType,
  newNode: PaneItemType
) => {
  if (!oldNode.parentUuid || !newNode.parentUuid) return
  const oldIndex = tree.findIndex((item) => item.uuid === oldNode.uuid)
  const newIndex = tree.findIndex((item) => item.uuid === newNode.uuid)
  if (oldIndex === -1 || newIndex === -1) return
  // 同一个父节点 直接交换位置 并且交换index
  if (oldNode.parentUuid === newNode.parentUuid) {
    sameNode(oldIndex, newIndex, tree)
  } else {
    differentNode()
  }

  // 相同父节点交换位置
  function sameNode(oldIndex: number, newIndex: number, arr: PaneItemType[]) {
    const temp = arr[oldIndex]
    arr[oldIndex] = arr[newIndex]
    arr[newIndex] = temp
  }

  // 不同父节点
  function differentNode() {}
}

/**
 * 将组件数据转为树结构
 * @param array 组件数据
 * @returns 组件树
 */
export const arrayToTree = (array: PaneItemType[]): PaneItemType[] => {
  const tree: PaneItemType[] = []
  const map: any = {}

  const rootNode = array.find((item) => item.type === PaneItemTypes.Main)

  if (!rootNode) return []

  map[rootNode.uuid] = { ...rootNode, children: [] }

  array.forEach((item) => {
    if (!map[item.uuid]) {
      map[item.uuid] = { ...item, children: [] }
    }
    const node = map[item.uuid]
    if (!item.parentUuid) {
      tree.push(node)
    } else {
      if (!map[item.parentUuid]) {
        map[item.parentUuid] = { uuid: item.parentUuid, children: [] }
      }
      map[item.parentUuid].children.push(node)
    }
  })

  return tree
}
