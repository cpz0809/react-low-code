import { isObject } from '@/util/is.ts'
import { PaneItemType } from '@/components/board/_types/util.ts'

export const saveData = (
  oldData: PaneItemType[],
  newData: PaneItemType[],
  pageCode: string
): { remove: PaneItemType[]; update: PaneItemType[] } => {
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
): { remove: PaneItemType[]; update: PaneItemType[] } => {
  const update = newData.filter((x) => oldData.includes(x))

  // 找出不同的元素
  const remove = oldData
    .filter((x) => !newData.includes(x))
    .concat(newData.filter((x) => !oldData.includes(x)))

  return { remove, update }
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
