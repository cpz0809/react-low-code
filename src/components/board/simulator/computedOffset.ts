import { OffsetProps } from '@/store/_types/drag'
import { CurrentBaseAttr, CurrentDropAttr, CurrentDropDirection } from './type'

export const computedOffset = (
  target: DOMRect,
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

  if (target.left + target.width / 2 > left) {
    // 左提示
    offsetObj.left = target.left - boardMargins.left
    offsetObj.direction = CurrentDropDirection.LEFT
  } else if (target.left + target.width / 2 < left) {
    // 右提示
    offsetObj.left = target.left - boardMargins.left + target.width
    offsetObj.direction = CurrentDropDirection.RIGHT
  } else {
    // 画布提示
    offsetObj.left = target.left - boardMargins.left
    offsetObj.direction = CurrentDropDirection.RIGHT
  }
  offsetObj.top = target.top - boardMargins.top
  offsetObj.width = target.width
  offsetObj.height = target.height
  return offsetObj
}
