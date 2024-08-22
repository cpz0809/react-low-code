import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeNode, swapNodes, updateNode } from '@/util/node.ts'
import { CSSProperties } from 'react'
import { PaneItemType } from '@/components/board/drawer-menu/com-lib-pane/Type.ts'
import { mainCof } from '@/components/compt/main/config.ts'
import { generateParams } from '@/util/generate-params.ts'
import {
  CurrentDragType,
  InsertProps,
  UpdateParams,
  ViewStateType
} from '../types/drag'
//
const initialState: ViewStateType = {
  // 存放组件列表
  itemList: [],
  // 当前移动选中组件
  currentMove: null,
  // 当前点击选择选中
  currentClick: null,
  // 当前拖动
  currentDrag: null
}

export const dragSplice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
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
    // 插入组件
    insert(state, action: PayloadAction<InsertProps>) {
      const { index, component } = action.payload
      if (typeof index === 'number' && index !== undefined) {
        state.itemList.splice(index, 0, component)
      } else {
        state.itemList.push(component)
      }
    },
    // 更新组件
    update(state, action: PayloadAction<CurrentDragType>) {
      const { current, target } = action.payload
      swapNodes(state.itemList, current, target)
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
        (item: PaneItemType) => (item[key] = params)
      )
    },
    // 更新当前点击组件样式
    updateCurrentClickStyle(state, action: PayloadAction<CSSProperties>) {
      if (state.currentClick) {
        state.currentClick.style = action.payload
      }
    },
    updateCurrentClickAttr(state, action: PayloadAction<CSSProperties>) {
      if (state.currentClick) {
        state.currentClick.attr = action.payload
      }
    },
    // 清除画布
    clearDiagCom(state) {
      state.itemList = []
      state.itemList.push(generateParams(mainCof))
    }
  }
})
export const {
  setCurrentMove,
  setCurrentClick,
  setCurrentDrag,
  insert,
  update,
  remove,
  updateParams,
  updateCurrentClickStyle,
  updateCurrentClickAttr,
  clearDiagCom
} = dragSplice.actions
export default dragSplice.reducer
