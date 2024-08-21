import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddStateType, StateType } from '../types/state'

const initialState: StateType = {}

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addState(state, action: PayloadAction<AddStateType>) {
      const { key, value } = action.payload
      state[key] = value
    }
  }
})

export const { addState } = stateSlice.actions
export default stateSlice.reducer
