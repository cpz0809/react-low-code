import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeNode, swapNodes, updateNode } from '@/util/node.ts'
import { PaneItemType } from '@/components/_types/util.ts'
import { generateParams } from '@/util/generate-params.ts'
import {
  CurrentDragType,
  InsertProps,
  UpdateCurrentClickParams,
  UpdateParams,
  UpdatePositionProps,
  ViewStateType
} from '../_types/drag'
import { MainConfig } from '@/config/library/component'
//
const initialState: ViewStateType = {
  // 存放组件列表
  itemList: [],
  // 当前移动选中组件
  currentMove: null,
  // 当前点击选择选中
  currentClick: null,
  // 当前拖动
  currentDrag: null,
  // 粘贴板
  pasteboard: null
}

export const dragSplice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    // 设置组件列表
    setItemList(state, action: PayloadAction<PaneItemType[]>) {
      state.itemList = action.payload
    },
    // 设置移动组件
    setCurrentMove(state, action: PayloadAction<null | PaneItemType>) {
      state.currentMove = action.payload
    },
    // 设置点击组件
    setCurrentClick(state, action: PayloadAction<null | PaneItemType>) {
      state.currentClick = action.payload
    },
    // 设置拖动组件
    setCurrentDrag(state, action: PayloadAction<null | CurrentDragType>) {
      if (action.payload) {
        const { current, target, offset } = action.payload
        if (current && target) {
          state.currentDrag = {
            current,
            target,
            offset
          }
        }
      } else {
        state.currentDrag = null
      }
    },
    setPasteboard(state, action: PayloadAction<null | PaneItemType>) {
      state.pasteboard = action.payload
    },
    // 插入组件
    insert(state, action: PayloadAction<InsertProps>) {
      const { index, component } = action.payload
      if (typeof index === 'number') {
        state.itemList.splice(index, 0, component)
      } else {
        state.itemList.push(component)
      }
    },
    // 更新组件位置
    updatePosition(state, action: PayloadAction<UpdatePositionProps>) {
      const { current, target, direction } = action.payload
      swapNodes(state.itemList, current, target, direction)
    },
    // 删除组件
    remove(state, action: PayloadAction<string>) {
      removeNode(action.payload, state.itemList)
    },
    // 更新组件参数
    updateParams(state, action: PayloadAction<UpdateParams>) {
      const { uuid, key, params } = action.payload
      updateNode(
        uuid,
        state.itemList,
        (item: PaneItemType) => ((item[key] as any) = params)
      )
    },
    updateCurrentClick(state, action: PayloadAction<UpdateCurrentClickParams>) {
      if (state.currentClick) {
        const { key, params } = action.payload
        state.currentClick[key] = params as never
      }
    },
    // 清除画布
    clearDiagCom(state) {
      state.itemList = []
      state.itemList.push(generateParams(MainConfig))
    }
  }
})
export const {
  setCurrentMove,
  setCurrentClick,
  setCurrentDrag,
  setPasteboard,
  insert,
  updatePosition,
  remove,
  updateParams,
  updateCurrentClick,
  clearDiagCom,
  setItemList
} = dragSplice.actions
export default dragSplice.reducer
