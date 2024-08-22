import { CurrentBaseAttr, CurrentDropAttr, CurrentDropDirection } from './type'

export const computedOffset = (
  current: DOMRect,
  target: DOMRect,
  boardMargins: CurrentBaseAttr
): CurrentDropAttr => {
  const offsetObj = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    direction: CurrentDropDirection.RIGHT
  }

  const horizontal = () => {
    if (target.left < current.left) {
      // 左
      offsetObj.left = target.left - boardMargins.left
    } else {
      // 右
      offsetObj.left = target.left - boardMargins.left + target.width
    }
    offsetObj.width = current.width
    offsetObj.height = current.height
    offsetObj.top = target.top - boardMargins.top
  }

  const vertical = () => {
    offsetObj.top = target.top - boardMargins.top
    offsetObj.left = target.left - boardMargins.left
    offsetObj.width = target.width
    offsetObj.height = target.height
  }

  const free = () => {
    if (target.left + target.width / 2 > current.left) {
      // 左提示
      offsetObj.left = target.left - boardMargins.left
      offsetObj.direction = CurrentDropDirection.LEFT
    } else if (target.left + target.width / 2 < current.left) {
      // 右提示
      offsetObj.left = target.width / 2 + target.left - 5
      offsetObj.direction = CurrentDropDirection.RIGHT
    } else {
      // 画布提示
      offsetObj.left = target.left - boardMargins.left
      offsetObj.direction = CurrentDropDirection.RIGHT
    }
    offsetObj.top = target.top - boardMargins.top
    offsetObj.width = target.width
    offsetObj.height = target.height
  }

  // 水平移动
  if (current.left !== target.left && current.top === target.top) horizontal()
  // 垂直移动
  if (current.left === target.left && current.top !== target.top) vertical()
  // 自由移动
  if (current.left !== target.left && current.top !== target.top) free()
  // 保持原位
  // else if (current.x === target.x && current.y === target.y) stayInPlace()
  return offsetObj
}
