import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HistorySingleType, HistoryStateType } from '../_types/history'

const initialState: HistoryStateType = {
  // 记录列表
  historyList: [],
  // 已执行列表
  runHistoryList: [],
  // 当前执行位置
  currentStep: -1
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // 添加历史记录
    addHistory(state, action: PayloadAction<HistorySingleType>) {
      state.historyList.push(action.payload)
      state.currentStep = state.historyList.length - 1
    },
    // 已撤销记录
    addRunHistory(state, action: PayloadAction<HistorySingleType>) {
      state.runHistoryList.push(action.payload)
    },
    // 撤销
    retreatCurrentStep(state) {
      state.currentStep--
    },
    // 恢复
    forwardCurrentStep(state) {
      state.currentStep++
    }
  }
})

export const { addHistory, forwardCurrentStep, retreatCurrentStep } =
  historySlice.actions

export default historySlice.reducer
