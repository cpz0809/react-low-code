import './style/operate.scss'
import { getPrefixCls } from '@/util/global-config'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { CurrentBaseAttr, CurrentClickAttr, CurrentDrop } from './type'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import Actions from '@/components/board/simulator/Actions'
import { useThrottleFn } from 'ahooks'
import { useComponentDrag } from '@/hooks/use-component-drag'
import { useBoardWidth } from '@/hooks/use-board-width'
import { generateParams } from '@/util/generate-params'
import {
  insert,
  remove,
  setCurrentClick,
  setCurrentMove
} from '@/store/modules/drag'
import { mainCof } from '@/components/compt/main/config'
import { SelectEquipEnum } from '@/components/header/types'
import { PaneItemType, PaneItemTypes } from '../drawer-menu/com-lib-pane/Type'
import { useHistory } from '@/hooks/use-history'

const Operate = forwardRef((_props, ref) => {
  const prefix = getPrefixCls('simulator')
  const dispatch = useDispatch()
  const { boardMargins, computedAttr, getCurrentDom, treeRoot } =
    useComponentDrag()
  const { revoke, restore } = useHistory()
  // 初始化画布
  const { initBoardConfig, findWidthByDevice } = useBoardWidth()
  const { run: findDropDomThrottleFn } = useThrottleFn(() => findDropDom(), {
    wait: 300
  })
  const { itemList, currentMove, currentClick, currentDrag } = useSelector(
    (state: RootState) => state.dragSplice
  )
  const { isComLibPaneLock, boardWidth } = useSelector(
    (state: RootState) => state.viewSplice
  )
  const { currentStep } = useSelector((state: RootState) => state.historySlice)
  // 当前移动时选择的画布属性
  const [currentMoveAttr, setCurrentMoveAttr] =
    useState<CurrentBaseAttr | null>(null)
  // 当前点击时选择的画布属性
  const [currentClickAttr, setCurrentClickAttr] =
    useState<CurrentClickAttr | null>(null)
  // 当前拖拽对象
  const [currentDrop, setCurrentDrop] = useState<CurrentDrop | null>(null)
  // 画布初始化
  useEffect(() => {
    // 添加最外层Main组件
    dispatch(insert({ component: generateParams(mainCof) }))
    // 初始化设置画布大小
    initBoardConfig()
  }, [])
  let observer: ResizeObserver
  // 处理画布移动选中和点击选中模拟器
  useEffect(() => findMoveDom(), [currentMove])
  useEffect(() => {
    findClickDom()
    return () => {
      if (observer) observer.disconnect()
    }
  }, [currentClick])
  useEffect(() => findDropDomThrottleFn(), [currentDrag])

  const findMoveDom = () => {
    const dom = getCurrentDom(currentMove)
    if (dom) {
      setCurrentMoveAttr(setBaseDefaultAttr(dom.attr))
    }
  }

  const findClickDom = () => {
    const dom = getCurrentDom(currentClick)
    if (dom) {
      observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setCurrentClickAttr({
            ...setBaseDefaultAttr(entry.target.getBoundingClientRect()),
            isSelected: true,
            node: dom.node
          })
        }
      })
      observer.observe(dom.node)
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
  const resetMoveAndClick = () => {
    dispatch(setCurrentClick(null))
    dispatch(setCurrentMove(null))
    setCurrentMoveAttr(null)
    setCurrentClickAttr(null)
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

  // 组件粘贴板
  const [pasteboard, setPasteboard] = useState<PaneItemType | null>(null)

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

  useEffect(() => {
    if (!currentMove) {
      setCurrentMoveAttr(null)
    }
  }, [currentMove])

  useImperativeHandle(ref, () => ({
    treeRoot
  }))

  return (
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
  )
})

export default Operate
