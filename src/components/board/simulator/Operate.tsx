/* eslint-disable react-hooks/exhaustive-deps */
import './style/operate.scss'
import { getPrefixCls } from '@/util/global-config'
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { CurrentBaseAttr, CurrentClickAttr, CurrentDrop } from './_type/type.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import Actions from '@/components/board/simulator/_component/actions/Actions.tsx'
import { useThrottleFn } from 'ahooks'
import { useComponentDrag } from '@/hooks/use-component-drag'
import { useBoardWidth } from '@/hooks/use-board-width'
import { generateParams } from '@/util/generate-params'
import { insert, remove, setCurrentClick } from '@/store/modules/drag'
import { mainCof } from '@/components/compt/main/config'
import { SelectEquipEnum } from '@/components/header/types'
import { PaneItemType, PaneItemTypes } from '../drawer-menu/com-lib-pane/Type'
import { useHistory } from '@/hooks/use-history'
import ContentMenu from './_component/context-menu/ContentMenu.tsx'

const Operate = forwardRef((_, ref) => {
  const prefix = getPrefixCls('simulator')
  const dispatch = useDispatch()
  const { boardMargins, computedAttr, getCurrentDom, treeRoot } =
    useComponentDrag()
  const { stateData } = useSelector((state: RootState) => state.contextSlice)
  const { revoke, restore } = useHistory()
  // 初始化画布
  const { initBoardConfig, findWidthByDevice } = useBoardWidth()
  const { run: findDropDomThrottleFn } = useThrottleFn(() => findDropDom(), {
    wait: 300
  })
  const { itemList, currentMove, currentClick, currentDrag } = useSelector(
    (state: RootState) => state.dragSplice
  )
  const {
    isComLibPaneLock,
    boardWidth,
    contextMenuVisible,
    contentMenuPosition
  } = useSelector((state: RootState) => state.viewSplice)
  const { currentStep } = useSelector((state: RootState) => state.historySlice)
  // 当前移动时选择的画布属性
  const [currentMoveAttr, setCurrentMoveAttr] = useState<
    CurrentBaseAttr | CurrentBaseAttr[] | null
  >(null)
  // 当前点击时选择的画布属性
  const [currentClickAttr, setCurrentClickAttr] = useState<
    CurrentClickAttr | CurrentClickAttr[] | null
  >(null)
  // 当前拖拽对象
  const [currentDrop, setCurrentDrop] = useState<CurrentDrop | null>(null)
  // 当前右键菜单位置
  const [currentContextMenu, setCurrentContextMenu] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  // 组件粘贴板
  const [pasteboard, setPasteboard] = useState<PaneItemType | null>(null)
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
    return () => observer && observer.disconnect()
  }, [currentClick, stateData])
  useEffect(() => findDropDomThrottleFn(), [currentDrag])
  useEffect(() => {
    setCurrentContextMenu({
      x: computedOffsetLeft(contentMenuPosition.x),
      y: contentMenuPosition.y - boardMargins.top
    })
  }, [contentMenuPosition])

  const findMoveDom = () => {
    const dom = getCurrentDom(currentMove)
    if (dom) {
      Array.isArray(dom)
        ? setCurrentMoveAttr(setBaseDefaultAttr(dom.map((item) => item.attr)))
        : setCurrentMoveAttr(setBaseDefaultAttr(dom.attr))
    }
  }

  const findClickDom = () => {
    if (!currentClick) {
      setCurrentClickAttr(null)
      return
    }
    const dom = getCurrentDom(currentClick)
    if (dom) {
      if (Array.isArray(dom)) {
        // 批量更新元素
        dom.forEach((item) => {
          observer = new ResizeObserver((entries) => {
            handleUpdateElement(entries)
          })
          observer.observe(item.node)
        })
        const handleUpdateElement = (entries: ResizeObserverEntry[]) => {
          if (!currentClickAttr || !Array.isArray(currentClickAttr)) return
          const temp = [...currentClickAttr]
          for (const entry of entries) {
            const componentId = entry.target.getAttribute('componentId')
            if (!componentId) continue
            const index = temp.findIndex((item) => item.node === entry.target)
            if (index === -1) continue
            temp[index] = {
              ...temp[index],
              ...setBaseDefaultAttr(entry.target.getBoundingClientRect())
            }
          }
          setCurrentClickAttr(temp)
        }
      } else {
        observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setCurrentClickAttr({
              ...setBaseDefaultAttr(entry.target.getBoundingClientRect()),
              isSelected: true,
              node: dom.node
            } as CurrentClickAttr)
          }
        })
        observer.observe(dom.node)
      }
    }
  }
  const findDropDom = () => {
    if (!currentDrag) {
      setCurrentDrop(null)
      return
    }
    const { current, target, offset } = currentDrag
    const { attr, original } = computedAttr(current, target, offset)
    if (original) {
      setCurrentDrop({
        target: { ...attr },
        original: setBaseDefaultAttr(original as DOMRect)
      })
    }
    // resetMoveAndClick()
  }

  // const resetMoveAndClick = () => {
  //   dispatch(setCurrentClick(null))
  //   dispatch(setCurrentMove(null))
  //   setCurrentMoveAttr(null)
  //   setCurrentClickAttr(null)
  // }

  // 设置基础属性
  const setBaseDefaultAttr = (attr: DOMRect | DOMRect[]) => {
    function attrComputed(rect: DOMRect) {
      return {
        width: rect.width,
        height: rect.height,
        top: boardMargins.width === 0 ? 0 : rect.y - boardMargins.top,
        left: boardMargins.width === 0 ? 0 : computedOffsetLeft(rect.x)
      }
    }

    return Array.isArray(attr)
      ? attr.map((item) => attrComputed(item))
      : attrComputed(attr)
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
      if (!pasteboard || !currentClick) return
      dispatch(
        insert({
          component: generateParams({
            ...pasteboard,
            parentUuid: currentClick.uuid
          }) as PaneItemType
        })
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

  // 元素循环时需要渲染多个组件
  const renderSimulator = <T,>(
    currentMove: T | T[],
    renderFn: (attr: T, key?: any) => ReactNode
  ) =>
    Array.isArray(currentMove)
      ? currentMove.map((item, index) => renderFn(item, index))
      : renderFn(currentMove)
  // 模拟器-滑动
  const renderMoveSingle = (attr: CurrentBaseAttr, key?: any) => (
    <div
      key={key}
      className={`${prefix}-current-move`}
      style={{
        width: attr.width,
        height: attr.height,
        transform: `translate(${attr.left}px, ${attr.top}px)`
      }}
    />
  )
  // 模拟器-点击
  const renderClickSingle = (attr: CurrentClickAttr, key?: any) => (
    <div
      key={key}
      className={`${prefix}-current-click`}
      style={{
        width: attr.width,
        height: attr.height,
        transform: `translate3d(${attr.left}px, ${attr.top}px,0px)`
      }}
    >
      <Actions
        tree={itemList}
        current={currentClick}
        remove={handleDelete}
        copy={handleCopy}
      />
    </div>
  )
  // 模拟器-拖拽
  const renderDropSingle = (attr: CurrentBaseAttr, key?: any) => (
    <div
      key={key}
      className={`${prefix}-current-drop`}
      style={{
        width: attr.width,
        height: attr.height,
        transform: `translate3d(${attr.left}px, ${attr.top}px,0px)`
      }}
    />
  )
  return (
    <div className={`${prefix}-operate`}>
      <div className={`${prefix}-tool`}>
        {/*  当前滑动选择元素  */}
        {currentMoveAttr && renderSimulator(currentMoveAttr, renderMoveSingle)}
        {/*  当前点击选择元素  */}
        {currentClickAttr &&
          renderSimulator(currentClickAttr, renderClickSingle)}
        {/*  当前拖拽位置指示器  */}
        {currentDrag && currentDrop?.target && (
          <div
            className={`${prefix}-current-drop-indicator`}
            style={{
              height: currentDrop?.target?.height,
              transform: `translate3d(${currentDrop?.target?.left}px, ${currentDrop?.target?.top}px,0px)`
            }}
          />
        )}
        {/*  拖拽原始位置  */}
        {currentDrag &&
          currentDrop?.original &&
          renderSimulator(currentDrop.original, renderDropSingle)}
        {/*  右键菜单  */}
        {contextMenuVisible &&
          currentContextMenu.x !== 0 &&
          currentContextMenu.y !== 0 && (
            <div
              className={`${prefix}-current-contextmenu`}
              style={{
                transform: `translate3d(${currentContextMenu.x}px, ${currentContextMenu.y}px,0px)`
              }}
            >
              <ContentMenu copy={handleCopy} remove={handleDelete} />
            </div>
          )}
      </div>
    </div>
  )
})

export default Operate
