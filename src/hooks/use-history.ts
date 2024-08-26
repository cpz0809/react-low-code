import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  addHistory,
  forwardCurrentStep,
  retreatCurrentStep
} from '@/store/modules/history.ts'
import {
  insert,
  remove,
  setCurrentClick,
  updatePosition
} from '@/store/modules/drag.ts'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { CurrentDragType } from '@/store/types/drag'
import {
  HistoryEnum,
  HistoryOperateTypeEnum,
  HistorySingleType
} from '@/store/types/history'

export const useHistory = () => {
  const dispatch = useDispatch()

  const { historyList, currentStep } = useSelector(
    (state: RootState) => state.historySlice
  )
  const { itemList } = useSelector((state: RootState) => state.dragSplice)

  function record(data: PaneItemType): void
  function record(data: CurrentDragType | null): void
  /**
   * 收集历史记录
   * @param data 放置组件
   */
  function record(data: PaneItemType | CurrentDragType | null) {
    if (!data) return
    // 记录移动位置
    if (typeof data === 'object' && 'current' in data && 'target' in data) {
      history(
        HistoryEnum.EDIT,
        HistoryOperateTypeEnum.MOVE,
        data.target,
        data.current
      )
    } else if (data.operate === HistoryEnum.ADD) {
      // 新增组件
      history(HistoryEnum.ADD, HistoryOperateTypeEnum.COMPONENT, data, data)
    }
  }

  const history = (
    type: HistoryEnum,
    OperateType: HistoryOperateTypeEnum,
    oldComponent: PaneItemType,
    newComponent: PaneItemType
  ) => {
    dispatch(
      addHistory({
        type,
        OperateType,
        oldComponent,
        newComponent
      })
    )
  }
  // 撤销
  const revoke = () => {
    const current = historyList[currentStep]
    // 如果是新增
    if (!current) return
    if (isComponent(current)) {
      // 撤销为删除组件
      dispatch(remove(current.newComponent.uuid))
      dispatch(setCurrentClick(null))
    } else if (isMove(current)) {
      // 撤销移动组件
      dispatch(
        updatePosition({
          current: current.newComponent,
          target: current.oldComponent
        })
      )
    }
    if (currentStep === -1) return
    dispatch(retreatCurrentStep())
  }
  // 恢复
  const restore = () => {
    if (currentStep === itemList.length) return
    const current = historyList[currentStep + 1]
    if (!current) return
    if (isComponent(current)) {
      // 恢复为添加组件
      if (current.newComponent.parentUuid) {
        dispatch(insert({ component: current.newComponent }))
        dispatch(setCurrentClick(null))
      }
    } else if (isMove(current)) {
      dispatch(
        updatePosition({
          current: current.oldComponent,
          target: current.newComponent
        })
      )
    }
    dispatch(forwardCurrentStep())
  }

  /**
   * 是否新增
   * @param data
   */
  const isComponent = (data: HistorySingleType): boolean => {
    return (
      data.type === HistoryEnum.ADD &&
      data.OperateType === HistoryOperateTypeEnum.COMPONENT
    )
  }
  /**
   * 是否移动
   * @param data
   */
  const isMove = (data: HistorySingleType): boolean => {
    return (
      data.type === HistoryEnum.EDIT &&
      data.OperateType === HistoryOperateTypeEnum.MOVE
    )
  }

  return {
    record,
    revoke,
    restore
  }
}
