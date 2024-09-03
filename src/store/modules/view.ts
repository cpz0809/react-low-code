import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OptionDeviceProps, ViewStateType } from '../types/view'

const initialState: ViewStateType = {
  // 画布大小
  boardWidth: 0,
  // 组件库网格是否锁定
  isComLibPaneLock: false,
  // 组件库网格是否显示
  paneVisible: false,
  // 大纲树是否显示
  outlineTreeVisible: false,
  // 页面接口是否显示
  apiVisible: false,
  // 页面变量是否显示
  variableVisible: false,
  // 可选设备大小
  optionsDevice: [],
  // 变量绑定弹窗
  variableBindingVisible: false
}

const viewSplice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    // 设置画布大小
    setBoardWidth: (state, action: PayloadAction<number>) => {
      state.boardWidth = action.payload
    },
    // 设置网格是否锁定
    setComLibPaneLockStatus: (state) => {
      state.isComLibPaneLock = !state.isComLibPaneLock
    },
    // 设置网格是否显示
    setPaneVisible: (state) => {
      state.paneVisible = !state.paneVisible
    },
    // 设置大纲树是否显示
    setOutlineTreeVisible(state) {
      state.outlineTreeVisible = !state.outlineTreeVisible
    },
    // 设置页面接口是否显示
    setApiVisible(state) {
      state.apiVisible = !state.apiVisible
    },
    // 设置页面变量是否显示
    setVariableVisible(state) {
      state.variableVisible = !state.variableVisible
    },
    // 设置可选设备列表
    setOptionsDevice(state, action: PayloadAction<OptionDeviceProps[]>) {
      state.optionsDevice = action.payload
    },
    // 变量绑定弹窗
    setVariableBindingVisible(state) {
      state.variableBindingVisible = !state.variableBindingVisible
    }
  }
})

export const {
  setBoardWidth,
  setComLibPaneLockStatus,
  setPaneVisible,
  setOutlineTreeVisible,
  setApiVisible,
  setVariableVisible,
  setOptionsDevice,
  setVariableBindingVisible
} = viewSplice.actions
export default viewSplice.reducer
