import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import React, { cloneElement, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  insert,
  setCurrentClick,
  setCurrentDrag,
  setCurrentMove,
  update
} from '@/store/modules/drag.ts'
import { RootState } from '@/store'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { getEventTargetDomUuid } from '@/util/node.ts'
import {
  CategoryEnum,
  PaneItemType,
  PaneItemTypes
} from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { useHistory } from '@/hooks/use-history.ts'
import { HistoryEnum } from '@/store/types/history'
import { CurrentDragType, OffsetProps } from '@/store/types/drag'
import ViewProvider from './ViewProvider'
import { useComponentDrag } from '@/hooks/use-component-drag'
import { DraggableViewProps } from './type'
import { CurrentDropDirection } from '../simulator/type'
import { isDomBlock } from '@/util/is'

const DraggableView = ({
  item,
  children,
  isRenderChildren = true
}: DraggableViewProps) => {
  const dispatch = useDispatch()
  const { record } = useHistory()
  const { computedAttr, getCurrentDom } = useComponentDrag()
  const { itemList } = useSelector((state: RootState) => state.dragSplice)
  const ref = useRef(null)
  const changePaneItemObj = useRef<CurrentDragType | null>(null)
  const [, drag, dragPreview] = useDrag(() => ({
    type: item.type,
    item: {
      ...item,
      operate: HistoryEnum.EDIT
    },
    canDrag: () => item.type !== PaneItemTypes.Main,
    end: () => {
      dispatch(setCurrentDrag(null))
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const [, drop] = useDrop(() => ({
    accept: Object.keys(PaneItemTypes),
    drop: (data: PaneItemType, monitor) => {
      if (!data.uuid) return
      const obj = { ...data, parentUuid: item.uuid }
      placeComponent(obj, monitor)
      // 如果是新增就记录新增状态 反之记录移动位置状态
      data.operate === HistoryEnum.ADD
        ? record(obj)
        : record(changePaneItemObj.current)
    },
    collect(monitor) {
      return {
        isOverCurrent: monitor.isOver({ shallow: true }),
        offset: monitor.getClientOffset()
      }
    },
    hover(hoverItem, monitor) {
      const obj = {
        current: hoverItem,
        target: item,
        offset: getOffset(monitor)
      }
      changePaneItemObj.current = obj
      dispatch(setCurrentDrag({ ...obj }))
    }
  }))
  // 放置组件
  const placeComponent = (
    data: PaneItemType,
    monitor: DropTargetMonitor<PaneItemType, unknown>
  ) => {
    // 新增组件
    if (data.operate === HistoryEnum.ADD) {
      const didDrop = monitor.didDrop()
      // 是否放置在嵌套组件上
      if (didDrop) return
      // 如果是容器组件
      if (item.type === PaneItemTypes.Main) {
        dispatch(insert({ component: data }))
      } else {
        // 如果是普通元素
        // 使用鼠标指针触摸的组件parentUuid
        data.parentUuid = item.parentUuid
        // 获取追加到之前还是之后
        const { attr } = computedAttr(data, item, getOffset(monitor))
        const index = itemList.findIndex(
          (component) => component.uuid === item.uuid
        )
        // 追加到之前
        if (attr.direction === CurrentDropDirection.LEFT) {
          dispatch(insert({ component: data, index }))
        } else if (attr.direction === CurrentDropDirection.RIGHT) {
          // 追加到之后 需要判断当前元素后面还有没有元素
          const currentRoLastEl = itemList[index]
          if (currentRoLastEl) {
            // 如果还有元素 判断是不是块级元素
            const element = getCurrentDom(currentRoLastEl)
            if (!element) return
            // 判断是不是块级元素
            if (isDomBlock(element.node)) {
              dispatch(insert({ component: data }))
            } else {
              // 不是块级元素 直接追加到当前行 当前元素后
              dispatch(insert({ component: data, index: index + 1 }))
            }
          } else {
            // 没有元素直接添加
            dispatch(insert({ component: data }))
          }
        }
      }
    } else if (data.operate === HistoryEnum.EDIT) {
      // 修改组件位置
      changePaneItemPosition()
    }
  }
  // 交换组件位置
  const changePaneItemPosition = () => {
    if (!changePaneItemObj.current) return
    const { current, target } = changePaneItemObj.current
    if (!current || !target) return
    if (current.uuid === target.uuid) return
    dispatch(
      update({
        current,
        target,
        offset: null
      })
    )
    dispatch(setCurrentDrag(null))
  }
  const getOffset = (
    monitor: DropTargetMonitor<PaneItemType, unknown>
  ): OffsetProps => {
    const obj = { x: 0, y: 0 }
    const { x: left, y: top } = monitor.getClientOffset() || obj
    return { left, top }
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if ('onMouseMove' in children.props) {
      ;(children.props as any).onMouseMove(e)
    }
    dispatch(setCurrentMove(getEventTargetDomUuid(e, itemList)))
  }
  const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    if ('onMouseOut' in children.props) {
      ;(children.props as any).onMouseOut(e)
    }
    dispatch(setCurrentMove(null))
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if ('onClick' in children.props) {
      ;(children.props as any).onClick(e)
    }
    dispatch(setCurrentClick(getEventTargetDomUuid(e, itemList)))
    e.stopPropagation()
  }

  drag(drop(ref))
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const render = () => {
    const props = {
      componentid: item.uuid,
      ref,
      onMouseMove: handleMouseMove,
      onMouseOut: handleMouseOut,
      onClick: handleClick,
      ...item.attr
    }
    if (isRenderChildren && item.categoryType === CategoryEnum.container)
      return cloneElement(
        children,
        { ...props, style: { ...item.style } },
        ...item.children.map((com) => ViewProvider(com))
      )
    return cloneElement(children, props)
  }

  return render()
}

export default DraggableView
