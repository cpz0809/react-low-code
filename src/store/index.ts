import { configureStore } from '@reduxjs/toolkit'
import viewSplice from './modules/view.ts'
import dragSplice from './modules/drag.ts'
import historySlice from './modules/history.ts'
import stateSplice from './modules/state.ts'
import apiSlice from './modules/api.ts'
export const store = configureStore({
  reducer: {
    viewSplice,
    dragSplice,
    historySlice,
    stateSplice,
    apiSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
