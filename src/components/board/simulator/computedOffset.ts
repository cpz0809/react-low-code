import { OffsetProps } from '@/store/_types/drag'
import { CurrentBaseAttr, CurrentDropAttr, CurrentDropDirection } from './type'

export const computedOffset = (
  target: DOMRect | DOMRect[],
  boardMargins: CurrentBaseAttr,
  offset: OffsetProps
): CurrentDropAttr => {
  const offsetObj = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    direction: CurrentDropDirection.RIGHT
  }
  const { left } = offset

  const rewriteAttr = {
    left: Array.isArray(target) ? target[0].left : target.left,
    top: Array.isArray(target) ? target[0].top : target.top,
    width: Array.isArray(target)
      ? target.reduce((prev, cur) => cur.width + prev, 0)
      : target.width,
    height: Array.isArray(target) ? target[0].height : target.height
  }

  if (rewriteAttr.left + rewriteAttr.width / 2 > left) {
    // 左提示
    offsetObj.left = rewriteAttr.left - boardMargins.left
    offsetObj.direction = CurrentDropDirection.LEFT
  } else if (rewriteAttr.left + rewriteAttr.width / 2 < left) {
    // 右提示
    offsetObj.left = rewriteAttr.left - boardMargins.left + rewriteAttr.width
    offsetObj.direction = CurrentDropDirection.RIGHT
  } else {
    // 画布提示
    offsetObj.left = rewriteAttr.left - boardMargins.left
    offsetObj.direction = CurrentDropDirection.RIGHT
  }
  offsetObj.top = rewriteAttr.top - boardMargins.top
  offsetObj.width = rewriteAttr.width
  offsetObj.height = rewriteAttr.height
  return offsetObj
}
