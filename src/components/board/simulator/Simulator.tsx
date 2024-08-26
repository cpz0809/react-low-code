import { getPrefixCls } from '@/util/global-config.ts'
import './style/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import React, { useCallback, useEffect, useState } from 'react'
import {
  insert,
  remove,
  setCurrentClick,
  setCurrentMove
} from '@/store/modules/drag.ts'
import { generateParams } from '@/util/generate-params.ts'
import { mainCof } from '@/components/compt/main/config.ts'
import { arrayToTree } from '@/util/node.ts'
import { useHistory } from '@/hooks/use-history.ts'
import { SelectEquipEnum } from '@/components/header/types.ts'
import { useBoardWidth } from '@/hooks/use-board-width.ts'
import Actions from '@/components/board/simulator/Actions'
import {
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { useThrottleFn } from 'ahooks'
import { CurrentBaseAttr, CurrentClickAttr, CurrentDrop } from './type'
import ViewProvider from '../drop/ViewProvider'
import { useComponentDrag } from '@/hooks/use-component-drag'

const Simulator = () => {
  const prefix = getPrefixCls('simulator')
  const dispatch = useDispatch()
  const { isComLibPaneLock, boardWidth } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const { itemList, currentMove, currentClick, currentDrag } = useSelector(
    (state: RootState) => state.dragSplice
  )
  const { currentStep } = useSelector((state: RootState) => state.historySlice)
  const { restore, revoke } = useHistory()
  // const simulatorContentRef = useRef<HTMLDivElement>(null)
  const {
    boardMargins,
    computedAttr,
    treeRoot: simulatorContentRef,
    getCurrentDom
  } = useComponentDrag()
  // 模拟器渲染节点

  // 画布内容边距
  // const [boardMargins, setBoardMargins] = useState<CurrentBaseAttr>({
  //   width: 0,
  //   height: 0,
  //   left: 0,
  //   top: 0
  // })
  // 当前移动时选择的画布属性
  const [currentMoveAttr, setCurrentMoveAttr] =
    useState<CurrentBaseAttr | null>(null)
  // 当前点击时选择的画布属性
  const [currentClickAttr, setCurrentClickAttr] =
    useState<CurrentClickAttr | null>(null)
  // 当前拖拽对象
  const [currentDrop, setCurrentDrop] = useState<CurrentDrop | null>(null)
  // 组件粘贴板
  const [pasteboard, setPasteboard] = useState<PaneItemType | null>(null)
  // 初始化画布
  const { initBoardConfig, findWidthByDevice } = useBoardWidth()
  const { run: findDropDomThrottleFn } = useThrottleFn(() => findDropDom(), {
    wait: 300
  })

  // 画布初始化
  useEffect(() => {
    // 添加最外层Main组件
    dispatch(insert({ component: generateParams(mainCof) }))
    // 初始化设置画布大小
    initBoardConfig()
  }, [])

  // useEffect(() => {
  //   setBoardMargins(
  //     (simulatorContentRef.current as HTMLElement).getBoundingClientRect()
  //   )
  // }, [boardWidth])
  // 添加键盘事件
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardEvent)
    return () => window.removeEventListener('keydown', handleKeyboardEvent)
  }, [currentClick, currentClickAttr, pasteboard, currentStep])

  // 处理键盘事件
  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (currentClick && currentClickAttr) {
      if (e.key === 'Delete') handleDelete()
      if (e.key === 'Escape') {
        setCurrentClickAttr(null)
        dispatch(setCurrentClick(null))
      }
    }
    if (e.key === 'z' && e.ctrlKey) revoke()
    else if (e.key === 'y' && e.ctrlKey) restore()
    else if (e.key === 'c' && e.ctrlKey) setPasteboard(currentClick)
    else if (e.key === 'v' && e.ctrlKey) {
      if (!pasteboard) return
      dispatch(
        insert({ component: generateParams(pasteboard) as PaneItemType })
      )
    }
  }
  // 处理画布移动选中和点击选中模拟器
  useEffect(() => findMoveDom(), [currentMove?.uuid])
  useEffect(() => findClickDom(), [currentClick?.uuid, currentClick?.style])
  useEffect(
    () => findDropDomThrottleFn(),
    [currentDrag?.current?.uuid, currentDrag?.target?.uuid, currentDrag?.offset]
  )

  const findMoveDom = () => {
    const dom = getCurrentDom(currentMove)
    if (dom) {
      setCurrentMoveAttr(setBaseDefaultAttr(dom.attr))
    }
  }
  const findClickDom = () => {
    const dom = getCurrentDom(currentClick)
    if (dom) {
      setCurrentClickAttr({
        ...setBaseDefaultAttr(dom.attr),
        isSelected: true,
        node: dom.node
      })
    }
  }
  const findDropDom = () => {
    if (!currentDrag) {
      setCurrentDrop(null)
      return
    }
    const { current, target, offset } = currentDrag
    const { attr, original } = computedAttr(current, target, offset)

    setCurrentDrop({
      target: { ...attr },
      original: setBaseDefaultAttr(original)
    })
    resetMoveAndClick()
  }
  // 设置基础属性
  const setBaseDefaultAttr = (attr: DOMRect) => {
    return {
      width: attr.width,
      height: attr.height,
      top: boardMargins.width === 0 ? 0 : attr.y - boardMargins.top,
      left: boardMargins.width === 0 ? 0 : computedOffsetLeft(attr.x)
    }
  }
  const resetMoveAndClick = () => {
    dispatch(setCurrentClick(null))
    dispatch(setCurrentMove(null))
    setCurrentMoveAttr(null)
    setCurrentClickAttr(null)
  }
  // 计算偏移量
  const computedOffsetLeft = (x: number) => {
    if (boardWidth === findWidthByDevice(SelectEquipEnum.MOBILE)) return 0
    const oldX = x - boardMargins.left
    return isComLibPaneLock ? 0 : oldX
  }

  // 复制元素
  const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
    if (!currentClick) return
    if (currentClick.type !== PaneItemTypes.Main) {
      const item = generateParams(currentClick) as PaneItemType
      dispatch(insert({ component: item }))
      dispatch(setCurrentClick(null))
    }
    setCurrentClickAttr(null)
    e.stopPropagation()
  }
  // 删除元素
  const handleDelete = () => {
    if (!currentClick) return
    if (currentClick.type !== PaneItemTypes.Main) {
      dispatch(remove(currentClick.uuid))
      dispatch(setCurrentClick(null))
    }
    setCurrentClickAttr(null)
  }

  // 鼠标离开渲染区域
  const handleRenderContentMouseOut = () => {
    dispatch(setCurrentMove(null))
    setCurrentMoveAttr(null)
  }

  // 渲染子节点
  const renderItem = useCallback((data: PaneItemType) => ViewProvider(data), [])
  return (
    <div className={`${prefix}-container`}>
      <div className={`${prefix}-content`} style={{ width: boardWidth }}>
        {/*  模拟器  */}
        <div className={`${prefix}-operate`}>
          <div className={`${prefix}-tool`}>
            {/*  当前滑动选择元素  */}
            {currentMoveAttr && (
              <div
                className={`${prefix}-current-move`}
                style={{
                  width: currentMoveAttr.width,
                  height: currentMoveAttr.height,
                  transform: `translate(${currentMoveAttr.left}px, ${currentMoveAttr.top}px)`
                }}
              ></div>
            )}
            {/*  当前点击选择元素  */}
            {currentClickAttr && (
              <div
                className={`${prefix}-current-click`}
                style={{
                  width: currentClickAttr.width,
                  height: currentClickAttr.height,
                  transform: `translate3d(${currentClickAttr.left}px, ${currentClickAttr.top}px,0px)`
                }}
              >
                <Actions
                  tree={itemList}
                  current={currentClick}
                  remove={handleDelete}
                  copy={handleCopy}
                />
              </div>
            )}
            {/*  当前拖拽位置指示器  */}
            {currentDrag && currentDrop?.target && (
              <div
                className={`${prefix}-current-drop-indicator`}
                style={{
                  height: currentDrop?.target?.height,
                  transform: `translate3d(${currentDrop?.target?.left}px, ${currentDrop?.target?.top}px,0px)`
                }}
              ></div>
            )}
            {/*  拖拽原始位置  */}
            {currentDrag && currentDrop?.original && (
              <div
                className={`${prefix}-current-drop`}
                style={{
                  width: currentDrop?.original?.width,
                  height: currentDrop?.original?.height,
                  transform: `translate3d(${currentDrop?.original?.left}px, ${currentDrop?.original?.top}px,0px)`
                }}
              ></div>
            )}
          </div>
        </div>
        {/*  渲染节点  */}
        <div className={`${prefix}-render-wrapper`}>
          <div
            className={`${prefix}-render-content`}
            ref={simulatorContentRef}
            onMouseOut={handleRenderContentMouseOut}
          >
            {arrayToTree(itemList).map((item) => renderItem(item))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulator
