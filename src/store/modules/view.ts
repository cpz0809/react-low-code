import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OptionDeviceProps, ViewStateType, VisibleKeys } from '../_types/view'

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
  // 源码是否显示
  programVisible: false,
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
    setMenuVisible(state, action: PayloadAction<VisibleKeys | null>) {
      const visibilityStates = {
        paneVisible: state.paneVisible,
        outlineTreeVisible: state.outlineTreeVisible,
        apiVisible: state.apiVisible,
        variableVisible: state.variableVisible,
        programVisible: state.programVisible
      }
      if (action.payload) {
        state[action.payload] = !state[action.payload]
        delete visibilityStates[action.payload]
      }
      for (const key in visibilityStates) {
        ;(state as any)[key] = false
      }
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
  setOptionsDevice,
  setMenuVisible
} = viewSplice.actions
export default viewSplice.reducer
