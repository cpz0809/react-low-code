/**
 * 节点相关操作
 */
import React from 'react'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'

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

// 按uuid 查找对应节点
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

// 插入节点
export const insertNode = (
  target: PaneItemType,
  parentId: string | null,
  arr: PaneItemType[]
) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].uuid === parentId) {
      arr[i].children.push(target)
      return
    }
    if (arr[i].children.length > 0) {
      insertNode(target, parentId, arr[i].children)
    }
  }
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
// 更新样式
export const updateNodeStyle = (
  uuid: string,
  style: React.CSSProperties,
  arr: PaneItemType[]
) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].uuid === uuid) {
      arr[i].style = style
      return
    }
    if (arr[i].children.length > 0) {
      updateNodeStyle(uuid, style, arr[i].children)
    }
  }
}

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
// 交换节点
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
  // const oldParent = findNode(oldNode.parentUuid, tree)
  // const newParent = findNode(newNode.parentUuid, tree)
  // if (!oldParent && !newParent) return
  // const oldIndex = oldParent?.children.findIndex(
  //   (item) => item.uuid === oldNode.uuid
  // ) as number
  // const newIndex = newParent?.children.findIndex(
  //   (item) => item.uuid === newNode.uuid
  // ) as number
  // if (oldIndex === -1 || newIndex === -1) return
  // // 相同节点 直接交换位置
  // if (oldParent?.uuid === newParent?.uuid) {
  //   sameNode(oldIndex, newIndex, tree)
  // } else {
  //   differentNode()
  // }

  // 相同父节点交换位置
  function sameNode(oldIndex: number, newIndex: number, arr: PaneItemType[]) {
    const temp = arr[oldIndex]
    arr[oldIndex] = arr[newIndex]
    arr[newIndex] = temp
    // for (let i = 0; i < arr.length; i++) {
    //   const node = arr[i]
    //   if (node.uuid === oldParent?.uuid && node.uuid === newParent?.uuid) {
    //     const children = node.children
    //     const temp = children[oldIndex]
    //     children[oldIndex] = children[newIndex]
    //     children[newIndex] = temp
    //     break
    //   }
    //   if (node.children.length > 0) {
    //     sameNode(oldIndex, newIndex, node.children)
    //   }
    // }
  }

  // 不同父节点
  function differentNode() {}
}
// 查找节点
export const findNode = (uuid: string, arr: PaneItemType[]) => {
  for (let i = 0; i < arr.length; i++) {
    const node = arr[i]
    if (uuid === node.uuid) return node
    if (node.children.length > 0) {
      const res = findNode(uuid, node.children) as PaneItemType
      if (res) return res
    }
  }
  return null
}

export const arrayToTree = (array: PaneItemType[]): PaneItemType[] => {
  const tree: PaneItemType[] = []
  const map: any = {}
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
