import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OptionDeviceProps, ViewStateType } from '../types/view'

const initialState: ViewStateType = {
  // 画布大小
  boardWidth: 0,
  // 组件库网格是否锁定
  isComLibPaneLock: false,
  // 组件库网格是否显示
  paneVisible: false,
  // 大纲树
  outlineTreeVisible: false,
  // 可选设备大小
  optionsDevice: []
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
    // 设置可选设备列表
    setOptionsDevice(state, action: PayloadAction<OptionDeviceProps[]>) {
      state.optionsDevice = action.payload
    }
  }
})

export const {
  setBoardWidth,
  setComLibPaneLockStatus,
  setPaneVisible,
  setOutlineTreeVisible,
  setOptionsDevice
} = viewSplice.actions
export default viewSplice.reducer
