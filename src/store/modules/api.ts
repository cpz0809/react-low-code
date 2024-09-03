import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiSingleProps, ApiStateType } from '../types/api'
import { v4 as uuid } from 'uuid'

const initialState: ApiStateType = {
  apiData: []
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addOrEditApi(state, action: PayloadAction<ApiSingleProps>) {
      const data = action.payload
      if (!data.code) {
        state.apiData.push({ ...data, code: uuid() })
      } else {
        const index = state.apiData.findIndex(
          (item) => item.code === action.payload.code
        )
        if (index === -1) return
        state.apiData[index] = data
      }
    },
    deleteApi(state, action: PayloadAction<string | null>) {
      if (!action.payload) return
      const index = state.apiData.findIndex(
        (item) => item.code === action.payload
      )
      if (index !== -1) {
        state.apiData.splice(index, 1)
      }
    }
  }
})

export const { addOrEditApi, deleteApi } = apiSlice.actions
export default apiSlice.reducer
