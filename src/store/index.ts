import { configureStore } from '@reduxjs/toolkit'
import viewSplice from './modules/view.ts'
import dragSplice from './modules/drag.ts'
import historySlice from './modules/history.ts'
import StateSplice from './modules/state.ts'

export const store = configureStore({
  reducer: {
    viewSplice,
    dragSplice,
    historySlice,
    StateSplice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
