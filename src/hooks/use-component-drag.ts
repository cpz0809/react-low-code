import { computedOffset } from '@/components/board/simulator/computedOffset'
import { filterFromDom } from '@/util/node'
import { RootState } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type'
import {
  CurrentBaseAttr,
  CurrentDropDirection
} from '@/components/board/simulator/type'
import { OffsetProps } from '@/store/types/drag'

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
    const dom = document.querySelector('.simulator-render-content')
    setBoardMargins((dom as HTMLElement).getBoundingClientRect())
  }, [boardWidth, treeRoot])

  const getCurrentDom = (current: PaneItemType | null) => {
    const dom = document.querySelector('.simulator-render-content')
    if (current && dom?.childNodes) {
      return filterFromDom(current.uuid, dom?.childNodes)
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

    if (!currentDom && targetDom) {
      return {
        attr: computedOffset(targetDom.attr, boardMargins, offset),
        original: target.attr
      }
    }

    if (currentDom && targetDom) {
      return {
        attr: computedOffset(targetDom.attr, boardMargins, offset),
        original: currentDom.attr
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
