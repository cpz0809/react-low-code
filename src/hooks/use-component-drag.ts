import { computedOffset } from '@/components/board/simulator/computedOffset'
import { filterFromDom, FilterFromDomRes } from '@/util/node'
import { RootState } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import {
  CurrentBaseAttr,
  CurrentDropDirection
} from '@/components/board/simulator/type'
import { OffsetProps } from '@/store/_types/drag'

const defaultBoardAttr: CurrentBaseAttr = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
}

const defaultAttr = {
  attr: {
    ...defaultBoardAttr,
    direction: CurrentDropDirection.RIGHT
  },
  original: null
}

export const useComponentDrag = () => {
  const { boardWidth } = useSelector((state: RootState) => state.viewSplice)

  const treeRoot = useRef<HTMLDivElement>(null)

  const [boardMargins, setBoardMargins] =
    useState<CurrentBaseAttr>(defaultBoardAttr)

  useEffect(() => {
    if (!treeRoot.current) return
    setBoardMargins((treeRoot.current as HTMLElement).getBoundingClientRect())
  }, [boardWidth, treeRoot])

  const getCurrentDom = (current: PaneItemType | null) => {
    if (current) {
      if (treeRoot.current?.childNodes) {
        return filterFromDom(current.uuid, treeRoot.current?.childNodes)
      } else {
        const dom = document.querySelector('.simulator-render-content')
        if (!dom) return null
        return filterFromDom(current.uuid, dom.childNodes)
      }
    }
    return null
  }

  const computedAttr = (
    current: PaneItemType,
    target: PaneItemType,
    offset: OffsetProps
  ) => {
    if (!current || !target) return defaultAttr

    const currentDom = getCurrentDom(current)
    const targetDom = getCurrentDom(target)

    // 组件放置
    if (!currentDom && targetDom) {
      // 如果放置时 放置的是循环元素
      if (Array.isArray(targetDom)) {
        return {
          attr: computedOffset(
            targetDom.map((item) => item.attr),
            boardMargins,
            offset
          ),
          original: target.attr
        }
      }
      // 非循环元素
      return {
        attr: computedOffset(targetDom.attr, boardMargins, offset),
        original: target.attr
      }
    }
    // 组件移动
    if (currentDom && targetDom) {
      // 如果两个都是循环渲染元素
      if (Array.isArray(targetDom) && Array.isArray(currentDom)) {
        return {
          attr: computedOffset(
            targetDom.map((item) => item.attr),
            boardMargins,
            offset
          ),
          original: currentDom.map((item) => item.attr)
        }
      }
      // 拖拽元素是循环渲染元素
      if (!Array.isArray(targetDom) && Array.isArray(currentDom)) {
        return {
          attr: computedOffset(targetDom.attr, boardMargins, offset),
          original: currentDom.map((item) => item.attr)
        }
      }
      // 放置元素是循环渲染元素
      if (Array.isArray(targetDom) && !Array.isArray(currentDom)) {
        return {
          attr: computedOffset(
            targetDom.map((item) => item.attr),
            boardMargins,
            offset
          ),
          original: (currentDom as FilterFromDomRes).attr
        }
      }
      // 都不是循环元素
      return {
        attr: computedOffset(
          (targetDom as FilterFromDomRes).attr,
          boardMargins,
          offset
        ),
        original: (currentDom as FilterFromDomRes).attr
      }
    }
    return defaultAttr
  }

  return {
    treeRoot,
    computedAttr,
    boardMargins,
    getCurrentDom
  }
}
