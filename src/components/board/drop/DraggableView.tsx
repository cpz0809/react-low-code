import { useDrag, useDrop } from 'react-dnd'
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
import { CurrentDragType } from '@/store/types/drag'
import ViewProvider from './ViewProvider'

const DraggableView = ({
  item,
  children,
  isRenderChildren = true
}: {
  item: PaneItemType
  children: React.FunctionComponentElement<{ componentid: string }>
  isRenderChildren?: boolean
}) => {
  const dispatch = useDispatch()
  const { record } = useHistory()
  const { itemList } = useSelector((state: RootState) => state.dragSplice)
  const ref = useRef(null)

  const changePaneItemObj = useRef<CurrentDragType | null>(null)

  const [, drag, dragPreview] = useDrag(() => ({
    type: item.type,
    item: {
      ...item,
      operate: HistoryEnum.EDIT
    },
    canDrag: () => {
      return item.type !== PaneItemTypes.Main
    },
    end: () => {
      dispatch(setCurrentDrag(null))
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const [, drop] = useDrop(() => ({
    accept: Object.keys(PaneItemTypes),
    drop: (data: PaneItemType) => {
      if (!data.uuid) return
      const obj = { ...data, parentUuid: item.uuid }
      placeComponent(obj)
      data.operate === HistoryEnum.ADD
        ? record(obj)
        : record(changePaneItemObj.current)
    },
    collect(monitor) {
      return {
        isOverCurrent: monitor.isOver({ shallow: true })
      }
    },
    hover(hoverItem, monitor) {
      const obj = {
        current: hoverItem,
        target: item,
        offset: monitor.getClientOffset() || undefined
      }
      changePaneItemObj.current = obj
      dispatch(setCurrentDrag(obj))
    }
  }))
  // 放置组件
  const placeComponent = (data: PaneItemType) => {
    // 新增组件
    if (data.operate === HistoryEnum.ADD) {
      dispatch(insert({ component: data }))
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
