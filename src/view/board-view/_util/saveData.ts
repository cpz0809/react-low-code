import { isObject } from '@/util/is.ts'
import { PaneItemType } from '@/components/board/_types/util.ts'

export const saveData = (
  oldData: PaneItemType[],
  newData: PaneItemType[],
  pageCode: string
): {
  remove: PaneItemType[]
  update: PaneItemType[]
} => {
  const data = diff(oldData, newData)
  const update: any = data.update.map((item: PaneItemType) => ({
    ...item,
    pageCode,
    style: JSON.stringify(item.style),
    attr: JSON.stringify(item.attr),
    loop: loopData(item.loop as any)
  }))

  return {
    update,
    remove: data.remove
  }
}

const diff = (
  oldData: PaneItemType[],
  newData: PaneItemType[]
): {
  remove: PaneItemType[]
  update: PaneItemType[]
} => {
  const oldSet = new Set(oldData)
  const newSet = new Set(newData)
  // 找出新增的元素
  const added = newData.filter((x) => !oldSet.has(x))
  // 找出删除的元素
  const remove = oldData.filter((x) => !newSet.has(x))
  // 找出两个数组中都存在的元素
  const update = newData.filter((x) => oldSet.has(x))
  return { remove, update: [...update, ...added] }
}

// 处理循环数据
const loopData = (loop: any[] | { source: string; code: string } | null) => {
  if (!loop) return null
  if (Array.isArray(loop)) return { type: 0, value: loop }
  if (isObject(loop))
    return {
      type: loop.source === 'variable' ? 1 : 2,
      value: loop.code
    }
  return null
}
