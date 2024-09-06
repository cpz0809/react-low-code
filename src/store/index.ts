import { configureStore } from '@reduxjs/toolkit'
import viewSplice from './modules/view.ts'
import dragSplice from './modules/drag.ts'
import historySlice from './modules/history.ts'
import contextSlice from './modules/context.ts'

export const store = configureStore({
  reducer: {
    viewSplice,
    dragSplice,
    historySlice,
    contextSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
