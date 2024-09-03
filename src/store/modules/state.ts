import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditStateProps, StateSingleProps, StateType } from '../types/state'
import { v4 as uuid } from 'uuid'

const initialState: StateType = {
  stateData: []
}

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addOrEditState(state, action: PayloadAction<StateSingleProps>) {
      const data = action.payload
      if (!data.code) {
        state.stateData.push({ ...data, code: uuid() })
      } else {
        const index = state.stateData.findIndex(
          (item) => item.code === action.payload.code
        )
        if (index === -1) return
        state.stateData[index] = data
      }
    },
    deleteState(state, action: PayloadAction<string | null>) {
      const index = state.stateData.findIndex(
        (item) => item.code === action.payload
      )
      if (index !== -1) {
        state.stateData.splice(index, 1)
      }
    }
  }
})

export const { addOrEditState, deleteState } = stateSlice.actions
export default stateSlice.reducer
